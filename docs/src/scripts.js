// Fetch JSON content and populate the page
// Function to fetch JSON content and populate the page
async function loadJSONContent() {
  try {
    const response = await fetch("content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Populate Hero Section
    const heroTitle = document.getElementById("hero-title");
    const heroDescription = document.getElementById("hero-description");
    const heroImage = document.getElementById("hero-image");

    heroTitle.textContent = data.hero.title || "Default Title";
    heroDescription.textContent =
      data.hero.description || "Default Description";
    heroImage.src = data.hero.image || "default-image.jpg";

    // Populate About Section
    const aboutTitle = document.getElementById("about-title");
    const aboutDescription = document.getElementById("about-description");

    aboutTitle.textContent = data.about.title || "Default About Title";
    aboutDescription.textContent =
      data.about.description || "Default About Description";

    // Populate Featured Project
    if (data.featuredProject) {
      const featuredProjectContainer = document.getElementById(
        "featured-project-content",
      );
      const featuredProjectCard = document.createElement("a");
      featuredProjectCard.href = data.featuredProject.link || "#";
      featuredProjectCard.classList.add("featured-project-card");

      const featuredProjectImage = document.createElement("img");
      featuredProjectImage.src =
        data.featuredProject.image || "default-featured-project.jpg";
      featuredProjectImage.alt = `${data.featuredProject.name} Image`;
      featuredProjectImage.classList.add("featured-project-image");

      const featuredProjectInfo = document.createElement("div");
      featuredProjectInfo.classList.add("featured-project-info");

      const featuredProjectName = document.createElement("h3");
      featuredProjectName.textContent =
        data.featuredProject.name || "Default Featured Project Name";

      const featuredProjectDescription = document.createElement("p");
      featuredProjectDescription.textContent =
        data.featuredProject.description ||
        "Default Featured Project Description";

      featuredProjectInfo.appendChild(featuredProjectName);
      featuredProjectInfo.appendChild(featuredProjectDescription);

      featuredProjectCard.appendChild(featuredProjectImage);
      featuredProjectCard.appendChild(featuredProjectInfo);

      featuredProjectContainer.appendChild(featuredProjectCard);
    }

    // Populate Regular Projects Section
    const projectsContent = document.getElementById("projects-content");
    if (data.projects && data.projects.length) {
      data.projects.forEach((project) => {
        const projectCard = document.createElement("a");
        projectCard.href = project.link || "#";
        projectCard.classList.add("project-card");

        const projectImage = document.createElement("img");
        projectImage.src = project.image || "default-project.jpg";
        projectImage.alt = `${project.name} Image`;
        projectImage.classList.add("project-image");

        const projectInfo = document.createElement("div");
        projectInfo.classList.add("project-info");

        const projectName = document.createElement("h3");
        projectName.textContent = project.name || "Default Project Name";

        const projectDescription = document.createElement("p");
        projectDescription.textContent =
          project.description || "Default Project Description";

        projectInfo.appendChild(projectName);
        projectInfo.appendChild(projectDescription);

        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectInfo);

        projectsContent.appendChild(projectCard);
      });
    } else {
      projectsContent.innerHTML = "<p>No projects available.</p>";
    }

    // Populate Skills Section
    const skillsContent = document.getElementById("skills-content");
    if (data.skills && data.skills.length) {
      data.skills.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.textContent = skill || "Default Skill";
        skillsContent.appendChild(skillItem);
      });
    } else {
      skillsContent.innerHTML = "<li>No skills listed.</li>";
    }
  } catch (error) {
    console.error("Failed to load JSON content:", error);
  }
}

// Function to generate random pastel color
function randomPastelColor() {
  const r = Math.floor(Math.random() * 127 + 128);
  const g = Math.floor(Math.random() * 127 + 128);
  const b = Math.floor(Math.random() * 127 + 128);
  return `rgb(${r},${g},${b})`;
}

// Function to handle theme toggle
function handleThemeToggle() {
  const themeToggleCheckbox = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    themeToggleCheckbox.checked = savedTheme === "dark";
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    root.setAttribute("data-theme", "dark");
    themeToggleCheckbox.checked = true;
  }

  themeToggleCheckbox.addEventListener("change", () => {
    const newTheme = themeToggleCheckbox.checked ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Function to set random pastel background for hero section
function setRandomBackground() {
  document.querySelector(".hero").style.backgroundColor = randomPastelColor();
}

// Initialize the app
function init() {
  loadJSONContent();
  handleThemeToggle();
  setRandomBackground();
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", init);
