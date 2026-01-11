# HANDOFF DOCUMENT
## Complete Context for Continuation
### Created: January 9, 2026

---

# SECTION 1: WHO IS HANK / WHAT IS LAST APPLE

**Hank Groman** - Owner of Last Apple Business Solutions (lastapple.com)
- 30+ years system integration experience (contact centers, healthcare, payments)
- WordPress maintenance and business services
- Based in La Palma, CA
- Phone: 714-813-9973
- Email: hank@lastapple.com

---

# SECTION 2: ACTIVE PROJECTS STATUS

## Project 1: LinguaTech Call (HAPPENED TODAY - Jan 9, 2026)

**Client:** LinguaTech International - 40-year translation company, Dayton, Ohio
**Contact:** Anna-Maria Conte (co-owner with sister Marie-Pierre)
**Referral:** Brad Davis @ Millennium Systems (their hosting provider 20 years)
**Their issue:** Lost contact with Nova Creative (original developer) 6 years ago, need WordPress maintenance
**Our target:** WordPress Essentials @ $149/month

**Files in `01-LINGUATECH-CALL-PREP/`:**
- CALL-GUIDE.md - Scripts and call flow
- INTERNAL-CALL-BRIEF.md - Background intel (INTERNAL ONLY)
- CLIENT-PROPOSAL.md - Send after call
- EMAIL-TEMPLATE.md - Follow-up email template
- Meeting-Transcript-01.09.2026.md - (User opened this, call may have happened)

**Status:** Call was scheduled for 1:00-4:30 PM EST on Jan 9. Check transcript for outcome.

---

## Project 2: LastApple Pricing Update

**Summary:** Current pricing is 20-40% below market. Recommended increases:

| Plan | Current | Recommended |
|------|---------|-------------|
| WordPress Essentials | $149 | $199 |
| Growth Accelerator | $249 | $349 |
| Business Transformer | $499 | $699 |
| Enterprise AI | $999 | $1,299 |

**Files in `02-LASTAPPLE-MARKET-RESEARCH/`:**
- PRICING-STRATEGY-2026.md - Full market research and justification

**Status:** Update website AFTER LinguaTech closes (honor the $149 soft quote for them)

---

## Project 3: Website Updates

**Files in `03-WEBSITE-UPDATES/`:**
- WORK-ORDER.md - Complete checklist of pricing changes and 5 new pages to create

**New pages to create:**
1. AI Chatbot Pricing (/ai-chatbot-pricing/)
2. SEO Pricing (/seo-pricing/)
3. B2B Email List Pricing (/b2b-email-list-pricing/)
4. Data Integration Pricing (/data-integration-pricing/)
5. HubSpot Services Pricing (/hubspot-services-pricing/)

**Status:** Pending - do after pricing decision finalized

---

## Project 4: WordPress Git Integration (PIVOTING)

### Original Research
We researched a workflow from a Grok conversation about using Git for WordPress content versioning.

**Key findings:**
- DB Version Control plugin exports content to JSON
- GitHub Actions can deploy to SiteGround
- Limitation: WordPress FSE stores to database, not filesystem (two sources of truth)

**Files in `04-WORDPRESS-GIT-INTEGRATION/`:**
- RESEARCH-FINDINGS.md - Vetted research
- TESTING-CHECKLIST.md - Step-by-step test plan
- WORK-ORDER-TOMORROW.md - Original session plan
- grok-conversation-export.json - Original Grok chat
- setup/ folder - Scripts and configs (MAY BE OBSOLETE - see pivot below)

### THE PIVOT (January 9, 2026 evening)

**Discovery:** SiteGround has BUILT-IN Git integration. Instead of:
```
Local → GitHub → GitHub Actions → SiteGround
```

We can do:
```
Local ↔ SiteGround Git (direct push/pull)
```

**This is simpler.** No GitHub Actions needed. No deployment scripts. Push directly to SiteGround's Git repo.

---

# SECTION 3: SITEGROUND CREDENTIALS & INFO

## Git Repository (SiteGround Built-in)

**Git Clone Command:**
```
git clone ssh://u1559-ykeqmwqgcfxc@gcam1100.siteground.biz:18765/home/customer/www/scrapersky.com/public_html/
```

**Parsed:**
| Item | Value |
|------|-------|
| SSH Username | `u1559-ykeqmwqgcfxc` |
| SSH Host | `gcam1100.siteground.biz` |
| SSH Port | `18765` |
| Site Path | `/home/customer/www/scrapersky.com/public_html/` |
| Test Site | `scrapersky.com` |

**Files Excluded from Git (SiteGround defaults):**
```
wp-content/upgrade/*
wp-content/backup-db/*
wp-content/cache/*
wp-content/cache/supercache/*
wp-content/w3tc-cache/*
```

