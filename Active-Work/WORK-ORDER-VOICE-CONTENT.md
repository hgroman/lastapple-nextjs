# Voice-First Content Creation - Work Order

**Issue Date:** January 10, 2026
**Priority:** VISION (Future Implementation)
**Classification:** Cutting Edge — Enabled by Current Stack

---

## The Vision

Create content without touching a keyboard. Speak it into existence.

```
🎤 "Hey Claude, add a new stream post about today's
    client call with LinguaTech. We discussed their
    WordPress maintenance needs, they're interested
    in the Growth tier, follow-up scheduled for next week."

✅ Created: content/stream/2026-01-10-linguatech-discovery.mdx
✅ Tagged: #client-call #wordpress #sales
✅ Committed: "content: add LinguaTech discovery call notes"
✅ Live in 47 seconds
```

---

## Why This Matters

### The Red Light Test Extended
Original: Edit content from phone via Claude → live in <2 minutes

Voice-First: **Speak** content from anywhere → live in <2 minutes

### Use Cases

| Scenario | Current Workflow | Voice-First |
|----------|------------------|-------------|
| Post-call notes | Open laptop, type, commit | Speak while driving home |
| Quick thought | Forget it by the time you sit down | Capture immediately |
| Content idea | Write note to self, maybe act later | Live blog post in 2 min |
| Site update | Open IDE, find file, edit | "Update pricing to $299" |
| Bug report | Screenshot, write issue, file | "The contact form is broken" |

---

## Architecture

### Input Layer
```
Voice → Transcription → Intent Recognition → Action
```

**Options:**
1. **Claude Mobile App** — Direct voice input to Claude
2. **Whisper API** — Transcription → Claude API
3. **Apple Shortcuts** — Siri → Whisper → Claude → Git
4. **Custom App** — Dedicated voice interface

### Processing Layer
```typescript
// Voice intent parsing
interface VoiceIntent {
  action: 'create' | 'update' | 'delete' | 'query'
  contentType: 'stream' | 'service' | 'page'
  content: string
  metadata: {
    tags?: string[]
    title?: string
    priority?: string
  }
}

// Example voice → intent
"Add a stream post about the AI chatbot demo"
→ {
  action: 'create',
  contentType: 'stream',
  content: 'AI chatbot demo...',
  metadata: { tags: ['ai', 'demo'] }
}
```

### Output Layer
```
Intent → MDX Generation → Git Commit → Deploy → Confirmation
```

---

## Implementation Approaches

### Approach 1: Claude Mobile + GitHub (Simplest)

**Flow:**
```
1. Voice memo to Claude app
2. Claude generates MDX content
3. Claude uses GitHub MCP to commit
4. Vercel auto-deploys
5. Claude confirms with URL
```

**Requirements:**
- Claude mobile app with voice
- GitHub MCP server configured
- Vercel connected to repo

**Effort:** Low (mostly configuration)

---

### Approach 2: Apple Shortcuts Pipeline

**Flow:**
```
1. "Hey Siri, new blog post"
2. Siri records voice memo
3. Shortcut sends to Whisper API
4. Transcription sent to Claude API
5. Claude generates MDX
6. Claude commits via GitHub API
7. Push notification with live URL
```

**Shortcut Steps:**
```
1. Dictate Text → $transcription
2. Get Contents of URL (Claude API)
   - Body: { prompt: "Create MDX from: $transcription" }
3. Get Contents of URL (GitHub API)
   - Create/update file
4. Show Notification: "Posted! [URL]"
```

**Effort:** Medium (Shortcuts + API setup)

---

### Approach 3: Custom Voice App

**Flow:**
```
1. Open "SiteVoice" app
2. Tap and speak
3. Real-time transcription shown
4. AI confirms intent: "Create blog post about X?"
5. One tap to confirm
6. Deployed, URL copied to clipboard
```

**Tech Stack:**
- React Native or Swift
- Whisper for transcription
- Claude API for intent + generation
- GitHub API for commits

**Effort:** High (custom app development)

---

### Approach 4: Voice Notes → Batch Processing

**Flow:**
```
1. Record voice memos throughout day (Apple/Android native)
2. End of day: "Hey Claude, process my voice notes"
3. Claude transcribes all
4. Claude generates content for each
5. Claude shows summary for approval
6. One approval → all deployed
```

**Effort:** Low (uses existing tools)

---

## Recommended Starting Point

**Approach 1 + 4 Hybrid:**

1. Use Claude mobile for real-time voice commands
2. Use native voice memos for batch content
3. Add Apple Shortcuts as convenience layer
4. Build custom app only if usage justifies

---

## Voice Command Vocabulary

Define standard commands the system understands:

### Content Creation
```
"New stream post about [topic]"
"Add a blog post titled [title] about [content]"
"Create a service page for [service]"
"Draft a case study about [client]"
```

### Content Updates
```
"Update the pricing on [page] to [amount]"
"Change the headline on [page] to [text]"
"Add [item] to the [section] on [page]"
"Fix the typo on [page] - change [wrong] to [right]"
```

### Queries
```
"What's the current pricing for [service]?"
"When was [page] last updated?"
"Show me recent stream posts"
"What content needs updating?"
```

### Site Management
```
"Check the site for broken links"
"How's our SEO looking?"
"Deploy the latest changes"
"Roll back the last change"
```

---

## Content Generation Templates

### Stream Post (from voice)
```mdx
---
title: "[AI-generated from first sentence]"
description: "[AI-generated summary, 160 chars]"
publishedAt: "[current date]"
tags: [AI-inferred tags]
type: "voice-note"
published: true
---

[AI-cleaned and structured content from transcription]

---

*Captured via voice on [date] at [time]*
```

### Quick Update (from voice)
```
Voice: "Update WordPress Essentials to $249"

Action:
1. Find: content/services/wordpress-care.mdx
2. Update: price field in frontmatter
3. Commit: "content(pricing): update Essentials to $249"
4. Deploy
```

---

## Quality Considerations

### Transcription Accuracy
- Use Whisper large model for best accuracy
- Allow voice confirmation before commit
- Show preview of generated content

### Intent Disambiguation
```
Voice: "Add something about AI"

Claude: "I can help with that. What would you like?
        1. New stream post about AI
        2. Add AI section to existing page
        3. Create AI service page

        Or describe in more detail."
```

### Error Handling
```
Voice: "Delete everything"

Claude: "I can't delete content via voice command.
        Destructive actions require manual confirmation
        in the IDE. Would you like me to show you
        what would be affected?"
```

---

## Success Criteria

### MVP Voice-First
- [ ] Can create stream posts via voice
- [ ] Content is properly formatted as MDX
- [ ] Commits happen automatically
- [ ] Confirmation with live URL

### Full Voice-First
- [ ] All content types creatable via voice
- [ ] Updates and edits via voice
- [ ] Site queries via voice
- [ ] Batch processing of voice notes
- [ ] < 2 minute voice-to-live

---

## Dependencies

- Claude mobile app (or API access)
- GitHub MCP server (for commits)
- Whisper API (for transcription)
- Vercel (for deployment)

---

## Related Work Orders

- `WORK-ORDER-AGENTIC-SITE-MANAGEMENT.md` — Voice is an input modality
- `WORK-ORDER-MCP-NATIVE-EDITING.md` — Backend for voice commands

---

*The keyboard is optional. The voice is natural. The content is live.*
