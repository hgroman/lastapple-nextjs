# WordPress Git Integration Research
## Vetted Findings - January 2026

---

## EXECUTIVE SUMMARY

**Verdict: The Grok workflow is PARTIALLY viable, but has significant caveats.**

The concept works, but the implementation is more complex than described. There are real tools, but the "30 lines of PHP" claim understates the complexity.

---

## WHAT'S REAL (Verified)

### 1. DB Version Control Plugin
**Status: REAL and MAINTAINED**

- **GitHub:** [WebDevStudios/db-version-control](https://github.com/robertdevore/db-version-control)
- **Author:** Robert DeVore (WebDevStudios)
- **Requirements:** WordPress 5.0+, PHP 7.4+

**What it actually does:**
- Exports posts, pages, options, menus to JSON files
- Auto-exports on content save/update
- WP-CLI integration: `wp dbvc export`, `wp dbvc import`
- Batch processing for large sites
- Tested with 395+ posts successfully

**Folder structure created:**
```
sync/
├── options.json
├── menus.json
├── post/
│   ├── post-1.json
│   └── post-2.json
├── page/
│   ├── about.json
│   └── contact.json
└── product/  (if WooCommerce)
```

**This is the closest thing to what Grok described.**

---

### 2. Create Block Theme Plugin
**Status: REAL - Official WordPress Plugin**

- **URL:** [wordpress.org/plugins/create-block-theme](https://wordpress.org/plugins/create-block-theme/)
- **GitHub:** [WordPress/create-block-theme](https://github.com/WordPress/create-block-theme)
- **Maintainer:** WordPress Core Team

**What it does:**
- Exports FSE templates, patterns, styles to theme files
- Creates ZIP exports of entire themes
- Can save changes directly to theme files

**Limitations:**
- Not automatic - requires manual "Save to Theme" action
- Patterns from Site Editor don't auto-export to theme
- PHP in patterns breaks Site Editor editing
- Not designed for content versioning (themes only)

---

### 3. GitHub Actions → SiteGround Deployment
**Status: VERIFIED WORKING**

**Working YAML workflow:**
```yaml
name: Deploy to SiteGround
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Add server to known_hosts
        run: ssh-keyscan -p 18765 -H ${{ secrets.SITEGROUND_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy via rsync
        run: |
          rsync -avz --delete \
            -e "ssh -p 18765" \
            ./wp-content/ \
            ${{ secrets.SITEGROUND_USER }}@${{ secrets.SITEGROUND_HOST }}:/home/${{ secrets.SITEGROUND_USER }}/www/${{ secrets.SITEGROUND_SITE }}/public_html/wp-content/

      - name: Clear cache via WP-CLI
        run: |
          ssh -p 18765 ${{ secrets.SITEGROUND_USER }}@${{ secrets.SITEGROUND_HOST }} \
            "wp --path=/home/${{ secrets.SITEGROUND_USER }}/www/${{ secrets.SITEGROUND_SITE }}/public_html cache flush && wp sg purge"
```

**SiteGround-specific:**
- SSH Port: **18765** (non-standard)
- WP-CLI cache clear: `wp sg purge`
- Path structure: `/home/[user]/www/[site]/public_html/`

---

## WHAT'S PROBLEMATIC

### The Database vs. Filesystem Conflict

**The Core Problem:**
WordPress FSE stores template/pattern changes in the **database**, not the filesystem. This creates a "two sources of truth" problem that breaks clean Git workflows.

**What this means:**
- Client edits in Site Editor → saved to database
- Developer edits in Git → saved to filesystem
- **They don't automatically sync**

**Brian Coords (WordPress developer) on this:**
> "The site editor professional DEV workflow is broken... there might be two sources of truth: the filesystem and the database."

Source: [briancoords.com](https://www.briancoords.com/thoughts-on-version-control-for-block-themes/)

---

### Pattern Export Limitations

- Patterns created in Site Editor **don't export to theme**
- PHP in patterns (for dynamic URLs, dates) breaks Site Editor
- Widget settings not included in exports
- Manual export process required after each change

---

### The Grok Workflow Gaps

**What Grok said:** "A mini-plugin—maybe thirty lines—that listens when Josh hits update"

**Reality:** The DB Version Control plugin is ~2,000+ lines of PHP. The "30 lines" claim is fiction.

**What Grok said:** "Git just merges like normal code. Worst case, latest one wins"

**Reality:** JSON content merges are NOT like code merges. Block content is serialized HTML with specific formatting. Merge conflicts in Gutenberg blocks are ugly and often break content.

---

## REALISTIC IMPLEMENTATION OPTIONS

### Option A: DB Version Control Plugin (Recommended for Testing)

**Workflow:**
1. Install DB Version Control plugin
2. Configure auto-export on save
3. Set sync folder inside Git-tracked directory
4. GitHub Action watches for changes, deploys to staging
5. Manual approval before production push

**Pros:**
- Actually works today
- Content as JSON is readable
- WP-CLI automation available

**Cons:**
- Import overwrites existing content (dangerous)
- Large sites = many JSON files
- Merge conflicts in JSON are messy

---

### Option B: Theme-Only Version Control

**Workflow:**
1. Keep content in WordPress database (normal)
2. Version control only theme files (templates, patterns, styles)
3. Use Create Block Theme for exports
4. Deploy theme changes via GitHub Actions

**Pros:**
- Simpler - no content syncing
- Clients edit content freely
- You control design/structure

**Cons:**
- Content not version controlled
- No rollback for content changes
- Doesn't solve the "edit from car" use case

---

### Option C: Headless WordPress + Static Site

**Workflow:**
1. WordPress as content API only
2. Next.js/Astro frontend (your comfort zone)
3. Content fetched via REST API or GraphQL
4. Frontend deployed via Vercel/Netlify
5. Git controls frontend, WP controls content

**Pros:**
- Clean separation of concerns
- Modern development workflow
- Best of both worlds

**Cons:**
- Client can't preview in WordPress
- Requires frontend rebuild on content change
- Overkill for simple sites

---

## TESTING PLAN FOR YOUR SITE

### Phase 1: Install and Test DB Version Control

**Steps:**
1. Create staging site (or use local with LocalWP)
2. Install DB Version Control plugin
3. Run `wp dbvc export` - examine output
4. Make content changes in WordPress
5. Verify JSON files update automatically
6. Test import: `wp dbvc import`

**Success criteria:**
- JSON exports are readable and complete
- Auto-export triggers on save
- Import restores content accurately

---

### Phase 2: Set Up GitHub Integration

**Steps:**
1. Initialize Git in sync folder
2. Create GitHub repo
3. Push initial export
4. Make change in WordPress
5. Verify auto-commit (may need hook)
6. Test pull on different environment

**Success criteria:**
- Changes tracked in Git history
- Can diff content changes
- Works across environments

---

### Phase 3: GitHub Actions Deployment

**Steps:**
1. Set up SiteGround SSH keys
2. Create GitHub Action workflow
3. Test deployment of theme files first
4. Add WP-CLI cache clear
5. Test full content sync (carefully!)

**Success criteria:**
- Push triggers deployment
- Site updates within 2-3 minutes
- Cache clears properly

---

### Phase 4: Voice/Mobile Workflow Test

**Steps:**
1. Open GitHub mobile app
2. Navigate to content JSON file
3. Use voice-to-text to dictate change
4. Commit and push
5. Verify site updates

**Success criteria:**
- Can edit from phone
- Changes deploy successfully
- Under 5 minutes end-to-end

---

## TOOLS TO INSTALL

| Tool | Purpose | URL |
|------|---------|-----|
| DB Version Control | Content → JSON export | [GitHub](https://github.com/robertdevore/db-version-control) |
| Create Block Theme | Theme export (official) | [WordPress.org](https://wordpress.org/plugins/create-block-theme/) |
| WP-CLI | Command line management | [wp-cli.org](https://wp-cli.org/) |
| LocalWP | Local testing environment | [localwp.com](https://localwp.com/) |

---

## REALISTIC EXPECTATIONS

### This WILL Work:
- Version controlling theme files
- Deploying via GitHub Actions
- WP-CLI automation on SiteGround
- Basic content JSON export/import

### This WON'T Work (As Described):
- Seamless merge of content changes
- "30 lines of PHP" simplicity
- True bi-directional sync without conflicts
- Client edits + developer edits without coordination

### The Real Value:
For **your maintenance clients**, the simpler approach is:
- Version control themes only
- Keep content in WordPress (normal)
- Deploy theme changes via Git
- Content backup via plugin (UpdraftPlus, etc.)

The full Git content workflow is better suited for:
- Sites you fully control
- Development/staging workflows
- Sites with minimal client editing

---

## SOURCES

- [DB Version Control Plugin](https://github.com/robertdevore/db-version-control)
- [Create Block Theme](https://wordpress.org/plugins/create-block-theme/)
- [GitHub Actions WordPress Deployment](https://css-tricks.com/continuous-deployments-for-wordpress-using-github-actions/)
- [SiteGround GitHub Actions Guide](https://creativewebstudio.co.uk/automate-the-deployment-of-a-wordpress-theme-to-a-siteground-hosted-server-using-github-actions/)
- [Version Control for Block Themes](https://www.briancoords.com/thoughts-on-version-control-for-block-themes/)
- [Gutenberg Discussion #59480](https://github.com/WordPress/gutenberg/discussions/59480)
- [WordPress Theme JSON Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/)

---

## NEXT STEPS

1. **This week:** Install DB Version Control on a test site
2. **Test:** Run full export, examine JSON structure
3. **Evaluate:** Is the JSON usable for your workflow?
4. **Decide:** Theme-only vs full content versioning
5. **Document:** Create service offering based on findings

---

**Bottom Line:** The concept is sound, but the implementation needs real testing. Start with DB Version Control plugin on a test site before promising this to clients.
