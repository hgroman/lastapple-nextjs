# Website Pricing Update - Work Order
## lastapple.com Updates (Next.js Implementation)

**Issue Date:** January 8, 2026
**Updated:** January 10, 2026 (adapted for Next.js)
**Priority:** HIGH
**Objective:** Implement all pricing across the new lastapple.com Next.js site

---

## TECHNICAL IMPLEMENTATION NOTE

**Environment:** Next.js 16+ with MDX content pipeline

### How to Update Pricing:

**Option 1: Edit MDX/JSON Content Files (RECOMMENDED)**
1. Pricing data lives in `content/services/` as MDX or JSON
2. Edit the relevant content file
3. Zod schema validates at build time
4. Commit and push — Vercel auto-deploys

**Option 2: PricingSection Component**
- `src/components/PricingSection.tsx` currently has hardcoded tiers
- Can be refactored to pull from content files

**Content Sources:**
- `docs/content-reference/services/wordpress-care.json` — WordPress maintenance tiers
- `docs/content-reference/services/ai-marketing.json` — AI services
- `docs/content-reference/services/system-integration.json` — Integration services

---

## PRICING CHANGES SUMMARY

### WordPress Maintenance Plans:
| Plan | Price |
|------|-------|
| WordPress Essentials | **$199/month** |
| Growth Accelerator | **$349/month** |
| Business Transformer | **$699/month** |
| Enterprise AI Solutions | **$1,299/month** |

### Justification:
- Market research shows $200-250 value at previous $149 price point
- Competitors with less experience charge 25-50% more
- New pricing still 15-25% below premium agency rates
- 25+ years expertise and white-glove service justify premium

---

## PHASE 1: IMPLEMENT SERVICE PRICING PAGES

### Page 1: WordPress Maintenance Plans
**Route:** `/services/wordpress-maintenance`

**Tasks:**
- [ ] Create MDX content file with pricing tiers
- [ ] Implement pricing card components
- [ ] Add value statement: "Best value in the industry - see why"
- [ ] Add justification: "Pricing reflects our 25+ years expertise and white-glove service"
- [ ] Verify mobile responsiveness

---

### Page 2: AI Chatbot Solutions Pricing
**Route:** `/services/ai-chatbot`

**Pricing Structure:**

| Tier | Setup | Monthly |
|------|-------|---------|
| Starter Chatbot | $3,500 | $150/month |
| Professional Chatbot | $6,500 | $250/month |
| Enterprise Chatbot | $12,500 | $500/month |

**Features by Tier:**

**Starter ($3,500 + $150/mo):**
- Basic chatbot setup
- Up to 100 FAQs
- Single website integration
- Email support
- Monthly performance reports

**Professional ($6,500 + $250/mo):**
- Advanced chatbot with NLP
- Up to 500 FAQs
- Multi-platform integration (website + 1 other)
- CRM integration (basic)
- Priority support
- Weekly performance reports
- Quarterly optimization

**Enterprise ($12,500 + $500/mo):**
- Full AI-powered chatbot
- Unlimited FAQs
- Multi-platform integration (website + unlimited)
- Advanced CRM integration + workflows
- Dedicated account manager
- Real-time monitoring
- Monthly strategy sessions
- Custom development included

**Market Justification:** Chatbot agencies charge $3K-25K. This is mid-market positioning.

---

### Page 3: SEO Services Pricing
**Route:** `/services/seo`

**Pricing Structure:**

| Service | Price |
|---------|-------|
| SEO Audit (One-Time) | $1,995 |
| SEO Essentials | $1,500/month |
| SEO Professional | $2,750/month |
| SEO Enterprise | $5,000/month |

**Features by Tier:**

**SEO Audit ($1,995 one-time):**
- Comprehensive technical audit
- Keyword opportunity analysis
- Competitor analysis
- Actionable recommendations
- 60-minute strategy call