## SSH Key

**Public Key (added to SiteGround SSH Keys Manager):**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBNTTn60OnuGbNSjmVkCYgrQGTgtRxmNKRWMi4FS457w hank@lastapple.com
```

**Private Key Location:** User's machine, likely `~/.ssh/id_ed25519`

---

# SECTION 4: WHAT NEEDS TO HAPPEN NEXT

## Immediate (Tonight/Tomorrow Morning)

1. **Test SSH connection:**
   ```bash
   ssh -p 18765 u1559-ykeqmwqgcfxc@gcam1100.siteground.biz
   ```
   If this works, SSH is properly configured.

2. **Clone the SiteGround Git repo locally:**
   ```bash
   cd ~/development  # or wherever
   git clone ssh://u1559-ykeqmwqgcfxc@gcam1100.siteground.biz:18765/home/customer/www/scrapersky.com/public_html/ scrapersky-wp
   ```

3. **Verify clone worked:**
   ```bash
   cd scrapersky-wp
   ls -la
   git status
   git log --oneline -5
   ```

## Once Git is Working

4. **Install DB Version Control plugin** (if testing content versioning)
   - Either via WP Admin
   - Or clone into wp-content/plugins/ and activate via WP-CLI

5. **Test the workflow:**
   - Make change in WordPress
   - See if it reflects in Git
   - Make change in Git, push
   - See if site updates

## Decision Point

The SiteGround Git approach may eliminate need for:
- GitHub as intermediary
- GitHub Actions deployment
- Complex MCP server setup

**Question to resolve:** Does SiteGround Git give us everything we need, or do we still want GitHub in the middle for:
- Backup/redundancy
- Pull request workflow
- GitHub mobile editing

---

# SECTION 5: FILE STRUCTURE

```
/Users/henrygroman/development/python-projects/lastapple.com/
├── README.md                           # Overview
├── TOMORROW-SESSION-PREP.md            # Original prep doc
├── HANDOFF-DOCUMENT.md                 # THIS FILE
│
├── 01-LINGUATECH-CALL-PREP/            # Client call materials
│   ├── CALL-GUIDE.md
│   ├── INTERNAL-CALL-BRIEF.md
│   ├── CLIENT-PROPOSAL.md
│   ├── EMAIL-TEMPLATE.md
│   └── Meeting-Transcript-01.09.2026.md
│
├── 02-LASTAPPLE-MARKET-RESEARCH/
│   └── PRICING-STRATEGY-2026.md
│
├── 03-WEBSITE-UPDATES/
│   └── WORK-ORDER.md
│
├── 04-WORDPRESS-GIT-INTEGRATION/
│   ├── RESEARCH-FINDINGS.md
│   ├── TESTING-CHECKLIST.md
│   ├── WORK-ORDER-TOMORROW.md
│   ├── grok-conversation-export.json
│   └── setup/
│       ├── .env.template
│       ├── mcp-config.json
│       ├── setup.sh
│       ├── deploy-to-wordpress.yml    # May be obsolete with SiteGround Git
│       └── testing-workflow.yml
│
└── _ARCHIVE-ORIGINAL-FILES/            # Original scattered docs
```

---

# SECTION 6: CONTEXT RESTORATION PROMPT

**Copy this to start a new session:**

```
I'm Hank Groman, owner of Last Apple Business Solutions.

Read the file /Users/henrygroman/development/python-projects/lastapple.com/HANDOFF-DOCUMENT.md for full context on:
- LinguaTech client call (check if transcript exists for outcome)
- Pricing update project
- Website updates needed
- WordPress Git integration project (PIVOTING to use SiteGround's built-in Git)

Key info for today:
- SiteGround Git clone: ssh://u1559-ykeqmwqgcfxc@gcam1100.siteground.biz:18765/home/customer/www/scrapersky.com/public_html/
- SSH public key already added to SiteGround
- Test site: scrapersky.com

Where we left off: [FILL IN BASED ON WHERE YOU ARE]
```

---

# SECTION 7: OPEN QUESTIONS

1. **Did the LinguaTech call happen? What was the outcome?**
   - Check Meeting-Transcript-01.09.2026.md

2. **SSH working?**
   - Test: `ssh -p 18765 u1559-ykeqmwqgcfxc@gcam1100.siteground.biz`

3. **Do we still need GitHub in the workflow?**
   - Or is SiteGround Git sufficient?

4. **What about the DB Version Control plugin?**
   - Still relevant for content-as-JSON versioning
   - Or do we just version the theme/plugin files?

5. **MCP servers - still needed?**
   - SSH MCP could still help for remote commands
   - GitHub MCP may be unnecessary if not using GitHub

---

**END OF HANDOFF DOCUMENT**

*Last updated: January 9, 2026, ~11:15 PM*
