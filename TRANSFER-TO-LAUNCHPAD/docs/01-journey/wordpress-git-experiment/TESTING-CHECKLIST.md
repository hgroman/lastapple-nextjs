# WordPress Git Integration - Testing Checklist
## Use Yourself as Test Subject

---

## PHASE 1: Local Setup (1 hour)

### Environment
- [ ] Install LocalWP (if not already)
- [ ] Create new test site: `git-test.local`
- [ ] Install WordPress with default theme
- [ ] Create 3-4 test pages with block content

### Plugin Installation
- [ ] Download DB Version Control from [GitHub](https://github.com/robertdevore/db-version-control)
- [ ] Upload to `/wp-content/plugins/`
- [ ] Activate plugin
- [ ] Navigate to DBVC Export menu

### Initial Export
- [ ] Click "Run Full Export"
- [ ] Locate sync folder: `/wp-content/plugins/db-version-control/sync/`
- [ ] Open and examine JSON files
- [ ] Verify content is readable and complete

**Checkpoint:** Can you read your page content in the JSON files?

---

## PHASE 2: Auto-Export Testing (30 min)

### Test Auto-Sync
- [ ] Edit a page in WordPress
- [ ] Change some text
- [ ] Click "Update"
- [ ] Check sync folder - did JSON update?
- [ ] Note timestamp on file

### Test Multiple Content Types
- [ ] Create a new post → verify export
- [ ] Edit menu → verify export
- [ ] Change site option → verify export

**Checkpoint:** Do changes auto-export without manual trigger?

---

## PHASE 3: Git Integration (1 hour)

### Initialize Git
```bash
cd /path/to/site/wp-content/plugins/db-version-control/sync/
git init
git add .
git commit -m "Initial content export"
```

- [ ] Commands run successfully
- [ ] Git history shows initial commit

### Create GitHub Repo
- [ ] Create new repo: `wordpress-content-test`
- [ ] Add remote: `git remote add origin [url]`
- [ ] Push: `git push -u origin main`
- [ ] Verify files visible on GitHub

### Test Change Tracking
- [ ] Edit page in WordPress
- [ ] Run: `git status` - shows changed file?
- [ ] Run: `git diff` - shows content change?
- [ ] Commit: `git add . && git commit -m "Updated page content"`
- [ ] Push: `git push`

**Checkpoint:** Can you see content changes in Git history?

---

## PHASE 4: Import Testing (Critical - 30 min)

### Backup First!
- [ ] Export database backup
- [ ] Note current content state

### Test Import
- [ ] Edit JSON file directly (change some text)
- [ ] Run: `wp dbvc import`
- [ ] Check WordPress - did content update?
- [ ] Verify no data loss

### Test Conflict Scenario
- [ ] Edit page in WordPress (change title)
- [ ] Edit same page JSON in Git (change body)
- [ ] Import - what happens?
- [ ] Document behavior

**Checkpoint:** Does import work reliably? Any data loss?

---

## PHASE 5: Mobile/Voice Test (30 min)

### GitHub Mobile Setup
- [ ] Install GitHub mobile app
- [ ] Login to account
- [ ] Navigate to test repo

### Voice Edit Test
- [ ] Open a page JSON file
- [ ] Tap Edit
- [ ] Use voice-to-text to dictate a change
- [ ] Commit with message
- [ ] Push

### Verify Deployment
- [ ] Check GitHub - commit visible?
- [ ] (If Actions set up) Check site updated?

**Checkpoint:** Can you edit content from your phone?

---

## PHASE 6: SiteGround Deployment (2 hours)

### SSH Setup
- [ ] Login to SiteGround
- [ ] Go to: Site Tools → Devs → SSH Keys Manager
- [ ] Generate new SSH key pair
- [ ] Download private key
- [ ] Note SSH username and host

### GitHub Secrets
Add to repo Settings → Secrets:
- [ ] `SSH_PRIVATE_KEY` - your private key content
- [ ] `SITEGROUND_HOST` - e.g., `us123.siteground.us`
- [ ] `SITEGROUND_USER` - e.g., `u123-abcdef`
- [ ] `SITEGROUND_SITE` - e.g., `lastapple.com`

### Create Workflow
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Use workflow from RESEARCH-FINDINGS.md
- [ ] Commit and push
- [ ] Watch Actions tab for execution

### Test Deployment
- [ ] Make change in WordPress
- [ ] Commit/push JSON
- [ ] Watch GitHub Action run
- [ ] Verify site updated

**Checkpoint:** Does push → deploy → site update work?

---

## RESULTS LOG

### Phase 1 Results
- Export worked: Yes / No
- JSON readable: Yes / No
- Issues encountered:

### Phase 2 Results
- Auto-export worked: Yes / No
- All content types: Yes / No
- Issues encountered:

### Phase 3 Results
- Git tracking worked: Yes / No
- GitHub push worked: Yes / No
- Issues encountered:

### Phase 4 Results
- Import worked: Yes / No
- Data loss: Yes / No
- Conflict handling:

### Phase 5 Results
- Mobile edit worked: Yes / No
- Voice-to-text quality:
- Issues encountered:

### Phase 6 Results
- SSH connected: Yes / No
- Action ran: Yes / No
- Site updated: Yes / No
- Time from push to live:

---

## DECISION MATRIX

After testing, answer these:

| Question | Answer |
|----------|--------|
| Is this simpler than manual editing? | |
| Would clients understand this? | |
| Is the risk of data loss acceptable? | |
| Does it save time vs current workflow? | |
| Would you charge extra for this? | |
| Is it ready for production use? | |

---

## RECOMMENDATION TEMPLATE

After testing, fill in:

**Should I offer this to clients?**
- [ ] Yes - as premium service
- [ ] Yes - for specific use cases only
- [ ] No - too risky/complex
- [ ] Need more testing

**Best use case:**
_________________________

**Pricing if offered:**
_________________________

**Clients it's NOT suitable for:**
_________________________
