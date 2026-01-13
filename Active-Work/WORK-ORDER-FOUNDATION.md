# Work Order: Foundation Infrastructure

**Created:** 2026-01-12
**Priority:** P0 - Must complete before content migration
**Estimated Effort:** 2-3 hours
**Prerequisite For:** Step 10.1+ (Asset Preparation & Content Migration)

---

## Context

During the WordPress audit phase, we identified critical foundation gaps in the Next.js implementation. These must be addressed before migrating content, as they affect:

- **User Experience** (broken links, missing 404 page)
- **Lead Generation** (contact form doesn't work)
- **Brand Presentation** (missing favicon, broken logo)
- **SEO** (outdated schema, missing OG image)

This work order establishes **Step 10.0c** in the build plan.

---

## Objectives

1. Fix all P0 (critical) foundation issues
2. Fix all P1 (high) foundation issues
3. Document the process for reuse on 10+ future migrations
4. Verify all fixes work in production

---

## Deliverables

| Deliverable | Description |
|-------------|-------------|
| Working contact form | Email sends to hank@lastapple.com |
| Favicon suite | favicon.ico, apple-touch-icon, manifest |
| Custom 404 page | Branded not-found.tsx |
| Fixed Footer | Correct links, logo, social icons |
| Updated schema | JSON-LD matches WordPress data |
| OG image | Default social share image |
| Process doc | `docs/processes/FOUNDATION-AUDIT-PROCESS.md` |

---

## Task Breakdown

### Phase 1: Email Infrastructure (P0)

**Task 1.1: Resend Account Setup**
- [ ] Create account at resend.com
- [ ] Navigate to API Keys section
- [ ] Generate new API key
- [ ] Copy key (shown only once)

**Task 1.2: Environment Configuration**
- [ ] Create `.env.local` file in project root
- [ ] Add: `RESEND_API_KEY=re_xxxxxxxxxx`
- [ ] Verify `.env.local` is in `.gitignore` (should be by default)

**Task 1.3: Domain Verification (Optional but Recommended)**
- [ ] In Resend dashboard, go to Domains
- [ ] Add `lastapple.com`
- [ ] Add DNS records to domain registrar:
  - TXT record for verification
  - CNAME for DKIM
- [ ] Wait for verification (usually minutes)
- [ ] Update `src/app/api/contact/route.ts`:
  - Change `from: 'Last Apple Contact <onboarding@resend.dev>'`
  - To: `from: 'Last Apple <noreply@lastapple.com>'`

**Task 1.4: Test Contact Form**
- [ ] Run `npm run dev`
- [ ] Navigate to /contact
- [ ] Submit test message
- [ ] Verify email received at hank@lastapple.com
- [ ] Check spam folder if not in inbox

---

### Phase 2: Brand Assets (P0)

**Task 2.1: Generate Favicon Suite**

Source: `/public/logo-small.png` or `/public/images/wp/Original-on-Transparent.png`

Using https://realfavicongenerator.net:
- [ ] Upload logo image
- [ ] Configure settings (background color: #141010)
- [ ] Download package
- [ ] Extract to `/public/`:
  - `favicon.ico`
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `apple-touch-icon.png`
  - `site.webmanifest`

**Task 2.2: Update Layout Metadata**

File: `src/app/layout.tsx`

Add to metadata export:
```typescript
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png' },
  ],
},
manifest: '/site.webmanifest',
```

**Task 2.3: Create OG Image**

- [ ] Create 1200x630px image with:
  - Last Apple logo
  - Brand colors (#141010 bg, #a63d3d accent)
  - Tagline or value prop
- [ ] Save as `/public/og-image.png`
- [ ] Add to layout.tsx metadata:
```typescript
openGraph: {
  // ... existing
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Last Apple Business Solutions',
    },
  ],
},
```

---

### Phase 3: Error Pages (P0)

**Task 3.1: Create Custom 404 Page**

File: `src/app/not-found.tsx`

Requirements:
- [ ] Match site design system
- [ ] Include navigation back to home
- [ ] Suggest popular pages
- [ ] Consider search functionality
- [ ] Mobile responsive

---

### Phase 4: Footer Fixes (P1)

**Task 4.1: Fix Broken Links**

File: `src/components/Footer.tsx`

Current → Correct:
- `/services/wordpress-care` → `/services/wordpress-maintenance`
- `/services/ai-marketing` → `/solutions/ai-chatbot`
- `/services/system-integration` → `/solutions/data-integration`
- `/portfolio` → `/stream` or remove

**Task 4.2: Fix Logo Reference**

Current: `src="/logo.jpg"` (doesn't exist)
Change to: `src="/logo-small.png"` or `src="/images/wp/Original-on-Transparent.png"`

**Task 4.3: Add Social Links**

Add social icons section with links from WordPress:
```typescript
const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/LastAppleConsulting', icon: Facebook },
  { name: 'Twitter', href: 'https://x.com/lastappledma', icon: Twitter },
  { name: 'Instagram', href: 'https://www.instagram.com/hank_groman/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@lastappleai', icon: Youtube },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/lastapple', icon: Linkedin },
];
```

---

### Phase 5: Schema Updates (P1)

**Task 5.1: Update JSON-LD Social Links**

File: `src/app/layout.tsx`

Update `sameAs` array in jsonLd:
```typescript
sameAs: [
  "https://www.facebook.com/LastAppleConsulting",
  "https://x.com/lastappledma",
  "https://www.instagram.com/hank_groman/",
  "https://www.youtube.com/@lastappleai",
  "https://linkedin.com/company/lastapple",
],
```

**Task 5.2: Verify Schema**

- [ ] Run build: `npm run build`
- [ ] Test at: https://search.google.com/test/rich-results
- [ ] Fix any validation errors

---

### Phase 6: Form Enhancements (P2)

**Task 6.1: Add Type Parameter Support**

Enhance ContactForm to handle different form types via URL parameter:
- `/contact` → General inquiry
- `/contact?type=maintenance` → WordPress maintenance quote
- `/contact?type=seo-review` → SEO audit request
- `/contact?type=strategy` → Strategy consultation

**Task 6.2: Newsletter Signup Component**

Create simple newsletter signup component for /stream page.
Can use same Resend infrastructure.

---

## Verification Checklist

### Email
- [ ] `.env.local` exists with valid RESEND_API_KEY
- [ ] Contact form submits without error
- [ ] Email received at hank@lastapple.com
- [ ] Reply-to header correct (sender's email)

### Branding
- [ ] Favicon visible in browser tab
- [ ] Apple touch icon works (test on iOS)
- [ ] Logo loads correctly in footer
- [ ] Logo loads correctly in navigation

### Pages
- [ ] 404 page shows custom design (visit /nonexistent-page)
- [ ] All footer links resolve (no 404s)
- [ ] Social links open correct profiles

### SEO
- [ ] JSON-LD validates at Google Rich Results Test
- [ ] OG image shows in social share previews (use https://metatags.io)
- [ ] Favicon appears in Google search results

### Build
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] No console errors in browser

---

## Dependencies

| Task | Depends On |
|------|------------|
| Test contact form | Resend API key |
| Domain verification | DNS access to lastapple.com |
| OG image creation | Logo assets |
| Footer social links | WordPress plugin audit (COMPLETE) |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Resend API key not working | Contact form broken | Test immediately after setup |
| DNS propagation delay | Domain verification slow | Can use test mode while waiting |
| Favicon not showing | Brand inconsistency | Hard refresh, check cache headers |

---

## Success Criteria

- [ ] Contact form sends email successfully
- [ ] Favicon appears in all browsers
- [ ] Custom 404 page displays
- [ ] All footer links work
- [ ] Social icons visible and linked
- [ ] JSON-LD validates
- [ ] Build passes
- [ ] No console errors

---

## Post-Completion

After completing this work order:

1. Update `Active-Work/1-PROGRESS.yaml`:
   - Mark Step 10.0c as COMPLETE
   - Update session notes

2. Commit changes:
   - Exclude `.env.local` (contains secrets)
   - Include all new files

3. Deploy to Vercel:
   - Add RESEND_API_KEY to Vercel environment variables
   - Verify production contact form works

4. Proceed to Step 10.1 (Download Images)

---

## Related Documents

- `docs/FOUNDATION-GAPS.yaml` - Detailed gap analysis
- `docs/processes/FOUNDATION-AUDIT-PROCESS.md` - Reusable process
- `docs/wordpress-audit/PLUGIN-INVENTORY.yaml` - Social links source
- `.env.example` - Environment variable template
