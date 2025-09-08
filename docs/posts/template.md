# Welcome to My Dev Blog

Writing clean, minimal blogs using **Markdown**, static files, and a sprinkle of JavaScript is easier than you might think. In this post, I’ll show you how I built this blog using plain HTML, CSS, and JS — and how you can do the same.

---

## 🧠 Why Markdown?

Markdown is a lightweight markup language that lets you write using an easy-to-read, easy-to-write plain text format. It’s perfect for:

- Blog posts
- Documentation
- Notes

---

## ⚙️ How This Blog Works

This blog is entirely static. It:

- Loads a list of blog posts from a `posts.json` file
- Loads Markdown content via `fetch()`
- Renders it in the browser with a custom parser

---

## 💻 Embedded Code Example

Here’s how we load and render Markdown in the post view:

```html
<script>
  const params = new URLSearchParams(location.search);
  const file = params.get("file");
  fetch(`posts/${file}.md`)
    .then(res => res.text())
    .then(md => {
      document.getElementById("content").innerHTML = markdown.toHTML(md);
    });
</script>
```
