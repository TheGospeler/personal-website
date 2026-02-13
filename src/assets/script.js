(function(){
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  const themeKey = "jsalako_theme";
  const root = document.documentElement;

  function setTheme(t){
    root.setAttribute("data-theme", t);
    localStorage.setItem(themeKey, t);
    const btn = $("#themeBtn");
    if(btn) btn.setAttribute("aria-label", (t === "light") ? "Switch to dark mode" : "Switch to light mode");
  }

  function initTheme(){
    const saved = localStorage.getItem(themeKey);
    if(saved){ setTheme(saved); return; }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  function initNav(){
    const page = document.body.getAttribute("data-page") || "home";
    $$("[data-nav]").forEach(a => {
      if(a.getAttribute("data-nav") === page) a.classList.add("active");
    });

    const nav = $(".nav");
    const btn = $("#menuBtn");
    if(btn && nav){
      btn.addEventListener("click", () => nav.classList.toggle("open"));
    }
  }

  function safeText(str){ return (str ?? "").toString(); }

  function renderTimeline(targetId, items){
    const el = document.getElementById(targetId);
    if(!el) return;
    el.innerHTML = items.map(it => `
      <div class="tl-item">
        <div>
          <div class="tl-time">${safeText(it.time)}</div>
          <div class="tl-sub">${safeText(it.where || "")}</div>
        </div>
        <div>
          <div class="tl-title">${safeText(it.role)} • ${safeText(it.org)}</div>
          ${it.bullets && it.bullets.length ? `<ul style="margin:10px 0 0; padding-left: 18px; color: var(--muted); font-size:14px">
            ${it.bullets.map(b=>`<li>${safeText(b)}</li>`).join("")}
          </ul>` : ""}
          ${it.tags && it.tags.length ? `<div class="tags">${it.tags.map(t=>`<span class="tag">${safeText(t)}</span>`).join("")}</div>` : ""}
        </div>
      </div>
    `).join("");
  }

  function renderCards(targetId, items, cardBuilder){
    const el = document.getElementById(targetId);
    if(!el) return;
    el.innerHTML = items.map(cardBuilder).join("");
  }

  function linkList(links){
    if(!links || !links.length) return "";
    return `<div class="meta">${links.map(l => `<span>↗ <a class="inline" href="${l.href}">${safeText(l.label)}</a></span>`).join("")}</div>`;
  }

  function initPage(){
    const data = window.SITE_DATA || {};
    const page = document.body.getAttribute("data-page") || "home";
// Simple header fields
    const hName = $("#name");
    const hHeadline = $("#headline");
    const hLocation = $("#location");
    if(hName && data.site?.name) hName.textContent = data.site.name;
    if(hHeadline && data.site?.headline) hHeadline.textContent = data.site.headline;
    if(hLocation && data.site?.location) hLocation.textContent = data.site.location;

    // Links
    const links = $("#quickLinks");
    if(links && data.site?.links){
      links.innerHTML = data.site.links.map(l => `<a href="${l.href}">${safeText(l.label)}</a>`).join("");}

    // Skills
    const skills = $("#skills");
    if(skills && data.site?.skills){
      skills.innerHTML = data.site.skills.map(s => `<span class="tag">${safeText(s)}</span>`).join("");
    }

    if(page === "work"){
      renderTimeline("timeline", data.work || []);
    }

    if(page === "education"){
      renderCards("cards", data.education || [], (e)=>`
        <div class="card col-12">
          <h3>${safeText(e.degree)}</h3>
          <p><b>${safeText(e.school)}</b> • ${safeText(e.time)}</p>
          ${e.details?.length ? `<div class="meta">${e.details.map(d=>`<span>• ${safeText(d)}</span>`).join("")}</div>` : ""}
        </div>
      `);

      const awardsWrap = document.getElementById("awardsCards");
      if(awardsWrap){
        renderCards("awardsCards", data.awards || [], (a)=>`
          <div class="card col-12">
            <h3>${safeText(a.title)}</h3>
            <p><b>${safeText(a.issuer)}</b> • ${safeText(a.year)}</p>
            <div class="meta"><span>${safeText(a.details)}</span></div>
          </div>
        `);
      }
    }

    if(page === "awards"){
      renderCards("cards", data.awards || [], (a)=>`
        <div class="card col-12">
          <h3>${safeText(a.title)}</h3>
          <p><b>${safeText(a.issuer)}</b> • ${safeText(a.year)}</p>
          <div class="meta"><span>${safeText(a.details)}</span></div>
        </div>
      `);
    }

    if(page === "current"){
      renderCards("cards", data.currentProjects || [], (p)=>{
        const title = (p.title || "").toLowerCase();
        const isMap = title.includes("regional-scale") && title.includes("field mapping");
        return `
        <div class="card ${isMap ? "col-12" : "col-6"}">
          <h3>${safeText(p.title)}</h3>
          <p>${safeText(p.desc)}</p>
          ${isMap ? `
            <div class="map-gif-wrap" aria-label="Regional field mapping animation">
              <img class="map-gif" src="assets/regional_fields.gif" alt="Regional-scale field mapping animation"/>
            </div>
          ` : ``}
          ${p.tags?.length ? `<div class="tags">${p.tags.map(t=>`<span class="tag">${safeText(t)}</span>`).join("")}</div>` : ""}
        </div>
      `});
    }

    if(page === "projects"){
      renderCards("cards", data.projects || [], (p)=>`
        <div class="card col-6">
          <h3>${safeText(p.title)} <small>(${safeText(p.year)})</small></h3>
          <p>${safeText(p.desc)}</p>
          ${p.tags?.length ? `<div class="tags">${p.tags.map(t=>`<span class="tag">${safeText(t)}</span>`).join("")}</div>` : ""}
          ${linkList(p.links)}
        </div>
      `);

      const webWrap = document.getElementById("webappsCards");
      if(webWrap){
        renderCards("webappsCards", data.webapps || [], (w)=>`
          <div class="card col-6">
            <h3>${safeText(w.title)}</h3>
            <p>${safeText(w.desc)}</p>
            <div class="meta"><span>↗ <a class="inline" href="${w.href}">Open</a></span></div>
          </div>
        `);
      }
    }

    if(page === "publications"){
      const wrap = $("#pubs");
      if(wrap){
        const groups = data.publications || [];
        wrap.innerHTML = groups.map(g => `
          <div class="card col-12">
            <h3>${safeText(g.type)}</h3>
            <div class="timeline" style="gap:10px">
              ${(g.items||[]).map(it => `
                <div class="tl-item" style="grid-template-columns: 1fr">
                  <div>
                    <div class="tl-title">${safeText(it.title)}</div>
                    <div class="tl-sub">${safeText(it.venue)} • ${safeText(it.year)}</div>
                    ${linkList(it.links)}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("");
      }
    }

    if(page === "webapps"){
      renderCards("cards", data.webapps || [], (w)=>`
        <div class="card col-6">
          <h3>${safeText(w.title)}</h3>
          <p>${safeText(w.desc)}</p>
          <div class="meta"><span>↗ <a class="inline" href="${w.href}">Open</a></span></div>
        </div>
      `);
    }
  }

  function initScrollReveal(){
    const targets = $$(".card, .tl-item");
    targets.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(el => observer.observe(el));
  }

  function initBackToTop(){
    const btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "\u2191";
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    initTheme();
    initNav();
    initPage();
    initScrollReveal();
    initBackToTop();
    const themeBtn = document.getElementById("themeBtn");
    if(themeBtn){
      themeBtn.addEventListener("click", ()=>{
        const cur = root.getAttribute("data-theme") || "dark";
        setTheme(cur === "dark" ? "light" : "dark");
      });
    }
  });
})();
