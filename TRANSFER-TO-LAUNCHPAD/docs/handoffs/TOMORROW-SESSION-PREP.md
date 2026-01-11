# Tomorrow's Session Prep
## January 10, 2026 - WordPress Git Integration Testing

---

## PART 1: WHAT I NEED FROM YOU

### SiteGround SSH Access

| Item | Your Value | Where to Find |
|------|------------|---------------|
| SSH Host | _______________ | Site Tools → Devs → SSH Keys Manager |
| SSH Username | _______________ | Same location (starts with u123-) |
| SSH Port | `18765` | Always this for SiteGround |
| SSH Private Key | (paste below) | Generate or download from SSH Keys Manager |
| Site Path | _______________ | Usually `/home/[user]/www/[site]/public_html/` |

**Private Key (paste here or provide securely):**
```
-----BEGIN RSA PRIVATE KEY-----
[Your key content here]
-----END RSA PRIVATE KEY-----
```

---

### GitHub Access

| Item | Your Value | Where to Find |
|------|------------|---------------|
| GitHub Username | _______________ | Your account |
| Personal Access Token | _______________ | Settings → Developer Settings → PAT (classic) |
| Test Repo Name | _______________ | Suggest: `wp-git-integration-test` |

**To create PAT tonight:**
1. Go to: github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Claude MCP Access"
4. Scopes: Check `repo` (full control of private repos)
5. Generate and copy immediately

---

### WordPress Test Site

| Item | Your Value | Notes |
|------|------------|-------|
| Site URL | _______________ | Use staging, NOT production |
| WP Admin Username | _______________ | Full admin access needed |
| WP App Password | _______________ | Generate in Users → Profile → Application Passwords |
| WordPress Version | _______________ | Run `wp core version` or check dashboard |
| PHP Version | _______________ | Site Tools → Devs → PHP Manager |

**To create App Password:**
1. WP Admin → Users → Your Profile
2. Scroll to "Application Passwords"
3. Name: "Claude MCP"
4. Click "Add New"
5. Copy the password (spaces are normal, include them)

---

### Local Environment Verification

Run these commands tonight and note the output:

```bash
# Git version
git --version
# Output: _______________

# Node version (needed for MCP servers)
node --version
# Output: _______________

# npm version
npm --version
# Output: _______________

# Claude Code version
claude --version
# Output: _______________
```

---

### Your Answers Needed

**1. Which test site will we use?**
- [ ] SiteGround staging site
- [ ] LocalWP on my machine
- [ ] Other: _______________

**2. What time works tomorrow?**
- [ ] Morning - Start time: _______________
- [ ] Afternoon - Start time: _______________
- [ ] Flexible

**3. SSH Key:**
- [ ] I'll generate new in SiteGround tonight
- [ ] I have an existing key to use

**4. Risk tolerance:**
- [ ] Test/staging site only (recommended)
- [ ] OK to test on a secondary real site

---

## PART 2: CONTEXT RESTORATION PROMPT

**Copy and paste this entire section at the start of tomorrow's session to restore full context:**

---

### CONTEXT RESTORATION PROMPT FOR CLAUDE

```
I'm Hank Groman, owner of Last Apple Business Solutions (lastapple.com). We had an extensive session yesterday (January 9, 2026) and I need you to restore context for today's work.

## ACTIVE PROJECTS IN THIS REPO

This repo (/Users/henrygroman/development/python-projects/lastapple.com) contains organized business documents:

### 1. LinguaTech Call Prep (COMPLETED YESTERDAY - CALL IS TODAY)
- Folder: `01-LINGUATECH-CALL-PREP/`
- LinguaTech International is a 40-year translation company in Dayton, Ohio
- Contact: Anna-Maria Conte (co-owner with sister Marie-Pierre)
- Referral from Brad Davis @ Millennium Systems (their hosting provider for 20 years)
- They lost contact with Nova Creative (original developer) 6 years ago
- Need WordPress maintenance - targeting $149/month Essentials plan
- Call window: 1:00-4:30 PM EST today
- Files ready: CALL-GUIDE.md, INTERNAL-CALL-BRIEF.md, CLIENT-PROPOSAL.md, EMAIL-TEMPLATE.md

### 2. LastApple Market Research (INTERNAL)
- Folder: `02-LASTAPPLE-MARKET-RESEARCH/`
- Current pricing is 20-40% below market
- Recommended new pricing:
  - Essentials: $149 → $199
  - Growth: $249 → $349
  - Business: $499 → $699
  - Enterprise: $999 → $1,299
- Website updates needed after LinguaTech call

### 3. Website Updates Work Order
- Folder: `03-WEBSITE-UPDATES/`
- Update existing pricing pages
- Create 5 new pricing pages (Chatbot, SEO, B2B Lists, Data Integration, HubSpot)
- Full checklist in WORK-ORDER.md

### 4. WordPress Git Integration (TODAY'S FOCUS)
- Folder: `04-WORDPRESS-GIT-INTEGRATION/`
- We researched a workflow from a Grok conversation about Git + WordPress
- Key finding: The concept is viable but more complex than originally described
- Main tool: DB Version Control plugin (exports content to JSON)
- GitHub Actions can deploy to SiteGround (port 18765, `wp sg purge` for cache)
- Known limitation: WordPress FSE stores to database, not filesystem (two sources of truth problem)
- Today we're testing this workflow on myself before offering to clients

## TODAY'S MISSION: WordPress Git Integration Testing

We have a detailed work order in `04-WORDPRESS-GIT-INTEGRATION/WORK-ORDER-TOMORROW.md`

### MCP Servers to Install:
1. **GitHub MCP** - Direct repo control
2. **SSH MCP** - Remote server commands (tufantunc/ssh-mcp)
3. **WordPress MCP** - Direct WP control (@instawp/mcp-wp)

### 5-Hour Plan:
- Hour 1: Install & test MCP servers
- Hour 2: Install DB Version Control plugin, test export
- Hour 3: GitHub integration, push/pull workflow
- Hour 4: GitHub Actions deployment pipeline
- Hour 5: Mobile/voice test, document results

### Success Criteria:
- MCP servers working (GitHub, SSH, WordPress)
- Content exports to JSON automatically
- Git tracks content changes
- Push triggers deployment to SiteGround
- Site updates within 5 minutes of push
- Can edit from mobile via GitHub app

### Key Technical Details:
- SiteGround SSH Port: 18765
- SiteGround cache clear: `wp sg purge`
- DB Version Control WP-CLI: `wp dbvc export`, `wp dbvc import`
- Path structure: `/home/[user]/www/[site]/public_html/`

## CREDENTIALS I'M PROVIDING:
[I will paste credentials below this prompt]

## WHAT I NEED FROM YOU:
1. Read the existing files in 04-WORDPRESS-GIT-INTEGRATION/ to refresh on research
2. Help me install and configure the MCP servers
3. Walk through the testing checklist systematically
4. Document findings as we go
5. Update the research docs with real-world results

Let's begin by confirming you understand the context, then we'll start with MCP server installation.
```

