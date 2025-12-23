document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("post-list");
  const searchInput = document.getElementById("search-input");
  const paginationContainer = document.getElementById("pagination");
  const POSTS_PER_PAGE = 5;

  let allPosts = [];
  let filteredPosts = [];
  let currentPage = 1;

  fetch("posts/posts.json")
    .then((response) => response.json())
    .then((posts) => {
      const loadPromises = posts.map((post) => {
        return fetch(`posts/${post.filename}.md`)
          .then((res) => res.text())
          .then((content) => {
            return {
              ...post,
              content: content.toLowerCase(),
              displayContent: content,
            };
          });
      });

      Promise.all(loadPromises).then((results) => {
        allPosts = results;
        filteredPosts = [...allPosts];
        renderPage(1);
      });
    });

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        (post.tags || []).join(" ").toLowerCase().includes(query) ||
        post.content.includes(query),
    );
    renderPage(1);
  });

  function renderPage(page) {
    currentPage = page;
    postList.innerHTML = "";
    paginationContainer.innerHTML = "";

    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const pagePosts = filteredPosts.slice(start, end);

    pagePosts.forEach((post) => {
      const li = document.createElement("li");
      li.className = "blog-entry";

      const preview = extractPreview(post.displayContent);
      const wordCount = countWords(post.displayContent);
      const readTime = estimateReadTime(wordCount);
      const formattedDate = formatDate(post.date);

      li.innerHTML = `
        <h2><a class="entry-title" href="post.html?post=${post.filename}">${post.title}</a></h2>
        <small>${formattedDate} · ${readTime}</small>
        <p>${preview}</p>
        ${
          post.tags?.length
            ? `<div class="tag-list">${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`
            : ""
        }
      `;
      postList.appendChild(li);
    });

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    if (totalPages <= 1) return;

    const nav = document.createElement("div");
    nav.className = "pagination-nav";

    if (currentPage > 1) {
      const prev = document.createElement("button");
      prev.textContent = "Previous";
      prev.onclick = () => renderPage(currentPage - 1);
      nav.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.disabled = true;
      btn.onclick = () => renderPage(i);
      nav.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const next = document.createElement("button");
      next.textContent = "Next";
      next.onclick = () => renderPage(currentPage + 1);
      nav.appendChild(next);
    }

    paginationContainer.appendChild(nav);
  }

  function extractPreview(content) {
    const lines = content.split("\n");
    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("![")) {
        const truncated =
          trimmed.length > 300 ? trimmed.slice(0, 300) + "…" : trimmed;
        return marked.parseInline(truncated);
      }
    }
    return "(No preview available)";
  }

  function countWords(text) {
    return text.trim().split(/\s+/).length;
  }

  function estimateReadTime(words) {
    const wpm = 200;
    const minutes = Math.max(1, Math.round(words / wpm));
    return `${minutes} min read`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
});
