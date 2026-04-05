#!/usr/bin/env python3
"""Validate commit messages against the git-curator protocol (portable baseline)."""
from __future__ import annotations
import re
import sys
from pathlib import Path
SUBJECT_RE = re.compile(r"^(feat|fix|docs|refactor|chore|style)(\([^)]+\))?: .+")
GENESIS_RE = re.compile(r"^Genesis:\s*\d+,\s*Chapter:\s*(\d+|TBD)$", re.M)
WORK_ORDER_RE = re.compile(r"^Work Order:\s*(WO-[A-Za-z0-9-]+|none \([^)]+\))(\s*\([^)]*\))?(,\s*(WO-[A-Za-z0-9-]+)(\s*\([^)]*\))?)*$", re.M)
WHAT_CHANGED_RE = re.compile(r"^WHAT CHANGED:\n(?:- .+\n)+", re.M)
WHY_RE = re.compile(r"^WHY THIS MATTERS:\n.+", re.M)
AFFECTED_FILES_RE = re.compile(r"^AFFECTED FILES:\n(?:- .+\n)+", re.M)

def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: check_git_curator_commit_msg.py <commit_msg_file>")
        return 2
    text = Path(sys.argv[1]).read_text(encoding="utf-8", errors="ignore")
    lines = [line for line in text.splitlines() if not line.startswith('#')]
    clean_text = "\n".join(lines).strip() + "\n"
    first_line = lines[0].strip() if lines else ""
    if first_line.startswith("Merge ") or first_line.startswith("Revert "):
        return 0
    errors = []
    if not SUBJECT_RE.search(clean_text):
        errors.append("Subject must be a conventional commit, e.g. 'feat(scope): summary'.")
    if not WHAT_CHANGED_RE.search(clean_text):
        errors.append("Missing 'WHAT CHANGED:' section with bullet lines.")
    if not WHY_RE.search(clean_text):
        errors.append("Missing 'WHY THIS MATTERS:' section.")
    if not AFFECTED_FILES_RE.search(clean_text):
        errors.append("Missing 'AFFECTED FILES:' section with bullet lines.")
    if not GENESIS_RE.search(clean_text):
        errors.append("Missing/invalid footer: 'Genesis: N, Chapter: XX|TBD'.")
    if not WORK_ORDER_RE.search(clean_text):
        errors.append("Missing/invalid footer: 'Work Order: WO-XXXX' (or 'none (housekeeping)').")
    if errors:
        print("ERROR: Commit blocked by git-curator protocol hook.")
        print("Required commit template:\n")
        print("type(scope): Subject line\n")
        print("WHAT CHANGED:\n- ...\n")
        print("WHY THIS MATTERS:\n...\n")
        print("AFFECTED FILES:\n- ...\n")
        print("Genesis: N, Chapter: XX")
        print("Work Order: WO-XXXX\n")
        print("Details:")
        for err in errors:
            print(f"- {err}")
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
