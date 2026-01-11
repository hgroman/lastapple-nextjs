# Website Pricing Update - Work Order
## lastapple.com Updates

**Issue Date:** January 8, 2026
**Priority:** HIGH
**Objective:** Update all pricing across lastapple.com to market-aligned rates

---

## TECHNICAL IMPLEMENTATION NOTE

**IMPORTANT:** The lastapple.com site uses **Elementor page builder**. All pricing content is stored in the WordPress database as JSON (`_elementor_data` in `wp_postmeta`), NOT in editable theme files.

### How to Update Pricing:

**Option 1: WordPress Admin (RECOMMENDED)**
1. Log into https://lastapple.com/wp-admin/
2. Go to Pages → Edit with Elementor
3. Find pricing elements and update manually
4. Save and publish

**Option 2: WP-CLI via SSH**
```bash
# SSH into SiteGround
ssh -p 18765 u1596-ygnccu9irco4@gcam1100.siteground.biz

# Navigate to WordPress
cd /home/customer/www/lastapple.com/public_html

# Find pricing page ID (example)
wp post list --post_type=page --post_status=publish | grep -i maintenance

# Export page data for backup
wp post get [PAGE_ID] --format=json > backup_pricing_page.json
```

**Git's Role:** The cloned repo (`lastapple-wp`) is for versioning theme files, plugins, and static assets - NOT for database content like Elementor pages.

---

## PRICING CHANGES SUMMARY

### WordPress Maintenance Plans:
| Plan | OLD | NEW | Increase |
|------|-----|-----|----------|
| WordPress Essentials | $149/month | **$199/month** | +$50 |
| Growth Accelerator | $249/month | **$349/month** | +$100 |
| Business Transformer | $499/month | **$699/month** | +$200 |
| Enterprise AI Solutions | $999/month | **$1,299/month** | +$300 |

### Justification:
- Market research shows you deliver $200-250 value at $149 price point
- Competitors with less experience charge 25-50% more
- New pricing still 15-25% below premium agency rates
- 25+ years expertise and white-glove service justify premium

---

## PHASE 1: UPDATE EXISTING PAGES

### Page 1: WordPress Maintenance Plans
**URL:** https://lastapple.com/wordpress-maintenance-plans/

**Tasks:**
- [ ] Update price on pricing cards (4 locations)
- [ ] Update any "per month" text
- [ ] Check for pricing in page copy/descriptions
- [ ] Update meta description if it mentions pricing
- [ ] Verify mobile view displays correctly
- [ ] Add value statement: "Best value in the industry - see why"
- [ ] Add justification line: "Pricing reflects our 25+ years expertise and white-glove service"

---

### Page 2: WordPress Maintenance (Service Overview)
**URL:** https://lastapple.com/wordpress-maintenance/

**Tasks:**
- [ ] Verify NO pricing is hardcoded in copy
- [ ] Update any "starting at $149" references to "starting at $199"
- [ ] Check for pricing in image alt text or captions
- [ ] Ensure CTA buttons link to updated pricing page
- [ ] Add banner: "Industry-leading WordPress maintenance starting at $199/month"

---

### Page 3: Home Page
**URL:** https://lastapple.com/

**Tasks:**
- [ ] Search entire page for any pricing mentions
- [ ] Update hero section if it mentions WordPress pricing
- [ ] Check services overview section
- [ ] Update footer if pricing listed
- [ ] Verify Hero CTA doesn't mention old pricing
- [ ] Check services grid for any "starting at" prices
- [ ] Review testimonials (do any mention pricing?)

---

### Page 4: Services Landing
**URL:** https://lastapple.com/services/

**Tasks:**
- [ ] Review for any pricing callouts
- [ ] Update service cards if they show pricing
- [ ] Check comparison tables
- [ ] Update "Learn More" CTAs if they preview pricing

---

### Page 5: Blog Posts
**URL:** https://lastapple.com/blog/

**Tasks:**
- [ ] Search all posts for "$149" or "149"
- [ ] Search for "WordPress maintenance pricing"
- [ ] Update any case studies that mention pricing
- [ ] Add disclaimer where needed: "Pricing current as of January 2026"

---

## PHASE 2: CREATE NEW PRICING PAGES

### Page 6: AI Chatbot Solutions Pricing (NEW)
**URL:** https://lastapple.com/ai-chatbot-pricing/

**Content:**

