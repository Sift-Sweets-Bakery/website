# Sift Sweets Website Handoff

Welcome to your new recipe website! This guide covers what was built, how to update it and what to do before launch.

---

## At a glance

| | |
|---|---|
| **Business** | Sift Sweets, Homemade Baked Goods, Texas (Est. 2022) |
| **Purpose** | A home for Sift Sweets recipes online |
| **Code** | GitHub repository `Sift-Sweets-Bakery/website`, branch `claude/affectionate-sagan-lfepj4` |
| **Review link** | https://claude.ai/artifact/X6Ny2ZeqwTHw8CBnkrdfC9 (private until it is shared from the page's Share menu) |
| **Instagram** | [@siftsweetstx](https://www.instagram.com/siftsweetstx/) |
| **Technology** | Plain HTML, CSS and JavaScript. No build tools, plugins or monthly software fees. |

---

## What's included

### Pages
| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Opens with an animated cover, then shows the newest recipe, more recipes and a sidebar with categories and recent posts |
| Recipes | `recipes.html` | Every recipe grouped by category with filter tabs |
| Archives | `archives.html` | Every recipe listed by year and month |
| Search | `search.html` | Finds recipes by name, category or ingredient |
| Recipe | `recipe.html` | One page that displays any recipe |
| About | `about.html` | The Sift Sweets story and contact info |

### Features
- **Animated cover:** The logo badge draws itself in while gold "flour" sifts down the screen. It plays once per visit, can be skipped and turns off for visitors who prefer less motion.
- **Navigation like Smitten Kitchen:** A large centered logo with a simple menu: Home, Recipes, Archives, About and Search.
- **Recipe pages:**
  - A "Jump to recipe" button
  - A story at the top
  - A recipe card with yield and times
  - Ingredients that can be checked off while baking
  - Numbered steps and baker's notes
  - Tags plus links to the next and previous recipes
- **Print friendly:** The print button prints only the recipe card.
- **Mobile ready:** Every page works on phones, tablets and desktops.

### Branding
- **Gold:** `#CAC092`, matched to the Instagram logo
- **Deep gold:** `#A89B62`, used for accents and links
- **Cream:** `#FBF9F3`, the page background
- **Fonts:** Cormorant Garamond for headings, Lora for reading text and Montserrat for small labels, all free from Google Fonts
- **Logo:** The logo was rebuilt as a sharp vector graphic, so it stays crisp at any size.

### Sample recipes
1. Pumpkin Snickerdoodle Cupcakes
2. Hazelnut Praline Chocolate Domes
3. Brown Butter Walnut Chocolate Chip Cookies
4. Molten Chocolate Lava Cakes

---

## Before launch checklist

- [ ] **Replace the sample writing.** The recipe stories and About page were written as placeholders in a home baker's voice. Swap in your own words.
- [ ] **Test the recipes.** The sample recipes have not been kitchen tested. Bake them or swap in your own recipes before publishing.
- [ ] **Replace the lava cake photo.** It has a small "minima muse" watermark, which means it likely belongs to someone else. Use your own photo before going public.
- [ ] **Confirm all photos are yours** or that you have permission to use them.
- [ ] **Check the Instagram link** in the footer and sidebar.
- [ ] **Merge the branch.** Merge `claude/affectionate-sagan-lfepj4` into your main branch on GitHub.
- [ ] **Turn on hosting** (see "Going live" below).

---

## How to add a new recipe

All recipes live in one file: **`js/recipes.js`**. A new recipe shows up on the Home, Recipes, Archives and Search pages automatically.

1. **Add the photo.** Put it in `assets/images/`. Use a lowercase name with hyphens, like `lemon-bars.webp`. Tall photos look best (about 4:5). Keep files under 500 KB.
2. **Copy an existing recipe.** In `js/recipes.js`, copy everything from one `{` to its matching `},` and paste it as the first item in the list.
3. **Fill in the fields:**

| Field | Example | Notes |
|---|---|---|
| `slug` | `"lemon-bars"` | Lowercase with hyphens. Must be unique. Becomes part of the web address. |
| `title` | `"Brown Butter Lemon Bars"` | |
| `date` | `"2026-11-15"` | Year-month-day. The newest date appears first on the home page. |
| `category` | `"Bars"` | A new category name creates a new tab automatically. |
| `tags` | `["lemon", "spring"]` | Clicking a tag searches for it. |
| `image` | `"assets/images/lemon-bars.webp"` | |
| `alt` | `"Lemon bars dusted with powdered sugar"` | A short description for screen readers and Google. |
| `excerpt` | One or two sentences | Shown in search results and link previews |
| `story` | A list of paragraphs | The intro above the recipe card |
| `yield`, `prep`, `cook`, `total` | `"16 bars"`, `"20 min"` | |
| `ingredients` | Groups with items | Each group has a name (like "Crust") and a list of items |
| `steps` | A list of steps | Numbered automatically |
| `notes` | A list of tips | Optional. Shown in the Baker's Notes box. |

4. **Check your punctuation.** Each piece of text sits inside "double quotes" with a comma between items. A missing comma or quote is the most common reason a page goes blank.
5. **Preview it** (see "Previewing on your computer" below), then upload the changes to GitHub.

**Tip:** Avoid typing double quotes inside your text. Use single quotes instead, like `'the good butter'`.

---

## Other common edits

| What | Where |
|---|---|
| About page text | `about.html` |
| Menu links | The `NAV` list near the top of `js/main.js` |
| Sidebar "Hi, we're Sift Sweets" blurb | The `sidebar` function in `js/main.js` |
| Footer text | Search for `site-footer` in `js/main.js` |
| Cover animation tagline ("fresh from our Texas kitchen to yours") | `index.html` |
| Colors and fonts | The top of `css/styles.css` |
| Browser tab icon | `assets/favicon.svg` |

---

## Previewing on your computer

Download the project from GitHub. Open a terminal in the project folder and run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. To see the cover animation again, close the tab and open a new one. It plays once per visit.

---

## Going live

The site is plain files, so it can be hosted for free almost anywhere.

### Option A: GitHub Pages (recommended, free)
1. Merge the branch into `main`.
2. In the GitHub repository, go to **Settings > Pages**.
3. Under **Source**, choose **Deploy from a branch**. Select `main` and the `/ (root)` folder, then click **Save**.
4. After a minute or two, the site is live at `https://sift-sweets-bakery.github.io/website/`.

### Option B: Netlify (free)
Drag the project folder onto https://app.netlify.com/drop for an instant link. You can also connect the GitHub repository so every update publishes automatically.

### Custom domain (like siftsweetstx.com)
1. Buy the domain from any registrar.
2. Add it under **Settings > Pages > Custom domain** in GitHub, or in Netlify's domain settings.
3. Follow the DNS steps they show you, then turn on **Enforce HTTPS**.

---

## File map

```
website/
├── index.html          Home page with the cover animation
├── recipes.html        Recipe index with category tabs
├── archives.html       Recipes by date
├── search.html         Search
├── recipe.html         Single recipe template
├── about.html          About page
├── css/styles.css      All colors, fonts and layout
├── js/recipes.js       All recipe content (edit this one most often)
├── js/main.js          Header, footer, animation and page logic
├── assets/favicon.svg  Browser tab icon
├── assets/images/      Recipe photos
├── README.md           Short technical summary
└── HANDOFF.md          This guide
```

---

## Ideas for later

- Email newsletter signup for new recipes
- An order or inquiry form for custom bakes
- A "Jump to recipe" sticky bar on phones
- Recipe ratings and comments
- A separate page for each recipe, which can help Google search ranking. Today one shared template displays every recipe.
- Recipe schema markup so recipes show rich results on Google

---

Thank you for trusting us with your website. Happy baking!
