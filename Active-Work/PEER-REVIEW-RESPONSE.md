# Peer Review Response: Infrastructure Build

**Reviewer:** Claude Opus 4.5 (separate session)
**Date:** 2026-01-11
**Reviewed:** PEER-REVIEW-REQUEST.md + source code examination

---

## Overall Assessment

**Grade: B+** — Solid foundation with a few critical gaps to address before content migration.

The infrastructure is well-architected and follows Next.js best practices. The component library is comprehensive. However, there are **3 critical issues** and several moderate concerns that should be addressed.

---

## CRITICAL ISSUES (Fix Before Content Migration)

### 1. XSS Vulnerability in MDX Rendering

**File:** `src/app/stream/[slug]/page.tsx:64`

```tsx
<div dangerouslySetInnerHTML={{ __html: post.body }} />
```

**Problem:** This renders raw content without sanitization. If any WordPress content contains malicious scripts, they will execute.

**Risk Level:** HIGH — WordPress exports may contain injected content, plugin shortcodes, or malformed HTML.

**Fix Options:**
1. **Immediate (before migration):** Use `sanitize-html` or `DOMPurify` to sanitize content
2. **Proper solution:** Implement real MDX compilation with `next-mdx-remote` or `@mdx-js/mdx`

```typescript
// Option 1: Sanitize (quick fix)
import sanitizeHtml from 'sanitize-html';

<div dangerouslySetInnerHTML={{
  __html: sanitizeHtml(post.body, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt'] }
  })
}} />

// Option 2: MDX compilation (proper fix)
import { compileMDX } from 'next-mdx-remote/rsc';
const { content } = await compileMDX({ source: post.body, components: mdxComponents });
```

---

### 2. Contact Form Missing Rate Limiting

**File:** `src/app/api/contact/route.ts`

**Problem:** No rate limiting. Attackers can:
- Spam the form (costing you Resend credits)
- Use your server as an email relay
- DoS the endpoint

**Fix:** Add rate limiting with Vercel's `@vercel/kv` or `upstash/ratelimit`:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour per IP
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }
  // ... rest of handler
}
```

---

### 3. Contact Form HTML Injection

**File:** `src/app/api/contact/route.ts:61`

```typescript
<p>${message.replace(/\n/g, '<br />')}</p>
```

**Problem:** The message is inserted into HTML without escaping. A user could submit:
```
</p><script>alert('xss')</script><p>
```

**Fix:** Escape HTML entities before inserting:

```typescript
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Then use:
<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
```

---

## MODERATE CONCERNS

### 4. Missing Honeypot Field for Spam Prevention

**Recommendation:** Add a hidden field that bots will fill but humans won't:

```tsx
// In ContactForm.tsx
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// In route.ts
if (body.website) {
  // Bot detected - silently succeed to not reveal detection
  return NextResponse.json({ success: true }, { status: 200 });
}
```

---

### 5. Trailing Slash Inconsistency

**File:** `next.config.ts`

WordPress URLs may have trailing slashes. Your redirects don't account for this:

```typescript
// Add to next.config.ts
trailingSlash: false, // Normalize all URLs

