document.querySelectorAll("[data-buy]").forEach(link => {
  link.addEventListener("click", () => {
    try { sessionStorage.setItem("cadence_last_cta", link.textContent.trim()); } catch (_) {}
  });
});
