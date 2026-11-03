/* Sift Sweets site script: shared header/footer, intro animation and page renderers */
(function () {
  "use strict";

  var RECIPES = (window.SIFT_RECIPES || []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });
  var page = document.body.getAttribute("data-page");
  var badgeCount = 0;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  function url(r) { return "recipe.html?r=" + encodeURIComponent(r.slug); }
  function slugify(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function $(sel) { return document.querySelector(sel); }

  /* Logo badge, rebuilt as SVG from the @siftsweetstx profile mark */
  function badge(extraClass) {
    var id = "arc" + (++badgeCount);
    return (
      '<svg class="badge ' + (extraClass || "") + '" viewBox="0 0 200 200" role="img" aria-label="Sift Sweets, homemade baked goods, established 2022">' +
      '<circle class="badge-circle" cx="100" cy="100" r="96" fill="#cac092"/>' +
      '<circle class="badge-ring" cx="100" cy="100" r="96" fill="none" stroke="#a89b62" stroke-width="1.5"/>' +
      '<path id="' + id + '" d="M 30,104 A 70,70 0 0 1 170,104" fill="none"/>' +
      '<text class="badge-arc" fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="11.5" font-weight="500" letter-spacing="2.6">' +
      '<textPath href="#' + id + '" startOffset="50%" text-anchor="middle">HOMEMADE BAKED GOODS</textPath></text>' +
      '<text class="badge-word badge-word--1" x="100" y="94" text-anchor="middle" fill="#fff" font-family="Cormorant Garamond, Georgia, serif" font-size="32" font-weight="500">sift</text>' +
      '<text class="badge-word badge-word--2" x="100" y="121" text-anchor="middle" fill="#fff" font-family="Cormorant Garamond, Georgia, serif" font-size="36" font-weight="700">sweets</text>' +
      '<path class="badge-stand" d="M 58,130 L 142,130 M 94,130 L 97,143 L 103,143 L 106,130 M 86,148 Q 100,141 114,148" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text class="badge-est" x="100" y="172" text-anchor="middle" fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="10" letter-spacing="2">EST. 2022</text>' +
      "</svg>"
    );
  }

  /* ---------- shared header + footer ---------- */
  var NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "recipes.html", label: "Recipes", key: "recipes" },
    { href: "archives.html", label: "Archives", key: "archives" },
    { href: "about.html", label: "About", key: "about" },
    { href: "search.html", label: "Search", key: "search", icon: true }
  ];
  var searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';
  var igIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';

  var header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<a class="brand" href="index.html" aria-label="Sift Sweets home">' +
      '<span class="brand__mark">' + badge() + "</span>" +
      '<span class="brand__name">sift sweets</span>' +
      '<span class="brand__sub eyebrow">Homemade Baked Goods &middot; Texas</span></a>' +
      '<nav class="nav" aria-label="Main"><ul>' +
      NAV.map(function (n) {
        return '<li><a href="' + n.href + '"' + (n.key === page ? ' aria-current="page"' : "") +
          (n.icon ? ' class="nav__search"' : "") + ">" + (n.icon ? searchIcon : "") + n.label + "</a></li>";
      }).join("") +
      "</ul></nav>";
  }

  var footer = $("#site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      badge() +
      "<nav>" + NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + "</a>"; }).join("") +
      '<a href="https://www.instagram.com/siftsweetstx/" target="_blank" rel="noopener">Instagram</a></nav>' +
      "<small>&copy; " + new Date().getFullYear() + " Sift Sweets &middot; Baked with love in Texas since 2022</small>";
  }

  /* ---------- cover animation (home page) ---------- */
  var intro = $("#intro");
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem("sift-intro") === "1"; } catch (e) {}
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      intro.remove();
    } else {
      intro.querySelector(".intro__badge").innerHTML = badge();
      var flour = intro.querySelector(".flour");
      for (var i = 0; i < 46; i++) {
        var s = document.createElement("span");
        var size = 2 + Math.random() * 5;
        s.style.width = s.style.height = size + "px";
        s.style.left = Math.random() * 100 + "%";
        s.style.animationDuration = 4 + Math.random() * 5 + "s";
        s.style.animationDelay = Math.random() * 3 + "s";
        s.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
        s.style.setProperty("--drift", (Math.random() * 80 - 40).toFixed(0) + "px");
        flour.appendChild(s);
      }
      document.body.style.overflow = "hidden";
      var finish = function () {
        if (intro.classList.contains("is-done")) return;
        intro.classList.add("is-done");
        document.body.style.overflow = "";
        try { sessionStorage.setItem("sift-intro", "1"); } catch (e) {}
        setTimeout(function () { intro.remove(); }, 1400);
      };
      setTimeout(finish, 3800);
      intro.querySelector(".intro__skip").addEventListener("click", finish);
      intro.addEventListener("click", finish);
    }
  }

  /* ---------- shared bits ---------- */
  function card(r) {
    return (
      '<a class="card reveal" href="' + url(r) + '">' +
      '<div class="card__img"><img src="' + r.image + '" alt="' + esc(r.alt) + '" loading="lazy"></div>' +
      '<span class="eyebrow">' + esc(r.category) + "</span>" +
      "<h3>" + esc(r.title) + "</h3>" +
      '<span class="post-date">' + fmtDate(r.date) + "</span></a>"
    );
  }
  function categories() {
    var map = {};
    RECIPES.forEach(function (r) { (map[r.category] = map[r.category] || []).push(r); });
    return map;
  }
  function sidebar() {
    var cats = categories();
    return (
      '<div class="about-card">' + badge() +
      "<h3>Hi, we&rsquo;re Sift Sweets</h3>" +
      "<p>A little Texas home bakery sharing the recipes behind our cookies, cupcakes and celebration desserts. Grab a whisk and bake along.</p>" +
      '<a class="btn" href="about.html">Read more</a></div>' +
      '<div class="side-list"><h4>Recipe categories</h4><ul>' +
      Object.keys(cats).sort().map(function (c) {
        return '<li><a href="recipes.html#' + slugify(c) + '">' + esc(c) + '<span class="count">' + cats[c].length + "</span></a></li>";
      }).join("") +
      "</ul></div>" +
      '<div class="side-list"><h4>Recently baked</h4><ul>' +
      RECIPES.slice(0, 5).map(function (r) { return '<li><a href="' + url(r) + '">' + esc(r.title) + "</a></li>"; }).join("") +
      "</ul></div>" +
      '<a class="ig" href="https://www.instagram.com/siftsweetstx/" target="_blank" rel="noopener">' + igIcon + "@siftsweetstx</a>"
    );
  }

  /* ---------- page renderers ---------- */
  var renderers = {
    home: function () {
      var latest = RECIPES[0];
      $("#feature").innerHTML =
        '<article class="post-feature">' +
        '<span class="eyebrow"><a href="recipes.html#' + slugify(latest.category) + '">' + esc(latest.category) + "</a></span>" +
        '<h2><a href="' + url(latest) + '">' + esc(latest.title) + "</a></h2>" +
        '<span class="post-date">' + fmtDate(latest.date) + "</span>" +
        '<figure><a href="' + url(latest) + '"><img src="' + latest.image + '" alt="' + esc(latest.alt) + '"></a></figure>' +
        latest.story.slice(0, 2).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        '<p style="text-align:center"><a class="btn btn--gold" href="' + url(latest) + '#recipe">Jump to recipe</a></p>' +
        "</article>" +
        '<div class="section-title">More from the kitchen</div>' +
        '<div class="grid">' + RECIPES.slice(1, 7).map(card).join("") + "</div>";
      $("#sidebar").innerHTML = sidebar();
    },

    recipes: function () {
      var cats = categories();
      var names = Object.keys(cats).sort();
      var filters = $("#filters");
      var list = $("#recipe-list");
      filters.innerHTML =
        '<button class="chip is-active" data-cat="all">All recipes</button>' +
        names.map(function (c) { return '<button class="chip" data-cat="' + slugify(c) + '">' + esc(c) + "</button>"; }).join("");
      list.innerHTML = names.map(function (c) {
        return '<section class="cat-block" id="' + slugify(c) + '"><h2>' + esc(c) + '</h2><div class="grid">' + cats[c].map(card).join("") + "</div></section>";
      }).join("");
      function apply(key) {
        filters.querySelectorAll(".chip").forEach(function (b) { b.classList.toggle("is-active", b.dataset.cat === key); });
        list.querySelectorAll(".cat-block").forEach(function (s) { s.hidden = key !== "all" && s.id !== key; });
        list.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      }
      filters.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        apply(b.dataset.cat);
        history.replaceState(null, "", b.dataset.cat === "all" ? "recipes.html" : "#" + b.dataset.cat);
      });
      var hash = location.hash.slice(1);
      if (hash && cats && names.some(function (c) { return slugify(c) === hash; })) apply(hash);
    },

    archives: function () {
      var out = "", lastYear = "", lastMonth = "";
      RECIPES.forEach(function (r) {
        var d = new Date(r.date + "T12:00:00");
        var y = String(d.getFullYear());
        var m = d.toLocaleDateString("en-US", { month: "long" });
        if (y !== lastYear) { out += (lastYear ? "</ul>" : "") + '<h2 class="archive-year">' + y + "</h2>"; lastYear = y; lastMonth = ""; }
        if (m !== lastMonth) { out += (lastMonth ? "</ul>" : "") + '<h3 class="archive-month">' + m + '</h3><ul class="archive-list">'; lastMonth = m; }
        out += '<li><img src="' + r.image + '" alt="" loading="lazy"><a href="' + url(r) + '">' + esc(r.title) + "</a></li>";
      });
      $("#archive").innerHTML = out + "</ul>";
    },

    search: function () {
      var input = $("#q");
      var results = $("#results");
      function run(q) {
        q = q.trim().toLowerCase();
        if (!q) { results.innerHTML = '<p class="empty">Try &ldquo;chocolate&rdquo;, &ldquo;pumpkin&rdquo; or &ldquo;cookies&rdquo;.</p>'; return; }
        var hits = RECIPES.filter(function (r) {
          var hay = [r.title, r.category, r.excerpt, r.tags.join(" ")]
            .concat(r.ingredients.map(function (g) { return g.items.join(" "); })).join(" ").toLowerCase();
          return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
        });
        results.innerHTML = hits.length
          ? '<div class="grid">' + hits.map(card).join("") + "</div>"
          : '<p class="empty">Nothing found for &ldquo;' + esc(q) + "&rdquo;. Maybe it is still in the oven.</p>";
        results.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      }
      var initial = new URLSearchParams(location.search).get("q") || "";
      input.value = initial;
      run(initial);
      input.addEventListener("input", function () {
        run(input.value);
        history.replaceState(null, "", input.value ? "?q=" + encodeURIComponent(input.value) : "search.html");
      });
      $(".search-form").addEventListener("submit", function (e) { e.preventDefault(); });
    },

    recipe: function () {
      var slug = new URLSearchParams(location.search).get("r");
      var idx = RECIPES.findIndex(function (r) { return r.slug === slug; });
      if (idx < 0) idx = 0;
      var r = RECIPES[idx];
      document.title = r.title + " | Sift Sweets";
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", r.excerpt);

      var newer = RECIPES[idx - 1], older = RECIPES[idx + 1];
      $("#recipe-root").innerHTML =
        '<header class="recipe-head">' +
        '<a class="eyebrow" href="recipes.html#' + slugify(r.category) + '" style="text-decoration:none">' + esc(r.category) + "</a>" +
        "<h1>" + esc(r.title) + "</h1>" +
        '<span class="post-date">' + fmtDate(r.date) + "</span>" +
        '<div class="recipe-actions"><a class="btn btn--gold" href="#recipe">Jump to recipe</a>' +
        '<button class="btn" type="button" data-print>Print recipe</button></div></header>' +
        '<figure class="recipe-hero"><img src="' + r.image + '" alt="' + esc(r.alt) + '"></figure>' +
        '<div class="recipe-story">' + r.story.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<section class="recipe-card" id="recipe">' +
        '<div class="recipe-card__head"><img src="' + r.image + '" alt=""><div><span class="eyebrow">Sift Sweets recipe</span><h2>' + esc(r.title) + "</h2></div></div>" +
        '<dl class="meta"><div><dt>Yield</dt><dd>' + esc(r.yield) + "</dd></div><div><dt>Prep</dt><dd>" + esc(r.prep) +
        "</dd></div><div><dt>Bake</dt><dd>" + esc(r.cook) + "</dd></div><div><dt>Total</dt><dd>" + esc(r.total) + "</dd></div></dl>" +
        "<h3>Ingredients</h3>" +
        r.ingredients.map(function (g) {
          return (r.ingredients.length > 1 ? "<h4>" + esc(g.group) + "</h4>" : "") +
            '<ul class="ingredients">' + g.items.map(function (it) {
              return '<li><label><input type="checkbox"><span>' + esc(it) + "</span></label></li>";
            }).join("") + "</ul>";
        }).join("") +
        "<h3>Instructions</h3>" +
        '<ol class="steps">' + r.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
        (r.notes && r.notes.length ? '<div class="notes"><span class="eyebrow">Baker&rsquo;s notes</span>' + r.notes.map(function (n) { return "<p>" + esc(n) + "</p>"; }).join("") + "</div>" : "") +
        "</section>" +
        '<div class="tags">' + r.tags.map(function (t) { return '<a href="search.html?q=' + encodeURIComponent(t) + '">' + esc(t) + "</a>"; }).join("") + "</div>" +
        '<nav class="post-nav" aria-label="More recipes">' +
        (older ? '<a href="' + url(older) + '"><span class="eyebrow">&larr; Previous</span><strong>' + esc(older.title) + "</strong></a>" : "<span></span>") +
        (newer ? '<a class="next" href="' + url(newer) + '"><span class="eyebrow">Next &rarr;</span><strong>' + esc(newer.title) + "</strong></a>" : "<span></span>") +
        "</nav>";
      $("[data-print]").addEventListener("click", function () { window.print(); });
      if (location.hash === "#recipe") setTimeout(function () { $("#recipe").scrollIntoView(); }, 50);
    },

    about: function () {
      var b = $("#about-badge");
      if (b) b.innerHTML = badge();
    }
  };

  if (renderers[page]) renderers[page]();

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
