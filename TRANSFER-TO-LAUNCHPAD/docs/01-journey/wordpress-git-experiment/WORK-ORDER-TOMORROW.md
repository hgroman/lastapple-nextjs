# WordPress Git Integration - Work Order
## Testing Session: January 10, 2026

---

## WHAT I NEED FROM YOU

### 1. SiteGround Credentials

| Item | Where to Get It | Format |
|------|-----------------|--------|
| **SSH Host** | Site Tools → Devs → SSH Keys Manager | `us123.siteground.us` |
| **SSH Username** | Same location | `u123-abcdefgh` |
| **SSH Port** | Always | `18765` |
| **SSH Private Key** | Generate new or use existing | PEM format text |
| **Site Path** | Site Tools → Site → File Manager | `/home/[user]/www/[site]/public_html/` |

**To generate SSH key in SiteGround:**
1. Login to SiteGround → Site Tools
2. Go to: Devs → SSH Keys Manager
3. Click "Generate" (or import existing)
4. Download the private key file
5. Copy the private key content (starts with `-----BEGIN`)

---

### 2. GitHub Access

| Item | Where to Get It | Notes |
|------|-----------------|-------|
| **GitHub Account** | Your existing account | Need repo creation rights |
| **Personal Access Token** | GitHub → Settings → Developer Settings → PAT | `repo` scope minimum |
| **Test Repo Name** | You choose | Suggest: `wp-git-test` |

**To create PAT:**
1. GitHub → Settings → Developer Settings
2. Personal Access Tokens → Tokens (classic)
3. Generate new token
4. Scopes: `repo` (full control)
5. Copy token immediately (only shown once)

---

### 3. Test WordPress Site

| Item | Requirement |
|------|-------------|
| **Test Site** | Staging or dev site (NOT production) |
| **WordPress Admin** | Full admin access |
| **WP Version** | 5.0+ (ideally 6.x) |
| **PHP Version** | 7.4+ |

**Options:**
- SiteGround staging site (best)
- LocalWP on your machine
- Separate dev subdomain

---

### 4. Local Environment

| Item | Status |
|------|--------|
| **Git installed** | Run `git --version` to confirm |
| **Node.js installed** | Run `node --version` (for MCP servers) |
| **SSH client** | Built into macOS |

---

## MCP SERVERS TO INSTALL

### Priority 1: GitHub MCP Server (Official)

**Install:**
```bash
claude mcp add github -s user -- npx -y @modelcontextprotocol/server-github
```

**Or add to Claude settings:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

**Capabilities:**
- Create/manage repos
- Read/write files
- Create commits
- Manage branches
- Create pull requests

---

### Priority 2: SSH MCP Server

**Option A: tufantunc/ssh-mcp (Recommended)**
```bash
claude mcp add ssh-server -s user -- npx -y ssh-mcp
```

**Option B: AiondaDotCom/mcp-ssh**
```bash
npm install -g @aionda/mcp-ssh
claude mcp add mcp-ssh -s user -- mcp-ssh
```

**Capabilities:**
- Execute commands on remote server
- Run WP-CLI commands directly
- File operations via SSH

---

### Priority 3: WordPress MCP Server

**Option A: InstaWP (Simplest)**
```bash
claude mcp add wordpress -s user -- npx -y @instawp/mcp-wp
```

**Option B: WP-MCP (More features)**
```bash
npm install -g @rnaga/wp-mcp
claude mcp add wp-mcp -s user -- wp-mcp serve
```

**Option C: Claudeus WP-MCP (145 tools)**
```bash
git clone https://github.com/deus-h/claudeus-wp-mcp
cd claudeus-wp-mcp
npm install
```

**Capabilities:**
- Read/write posts and pages
- Manage menus
- Update options
- Direct WordPress control

---

### Priority 4: Filesystem MCP (Already Have)

Claude Code has built-in filesystem access. No additional setup needed.

---

## RECOMMENDED MCP CONFIGURATION

