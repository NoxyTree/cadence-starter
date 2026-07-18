# Free Cadence approval-fingerprint sample

This dependency-free Python sample proves one specific Cadence Starter idea: an approval should be attached to the exact content reviewed, not merely remembered as a green checkbox.

It is deliberately tiny and is **not** the paid source bundle. The bundle contains the complete Cadence Starter engine for declared stages, dependencies, stale-output resolution, next-action selection, safe command execution, schemas, templates, and a worked project; it also contains the separate Approval Guard Kit for named drop-in gates, recursive manifests, JSON output, and CI-safe exit codes. Together they include 31 automated tests.

## Try it in two minutes

Requires Python 3.10 or newer. From this folder:

```text
python cadence_sample.py status demo script.md
python cadence_sample.py approve demo script.md
python cadence_sample.py status demo script.md
```

Now edit `demo/script.md`, save it, and run the final status command again:

```text
python cadence_sample.py status demo script.md
```

You will see `STALE` and `BLOCKED`, because the current SHA-256 fingerprint no longer matches the reviewed one. Run the approval command only after reviewing the change.

## Get the complete source bundle

Cadence Starter tracks real files and dependencies, blocks unsafe downstream work, and names the next safe action. Approval Guard Kit packages the stale-approval rule as a focused dependency-free tool for pipelines that already exist. Both are readable local Python source.

- Product walkthrough: https://noxytree.github.io/cadence-starter/
- Exact 72-file / 31-test delivery receipt: https://noxytree.github.io/cadence-starter/bundle-receipt/
- Launch-day checkout: code `FIRSTSALE` reduces the $7-or-more base price to $1.05 through 23:59 UK time on 18 July 2026: https://ko-fi.com/noxytree/link/FIRSTSALE

No Claude, OpenAI, hosted account, telemetry, or subscription is required.