**SEO Essentials ($1,500/mo):**
- On-page optimization
- Technical SEO fixes
- Monthly keyword research
- Basic link building (5/month)
- Monthly reporting
- 2 optimized blog posts/month

**SEO Professional ($2,750/mo):**
- Everything in Essentials, plus:
- Advanced link building (10/month)
- Competitor monitoring
- Local SEO optimization
- Google Business Profile management
- 4 optimized blog posts/month
- Quarterly strategy sessions

**SEO Enterprise ($5,000/mo):**
- Everything in Professional, plus:
- AI-driven keyword strategy
- Advanced content clusters
- Enterprise link building (20/month)
- Conversion optimization
- Weekly reporting
- Dedicated SEO strategist
- Unlimited blog posts with AI enhancement

**Market Justification:** SEO agencies charge $1,000-10,000/month. Mid-market positioning.

---

### Page 4: B2B Email List Services Pricing
**Route:** `/services/b2b-email-lists`

**Pricing Structure:**

| Service | Price |
|---------|-------|
| List Building | $3,500 per 1,000 verified contacts |
| List Enrichment | $2,200 per 1,000 records |
| Growth Plan | $699/month (500 contacts) |
| Professional Plan | $1,299/month (1,000 contacts) |
| Enterprise Plan | Custom pricing |

**Features by Tier:**

**Per-Project: List Building ($3,500/1,000 contacts):**
- Targeted list building
- Email verification
- Phone verification
- Basic firmographic data
- Deliverability guarantee: 95%+

**Per-Project: List Enrichment ($2,200/1,000 records):**
- Enhance existing lists
- Email verification
- Phone appending
- Title/role verification
- Company data enrichment

**Growth Plan ($699/mo):**
- 500 new verified contacts/month
- Ongoing list enrichment
- Monthly data refresh
- Email verification
- Priority support

**Professional Plan ($1,299/mo):**
- 1,000 new verified contacts/month
- Ongoing list enrichment
- Weekly data refresh
- Advanced filtering
- Dedicated account manager

**Enterprise Plan (Custom):**
- Unlimited contacts
- Real-time enrichment
- API access
- Custom integrations
- White-glove service

**Market Justification:** ZoomInfo charges $15K-25K/year. Apollo charges $4,800-9,600/year.

---

### Page 5: Data Integration Services Pricing
**Route:** `/services/data-integration`

**Pricing Structure:**

| Service | Price Range |
|---------|-------------|
| Simple Integration | $3,500 - $5,500 |
| Complex Integration | $8,500 - $15,000 |
| Enterprise Architecture | $25,000 - $50,000+ |
| Basic Support | $299/month |
| Professional Support | $599/month |
| Enterprise Support | $1,200/month |

**Features by Tier:**

**Simple Integration ($3,500 - $5,500):**
- Single-system integration
- CRM to email platform
- Basic data mapping
- Testing & deployment
- 30 days post-launch support
- Examples: HubSpot to Mailchimp, Salesforce to WordPress

**Complex Integration ($8,500 - $15,000):**
- Multi-system integration (2-3 systems)
- Advanced data mapping
- Custom workflows
- API development (if needed)
- 60 days post-launch support
- Examples: Multi-platform marketing automation, CRM + accounting + inventory

**Enterprise Architecture ($25,000 - $50,000+):**
- Complete data ecosystem
- 4+ system integrations
- Custom middleware development
- Advanced security & compliance
- 90 days post-launch support
- Ongoing optimization
- Examples: Complete digital transformation, enterprise-wide data unification

**Monthly Support:**
- Basic ($299/mo): Monitoring + minor updates
- Professional ($599/mo): Proactive maintenance + optimization
- Enterprise ($1,200/mo): Dedicated support + continuous improvement

**Market Justification:** Integration agencies charge $150-250/hour.

---

### Page 6: HubSpot Services Pricing
**Route:** `/services/hubspot`

**Pricing Structure:**

