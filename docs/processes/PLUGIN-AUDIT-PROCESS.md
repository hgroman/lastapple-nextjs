# Plugin Audit Process for WordPress → Next.js Migration

**Version:** 1.0
**Created:** 2026-01-12
**Purpose:** Repeatable process for auditing plugins and their settings before migration
**Usage:** Run this process for each WordPress site migration (10+ sites planned)

---

## Overview

This process extracts plugin data and configuration from WordPress (via WP-CLI) and creates a structured YAML inventory that captures settings needed for the Next.js implementation.

**Time estimate:** 20-30 minutes per site
**Output:** `docs/wordpress-audit/PLUGIN-INVENTORY.yaml`

---

## Prerequisites

Before starting:
- [ ] SSH access to WordPress site configured
- [ ] WP-CLI available on server
- [ ] Page/post inventory already created

---

## Step 1: Get Complete Plugin List

Extract all plugins with their status:

```bash
ssh -p [PORT] [USER]@[HOST] "cd [WP_PATH] && wp plugin list --format=csv"
```

This returns:
- Plugin name (slug)
- Status (active/inactive/must-use)
- Update availability
- Version
- Auto-update setting

---

## Step 2: Categorize Plugins by Migration Relevance

| Category | Description | Action |
|----------|-------------|--------|
| **MIGRATE_SETTINGS** | Settings needed in Next.js | Extract config, implement in new stack |
| **MIGRATE_DATA** | Data/content to preserve | Export and import |
| **NOT_NEEDED** | WordPress-specific (page builders, etc.) | Skip - functionality replaced by Next.js |
| **SECURITY** | Security plugins | Skip - handled by Vercel/Next.js |
| **PERFORMANCE** | Cache/optimization | Skip - handled by Vercel |

---

## Step 3: Extract Analytics Settings

### Google Analytics (Site Kit)
```bash
wp option get googlesitekit_analytics-4_settings --format=json
```

Key values to capture:
- `measurementID` (e.g., G-XXXXXXXX)
- `propertyID`
- `trackingDisabled` settings

### Microsoft Clarity
```bash
wp option get clarity_wordpress_site_id
```

### Facebook Pixel
```bash
wp option list --search="*facebook*pixel*" --format=csv
wp option get facebook_pixel_id
```

---

## Step 4: Extract SEO Plugin Settings

### SEOPress
```bash
# Core settings
wp option get seopress_titles_option_name --format=json
wp option get seopress_social_option_name --format=json
wp option get seopress_xml_sitemap_option_name --format=json

# Social accounts
wp option get seopress_social_option_name --format=json | grep -oE 'seopress_social_accounts_[^"]+":"[^"]+"'
```

### Yoast SEO (if used)
```bash
wp option get wpseo --format=json
wp option get wpseo_social --format=json
```

Key values to capture:
- Site title template
- Meta description template
- Social media accounts
- Organization schema settings
- Knowledge graph settings

---

## Step 5: Extract Existing Redirects

### From SEOPress
```bash
wp option get seopress_can_post_redirect --format=json
```

### From Yoast Premium (if used)
```bash
wp option get wpseo-premium-redirects-base --format=json
```

### From 301 Redirects plugin
```bash
wp option list --search="*eps_redirect*" --format=csv
wp option list --search="*301*redirect*" --format=csv
```

---

## Step 6: Extract Form Plugin Data

### Forminator
```bash
# List all forms
wp post list --post_type=forminator_forms --fields=ID,post_title --format=csv

# Get form structure (for each form ID)
wp post get [FORM_ID] --field=post_content
```

### Contact Form 7 (if used)
```bash
wp post list --post_type=wpcf7_contact_form --fields=ID,post_title --format=csv
```

### Gravity Forms (if used)
```bash
wp option list --search="*gform*" --format=csv
```

---

## Step 7: Extract Site Identity Settings

```bash
# Basic site settings
wp option get blogname
wp option get blogdescription
wp option get admin_email
wp option get siteurl
wp option get home

# Logo/branding (varies by theme)
wp option get theme_mods_[theme_name] --format=json | grep -i logo
```

---

## Step 8: Extract Email/SMTP Settings

### Fluent SMTP
```bash
wp option get _fluentmail_connection_data --format=json
```

### WP Mail SMTP
```bash
wp option get wp_mail_smtp --format=json
```

Key values:
- SMTP host/port
- From email/name
- Authentication method

---

## Step 9: Create PLUGIN-INVENTORY.yaml

