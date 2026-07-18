# Free Cadence approval-fingerprint sample

This dependency-free Python sample proves one specific Cadence Starter idea: an approval should be attached to the exact content reviewed, not merely remembered as a green checkbox.

It is deliberately tiny and is **not** the paid Cadence Starter engine. The full product adds declared stages and dependencies, stale-output resolution, downstream blocking, next-action selection, safe command execution, editable registries, schemas, templates, a worked project, documentation, and 18 automated tests.

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

## Get the complete engine

Cadence Starter is local Python source for solo media pipelines. It tracks real files and dependencies, invalidates stale approvals, blocks unsafe downstream work, and names the next safe action.

- Product walkthrough: https://noxytree.github.io/cadence-starter/
- Founding offer: https://ko-fi.com/s/a8645f925f

No Claude, OpenAI, hosted account, telemetry, or subscription is required.
