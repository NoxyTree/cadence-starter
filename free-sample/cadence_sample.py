#!/usr/bin/env python3
"""Cadence Approval Fingerprint Sample.

A deliberately small, dependency-free demonstration of content-bound approvals.
It is not the paid Cadence Starter engine.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path


STATE_FILE = ".cadence-sample.json"


def fingerprint(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def state_path(project: Path) -> Path:
    return project / STATE_FILE


def load_state(project: Path) -> dict[str, dict[str, str]]:
    path = state_path(project)
    if not path.exists():
        return {"approvals": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def save_state(project: Path, state: dict[str, dict[str, str]]) -> None:
    state_path(project).write_text(
        json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )


def target(project: Path, relative: str) -> Path:
    candidate = (project / relative).resolve()
    root = project.resolve()
    if candidate != root and root not in candidate.parents:
        raise SystemExit("Refusing a path outside the project directory.")
    if not candidate.is_file():
        raise SystemExit(f"File not found: {candidate}")
    return candidate


def approve(project: Path, relative: str) -> int:
    item = target(project, relative)
    state = load_state(project)
    state["approvals"][relative] = fingerprint(item)
    save_state(project, state)
    print(f"APPROVED  {relative}")
    print("Approval is bound to the file's exact SHA-256 fingerprint.")
    return 0


def status(project: Path, relative: str) -> int:
    item = target(project, relative)
    recorded = load_state(project)["approvals"].get(relative)
    current = fingerprint(item)
    if recorded is None:
        print(f"WAITING   {relative} has not been approved")
        print("NEXT      review the file, then run the approve command")
        return 2
    if recorded != current:
        print(f"STALE     {relative} changed after approval")
        print("BLOCKED   downstream work must not continue")
        print("NEXT      review the change and approve the new fingerprint")
        return 3
    print(f"CURRENT   {relative} matches its approved fingerprint")
    print("NEXT      downstream work may continue")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="See how content-bound approvals catch changed files."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)
    for command in ("approve", "status"):
        sub = subparsers.add_parser(command)
        sub.add_argument("project", type=Path)
        sub.add_argument("file")
    args = parser.parse_args()
    args.project.mkdir(parents=True, exist_ok=True)
    if args.command == "approve":
        return approve(args.project, args.file)
    return status(args.project, args.file)


if __name__ == "__main__":
    raise SystemExit(main())