---

## PART 3: FILE STRUCTURE REFERENCE

```
lastapple.com/
├── README.md                           # Overview of all folders
├── TOMORROW-SESSION-PREP.md            # This file
│
├── 01-LINGUATECH-CALL-PREP/            # Today's call (Jan 9)
│   ├── CALL-GUIDE.md                   # Scripts and flow
│   ├── INTERNAL-CALL-BRIEF.md          # Background intel
│   ├── CLIENT-PROPOSAL.md              # Send after call
│   └── EMAIL-TEMPLATE.md               # Follow-up email
│
├── 02-LASTAPPLE-MARKET-RESEARCH/       # Internal strategy
│   └── PRICING-STRATEGY-2026.md        # Full pricing analysis
│
├── 03-WEBSITE-UPDATES/                 # Post-call implementation
│   └── WORK-ORDER.md                   # Website changes checklist
│
├── 04-WORDPRESS-GIT-INTEGRATION/       # Tomorrow's focus
│   ├── RESEARCH-FINDINGS.md            # Vetted research
│   ├── TESTING-CHECKLIST.md            # Step-by-step test plan
│   ├── WORK-ORDER-TOMORROW.md          # Session plan + MCP setup
│   └── grok-conversation-export.json   # Original Grok chat
│
└── _ARCHIVE-ORIGINAL-FILES/            # Old scattered docs
```

---

## PART 4: QUICK REFERENCE FOR TOMORROW

### MCP Install Commands (Run These First)

```bash
# GitHub MCP Server
claude mcp add github -s user -- npx -y @modelcontextprotocol/server-github

# SSH MCP Server
claude mcp add ssh -s user -- npx -y ssh-mcp

# WordPress MCP Server
claude mcp add wordpress -s user -- npx -y @instawp/mcp-wp
```

### Environment Variables to Set

```bash
# GitHub
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token"

# SiteGround SSH
export SSH_HOST="your_host.siteground.us"
export SSH_USER="u123-username"
export SSH_PORT="18765"
export SSH_PRIVATE_KEY_PATH="/path/to/key"

# WordPress
export WP_URL="https://your-test-site.com"
export WP_USER="admin"
export WP_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

### Key Commands We'll Use

```bash
# Test SSH connection
ssh -p 18765 user@host "wp --info"

# Test WP-CLI
wp post list --ssh=user@host:18765/path/to/wp

# DB Version Control
wp dbvc export
wp dbvc import
wp dbvc export --batch-size=50

# SiteGround cache
wp sg purge
```

---

## PART 5: TONIGHT'S CHECKLIST

Before you close out tonight:

- [ ] Generate GitHub PAT (if don't have one)
- [ ] Generate/download SiteGround SSH private key
- [ ] Create WordPress Application Password
- [ ] Decide which test site to use
- [ ] Run the verification commands (git, node, npm, claude versions)
- [ ] Fill in the credential blanks above
- [ ] Note what time you want to start tomorrow

---

## PART 6: HOW TO START TOMORROW

1. **Open Claude Code in this directory:**
   ```bash
   cd /Users/henrygroman/development/python-projects/lastapple.com
   claude
   ```

2. **Paste the Context Restoration Prompt** (Part 2 above)

3. **Paste your credentials** (filled-in Part 1 above)

4. **Say:** "Let's begin with MCP server installation"

---

## NOTES / QUESTIONS FOR TOMORROW

(Add any notes here tonight)

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________

---

**Good luck with the LinguaTech call today! Update this doc with how it went, then we'll dive into the Git integration tomorrow.**
