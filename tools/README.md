# Tools

Reusable utilities for site migrations and content management.

---

## wp-harvest.sh

**WordPress Media Asset Extractor**

Harvests media files from WordPress sites for migration to new platforms.

### Usage

```bash
# From URL list (most reliable)
./wp-harvest.sh --from-list media-urls.txt ./public/images/wp

# Via SSH + WP-CLI (requires access)
./wp-harvest.sh --ssh user@host /path/to/wordpress ./output

# Scrape public uploads (hit or miss)
./wp-harvest.sh https://example.com ./output
```

### Modes

| Mode | Command | Best For |
|------|---------|----------|
| URL List | `--from-list <file>` | Pre-exported URL lists |
| SSH | `--ssh <host> <path>` | Full access to WP server |
| Scrape | `<site-url>` | Public sites (limited) |

### Example Workflow

```bash
# 1. Export URLs via WP-CLI on server
wp post list --post_type=attachment --field=guid > media-urls.txt

# 2. Download locally
./tools/wp-harvest.sh --from-list media-urls.txt ./public/images/wp

# 3. Verify
ls -la ./public/images/wp/
```

---

## Future Tools

Ideas for additional utilities:

- `ai-rename.sh` — Batch rename files using AI vision analysis
- `mdx-convert.sh` — Convert WordPress HTML exports to MDX
- `link-check.sh` — Verify all internal links in content files
