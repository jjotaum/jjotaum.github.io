document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container");
  const featuredProjectContainer = document.getElementById(
    "featured-project-container",
  );
  let page = 1;
  const perPage = 3;

  async function loadProjects() {
    const response = await fetch("projects.md");
    const text = await response.text();
    const projects = parseMarkdown(text);

    displayProjects(projects.slice((page - 1) * perPage, page * perPage));
    page += 1;
  }

  async function loadFeaturedProject() {
    const response = await fetch("featured_project.md");
    const text = await response.text();
    const project = parseMarkdown(text)[0]; // Assuming the featured project markdown contains only one project

    if (project) {
      const featuredProjectCard = createFeaturedProjectCard(project);
      featuredProjectContainer.appendChild(featuredProjectCard);
    }
  }

  function parseMarkdown(markdown) {
    const lines = markdown.split("\n");
    const projects = [];
    let project = {};

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        if (project.title) projects.push(project);
        project = { title: line.replace("# ", ""), description: "" };
      } else if (line.startsWith("Link: ")) {
        project.link = line.replace("Link: ", "");
      } else if (line.startsWith("Icon: ")) {
        project.icon = line.replace("Icon: ", "");
      } else {
        project.description += line + "\n";
      }
    });

    if (project.title) projects.push(project);
    return projects;
  }

  function displayProjects(projects) {
    projects.forEach((project) => {
      const projectCard = createProjectCard(project);
      projectsContainer.appendChild(projectCard);
    });
  }

  function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";
    const bgColor = getRandomPastelColor();
    card.style.backgroundColor = bgColor;
    card.style.color = getComplementaryColor(bgColor);

    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = project.description.trim();
    card.appendChild(description);

    const link = document.createElement("a");
    link.href = project.link;
    link.textContent = "View Project";
    card.appendChild(link);

    if (project.icon) {
      const icon = document.createElement("img");
      icon.src = project.icon;
      icon.className = "icon";
      card.appendChild(icon);
    }

    return card;
  }

  function createFeaturedProjectCard(project) {
    const card = document.createElement("div");
    card.className = "featured-project-card";
    const bgColor = getRandomPastelColor();
    card.style.backgroundColor = bgColor;
    card.style.color = getComplementaryColor(bgColor);

    if (project.icon) {
      const icon = document.createElement("img");
      icon.src = project.icon;
      card.appendChild(icon);
    }

    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = project.description.trim();
    card.appendChild(description);

    const link = document.createElement("a");
    link.href = project.link;
    link.textContent = "Download App";
    card.appendChild(link);

    return card;
  }

  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 90%)`;
  }

  function getComplementaryColor(color) {
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;
    const complementary = [255 - r, 255 - g, 255 - b];
    return `rgb(${complementary.join(",")})`;
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadProjects();
    }
  }

  window.addEventListener("scroll", handleScroll);
  loadProjects();
  loadFeaturedProject();
});