```
# AI Chatbot Solutions - Transparent Pricing

## Implementation Packages

### Starter Chatbot
**$3,500** one-time + **$150/month** support
- Basic chatbot setup
- Up to 100 FAQs
- Single website integration
- Email support
- Monthly performance reports

[Get Started]

### Professional Chatbot
**$6,500** one-time + **$250/month** support
- Advanced chatbot with NLP
- Up to 500 FAQs
- Multi-platform integration (website + 1 other)
- CRM integration (basic)
- Priority support
- Weekly performance reports
- Quarterly optimization

[Get Started]

### Enterprise Chatbot
**$12,500** one-time + **$500/month** support
- Full AI-powered chatbot
- Unlimited FAQs
- Multi-platform integration (website + unlimited)
- Advanced CRM integration + workflows
- Dedicated account manager
- Real-time monitoring
- Monthly strategy sessions
- Custom development included

[Get Started]
```

**Market Justification:** Chatbot agencies charge $3K-25K. This is mid-market positioning.

---

### Page 7: SEO Services Pricing (NEW)
**URL:** https://lastapple.com/seo-pricing/

**Content:**

```
# SEO Services - Clear, Predictable Pricing

## SEO Audit (One-Time)
**$1,995**
- Comprehensive technical audit
- Keyword opportunity analysis
- Competitor analysis
- Actionable recommendations
- 60-minute strategy call

[Order Audit]

## Monthly SEO Services

### SEO Essentials
**$1,500/month**
- On-page optimization
- Technical SEO fixes
- Monthly keyword research
- Basic link building (5/month)
- Monthly reporting
- 2 optimized blog posts/month

[Get Started]

### SEO Professional
**$2,750/month**
- Everything in Essentials, plus:
- Advanced link building (10/month)
- Competitor monitoring
- Local SEO optimization
- Google Business Profile management
- 4 optimized blog posts/month
- Quarterly strategy sessions

[Get Started]

### SEO Enterprise
**$5,000/month**
- Everything in Professional, plus:
- AI-driven keyword strategy
- Advanced content clusters
- Enterprise link building (20/month)
- Conversion optimization
- Weekly reporting
- Dedicated SEO strategist
- Unlimited blog posts with AI enhancement

[Get Started]
```

**Market Justification:** SEO agencies charge $1,000-10,000/month. Mid-market positioning.

---

### Page 8: B2B Email List Services Pricing (NEW)
**URL:** https://lastapple.com/b2b-email-list-pricing/

**Content:**

```
# B2B Email List Services - Transparent Pricing

## List Building & Enrichment

### Per-Project Pricing
**$3,500 per 1,000 verified contacts**
- Targeted list building
- Email verification
- Phone verification
- Basic firmographic data
- Deliverability guarantee: 95%+

[Start Project]

### List Enrichment
**$2,200 per 1,000 records**
- Enhance existing lists
- Email verification
- Phone appending
- Title/role verification
- Company data enrichment

[Start Project]

## Monthly Subscription Plans

### Growth Plan
**$699/month**
- 500 new verified contacts/month
- Ongoing list enrichment
- Monthly data refresh
- Email verification
- Priority support

[Subscribe]

### Professional Plan
**$1,299/month**
- 1,000 new verified contacts/month
- Ongoing list enrichment
- Weekly data refresh
- Advanced filtering
- Dedicated account manager

[Subscribe]

### Enterprise Plan
**Custom Pricing**
- Unlimited contacts
- Real-time enrichment
- API access
- Custom integrations
- White-glove service

[Contact Us]
```

**Market Justification:** ZoomInfo charges $15K-25K/year. Apollo charges $4,800-9,600/year.

---

### Page 9: Data Integration Services Pricing (NEW)
**URL:** https://lastapple.com/data-integration-pricing/

**Content:**

```
# Data Integration Services - Project-Based Pricing

## Standard Integrations

### Simple Integration
**$3,500 - $5,500**
- Single-system integration
- CRM to email platform
- Basic data mapping
- Testing & deployment
- 30 days post-launch support

Examples: HubSpot to Mailchimp, Salesforce to WordPress

[Get Quote]

### Complex Integration
**$8,500 - $15,000**
- Multi-system integration (2-3 systems)
- Advanced data mapping
- Custom workflows
- API development (if needed)
- 60 days post-launch support

Examples: Multi-platform marketing automation, CRM + accounting + inventory

[Get Quote]

### Enterprise Architecture
**$25,000 - $50,000+**
- Complete data ecosystem
- 4+ system integrations
- Custom middleware development
- Advanced security & compliance
- 90 days post-launch support
- Ongoing optimization

Examples: Complete digital transformation, enterprise-wide data unification

[Get Quote]

## Monthly Support Plans

**Basic:** $299/month - Monitoring + minor updates
**Professional:** $599/month - Proactive maintenance + optimization
**Enterprise:** $1,200/month - Dedicated support + continuous improvement
```

