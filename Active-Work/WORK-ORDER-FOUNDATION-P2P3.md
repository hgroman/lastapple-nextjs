# Work Order: Foundation P2/P3 Items (Postponed)

**Created:** 2026-01-13
**Status:** POSTPONED (items scheduled for later phases)
**Reference:** docs/FOUNDATION-GAPS.yaml

---

## Summary

All P0 (Critical) and P1 (High) foundation items are **COMPLETE**. The remaining P2/P3 items have been intentionally postponed to appropriate phases of the migration where they make more sense to implement.

---

## Postponement Schedule

### Phase 1: After Step 10.1 (Download WordPress Images)

| Item | Priority | Rationale |
|------|----------|-----------|
| **OG Image** | P2 | Use downloaded WordPress assets for visual consistency |

**Trigger:** Complete Step 10.1 image download
**Deliverable:** `public/og-image.png` (1200x630)

**Implementation:**
```
1. Review downloaded WordPress images for suitable hero/branding assets
2. Create 1200x630 composite image with:
   - Last Apple branding (logo, colors)
   - Representative imagery from WordPress assets
3. Add to public/og-image.png
4. Update src/app/layout.tsx metadata:
   openGraph: {
     images: [{ url: '/og-image.png', width: 1200, height: 630 }]
   }
5. Test with https://developers.facebook.com/tools/debug/
```

---

### Phase 2: During Content Migration

| Item | Priority | Trigger | Rationale |
|------|----------|---------|-----------|
| **Newsletter Signup** | P2 | /stream page migration | Form belongs on blog archive page |
| **Multiple Form Types** | P2 | Service page migration | Form variants needed for specific services |

#### Newsletter Signup Form

**Trigger:** When migrating /stream (blog archive) page
**WordPress Form ID:** 9127 (last-apple-signup-blog-archive)

**Implementation:**
```
1. Create src/components/NewsletterSignup.tsx
2. Use AWS SES (same as contact form) or integrate with:
   - Mailchimp
   - ConvertKit
   - Buttondown
3. Add to /stream page sidebar or footer section
4. Fields: email only (keep it simple)
5. Success/error state handling
```

#### Multiple Form Types

**Trigger:** When migrating service pages that need specialized forms
**WordPress Forms:**
- 9706: SEO audit request → `/contact?type=seo-review`
- 10496: WordPress quote → `/contact?type=maintenance`

**Implementation:**
```
1. Enhance src/components/ContactForm.tsx:
   - Add 'type' prop: 'general' | 'seo-review' | 'maintenance' | 'demo'
   - Conditional fields based on type
   - Update form title/description per type
2. Read type from URL: /contact?type=maintenance
3. Route-specific fields:
   - seo-review: website URL, current SEO tools
   - maintenance: WordPress version, hosting provider, site size
   - demo: preferred date/time, timezone
4. All submissions go to same AWS SES endpoint with type indicator
```

---

### Phase 3: Pre-Launch Polish

| Item | Priority | Rationale |
|------|----------|-----------|
| **Error Boundary** | P3 | UX polish - default Next.js errors work fine |
| **Loading States** | P3 | UX polish - site loads fast already |
| **Robots.txt Refinement** | P3 | SEO optimization - current version is functional |

**Trigger:** All content migrated, preparing for DNS cutover

#### Error Boundary

**Deliverable:** `src/app/error.tsx`

```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

#### Loading States

**Deliverable:** `src/app/loading.tsx` (root) + per-route as needed

```tsx
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-4" />
        <div className="h-4 w-64 bg-muted rounded" />
      </div>
    </div>
  );
}
```

#### Robots.txt Refinement

**File:** `src/app/robots.ts`

Review and potentially add:
- Crawl-delay for aggressive bots
- Disallow patterns for admin/API routes
- Additional sitemap references if needed

---

## Tracking

Update these files when implementing postponed items:

1. **docs/FOUNDATION-GAPS.yaml** - Change status from POSTPONED to FIXED
2. **Active-Work/1-PROGRESS.yaml** - Update foundation stats
3. **This document** - Check off completed items

---

## Completion Checklist

### After Step 10.1
- [ ] OG image created and deployed
- [ ] Social share preview tested

### During Content Migration
- [ ] Newsletter signup on /stream page
- [ ] SEO review form type working
- [ ] Maintenance quote form type working

### Pre-Launch Polish
- [ ] Error boundary implemented
- [ ] Loading states implemented
- [ ] Robots.txt reviewed and refined

---

## Decision Record

**Why postpone instead of implement now?**

1. **OG Image** - Better to use actual WordPress assets for visual consistency rather than placeholder
2. **Newsletter/Forms** - These belong on specific pages that don't exist yet; implementing now would require rework
3. **P3 Polish** - Default Next.js behavior is acceptable; custom versions are optimization, not requirements

**Risk Assessment:** LOW
All postponed items are non-blocking for content migration. Site functions correctly without them.
