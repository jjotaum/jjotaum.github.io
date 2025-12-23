fetch("apps/apps.json")
  .then((res) => res.json())
  .then((apps) => {
    const container = document.getElementById("app-list");

    apps.forEach((app) => {
      const card = document.createElement("div");
      card.className = "app-card";

      card.innerHTML = `
        <div class="app-image">
          <img src="${app.image}" alt="${app.title}"/>
        </div>
        <div class="app-content">
        <h2><a href="${app.link}" target="_blank" rel="noopener noreferrer">${app.title}</a></h2>
          ${app.subtitle ? `<small class="app-subtitle">${app.subtitle}</small>` : ""}
          <p>${app.description}</p>
          <p>
          ${app.privacy ? `<a class="app-link" href="privacy.html?app=${app.privacy}">Privacy Policy</a>` : ""}
          </p>
        </div>
      `;

      container.appendChild(card);
    });
  });
