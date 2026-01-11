#!/bin/bash
# WordPress Export Script
# Edit SSH_HOST and WP_PATH before running

SSH_HOST="YOUR_SSH_USER@lastapple.com"
WP_PATH="/path/to/wordpress"
OUTPUT_DIR="./wp-export"

mkdir -p $OUTPUT_DIR

echo "Exporting WordPress content..."

# Site options (includes social, phone, settings)
echo "→ Exporting site options..."
ssh $SSH_HOST "cd $WP_PATH && wp option list --format=json" > $OUTPUT_DIR/options.json 2>/dev/null

# All pages with content
echo "→ Exporting pages..."
ssh $SSH_HOST "cd $WP_PATH && wp post list --post_type=page --fields=ID,post_title,post_name,post_content,post_excerpt --format=json" > $OUTPUT_DIR/pages.json 2>/dev/null

# All posts with content
echo "→ Exporting posts..."
ssh $SSH_HOST "cd $WP_PATH && wp post list --post_type=post --fields=ID,post_title,post_name,post_content,post_excerpt,post_date --format=json" > $OUTPUT_DIR/posts.json 2>/dev/null

# Navigation menus
echo "→ Exporting menus..."
ssh $SSH_HOST "cd $WP_PATH && wp menu list --format=json" > $OUTPUT_DIR/menus.json 2>/dev/null

# Media library
echo "→ Exporting media list..."
ssh $SSH_HOST "cd $WP_PATH && wp post list --post_type=attachment --fields=ID,post_title,guid --format=json" > $OUTPUT_DIR/media.json 2>/dev/null

echo ""
echo "Export complete!"
echo "Files saved to: $OUTPUT_DIR/"
echo ""
echo "Next: Give these JSON files to Claude and say:"
echo "  'Convert these WordPress exports to markdown files with frontmatter'"
