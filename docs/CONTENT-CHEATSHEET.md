# Last Apple Content Cheat Sheet

**STOP.** Before creating or moving content, verify the schema requirements below.
Mismatching fields (e.g., putting `pricing` in a Solution) will break the build.

---

## 1. Quick Reference: Schemas

| Field | **Service** (`content/services/`) | **Solution** (`content/solutions/`) | **Stream** (`content/stream/`) |
| :--- | :--- | :--- | :--- |
| **Required Key** | `features` (List) | `outcomes` (List) | `publishedAt` (Date) |
| **Pricing** | ✅ **Supported** | ❌ **NOT Supported** | ❌ **NOT Supported** |
| **Icon** | ✅ Required | ✅ Required | ❌ No |
| **Case Study** | ❌ No (Use Component) | ✅ Frontmatter or Component | ❌ No |
| **Images** | `heroImage`, `tierImages` | `heroImage`, `caseStudy.image` | `featuredImage` |

---

## 2. Detailed Schemas

### 🛠️ Service (`content/services/*.mdx`)
**Purpose:** Marketable services with pricing (e.g., Maintenance, SEO).

```yaml
---
title: "Service Name"
description: "Max 160 chars SEO description."
icon: "Shield" # Lucide icon name
category: "wordpress" # wordpress, ai, integration
features: # REQUIRED
  - "Feature 1"
  - "Feature 2"
pricing: # OPTIONAL
  starting: 97
  unit: "/month"
  tiers: # Optional rich tiers
    - name: "Starter"
      price: 99
      features: ["A", "B"]
heroImage: # OPTIONAL
  src: "/images/path.webp"
  alt: "Alt text"
tierImages: # OPTIONAL (matches tier names)
  starter: { src: "...", alt: "..." }
  growth: { src: "...", alt: "..." }
cta:
  text: "Get Started"
  href: "/contact"
published: true
order: 1
---
```

### 💡 Solution (`content/solutions/*.mdx`)
**Purpose:** High-level business outcomes (e.g., Chatbots, Data Integration).
**⚠️ NOTE:** No `pricing` field. Use `outcomes` instead of `features`.

```yaml
---
title: "Solution Name"
description: "Max 160 chars SEO description."
icon: "Zap"
category: "ai" # ai, integration, automation, data
outcomes: # REQUIRED (Note: NOT 'features')
  - "Outcome 1"
  - "Outcome 2"
heroImage:
  src: "/images/path.webp"
  alt: "Alt text"
caseStudy: # OPTIONAL (Frontmatter version)
  client: "Client Name"
  outcome: "Result summary"
  image: { src: "...", alt: "..." }
published: true
order: 1
---
```

### 📝 Stream (`content/stream/*.mdx`)
**Purpose:** Blog posts, updates, knowledge base.

```yaml
---
title: "Post Title"
description: "Max 160 chars."
publishedAt: "2026-01-17" # REQUIRED
featured: true # true = show in hero/highlights
tags: ["ai", "dev"]
category: "ai" # ai, seo, wordpress, automation
featuredImage: # OPTIONAL
  src: "/images/path.webp"
  alt: "Alt text"
published: true
---
```

---

## 3. Migration Checklist (The "Red Light" Test)

Before pushing, ask:

1.  **Did I move a file?**
    *   [ ] Check `features` vs `outcomes`.
    *   [ ] Check if `pricing` is allowed in the new location.
2.  **Did I add images?**
    *   [ ] Do they exist in `/public/images/...`?
    *   [ ] Do they have `alt` text?
3.  **Did I change the slug/filename?**
    *   [ ] Did I update `src/components/Navigation.tsx`?
    *   [ ] Did I update `next.config.ts` redirects?

## 4. Rich Components (MDX)

Use these inside the `.mdx` body content:

**Process Steps:**
```tsx
<ProcessSteps
  steps={[
    { title: "Step 1", description: "Details..." },
    { title: "Step 2", description: "Details..." }
  ]}
/>
```

**Case Study (Rich):**
```tsx
<CaseStudy
  variant="full"
  client="Name"
  industry="Industry"
  challenge="The problem..."
  solution="Our fix..."
  outcome="The result..."
  metrics={[
    { value: "99%", label: "Uptime" }
  ]}
/>
```

**Image:**
```tsx
<ContentImage
  src="/images/path.webp"
  alt="Description"
  caption="Optional caption"
/>
```
