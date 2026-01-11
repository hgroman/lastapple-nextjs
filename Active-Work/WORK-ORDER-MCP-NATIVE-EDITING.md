# MCP-Native Editing - Work Order

**Issue Date:** January 10, 2026
**Priority:** VISION (Foundation for Agentic Features)
**Classification:** Cutting Edge — Spec'd in MASTER-SPECIFICATION, Not Yet Implemented

---

## What is MCP?

**Model Context Protocol** — Anthropic's open standard for connecting AI models to external tools and data sources.

Instead of Claude asking you to run commands, Claude runs them directly through MCP servers.

```
Without MCP:
Claude: "Please run: git commit -m 'update pricing'"
Human: [copies command, runs in terminal]
Human: "Done"

With MCP:
Claude: [executes git commit directly]
Claude: "Committed. Deployed. Live."
```

---

## Why MCP Matters for This Project

### Current State
- Claude Code has built-in filesystem access ✅
- Claude can read/write/edit files ✅
- Claude can run bash commands ✅
- Git operations work but require user context

### MCP-Native State
- Claude connects directly to GitHub (create repos, PRs, commits)
- Claude connects directly to Vercel (deployments, env vars)
- Claude connects directly to WordPress (migration, content sync)
- Claude connects to custom tools (content validation, SEO checks)

---

## MCP Servers for This Stack

### Priority 1: GitHub MCP Server

**Purpose:** Direct repository operations

**Capabilities:**
- Create/manage repositories
- Read/write files directly
- Create commits without local git
- Manage branches
- Create pull requests
- Read issues and discussions

**Installation:**
```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

**Configuration:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

**Use Cases:**
- "Create a new branch for the pricing update"
- "Open a PR with these changes"
- "What's the status of open issues?"
- "Commit this content to the stream folder"

---

### Priority 2: Filesystem MCP Server

**Purpose:** Enhanced file operations beyond built-in

**Status:** Claude Code has built-in filesystem access, but dedicated MCP server adds:
- Glob pattern matching
- File watching
- Batch operations
- Sandboxed access

**Installation:**
```bash
claude mcp add filesystem -- npx -y @anthropic/mcp-filesystem
```

---

### Priority 3: Vercel MCP Server (Custom)

**Purpose:** Direct deployment control

**Capabilities (to build):**
- Trigger deployments
- Check deployment status
- Manage environment variables
- View deployment logs
- Rollback deployments

**Potential Implementation:**
```typescript
// tools/mcp-vercel/index.ts
import { Server } from '@modelcontextprotocol/sdk/server'

const server = new Server({
  name: 'vercel',
  version: '1.0.0'
})

server.addTool({
  name: 'deploy',
  description: 'Trigger a Vercel deployment',
  parameters: {
    project: { type: 'string' },
    production: { type: 'boolean', default: false }
  },
  handler: async ({ project, production }) => {
    // Vercel API call
  }
})