| Service | Price |
|---------|-------|
| HubSpot Setup & Onboarding | $6,500 - $10,000 |
| HubSpot Migration | $9,500 - $18,000 |
| Custom Workflow Development | $2,800 per workflow |
| Monthly Essentials | $599/month |
| Monthly Professional | $1,099/month |
| Monthly Enterprise | $2,200/month |

**Features by Tier:**

**Setup & Onboarding ($6,500 - $10,000):**
- Complete HubSpot setup
- User training (up to 5 users)
- Basic workflow configuration
- Email template design
- 30 days post-launch support

**Migration ($9,500 - $18,000):**
- Migration from existing CRM
- Data cleanup & deduplication
- Complete HubSpot setup
- Advanced workflow configuration
- User training (up to 10 users)
- 60 days post-launch support

**Custom Workflow ($2,800/workflow):**
- Custom automation workflow
- Advanced logic & branching
- Integration with external tools
- Testing & optimization
- Documentation

**Monthly Essentials ($599/mo):**
- Monthly optimization review
- Basic workflow maintenance
- Email template updates
- Performance reporting

**Monthly Professional ($1,099/mo):**
- Everything in Essentials, plus:
- Quarterly strategy sessions
- Advanced workflow development
- A/B testing & optimization
- Priority support

**Monthly Enterprise ($2,200/mo):**
- Everything in Professional, plus:
- Dedicated HubSpot specialist
- Weekly optimization
- Custom development included
- Executive reporting

**Market Justification:** HubSpot partners charge $5K-20K implementations.

---

## PHASE 2: VERIFICATION CHECKLIST

After all pricing pages implemented:

- [ ] All pricing displays correctly on desktop
- [ ] All pricing displays correctly on mobile
- [ ] All CTA buttons functional
- [ ] No broken links
- [ ] Build passes (`npm run build`)
- [ ] Zod schemas validate all content
- [ ] New pages accessible via navigation
- [ ] Meta descriptions include relevant pricing keywords

---

## PHASE 3: ANALYTICS TRACKING

**Add tracking to measure impact:**

### Events to Track:
- [ ] Track pricing page views by service
- [ ] Track "Get Started" / CTA button clicks by tier
- [ ] Track scroll depth on pricing pages

### A/B Testing Opportunities:
- [ ] Test "$199/month" vs "$199 per month"
- [ ] Test showing annual pricing option
- [ ] Test "Save $X with annual" messaging

---

## BUSINESS DECISIONS NEEDED

### 1. Grandfathering Existing Clients:
- [ ] Grandfather current clients at old pricing?
- [ ] If yes, for how long? (Recommended: 6 months)
- [ ] Notify now or at renewal?

### 2. LinguaTech Exception:
- [ ] Honor $149 for LinguaTech (already soft-quoted)?
- **RECOMMENDATION:** Yes, honor $149. Use as upsell opportunity later.

### 3. Design/Branding:
- [ ] Use consistent pricing card design across all service pages
- [ ] Add callouts? ("Most Popular", "Best Value")
- [ ] Include comparison tables between tiers?

### 4. Legal/Disclaimers:
- [ ] Add "Pricing subject to change" disclaimer?
- [ ] Add "Custom quotes available for enterprise needs"?
- [ ] Terms & conditions link needed?

---

## IMPLEMENTATION APPROACH

**Recommended:** Implement all pricing pages as part of content migration sprint.

1. Create MDX templates for service pages with pricing
2. Build reusable PricingCard component
3. Implement each service page with full pricing
4. Verify all pages render correctly
5. Deploy to Vercel

---

## DEPENDENCIES

- [ ] WordPress content migration complete (for service descriptions)
- [ ] Service page MDX schema finalized
- [ ] PricingCard component built
- [ ] Navigation updated to include service pages

---

*This work order tracks pricing implementation for the Next.js rebuild. Original WordPress pricing update superseded.*
