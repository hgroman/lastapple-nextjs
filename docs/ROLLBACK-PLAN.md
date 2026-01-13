# Rollback Plan - WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-11
**Purpose:** Safety net for DNS cutover and post-launch issues
**Last Review:** _________________

---

## Executive Summary

This document outlines the rollback strategy for the Last Apple website migration from WordPress to Next.js. The key principle: **WordPress remains live for 30 days post-cutover** as a fallback.

---

## Pre-Cutover Requirements

Before DNS cutover, ensure:

- [ ] WordPress site remains fully functional at current host
- [ ] All WordPress content frozen (no new posts/changes)
- [ ] WordPress admin credentials documented and accessible
- [ ] Current DNS records documented (A, CNAME, MX, TXT)
- [ ] DNS TTL reduced to 300 seconds (5 minutes) 24 hours before cutover
- [ ] Vercel deployment verified working on preview URL
- [ ] All redirects tested on Vercel preview
- [ ] Contact form tested with real submission
- [ ] Analytics verified firing on Vercel preview

---

## DNS Configuration

### Current DNS (WordPress)
```
Record  | Type  | Value
--------|-------|----------------------------------
@       | A     | [SiteGround IP - document before cutover]
www     | CNAME | [document before cutover]
```

### Target DNS (Vercel)
```
Record  | Type  | Value
--------|-------|----------------------------------
@       | A     | 76.76.21.21
www     | CNAME | cname.vercel-dns.com
```

### DNS Provider
- Provider: _________________
- Login URL: _________________
- Credentials: [Stored securely - location: _________________]

---

## Cutover Procedure

### T-24 Hours
1. [ ] Reduce DNS TTL to 300 seconds
2. [ ] Final content freeze on WordPress
3. [ ] Final deployment to Vercel
4. [ ] Full site verification on Vercel preview

### T-0 (Cutover)
1. [ ] Document current DNS A record value
2. [ ] Update A record to Vercel (76.76.21.21)
3. [ ] Update www CNAME to cname.vercel-dns.com
4. [ ] Start timer for monitoring period

### T+5 Minutes
1. [ ] Clear local DNS cache: `sudo dscacheutil -flushcache`
2. [ ] Verify propagation: `dig lastapple.com +short`
3. [ ] Test homepage loads from Next.js
4. [ ] Test one redirect (old URL → new URL)

### T+30 Minutes
1. [ ] Test all critical pages load
2. [ ] Test contact form submission
3. [ ] Verify analytics receiving data
4. [ ] Check for console errors

### T+24 Hours
1. [ ] Check Search Console for crawl errors
2. [ ] Review Vercel analytics for 404s
3. [ ] Verify sitemap.xml accessible
4. [ ] Confirm no critical issues

---

## Rollback Triggers

Initiate rollback if ANY of these occur:

| Severity | Trigger | Action |
|----------|---------|--------|
| CRITICAL | Site completely down | Immediate rollback |
| CRITICAL | Contact form broken (lost leads) | Immediate rollback |
| HIGH | >10% of pages returning 404 | Rollback within 1 hour |
| HIGH | SEO-critical pages missing | Rollback within 1 hour |
| MEDIUM | Analytics not tracking | Fix forward, no rollback |
| LOW | Minor styling issues | Fix forward, no rollback |

---

## Rollback Procedure

### Decision
- [ ] Rollback trigger identified: _________________
- [ ] Decision maker: Hank Groman
- [ ] Decision time: _________________

### Execution (Target: <10 minutes)

1. **Revert DNS** (2 minutes)
   ```
   Change A record from 76.76.21.21 back to [WordPress IP]
   Change www CNAME back to [original value]
   ```

2. **Verify Propagation** (5 minutes)
   ```bash
   dig lastapple.com +short
   # Should return WordPress IP
   ```

3. **Test WordPress Site** (2 minutes)
   - [ ] Homepage loads
   - [ ] Contact form works
   - [ ] Key pages accessible

4. **Notify Stakeholders**
   - [ ] Document reason for rollback
   - [ ] Create fix plan for Next.js issues

---

## Post-Rollback Actions

If rollback occurs:

1. [ ] Document all issues encountered
2. [ ] Create GitHub issues for each problem
3. [ ] Fix issues on Vercel preview
4. [ ] Full regression test before re-attempting cutover
5. [ ] Schedule new cutover window

---

## Monitoring Tools

### During Cutover
- **DNS Propagation:** https://dnschecker.org
- **Site Status:** https://downforeveryoneorjustme.com/lastapple.com
- **Vercel Dashboard:** https://vercel.com/dashboard

### Post-Cutover (Daily for First Week)
- **Search Console:** Check for crawl errors, 404s
- **Vercel Analytics:** Monitor traffic patterns
- **Contact Form:** Verify submissions received

---

## Timeline

| Day | Action |
|-----|--------|
| Day 0 | DNS cutover to Vercel |
| Day 1-7 | Daily monitoring (Search Console, analytics, 404s) |
| Day 7 | First weekly review |
| Day 14 | Second weekly review |
| Day 30 | WordPress decommission decision |
| Day 30+ | Archive WordPress backup, terminate hosting |

---

## WordPress Preservation

**Keep WordPress running for 30 days because:**
- SEO recovers gradually (Google re-crawls over days/weeks)
- Users may have bookmarked old URLs
- Edge cases in redirects may surface
- Email links in newsletters may point to old URLs

**After 30 days:**
1. [ ] Export full WordPress backup (files + database)
2. [ ] Store backup in secure location
3. [ ] Cancel WordPress hosting
4. [ ] Document hosting end date

---

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Site Owner | Hank Groman | 714-813-9973 |
| DNS Provider Support | _________________ | _________________ |
| Vercel Support | N/A | support@vercel.com |
| SiteGround Support | N/A | [Support portal] |

---

## Appendix: Useful Commands

```bash
# Check DNS propagation
dig lastapple.com +short
dig lastapple.com ANY

# Flush local DNS cache (macOS)
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder

# Test redirect
curl -I https://lastapple.com/wordpress-maintenance/

# Check SSL certificate
echo | openssl s_client -servername lastapple.com -connect lastapple.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## Document History

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-01-11 | 1.0 | Initial creation | Claude |

---

*This rollback plan was created as part of the WordPress → Next.js migration project. Review and update before each cutover attempt.*
