/* Content is data-driven: add/edit objects here and the interface renders them automatically. */
const portfolioData = {
  /* How to make a new tab / Edit an Existing Tab */
  /* First go to index and find the comments in Window 2 and follow the steps. */
  /* Step 4 go down and find Step 5 which is a cons tabnames */
  /* ( TabName: [ {} ] ) to make a new tab in the current window */
  /* {} is a window, the individual boxes, inside the {} is the elements such as title: "". title: [""] gives it little boxes */


  /* CSS will handle everything as long as you input the proper things. -Felix */
  /* the design is VERY dynamic, add to your hearts content future me. Don't forget to double check with index. */
  projects: [
    {
      title: "CyberGuard: Cybersecurity Learning Platform",
      description: "A gamified learning platform designed to help students recognize common cybersecurity threats and practice safer online behavior.",
      image: "img/cyberguard.png",
      alt: "CyberGuard project preview",
      tags: ["Cybersecurity", "Gamification", "Web Learning"],
      url: "https://arckei.github.io/Website-CyberGuard/"
    },
    {
      title: "TechSort: Inventory & POS System",
      description: "A desktop point-of-sale and inventory application with stock tracking, transaction records, low-inventory alerts, and sales history.",
      image: "img/techsort.png",
      alt: "TechSort project preview",
      tags: ["C#", "WinForms", "SQL Server"]
    },
    {
      title: "Elyzium: Decendia",
      description: "A pixel-art dungeon-crawler concept following a hooded wanderer through the remains of heaven and the depths below.",
      image: "img/elyzium.png",
      alt: "Elyzium: Decendia project preview",
      tags: ["Pixel Art", "Game Design", "RPG"]
    }
  ],
  skills: [
  {
    title: "Programming",
    icon: "<>",
    tags: ["C#", "C++", "Java", "Kotlin"]
  },
  {
    title: "Web Development",
    icon: "🌐",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Database",
    icon: "🛢️",
    tags: ["Firebase", "MySQL"]
  },
  {
    title: "Tools & Technologies",
    icon: "🔧",
    tags: ["Unity", "Git", "GitHub", "Visual Studio", "VS Code", "Android Studio"]
  },
  {
    title: "Other Skills",
    icon: "⚙️",
    tags: [
      "UI/UX Design",
      "Software Development",
      "Database Management",
      "Troubleshooting",
      "Cybersecurity Fundamentals",
      "System Analysis"
    ]
  }
],
  journey: [
    { date: "2023 — Present", title: "BS Information Technology", description: "Pursuing a Bachelor of Science in Information Technology, with projects spanning software, databases, and cybersecurity." },
    { date: "2023 — Present", title: "Freelance PC Repair & Maintenance", description: "Hands-on desktop assembly, laptop troubleshooting, Windows recovery, component upgrades, and software setup." },
    { date: "Project work", title: "TechSort — POS & Inventory", description: "Worked on a database-driven desktop application, contributing to system design, development, and team coordination." },
    { date: "Project work", title: "CyberGuard — Learning Platform", description: "Contributed to a gamified cybersecurity-awareness project focused on helping students understand online threats." }
  ]
};

const projectGrid = document.querySelector("#project-grid");
const skillsGrid = document.querySelector("#skills-grid");
const timeline = document.querySelector("#timeline");

