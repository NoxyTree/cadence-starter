const steps = [
  {
    label: "1 / 4 — inspect the project",
    command: "cadence status documentary-demo",
    output: [
      ["source_review", "complete", "reviewed sources are current"],
      ["script", "complete", "script fingerprint matches approval"],
      ["scene_plan", "complete", "required output is current"],
      ["rough_cut", "not_started", "missing renders/rough-cut.mp4"]
    ]
  },
  {
    label: "2 / 4 — change an approved file",
    command: "edit script/script.md",
    notice: "Saved a revised final paragraph. The previous approval now refers to different content."
  },
  {
    label: "3 / 4 — Cadence catches the change",
    command: "cadence status documentary-demo",
    output: [
      ["source_review", "complete", "reviewed sources are current"],
      ["script", "waiting_for_approval", "reviewed content changed"],
      ["scene_plan", "blocked", "waiting for script"],
      ["rough_cut", "blocked", "waiting for scene_plan"]
    ]
  },
  {
    label: "4 / 4 — the next safe action is explicit",
    command: "cadence next documentary-demo",
    notice: "script: waiting_for_approval\nCommand: cadence approve documentary-demo script --by YOUR_NAME"
  }
];

const command = document.querySelector("#command");
const output = document.querySelector("#terminal-output");
const label = document.querySelector("#step-label");
const replay = document.querySelector("#replay");
let stepIndex = 0;
let timer;

function statusClass(value) {
  if (value === "complete") return "complete";
  if (value === "waiting_for_approval" || value === "not_started") return "waiting";
  if (value === "blocked") return "blocked";
  return "stale";
}

function renderStep(index) {
  const step = steps[index];
  command.textContent = step.command;
  label.textContent = step.label;
  output.replaceChildren();
  if (step.output) {
    step.output.forEach((line, lineIndex) => {
      const row = document.createElement("div");
      row.className = "output-line";
      row.style.animationDelay = `${lineIndex * 120}ms`;
      const id = document.createElement("span");
      id.textContent = line[0];
      const status = document.createElement("span");
      status.className = statusClass(line[1]);
      status.textContent = line[1];
      const reason = document.createElement("em");
      reason.textContent = line[2];
      row.append(id, status, reason);
      output.append(row);
    });
  } else {
    step.notice.split("\n").forEach((text, lineIndex) => {
      const row = document.createElement("div");
      row.className = "notice-line";
      row.style.animationDelay = `${lineIndex * 160}ms`;
      row.textContent = text;
      output.append(row);
    });
  }
}

function startDemo() {
  clearInterval(timer);
  stepIndex = 0;
  renderStep(stepIndex);
  timer = setInterval(() => {
    stepIndex = (stepIndex + 1) % steps.length;
    renderStep(stepIndex);
  }, 3600);
}

replay?.addEventListener("click", startDemo);
if (command && output && label) startDemo();

document.querySelectorAll("[data-buy]").forEach(link => {
  link.addEventListener("click", () => {
    try { sessionStorage.setItem("cadence_last_cta", link.textContent.trim()); } catch (_) {}
  });
});

