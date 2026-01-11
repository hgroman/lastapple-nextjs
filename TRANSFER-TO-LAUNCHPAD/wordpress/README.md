# WordPress CLI Access

## Quick Reference

**Already Extracted (in content/):**
- `contact-info.json` - Phone, email, social links
- 35 page exports in `docs/03-reference/wordpress-exports/page/`
- Menu structure in `docs/03-reference/wordpress-exports/menus.json`

**Media (49 images):**
- Full URL list: `wordpress/media-urls.txt`
- Download script: `./wordpress/download-media.sh`

## Setup

You need SSH access to your WordPress server. Once connected, WP-CLI lets you pull anything.

### 1. Test SSH Connection

```bash
ssh user@lastapple.com
```

If this works, you're good. If not, set up SSH keys.

### 2. Test WP-CLI

```bash
ssh user@lastapple.com "cd /path/to/wordpress && wp --info"
```

Replace `/path/to/wordpress` with your actual WordPress directory (usually `public_html` or `www`).

## Pull Commands

### Get Site Info (phone, social, etc.)

```bash
# Get all options (includes phone, social, site title, etc.)
ssh user@lastapple.com "cd /path/to/wordpress && wp option get siteurl"
ssh user@lastapple.com "cd /path/to/wordpress && wp option list --search='*phone*' --format=json"
ssh user@lastapple.com "cd /path/to/wordpress && wp option list --search='*social*' --format=json"

# If using a theme options framework (like theme_mods)
ssh user@lastapple.com "cd /path/to/wordpress && wp option get theme_mods_yourtheme --format=json"
```

### Export All Pages

```bash
# List all pages
ssh user@lastapple.com "cd /path/to/wordpress && wp post list --post_type=page --format=json" > pages.json

# Export single page content
ssh user@lastapple.com "cd /path/to/wordpress && wp post get 123 --format=json" > page-123.json

# Export all pages with content
ssh user@lastapple.com "cd /path/to/wordpress && wp post list --post_type=page --fields=ID,post_title,post_name,post_content --format=json" > all-pages.json
```

### Export All Posts

```bash
ssh user@lastapple.com "cd /path/to/wordpress && wp post list --post_type=post --fields=ID,post_title,post_name,post_content,post_date --format=json" > all-posts.json
```

### Get Menu Structure

```bash
ssh user@lastapple.com "cd /path/to/wordpress && wp menu list --format=json"
ssh user@lastapple.com "cd /path/to/wordpress && wp menu item list primary-menu --format=json"
```

### Get Custom Fields (ACF, etc.)

```bash
ssh user@lastapple.com "cd /path/to/wordpress && wp post meta list 123 --format=json"
```

## One-Shot Export Script

Run this to export everything at once:

```bash
#!/bin/bash
# export-wordpress.sh

SSH_HOST="user@lastapple.com"
WP_PATH="/path/to/wordpress"
OUTPUT_DIR="./wp-export"

mkdir -p $OUTPUT_DIR

# Site options
ssh $SSH_HOST "cd $WP_PATH && wp option list --format=json" > $OUTPUT_DIR/options.json

# All pages
ssh $SSH_HOST "cd $WP_PATH && wp post list --post_type=page --fields=ID,post_title,post_name,post_content,post_excerpt --format=json" > $OUTPUT_DIR/pages.json

# All posts
ssh $SSH_HOST "cd $WP_PATH && wp post list --post_type=post --fields=ID,post_title,post_name,post_content,post_excerpt,post_date --format=json" > $OUTPUT_DIR/posts.json

# Menus
ssh $SSH_HOST "cd $WP_PATH && wp menu list --format=json" > $OUTPUT_DIR/menus.json

echo "Export complete. Check $OUTPUT_DIR/"
```

## Converting to Markdown

Once you have the JSON exports, convert to markdown:

```bash
# Quick conversion (Claude can do this)
# Give Claude the pages.json and say:
# "Convert each page to a markdown file with frontmatter"
```

## Need Specific Data?

Just ask Claude:
- "SSH into WordPress and get the phone number"
- "Pull the About page content"
- "Export all service pages to markdown"

Claude will construct the right WP-CLI command.
