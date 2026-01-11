#!/bin/bash

# WordPress Git Integration - Setup Script
# Run this after filling in your credentials below

set -e  # Exit on error

echo "=========================================="
echo "WordPress Git Integration Setup"
echo "=========================================="
echo ""

# ============================================
# FILL IN YOUR CREDENTIALS BELOW
# ============================================

# SiteGround SSH
export SITEGROUND_HOST=""          # e.g., us123.siteground.us
export SITEGROUND_USER=""          # e.g., u123-abcdefgh
export SITEGROUND_SITE=""          # e.g., lastapple.com
export SSH_KEY_PATH=""             # e.g., ~/.ssh/siteground_key

# GitHub
export GITHUB_PAT=""               # Your Personal Access Token
export GITHUB_USER=""              # Your GitHub username

# WordPress
export WP_SITE_URL=""              # e.g., https://staging.lastapple.com
export WP_ADMIN_USER=""            # WordPress admin username
export WP_APP_PASSWORD=""          # WordPress Application Password

# ============================================
# VALIDATION
# ============================================

echo "Validating credentials..."

if [ -z "$SITEGROUND_HOST" ]; then
    echo "❌ ERROR: SITEGROUND_HOST not set"
    exit 1
fi

if [ -z "$SITEGROUND_USER" ]; then
    echo "❌ ERROR: SITEGROUND_USER not set"
    exit 1
fi

if [ -z "$GITHUB_PAT" ]; then
    echo "❌ ERROR: GITHUB_PAT not set"
    exit 1
fi

if [ -z "$WP_SITE_URL" ]; then
    echo "❌ ERROR: WP_SITE_URL not set"
    exit 1
fi

if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "❌ ERROR: SSH key file not found at $SSH_KEY_PATH"
    exit 1
fi

echo "✅ All credentials present"
echo ""

# ============================================
# PHASE 1: Prerequisites Check
# ============================================

echo "Checking prerequisites..."

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git not installed"
    exit 1
fi
echo "✅ Git: $(git --version)"

# Check Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed"
    exit 1
fi
echo "✅ Node: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not installed"
    exit 1
fi
echo "✅ npm: $(npm --version)"

# Check Claude
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code not installed"
    exit 1
fi
echo "✅ Claude: $(claude --version 2>/dev/null || echo 'installed')"

echo ""

# ============================================
# PHASE 2: SSH Key Setup
# ============================================

echo "Setting up SSH key permissions..."
chmod 600 "$SSH_KEY_PATH"
echo "✅ SSH key permissions set"

# Test SSH connection
echo "Testing SSH connection to SiteGround..."
if ssh -p 18765 -i "$SSH_KEY_PATH" -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new \
    "$SITEGROUND_USER@$SITEGROUND_HOST" "echo 'SSH connection successful'" 2>/dev/null; then
    echo "✅ SSH connection works"
else
    echo "❌ SSH connection failed"
    echo "   Please verify:"
    echo "   - SSH key is added to SiteGround"
    echo "   - Host and username are correct"
    echo "   - Port 18765 is not blocked"
    exit 1
fi

echo ""

# ============================================
# PHASE 3: MCP Server Installation
# ============================================

echo "Installing MCP servers..."

# GitHub MCP
echo "Installing GitHub MCP server..."
claude mcp add github -s user -- npx -y @modelcontextprotocol/server-github 2>/dev/null || true
echo "✅ GitHub MCP configured"

# SSH MCP
echo "Installing SSH MCP server..."
claude mcp add ssh -s user -- npx -y ssh-mcp 2>/dev/null || true
echo "✅ SSH MCP configured"

# WordPress MCP
echo "Installing WordPress MCP server..."
claude mcp add wordpress -s user -- npx -y @instawp/mcp-wp 2>/dev/null || true
echo "✅ WordPress MCP configured"

echo ""

# ============================================
# PHASE 4: Environment File
# ============================================

echo "Creating environment file..."

ENV_FILE="$HOME/.wp-git-integration.env"

cat > "$ENV_FILE" << EOF
# WordPress Git Integration Environment
# Generated: $(date)

# SiteGround SSH
export SITEGROUND_HOST="$SITEGROUND_HOST"
export SITEGROUND_USER="$SITEGROUND_USER"
export SITEGROUND_SITE="$SITEGROUND_SITE"
export SSH_KEY_PATH="$SSH_KEY_PATH"
export SSH_PORT="18765"

# GitHub
export GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_PAT"
export GITHUB_USER="$GITHUB_USER"

# WordPress
export WP_URL="$WP_SITE_URL"
export WP_USER="$WP_ADMIN_USER"
export WP_APP_PASSWORD="$WP_APP_PASSWORD"

# Derived paths
export WP_PATH="/home/$SITEGROUND_USER/www/$SITEGROUND_SITE/public_html"
export SYNC_PATH="\$WP_PATH/wp-content/plugins/db-version-control/sync"
EOF

chmod 600 "$ENV_FILE"
echo "✅ Environment file created at $ENV_FILE"

echo ""

# ============================================
# PHASE 5: Test WP-CLI
# ============================================

echo "Testing WP-CLI on remote server..."

WP_PATH="/home/$SITEGROUND_USER/www/$SITEGROUND_SITE/public_html"

SITE_NAME=$(ssh -p 18765 -i "$SSH_KEY_PATH" \
    "$SITEGROUND_USER@$SITEGROUND_HOST" \
    "cd $WP_PATH && wp option get blogname" 2>/dev/null)

if [ -n "$SITE_NAME" ]; then
    echo "✅ WP-CLI works - Site name: $SITE_NAME"
else
    echo "❌ WP-CLI test failed"
    echo "   Please verify WordPress path: $WP_PATH"
fi

echo ""

# ============================================
# SUMMARY
# ============================================

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Environment file: $ENV_FILE"
echo "To load: source $ENV_FILE"
echo ""
echo "Next steps:"
echo "1. Start Claude Code: claude"
echo "2. Paste the context restoration prompt"
echo "3. Begin Phase 2: WordPress Plugin Setup"
echo ""
echo "Quick SSH command:"
echo "ssh -p 18765 -i $SSH_KEY_PATH $SITEGROUND_USER@$SITEGROUND_HOST"
echo ""
echo "=========================================="