**Market Justification:** Integration agencies charge $150-250/hour.

---

### Page 10: HubSpot Services Pricing (NEW)
**URL:** https://lastapple.com/hubspot-services-pricing/

**Content:**

```
# HubSpot Services - Clear Implementation Pricing

## HubSpot Setup & Onboarding
**$6,500 - $10,000**
- Complete HubSpot setup
- User training (up to 5 users)
- Basic workflow configuration
- Email template design
- 30 days post-launch support

[Get Started]

## HubSpot Migration
**$9,500 - $18,000**
- Migration from existing CRM
- Data cleanup & deduplication
- Complete HubSpot setup
- Advanced workflow configuration
- User training (up to 10 users)
- 60 days post-launch support

[Get Started]

## Custom Workflow Development
**$2,800 per workflow**
- Custom automation workflow
- Advanced logic & branching
- Integration with external tools
- Testing & optimization
- Documentation

[Get Started]

## Monthly HubSpot Management

### Essentials
**$599/month**
- Monthly optimization review
- Basic workflow maintenance
- Email template updates
- Performance reporting

### Professional
**$1,099/month**
- Everything in Essentials, plus:
- Quarterly strategy sessions
- Advanced workflow development
- A/B testing & optimization
- Priority support

### Enterprise
**$2,200/month**
- Everything in Professional, plus:
- Dedicated HubSpot specialist
- Weekly optimization
- Custom development included
- Executive reporting

[Get Started]
```

**Market Justification:** HubSpot partners charge $5K-20K implementations.

---

## PHASE 3: VERIFICATION CHECKLIST

After all updates complete:

- [ ] All old pricing instances removed ($149, $249, $499, $999)
- [ ] New pricing displays correctly on desktop
- [ ] New pricing displays correctly on mobile
- [ ] All CTA buttons link to correct pages
- [ ] No broken links created
- [ ] Meta descriptions updated where pricing mentioned
- [ ] New pages indexed (submit to Google Search Console)
- [ ] All PDF downloads updated (if any pricing guides exist)
- [ ] Email templates updated (if any mention pricing)
- [ ] Proposals/quotes templates updated

---

## PHASE 4: ANALYTICS TRACKING

**Add tracking to measure impact:**

### Google Analytics Events:
- [ ] Track "Pricing Page View" for each tier
- [ ] Track "Get Started" button clicks by tier
- [ ] Track scroll depth on pricing pages

### A/B Testing Opportunities:
- [ ] Test "$199/month" vs "$199 per month"
- [ ] Test showing annual pricing option
- [ ] Test "Save $X with annual" messaging

---

## DECISIONS NEEDED

### 1. Grandfathering Existing Clients:
- [ ] Grandfather current clients at old pricing?
- [ ] If yes, for how long? (Recommended: 6 months)
- [ ] Notify now or at renewal?

### 2. Effective Date:
- [ ] When do new prices go live? (Recommended: After LinguaTech call)
- [ ] Add "New pricing effective January 9, 2026" disclaimer?

### 3. LinguaTech Exception:
- [ ] Honor $149 for LinguaTech (already soft-quoted)?
- **RECOMMENDATION:** Yes, honor $149. Use as upsell opportunity later.

### 4. Design/Branding:
- [ ] Use same template as WordPress maintenance plans page?
- [ ] Add special callouts? ("Most Popular", "Best Value")
- [ ] Include comparison tables between tiers?

### 5. Legal/Disclaimers:
- [ ] Add "Pricing subject to change" disclaimer?
- [ ] Add "Custom quotes available for enterprise needs"?
- [ ] Terms & conditions link needed?

---

## DEPLOYMENT RECOMMENDATION

### Option A: All at Once (RECOMMENDED)
- Deploy all updates simultaneously
- Cleaner, more consistent
- Single announcement
- Complete by Friday PM

### Option B: Phased Rollout
- Week 1: Update WordPress maintenance pricing
- Week 2: Add chatbot + SEO pricing pages
- Week 3: Add remaining service pricing
- Benefit: Test market reaction

**GO WITH OPTION A** - Get it done, move forward with confidence.

---

## TIMELINE ESTIMATE

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 1 | Update existing pricing pages | 2 hours |
| Phase 2 | Create new pricing pages (5 pages) | 4-6 hours |
| Phase 3 | Verification and QA | 1 hour |
| Phase 4 | Update supporting materials | 30 min |
| **Total** | | **7.5-9.5 hours** |

**Can complete in:** 1-2 business days with dedicated focus
