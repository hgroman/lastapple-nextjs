"""
Bitwarden Secrets Manager Client for Agency OS.

BWS_ACCESS_TOKEN is expected in the environment (loaded via ~/.zshenv).
Everything else comes from Bitwarden vault via bws CLI.
Fallback to os.getenv() if Bitwarden unavailable.
"""

import os
import subprocess
import json
from pathlib import Path

BWS_PATH = Path.home() / ".local" / "bin" / "bws"


def _get_access_token():
    """Get access token from environment."""
    token = os.environ.get("BWS_ACCESS_TOKEN")
    if not token:
        raise ValueError(
            "BWS_ACCESS_TOKEN not set. Ensure it is exported in ~/.zshenv."
        )
    return token


def _run_bws(args):
    """Run bws command and return parsed JSON."""
    token = _get_access_token()
    cmd = [str(BWS_PATH)] + args + ["-t", token]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError("bws failed: %s" % result.stderr)
    return json.loads(result.stdout) if result.stdout.strip() else []


def list_secrets():
    """List all secrets from Bitwarden vault."""
    return _run_bws(["secret", "list"])


def get_secret(key):
    """Get a specific secret value by key name."""
    for s in list_secrets():
        if s.get("key") == key:
            return s.get("value")
    raise KeyError("Secret '%s' not found in Bitwarden vault" % key)


def load_secrets(keys=None):
    """
    Load secrets into os.environ.

    Args:
        keys: Optional list of specific key names to load.
              If None, loads ALL secrets.

    Returns:
        Dict of loaded key-value pairs (values masked for safety).
    """
    loaded = {}
    for s in list_secrets():
        key = s.get("key")
        value = s.get("value")
        if key and value:
            if keys is None or key in keys:
                os.environ[key] = value
                loaded[key] = value
    return loaded


def get_secret_or_env(key):
    """
    Bitwarden-first, env fallback pattern.
    Try Bitwarden vault first, fall back to os.getenv().
    """
    try:
        return get_secret(key)
    except Exception:
        val = os.getenv(key)
        if val:
            return val
        raise KeyError(
            "Secret '%s' not found in Bitwarden or environment" % key
        )