```yaml
# Plugin Inventory - [Site Name] WordPress → Next.js Migration
# Generated: [DATE]

summary:
  total_plugins: [NUMBER]
  active_plugins: [NUMBER]
  by_category:
    migrate_settings: [NUMBER]
    migrate_data: [NUMBER]
    not_needed: [NUMBER]
    security: [NUMBER]
    performance: [NUMBER]

# Plugin list with migration status
plugins:
  [plugin-slug]:
    name: "[Plugin Name]"
    status: active|inactive|must-use
    version: "[version]"
    category: migrate_settings|migrate_data|not_needed|security|performance
    migration_action: "[What to do]"
    settings_extracted: true|false
    notes: "[Any relevant notes]"

# Extracted settings by category
settings:
  analytics:
    google_analytics:
      measurement_id: "[G-XXXXXXXX]"
      property_id: "[number]"
      tracking_disabled: ["loggedinUsers"]
    clarity:
      site_id: "[uuid]"
    facebook_pixel:
      pixel_id: "[number or null]"

  seo:
    site_title_template: "[template]"
    meta_description_template: "[template]"
    separator: "[character]"
    organization:
      name: "[name]"
      logo: "[url]"
      phone: "[number]"

  social_accounts:
    facebook: "[url]"
    twitter: "[url]"
    instagram: "[url]"
    linkedin: "[url]"
    youtube: "[url]"

  redirects:
    existing_redirects:
      - from: "[old path]"
        to: "[new path]"
        type: 301|302

  forms:
    - id: [FORM_ID]
      name: "[Form Name]"
      fields: ["field1", "field2"]
      destination_email: "[email]"

  site_identity:
    site_name: "[name]"
    tagline: "[tagline]"
    admin_email: "[email]"

  email:
    smtp_host: "[host or null]"
    smtp_port: "[port or null]"
    from_email: "[email]"
    from_name: "[name]"
```

---

## Step 10: Document API Keys/Secrets

**IMPORTANT:** Never commit actual API keys to the repository. Document WHAT keys exist and WHERE they should be stored.

```yaml
secrets_needed:
  - name: "Google Analytics"
    env_var: "NEXT_PUBLIC_GA_MEASUREMENT_ID"
    source: "googlesitekit_analytics-4_settings"

  - name: "Microsoft Clarity"
    env_var: "NEXT_PUBLIC_CLARITY_PROJECT_ID"
    source: "clarity_wordpress_site_id"

  - name: "Resend API Key"
    env_var: "RESEND_API_KEY"
    source: "New - create in Resend dashboard"
```

---

## Quick Reference Commands

```bash
# List all active plugins
wp plugin list --status=active --format=csv

# Search for specific option
wp option list --search="*keyword*" --format=csv

# Get specific option as JSON
wp option get [option_name] --format=json

# List all options from a plugin
wp option list --search="*pluginname*" --format=csv

# Export all options (large!)
wp option list --format=json > all_options.json
```

---

## Checklist for Future Sites

```markdown
## Plugin Audit Checklist - [Site Name]

### Preparation
- [ ] SSH access verified
- [ ] WP-CLI working

### Plugin Inventory
- [ ] Complete plugin list extracted
- [ ] Plugins categorized by migration relevance
- [ ] Active plugin count documented

### Settings Extraction
- [ ] Analytics settings extracted (GA4, Clarity, FB Pixel)
- [ ] SEO plugin settings extracted
- [ ] Social accounts extracted
- [ ] Existing redirects documented
- [ ] Form configurations captured
- [ ] Site identity settings captured
- [ ] Email/SMTP settings documented

### Secrets Documentation
- [ ] API keys identified (not values, just what exists)
- [ ] Environment variables documented
- [ ] .env.example updated

### Documentation
- [ ] PLUGIN-INVENTORY.yaml created
- [ ] Settings validated
- [ ] YAML committed to repo

### Sign-off
- [ ] Reviewed by: __________
- [ ] Date: __________
```

---

## Common Plugin Mappings

| WordPress Plugin | Next.js Replacement |
|-----------------|---------------------|
| Google Site Kit | `@next/third-parties` or script in layout |
| Microsoft Clarity | Script in layout.tsx |
| SEOPress/Yoast | Next.js Metadata API |
| Contact Form 7/Forminator | Custom form + Resend API |
| 301 Redirects | next.config.ts redirects |
| WP Super Cache | Vercel Edge Network |
| Wordfence/Sucuri | Vercel security features |
| Elementor | React components |
| ACF | MDX frontmatter + Zod schemas |

---

## Related Documents

- `SEO-AUDIT-PROCESS.md` - SEO extraction process
- `IMAGE-AUDIT-PROCESS.md` - Image extraction process
- `PLUGIN-INVENTORY.yaml` - Output of this process
- `.env.example` - Environment variables template

---

*This process was developed during the Last Apple migration and refined for reuse across 10+ planned site migrations.*