server.addTool({
  name: 'status',
  description: 'Get deployment status',
  parameters: {
    deploymentId: { type: 'string' }
  },
  handler: async ({ deploymentId }) => {
    // Vercel API call
  }
})
```

---

### Priority 4: Content Validation MCP Server (Custom)

**Purpose:** Validate content before commit

**Capabilities (to build):**
- Validate MDX frontmatter against Zod schemas
- Check internal links
- Verify image references
- SEO validation (title length, description, etc.)
- Spell check

**Example Tool:**
```typescript
server.addTool({
  name: 'validate-content',
  description: 'Validate MDX content against schema',
  parameters: {
    filePath: { type: 'string' },
    schema: { type: 'string', enum: ['stream', 'service', 'page'] }
  },
  handler: async ({ filePath, schema }) => {
    const content = await fs.readFile(filePath, 'utf-8')
    const { data, errors } = await validateMDX(content, schema)
    return { valid: errors.length === 0, errors }
  }
})
```

---

### Priority 5: WordPress MCP Server

**Purpose:** Migration and sync with WordPress sites

**Options:**
1. **InstaWP MCP** (existing)
   ```bash
   claude mcp add wordpress -- npx -y @instawp/mcp-wp
   ```

2. **Claudeus WP-MCP** (145 tools)
   ```bash
   git clone https://github.com/deus-h/claudeus-wp-mcp
   ```

3. **Custom SSH-based** (for SiteGround)
   ```typescript
   server.addTool({
     name: 'wp-cli',
     description: 'Execute WP-CLI command on remote server',
     parameters: {
       command: { type: 'string' }
     },
     handler: async ({ command }) => {
       return await sshExec(`cd ${wpPath} && wp ${command}`)
     }
   })
   ```

---

## Implementation Phases

### Phase 1: GitHub MCP (Week 1)

**Goal:** Claude can commit and push directly

**Steps:**
1. Generate GitHub Personal Access Token
2. Install GitHub MCP server
3. Configure in Claude settings
4. Test: "Create a test file and commit it"
5. Verify push to repository

**Success:** Claude commits without user running git commands

---

### Phase 2: Content Validation MCP (Week 2)

**Goal:** Validate before commit

**Steps:**
1. Create custom MCP server
2. Implement Zod validation tool
3. Implement link checker tool
4. Implement SEO validator tool
5. Integrate into commit workflow

**Success:** Invalid content blocked before commit

---

### Phase 3: Vercel MCP (Week 3)

**Goal:** Deployment control from conversation

**Steps:**
1. Get Vercel API token
2. Create custom MCP server
3. Implement deploy/status/rollback tools
4. Test deployment triggers
5. Add to Claude configuration

**Success:** "Deploy to production" just works

---

### Phase 4: WordPress MCP (Week 4)

**Goal:** Direct WordPress access for migrations

**Steps:**
1. Evaluate existing WordPress MCP options
2. Install and configure
3. Test content export
4. Test content sync (if bidirectional needed)
5. Integrate with migration workflow

**Success:** "Export the About page from WordPress" just works

---

## MCP Configuration File

Full configuration for all servers:

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-filesystem"],
      "env": {
        "ALLOWED_PATHS": "/Users/hank/development"
      }
    },
    "vercel": {
      "command": "node",
      "args": ["./tools/mcp-vercel/index.js"],
      "env": {
        "VERCEL_TOKEN": "xxxx"
      }
    },
    "content-validator": {
      "command": "node",
      "args": ["./tools/mcp-content-validator/index.js"]
    },
    "wordpress": {
      "command": "npx",
      "args": ["-y", "@instawp/mcp-wp"],
      "env": {
        "WP_URL": "https://lastapple.com",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx"
      }
    }
  }
}
```

---

## Security Considerations

### Token Management
- Use environment variables, not hardcoded tokens
- Rotate tokens regularly
- Minimum required permissions only

### Scope Limiting
- GitHub: Only specific repositories
- Filesystem: Only project directories
- Vercel: Only specific projects

### Audit Trail
- All MCP actions logged
- Git history as audit trail
- Vercel deployment logs

---

## Success Criteria

### MVP MCP Integration
- [ ] GitHub MCP working (commit/push)
- [ ] Can create content and deploy via conversation
- [ ] No manual git commands needed

### Full MCP Integration
- [ ] All 5 MCP servers configured
- [ ] Content validation before commit
- [ ] Direct Vercel deployment control
- [ ] WordPress migration via MCP
- [ ] Custom tools for site-specific needs

---

## Resources

### Official MCP Documentation
- https://modelcontextprotocol.io/
- https://github.com/modelcontextprotocol

### Existing MCP Servers
- https://github.com/modelcontextprotocol/servers
- GitHub, Filesystem, Git, Postgres, etc.

### Building Custom MCP Servers
- https://modelcontextprotocol.io/docs/building-servers

---

## Related Work Orders

- `WORK-ORDER-AGENTIC-SITE-MANAGEMENT.md` — MCP enables agentic features
- `WORK-ORDER-VOICE-CONTENT.md` — MCP is the execution layer

---

*MCP is the bridge between conversation and action. This is infrastructure for everything else.*