function renderProjects() {
  projectGrid.innerHTML = portfolioData.projects.map((project) => {
    const tags = (project.tags || []).map(tag => `<span class="tech-tag">${escapeHTML(tag)}</span>`).join("");
    const content = `
      <div class="project-image"><img src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.alt || project.title)}" loading="lazy"></div>
      <div class="project-info"><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p></div>
      <div class="project-tags">${tags}</div>`;
    return project.url
      ? `<a class="project-card" href="${escapeAttribute(project.url)}" target="_blank" rel="noopener noreferrer">${content}</a>`
      : `<article class="project-card">${content}</article>`;
  }).join("");
  document.querySelector("#project-count").textContent = `${String(portfolioData.projects.length).padStart(2, "0")} ITEMS`;
}
function renderSkills() {
  skillsGrid.innerHTML = portfolioData.skills.map(skill => `
    <article class="skill-card">
      <div class="skill-card-header">
        <span class="skill-icon">${escapeHTML(skill.icon)}</span>
        <h3>${escapeHTML(skill.title)}</h3>
      </div>

      <div class="skill-tags">
        ${(skill.tags || []).map(tag => `
          <span class="tech-tag">${escapeHTML(tag)}</span>
        `).join("")}
      </div>
    </article>
  `).join("");

  document.querySelector("#skill-count").textContent =
    `${String(portfolioData.skills.length).padStart(2, "0")} GROUPS`;
}
function renderJourney() {
  timeline.innerHTML = portfolioData.journey.map(item => `
    <article class="timeline-item"><div class="timeline-date">${escapeHTML(item.date)}</div>
      <div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div>
    </article>
  `).join("");
}
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function escapeAttribute(value = "") { return escapeHTML(value); }


/* Step 5: see that const tabNames? inside that field add the name of the data-tab you made in Step 2 like (data-tabName: "Title")*/
/* After that the script should automatically render your new tab */
const tabs = [...document.querySelectorAll(".app-tab")];
const panels = [...document.querySelectorAll(".tab-panel")];
const tabNames = { projects: "Projects", skills: "Skills", journey: "My Journey" };
function activateTab(name, focus = false) {
  tabs.forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panels.forEach(panel => { panel.hidden = panel.id !== `panel-${name}`; });
  document.querySelector("#address-current").textContent = tabNames[name] || name;
  document.querySelector("#status-message").textContent = `${tabNames[name] || name} selected`;
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  tab.addEventListener("keydown", event => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    activateTab(tabs[next].dataset.tab, true);
  });
});

renderProjects();
renderSkills();
renderJourney();
activateTab("projects");


// Cool ass Intro AKA Retro Loading Screen
(() => {
  const screen = document.querySelector("#boot-screen");
  if (!screen) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let alreadyShown = false;
  try { alreadyShown = sessionStorage.getItem("seinzxBootShown") === "1"; } catch (_) {}

  if (alreadyShown) {
    screen.remove();
    return;
  }

  const fill = document.querySelector("#boot-progress-fill");
  const progress = document.querySelector("#boot-progress");
  const percent = document.querySelector("#boot-percent");
  const message = document.querySelector("#boot-message");
  const stages = [
    { at: 0, text: "Initializing desktop..." },
    { at: 24, text: "Loading profile..." },
    { at: 49, text: "Preparing projects..." },
    { at: 76, text: "Arranging workspace..." },
    { at: 94, text: "Almost ready..." }
  ];
  const duration = reducedMotion ? 450 : 2300;
  const start = performance.now();
  let lastStage = -1;

  function finish() {
    try { sessionStorage.setItem("seinzxBootShown", "1"); } catch (_) {}
    screen.classList.add("is-leaving");
    window.setTimeout(() => screen.remove(), reducedMotion ? 30 : 600);
  }

  function tick(now) {
    const elapsed = now - start;
    const raw = Math.min(100, (elapsed / duration) * 100);
    // Ease the bar slightly while keeping the final completion predictable.
    const value = Math.round(100 * (1 - Math.pow(1 - raw / 100, 1.65)));
    fill.style.width = `${value}%`;
    progress.setAttribute("aria-valuenow", String(value));
    percent.textContent = `${value}%`;

    const stageIndex = stages.reduce((found, stage, index) => value >= stage.at ? index : found, 0);
    if (stageIndex !== lastStage) {
      message.textContent = stages[stageIndex].text;
      lastStage = stageIndex;
    }

    if (raw >= 100) finish();
    else window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
})();
