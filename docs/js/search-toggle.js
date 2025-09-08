document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");

  if (!searchIcon || !searchInput || !searchContainer) return;

  let timeoutId;

  searchIcon.addEventListener("click", () => {
    searchContainer.classList.add("active");
    searchInput.focus();
  });

  searchInput.addEventListener("blur", () => {
    timeoutId = setTimeout(() => {
      searchContainer.classList.remove("active");
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
    }, 200);
  });

  searchInput.addEventListener("focus", () => {
    if (timeoutId) clearTimeout(timeoutId);
  });
});
