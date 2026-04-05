#!/usr/bin/env node
/**
 * persona-db-server.js — Per-persona Postgres MCP server
 *
 * Forked from @modelcontextprotocol/server-postgres (v0.1.0)
 * Changes from upstream:
 *   - Removed BEGIN TRANSACTION READ ONLY (personas need writes)
 *   - Changed ROLLBACK to autocommit (each statement commits)
 *   - Updated tool description
 *
 * WO-2026-131: Persona Write Isolation
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import pg from "pg";

const server = new Server(
  {
    name: "persona-db/postgres",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage: persona-db-server.js <postgresql-connection-url> [tenant-id]"
  );
  process.exit(1);
}

const databaseUrl = args[0];
const tenantId = args[1] || null;
const resourceBaseUrl = new URL(databaseUrl);
resourceBaseUrl.protocol = "postgres:";
resourceBaseUrl.password = "";

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

// Set tenant context on every new connection so RLS policies pass.
// The GUC 'app.current_tenant_id' is what Supabase RLS policies check.
pool.on("connect", (client) => {
  if (tenantId) {
    client.query(
      `SELECT set_config('app.current_tenant_id', $1, false)`,
      [tenantId]
    );
  }
});

const SCHEMA_PATH = "schema";

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    return {
      resources: result.rows.map((row) => ({
        uri: new URL(`${row.table_name}/${SCHEMA_PATH}`, resourceBaseUrl).href,
        mimeType: "application/json",
        name: `"${row.table_name}" database schema`,
      })),
    };
  } finally {
    client.release();
  }
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resourceUrl = new URL(request.params.uri);
  const pathComponents = resourceUrl.pathname.split("/");
  const schema = pathComponents.pop();
  const tableName = pathComponents.pop();
  if (schema !== SCHEMA_PATH) {
    throw new Error("Invalid resource URI");
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1",
      [tableName]
    );
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(result.rows, null, 2),
        },
      ],
    };
  } finally {
    client.release();
  }
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query",
        description:
          "Execute a SQL statement against the persona-scoped Postgres connection. " +
          "Writes are permitted only on tables GRANTed to this persona's role.",
        inputSchema: {
          type: "object",
          properties: {
            sql: {
              type: "string",
              description: "The SQL statement to execute",
            },
          },
          required: ["sql"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query") {
    const sql = request.params.arguments?.sql;
    const timestamp = new Date().toISOString();
    console.error(`[AUDIT] [${timestamp}] Executing query: ${sql}`);
    
    const client = await pool.connect();
    try {
      const result = await client.query(sql);
      console.error(`[AUDIT] [${timestamp}] Query successful. Rows: ${result.rowCount}`);
      return {
        content: [
          { type: "text", text: JSON.stringify(result.rows, null, 2) },
        ],
        isError: false,
      };
    } catch (error) {
      console.error(`[AUDIT] [${timestamp}] Query failed: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true,
      };
    } finally {
      client.release();
    }
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
