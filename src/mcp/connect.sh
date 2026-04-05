#!/usr/bin/env bash
# connect.sh — Fetch persona DB credentials from Bitwarden, launch MCP server
# Called by .mcp.json: {"command": "bash", "args": ["src/mcp/connect.sh", "ops"]}
#
# WO-2026-131: Persona Write Isolation
set -euo pipefail

PERSONA="${1:?Usage: connect.sh <persona-name> (ops|cpa|cxm|cto|cmo|scrapersky|readonly)}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SKYRADAR_YAML="$PROJECT_ROOT/skyradar.yaml"
PYTHON="$PROJECT_ROOT/.venv/bin/python3"

# --- Validate prerequisites ---
if [[ ! -f "$SKYRADAR_YAML" ]]; then
  echo "ERROR: skyradar.yaml not found at $SKYRADAR_YAML" >&2
  exit 1
fi

# BWS_ACCESS_TOKEN expected in environment via ~/.zshenv
if [[ -z "${BWS_ACCESS_TOKEN:-}" ]]; then
  echo "ERROR: BWS_ACCESS_TOKEN not set. It should be exported in ~/.zshenv." >&2
  exit 1
fi

if ! command -v jq &>/dev/null; then
  echo "ERROR: jq not found" >&2
  exit 1
fi

# --- Parse skyradar.yaml ---
SECRET_ID=$("$PYTHON" -c "
import yaml, sys
with open('$SKYRADAR_YAML') as f:
    d = yaml.safe_load(f)
try:
    print(d['personas']['$PERSONA']['db_secret_id'])
except KeyError:
    print(f'ERROR: persona \"$PERSONA\" not found in skyradar.yaml', file=sys.stderr)
    sys.exit(1)
")

DB_HOST=$("$PYTHON" -c "
import yaml
with open('$SKYRADAR_YAML') as f:
    d = yaml.safe_load(f)
print(d['supabase']['db_host'])
")

TENANT_ID=$("$PYTHON" -c "
import yaml
with open('$SKYRADAR_YAML') as f:
    d = yaml.safe_load(f)
print(d['company']['tenant_id'])
")

# --- Install npm deps if needed ---
if [[ ! -d "$SCRIPT_DIR/node_modules" ]]; then
  echo "Installing persona-db-server dependencies..." >&2
  (cd "$SCRIPT_DIR" && npm install --silent 2>&1) >&2
fi

# --- Fetch password from Bitwarden (never on disk) ---
PASSWORD=$(~/.local/bin/bws secret get "$SECRET_ID" 2>/dev/null | jq -r '.value')
if [[ -z "$PASSWORD" || "$PASSWORD" == "null" ]]; then
  echo "ERROR: Failed to fetch password for persona '$PERSONA' from Bitwarden" >&2
  exit 1
fi

# --- URL-encode password (handles special chars like !@#) ---
ENCODED_PASSWORD=$(PERSONA_PW="$PASSWORD" python3 -c "import urllib.parse, os; print(urllib.parse.quote(os.environ['PERSONA_PW'], safe=''))")

# --- Resolve project_id for pooler username format (role.project-ref) ---
PROJECT_REF=$("$PYTHON" -c "
import yaml
with open('$SKYRADAR_YAML') as f:
    d = yaml.safe_load(f)
print(d['supabase']['project_id'])
")

# --- Derive project identifier for audit trail (BC-2, Debate 024) ---
PROJECT_NAME=$(basename "$PROJECT_ROOT")
APP_NAME="persona-${PERSONA}-${PROJECT_NAME}"

# --- Launch MCP server (tenant_id sets RLS context on every connection) ---
# Supabase pooler requires username format: role.project-ref (session mode, port 5432)
# application_name lets pg_stat_activity distinguish which project originated a query
exec node "$SCRIPT_DIR/persona-db-server.js" \
  "postgresql://vpos_${PERSONA}.${PROJECT_REF}:${ENCODED_PASSWORD}@${DB_HOST}:5432/postgres?application_name=${APP_NAME}" \
  "$TENANT_ID"
