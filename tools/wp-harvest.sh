#!/bin/bash
#
# wp-harvest.sh — Harvest media assets from WordPress sites
#
# Usage:
#   ./wp-harvest.sh <site-url> [output-dir]
#
# Examples:
#   ./wp-harvest.sh https://example.com
#   ./wp-harvest.sh https://example.com ./public/images/legacy
#
# What it does:
#   1. Connects via SSH (if credentials provided) or scrapes public uploads
#   2. Downloads all media from /wp-content/uploads/
#   3. Preserves original filenames for migration compatibility
#
# Requirements:
#   - curl
#   - SSH access (optional, for private media)
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║           🍎 WP-HARVEST                  ║"
echo "║     WordPress Media Asset Extractor      ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

# Check arguments
if [ -z "$1" ]; then
    echo -e "${RED}Error: Site URL required${NC}"
    echo ""
    echo "Usage: ./wp-harvest.sh <site-url> [output-dir]"
    echo ""
    echo "Examples:"
    echo "  ./wp-harvest.sh https://lastapple.com"
    echo "  ./wp-harvest.sh https://example.com ./public/images/wp"
    exit 1
fi

SITE_URL="${1%/}"  # Remove trailing slash
OUTPUT_DIR="${2:-./wp-media}"
URLS_FILE="$OUTPUT_DIR/media-urls.txt"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo -e "${YELLOW}Site:${NC} $SITE_URL"
echo -e "${YELLOW}Output:${NC} $OUTPUT_DIR"
echo ""

# ============================================
# MODE 1: Download from URL list file
# ============================================
download_from_list() {
    local list_file="$1"
    local count=0
    local total=$(wc -l < "$list_file" | tr -d ' ')

    echo -e "${BLUE}Downloading $total files...${NC}"
    echo ""

    while IFS= read -r url; do
        if [ -n "$url" ]; then
            count=$((count + 1))
            filename=$(basename "$url")
            printf "[%3d/%3d] %s\n" "$count" "$total" "$filename"
            curl -sS -o "$OUTPUT_DIR/$filename" "$url" 2>/dev/null || echo -e "${RED}  Failed: $url${NC}"
        fi
    done < "$list_file"

    echo ""
    echo -e "${GREEN}Downloaded $count files to $OUTPUT_DIR/${NC}"
}

# ============================================
# MODE 2: SSH + WP-CLI extraction
# ============================================
extract_via_ssh() {
    local ssh_host="$1"
    local wp_path="$2"

    echo -e "${BLUE}Connecting via SSH...${NC}"

    # Get all attachment URLs
    ssh "$ssh_host" "cd $wp_path && wp post list --post_type=attachment --field=guid" > "$URLS_FILE"

    echo -e "${GREEN}Found $(wc -l < "$URLS_FILE" | tr -d ' ') media files${NC}"

    download_from_list "$URLS_FILE"
}

# ============================================
# MODE 3: Scrape public uploads directory
# ============================================
scrape_uploads() {
    echo -e "${YELLOW}Scraping public uploads directory...${NC}"
    echo -e "${YELLOW}(This finds publicly accessible images only)${NC}"
    echo ""

    # Common upload paths to check
    UPLOAD_PATHS=(
        "/wp-content/uploads/"
    )

    # Try to get directory listing (works on some servers)
    for path in "${UPLOAD_PATHS[@]}"; do
        url="${SITE_URL}${path}"
        echo "Checking: $url"

        # Attempt to get image URLs from the page
        curl -sS "$url" 2>/dev/null | grep -oE 'href="[^"]+\.(jpg|jpeg|png|gif|svg|webp)"' | sed 's/href="//;s/"$//' >> "$URLS_FILE.tmp" || true
    done

    if [ -f "$URLS_FILE.tmp" ] && [ -s "$URLS_FILE.tmp" ]; then
        # Make URLs absolute
        while IFS= read -r path; do
            if [[ "$path" == http* ]]; then
                echo "$path"
            else
                echo "${SITE_URL}${path}"
            fi
        done < "$URLS_FILE.tmp" | sort -u > "$URLS_FILE"
        rm "$URLS_FILE.tmp"

        download_from_list "$URLS_FILE"
    else
        echo -e "${RED}Could not scrape uploads directory.${NC}"
        echo ""
        echo "Try one of these approaches instead:"
        echo ""
        echo "1. Create a media-urls.txt file with image URLs, then run:"
        echo "   ./wp-harvest.sh --from-list media-urls.txt $OUTPUT_DIR"
        echo ""
        echo "2. Use SSH mode with WP-CLI:"
        echo "   ./wp-harvest.sh --ssh user@host /path/to/wordpress $OUTPUT_DIR"
        echo ""
        rm -f "$URLS_FILE.tmp"
        exit 1
    fi
}

# ============================================
# Parse arguments and run
# ============================================

case "$1" in
    --from-list)
        if [ -z "$2" ]; then
            echo -e "${RED}Error: URL list file required${NC}"
            echo "Usage: ./wp-harvest.sh --from-list <urls-file> [output-dir]"
            exit 1
        fi
        OUTPUT_DIR="${3:-./wp-media}"
        mkdir -p "$OUTPUT_DIR"
        download_from_list "$2"
        ;;
    --ssh)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${RED}Error: SSH host and WordPress path required${NC}"
            echo "Usage: ./wp-harvest.sh --ssh <user@host> <wp-path> [output-dir]"
            exit 1
        fi
        OUTPUT_DIR="${4:-./wp-media}"
        mkdir -p "$OUTPUT_DIR"
        extract_via_ssh "$2" "$3"
        ;;
    http*|https*)
        scrape_uploads
        ;;
    *)
        echo -e "${RED}Error: Invalid argument${NC}"
        echo ""
        echo "Usage:"
        echo "  ./wp-harvest.sh <site-url>                    # Scrape public uploads"
        echo "  ./wp-harvest.sh --from-list <file> [dir]      # Download from URL list"
        echo "  ./wp-harvest.sh --ssh <host> <path> [dir]     # Extract via SSH + WP-CLI"
        exit 1
        ;;
esac

# Summary
echo ""
echo -e "${BLUE}────────────────────────────────────────────${NC}"
echo -e "${GREEN}Harvest complete!${NC}"
echo ""
echo "Files saved to: $OUTPUT_DIR/"
echo "Total files: $(ls -1 "$OUTPUT_DIR" | wc -l | tr -d ' ')"
echo "Total size: $(du -sh "$OUTPUT_DIR" | cut -f1)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review downloaded files"
echo "2. Move to public/images/ in your project"
echo "3. Update content references as needed"
echo -e "${BLUE}────────────────────────────────────────────${NC}"