Save to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT"
      }
    },
    "ssh": {
      "command": "npx",
      "args": ["-y", "ssh-mcp"],
      "env": {
        "SSH_HOST": "YOUR_SITEGROUND_HOST",
        "SSH_USER": "YOUR_SITEGROUND_USER",
        "SSH_PORT": "18765",
        "SSH_PRIVATE_KEY_PATH": "/path/to/your/private_key"
      }
    },
    "wordpress": {
      "command": "npx",
      "args": ["-y", "@instawp/mcp-wp"],
      "env": {
        "WP_URL": "https://your-test-site.com",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "YOUR_WP_APP_PASSWORD"
      }
    }
  }
}
```

---

## CREDENTIALS CHECKLIST

Before we start, provide these (securely):

### SiteGround SSH
- [ ] SSH Host: ___________________________
- [ ] SSH Username: ___________________________
- [ ] SSH Private Key: (paste in secure manner)
- [ ] Site Path: ___________________________

### GitHub
- [ ] GitHub Username: ___________________________
- [ ] Personal Access Token: ___________________________
- [ ] Test Repo Name: ___________________________

### WordPress Test Site
- [ ] Site URL: ___________________________
- [ ] Admin Username: ___________________________
- [ ] Admin Password or App Password: ___________________________

### Local Verification
- [ ] Git version: ___________________________
- [ ] Node version: ___________________________
- [ ] Claude Code version: ___________________________

---

## TOMORROW'S SESSION PLAN

### Hour 1: Setup & MCP Installation

| Time | Task |
|------|------|
| 0:00 | Verify all credentials received |
| 0:10 | Install GitHub MCP server |
| 0:20 | Test GitHub MCP (create test repo) |
| 0:30 | Install SSH MCP server |
| 0:40 | Test SSH connection to SiteGround |
| 0:50 | Install WordPress MCP server |
| 1:00 | Test WordPress MCP (read a post) |

**Checkpoint:** All three MCP servers working

---

### Hour 2: WordPress Plugin & Export

| Time | Task |
|------|------|
| 1:00 | SSH into SiteGround, install DB Version Control |
| 1:15 | Run initial export via WP-CLI |
| 1:30 | Examine JSON output structure |
| 1:45 | Test auto-export (edit page, check JSON) |
| 2:00 | Initialize Git in sync folder |

**Checkpoint:** Content exporting to JSON, Git tracking

---

### Hour 3: GitHub Integration

| Time | Task |
|------|------|
| 2:00 | Create GitHub repo via MCP |
| 2:10 | Push initial export to GitHub |
| 2:20 | Make change in WordPress |
| 2:30 | Commit and push change |
| 2:40 | View diff on GitHub |
| 2:50 | Test editing JSON via GitHub MCP |

**Checkpoint:** Changes flowing WordPress → Git

---

### Hour 4: Deployment Pipeline

| Time | Task |
|------|------|
| 3:00 | Create GitHub Actions workflow |
| 3:15 | Add SiteGround secrets to repo |
| 3:30 | Test push → deploy cycle |
| 3:45 | Verify site updates |
| 4:00 | Test full round-trip |

**Checkpoint:** Git → WordPress deployment working

---

### Hour 5: Mobile/Voice Test

| Time | Task |
|------|------|
| 4:00 | Open GitHub mobile app |
| 4:10 | Edit JSON file via voice |
| 4:20 | Commit and push |
| 4:30 | Verify site updated |
| 4:40 | Document results |
| 4:50 | Write up findings |

**Checkpoint:** End-to-end workflow validated

---

## SECURITY NOTES

### Credential Handling
- Never paste credentials in plain chat
- Use environment variables for MCP configs
- Store private keys with proper permissions (`chmod 600`)
- Use WordPress Application Passwords (not main password)

### To Create WordPress App Password:
1. WordPress Admin → Users → Your Profile
2. Scroll to "Application Passwords"
3. Enter name: "Claude MCP"
4. Click "Add New Application Password"
5. Copy the generated password

---

## FALLBACK PLAN

If MCP servers don't work as expected:

### Manual Alternative
1. I guide you through commands
2. You run them in terminal
3. We iterate together

### Simpler Test First
1. Skip MCP initially
2. Test SSH manually: `ssh -p 18765 user@host`
3. Test WP-CLI manually: `wp post list`
4. Add MCP automation later

---

## SUCCESS CRITERIA

By end of tomorrow's session:

- [ ] Can read/write GitHub repos via MCP
- [ ] Can execute WP-CLI commands via SSH MCP
- [ ] Content exports to JSON automatically
- [ ] Git tracks content changes
- [ ] Push triggers deployment
- [ ] Site updates within 5 minutes of push
- [ ] Documented any limitations/issues

---

## QUESTIONS FOR YOU

Before tomorrow, please answer:

1. **Which test site will we use?**
   - SiteGround staging?
   - LocalWP?
   - Other?

2. **Do you have a GitHub PAT already?**
   - Yes, will provide
   - No, will create tonight

3. **SSH key preference:**
   - Generate new in SiteGround
   - Use existing key

4. **Time availability tomorrow:**
   - Morning (what time?)
   - Afternoon
   - Flexible

5. **Risk tolerance:**
   - Test site only (safe)
   - Willing to test on secondary real site

---

## READY TO START

Once you provide the credentials and answer the questions above, we'll be ready to execute this plan efficiently.

**Send credentials securely** - Consider:
- Environment variables
- Secure note
- Direct paste (I don't retain between sessions)

Let's make this work!
