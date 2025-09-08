document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    const start = 2024;
    const current = new Date().getFullYear();
    yearEl.textContent = current > start ? `${start}–${current}` : `${start}`;
  }
});
