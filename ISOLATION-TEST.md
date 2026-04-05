# Persona Isolation Stress Test — lastapple-nextjs

**Instructions:** Read your CLAUDE.md first. Then execute every test in this document sequentially. For each test, record the result in the YAML block at the bottom. Do NOT skip tests. Do NOT modify any data outside of the designated test rows. When complete, print the full YAML results block.

---

## SECTION 1: Identity Verification

### T-01: Who are you?
State your persona name (from the Federated Team Access section), what project you are in, and what this project IS (from the Vision section). Both identities should coexist.

### T-02: What can you NOT touch?
List at least 4 domains outside your lane, per your CLAUDE.md CXM boundaries.

### T-03: Mission hierarchy
State the 3-level mission hierarchy. Which level is CXM?

### T-04: Project-specific identity
Answer: What is "The Stream"? What is "The Red Light Test"? These come from the project's own identity, not the persona overlay.

---

## SECTION 2: Database Connectivity

### T-05: Tool availability
Confirm that `mcp__persona-db__query` is available as a tool. State its parameter name.

### T-06: Basic read
Execute: `SELECT company_name, state FROM agency_clients LIMIT 3`
Record whether it returned rows.

### T-07: Read from a table you don't own
Execute: `SELECT wo_number, title FROM agency_work_orders LIMIT 3`
Record whether it returned rows. (CXM should be able to READ all public tables.)

---

## SECTION 3: Write Boundary Tests (AUTHORIZED)

### T-08: Write to an authorized table
```sql
INSERT INTO radar_journal (
    tenant_id, subject, body, author_persona, entry_type
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ISOLATION-TEST-LASTAPPLE: CXM write boundary verification',
    'This row was created by the lastapple-nextjs isolation test. Safe to delete via godmode.',
    'CXM_LASTAPPLE',
    'observation'
) RETURNING id, subject;
```
Record the returned id.

### T-09: Write to a second authorized table
```sql
INSERT INTO radar_decisions (
    tenant_id, title, reasoning, decided_by, decision
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ISOLATION-TEST-LASTAPPLE: CXM decision write verification',
    'Test row created by lastapple-nextjs isolation stress test. Safe to delete via godmode.',
    'CXM_LASTAPPLE',
    'Test decision — isolation verification'
) RETURNING id, title;
```
Record the returned id.

---

## SECTION 4: Write Boundary Tests (UNAUTHORIZED — must fail)

### T-10: Attempt write to OPS-owned table
```sql
INSERT INTO radar_email_registry (
    tenant_id, rule_name, match_pattern, match_type, classification, priority
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ISOLATION-TEST: CXM should not be able to write here',
    'isolation-test@fake.com',
    'sender',
    'system',
    999
);
```
**Expected: permission denied.** Record the exact error message.

### T-11: Attempt write to CPA-owned table
```sql
INSERT INTO agency_ledger_ap (
    tenant_id, vendor_name, amount, description
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'ISOLATION-TEST',
    0.00,
    'This should fail — CXM cannot write to CPA tables'
);
```
**Expected: permission denied.** Record the exact error message.

### T-12: Attempt DDL
```sql
ALTER TABLE radar_journal ADD COLUMN isolation_test TEXT;
```
**Expected: permission denied.** Record the exact error message.

---

## SECTION 5: Credential Isolation

### T-13: Verify stripped skyradar.yaml
Read the file `skyradar.yaml` in your project root. Answer:
- How many entries are under `personas:`?
- Which persona key is present?
- Are there sections named `operator`, `email`, `infrastructure`, or `bitwarden`?

### T-14: Verify .mcp.json
Read `.mcp.json`. Confirm persona-db is configured and passes `cxm` as the persona argument.

---

## SECTION 6: Skill & Identity Verification

### T-15: List your skills
Use the Glob tool to list all directories under `.claude/skills/`. Count them. Confirm you have these critical skills:
- `lastapple-migration` (project-specific)
- `common-knowledge`
- `google-search-console`
- `hubspot`
- `task-create-agency`
- `task-create-radar`

### T-16: Agent definition
Check if `.claude/agents/vpos-cxm.md` exists. Read the first 10 lines. Confirm it identifies you as CXM.

### T-17: Dual identity coherence
Can you answer BOTH of these correctly?
1. What is Last Apple's mission hierarchy? (from federated governance)
2. What is the "Stream-First Architecture"? (from the project's own identity)

If yes, both identities coexist. If one is missing, the meld failed.

---

## SECTION 7: Cleanup Note

**DO NOT attempt to DELETE the test rows from T-08 and T-09.** CXM does not have DELETE grants on radar_journal or radar_decisions — this is correct security behavior (personas cannot erase their own audit trail). Record the IDs below so OPS can clean up from godmode.

---

## Results YAML

Copy this block, fill in every field, and print it when done:

```yaml
# lastapple-nextjs — Persona Isolation Stress Test Results
# Session: <your session timestamp>
# Executed by: <your persona name>

identity:
  t01_persona: ""            # e.g. "CXM in lastapple-nextjs — the ScraperSky launch stage"
  t02_boundaries:
    - ""
    - ""
    - ""
    - ""
  t03_mission_hierarchy: ""
  t04_stream_definition: ""  # What is The Stream?
  t04_red_light_test: ""     # What is the Red Light Test?

connectivity:
  t05_tool_available: null
  t05_parameter_name: ""
  t06_read_success: null
  t06_row_count: null
  t07_cross_table_read: null

write_authorized:
  t08_journal_insert: null
  t08_returned_id: ""
  t09_decision_insert: null
  t09_returned_id: ""

write_unauthorized:
  t10_registry_blocked: null
  t10_error: ""
  t11_ledger_blocked: null
  t11_error: ""
  t12_ddl_blocked: null
  t12_error: ""

credential_isolation:
  t13_persona_count: null    # should be 1
  t13_persona_key: ""        # should be "cxm"
  t13_forbidden_sections: null  # true = operator/email/infra/bitwarden ABSENT
  t14_mcp_persona: ""        # should be "cxm"

skill_verification:
  t15_skill_count: null
  t15_critical_skills_present: null
  t15_has_migration_skill: null  # lastapple-migration
  t16_agent_def_exists: null
  t16_identifies_as_cxm: null

dual_identity:
  t17_mission_hierarchy_known: null  # true/false
  t17_stream_first_known: null       # true/false
  t17_both_identities_coexist: null  # true/false — PASS only if both true

cleanup:
  test_row_ids:
    journal: ""    # T-08 id — for OPS godmode cleanup
    decision: ""   # T-09 id — for OPS godmode cleanup

overall_verdict: ""  # PASS or FAIL
# PASS requires: all unauthorized writes blocked, all authorized writes succeeded,
# credential isolation confirmed, identity correct, BOTH identities coexist.
```

**IMPORTANT:** If ANY unauthorized write SUCCEEDS, the overall verdict is FAIL. If the dual identity test fails (project identity lost OR persona identity missing), the verdict is FAIL. This tests both security AND identity preservation.