// Or add both versions of redirects:
{
  source: '/wordpress-maintenance/',  // WITH trailing slash
  destination: '/services/wordpress-maintenance',
  permanent: true,
},
```

---

### 6. Missing Canonical URLs on Dynamic Pages

**File:** `src/app/stream/[slug]/page.tsx`

The `generateMetadata` doesn't set canonical URLs:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // ... existing code
  return {
    // ... existing fields
    alternates: {
      canonical: `https://lastapple.com/stream/${slug}`,
    },
  };
}
```

Do this for all dynamic routes.

---

### 7. JSON-LD Missing on Content Pages

**Current:** Only Organization + WebSite schema in root layout.

**Missing:** Article schema for stream posts, Service schema for services.

```typescript
// In stream/[slug]/page.tsx
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: {
    '@type': 'Person',
    name: 'Hank Groman',
  },
  publisher: {
    '@id': 'https://lastapple.com/#organization',
  },
};
```

---

### 8. Analytics Without Consent Management

**Problem:** GDPR and CCPA may require consent before tracking.

**Options:**
1. Add cookie consent banner (using `cookie-consent` or similar)
2. Default to privacy mode and only enable full tracking with consent
3. Use privacy-focused analytics (Plausible, Fathom) that don't require consent

**Minimum fix:** Add a note in privacy policy about analytics usage.

---

## MINOR SUGGESTIONS

### 9. Schema Improvements

**ServiceSchema:** Consider adding:
```typescript
duration: z.string().optional(),        // "2-4 weeks typical"
audience: z.string().optional(),        // "Small businesses"
relatedServices: z.array(z.string()).optional(),
```

**StreamPostSchema:** Consider adding:
```typescript
author: z.string().default('Hank Groman'),
canonical: z.string().optional(),  // For syndicated content
series: z.string().optional(),     // For multi-part posts
```

---

### 10. CodeBlock Should Have Syntax Highlighting

**Your question:** "Should I have integrated Shiki or Prism?"

**Answer:** Yes, but not urgent. For a business site, most content won't be code-heavy. Add it when you migrate developer-focused posts.

Recommendation: Use Shiki (built into Next.js ecosystem via `rehype-pretty-code`).

---

### 11. Sitemap `lastModified` Should Use Content Dates

**Current:** `lastModified: new Date()` for static pages means sitemap always shows "today"

**Better:**
```typescript
{
  url: `${BASE_URL}/about`,
  lastModified: new Date('2026-01-11'), // Actual last edit date
  // Or use file mtime from git
}
```

---

### 12. Missing Error Boundary

Consider adding a global error boundary:

```typescript
// src/app/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2>Something went wrong</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
```

---

## QUESTIONS ANSWERED

### "Is CSRF protection needed?"
**No** — API routes in Next.js App Router with `POST` are inherently protected because browsers enforce same-origin policy. The route only accepts JSON, not form submissions.

### "Are 308 vs 307 redirects correct?"
**Yes** — `permanent: true` = 308 (permanent). This is correct for WordPress → Next.js URL changes. Use 307 only for A/B tests or temporary moves.

### "Should layouts use Server Components?"
**Mostly yes, but depends.** Your current layouts use `'use client'` for Framer Motion. That's fine. The animation benefit outweighs the RSC benefit for these components. However, if you want better performance, consider:
- Keep animations in client components
- Move layout shells to server components
- Wrap animated children with client boundary

### "What common blocks am I missing?"

| Block | Use Case |
|-------|----------|
| Testimonials/Reviews | Social proof |
| Team/People | About page, service pages |
| Timeline | Company history, process |
| Stats/Numbers | "30+ years", "500+ clients" |
| Logo Cloud | Partner logos, certifications |
| Comparison Table | Service tier comparison |
| Video Embed | YouTube/Vimeo wrapper |

Not critical for launch. Add as needed.

---

## RECOMMENDED FIX ORDER

**Before content migration (TODAY):**
1. Fix XSS in `dangerouslySetInnerHTML` (add sanitization at minimum)
2. Add HTML escaping in contact form email
3. Add honeypot field to contact form

**Before launch:**
4. Add rate limiting to contact form
5. Add canonical URLs to dynamic pages
6. Handle trailing slashes in redirects
7. Add Article JSON-LD to stream posts

**Post-launch polish:**
8. Cookie consent for analytics
9. Syntax highlighting for code blocks
10. Additional content blocks as needed

---

## FILES TO MODIFY

| Priority | File | Change |
|----------|------|--------|
| CRITICAL | `src/app/stream/[slug]/page.tsx` | Sanitize HTML or implement MDX |
| CRITICAL | `src/app/services/[slug]/page.tsx` | Same |
| CRITICAL | `src/app/solutions/[slug]/page.tsx` | Same |
| CRITICAL | `src/app/api/contact/route.ts` | Escape HTML, add honeypot check |
| HIGH | `src/components/ContactForm.tsx` | Add honeypot field |
| HIGH | `next.config.ts` | Add `trailingSlash: false` |
| MEDIUM | All dynamic `generateMetadata` | Add canonical URLs |
| MEDIUM | `src/app/api/contact/route.ts` | Add rate limiting |

---

## CONCLUSION

This is strong work. The architecture is sound, the component library is comprehensive, and the SEO foundation is solid. The critical issues are all security-related and straightforward to fix.

**My recommendation:** Fix the 3 critical issues, then proceed with content migration. The remaining items can be addressed iteratively.

The infrastructure is **ready for content migration** once the security issues are patched.

---

*Review complete. Questions welcome.*
