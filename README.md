# Sift Sweets

Recipe website for **Sift Sweets**, a Texas home bakery (Instagram: [@siftsweetstx](https://www.instagram.com/siftsweetstx/)).

A plain static site (HTML, CSS, JavaScript). No build step.

## Pages
- `index.html` Home, with the animated cover intro (plays once per visit, skippable) and the latest recipe
- `recipes.html` Recipe index with category tabs
- `archives.html` Every recipe by year and month
- `search.html` Search by name, category or ingredient
- `recipe.html?r=<slug>` Single recipe with jump to recipe, ingredient checklist and print view
- `about.html` About the bakery

## Adding a recipe
1. Put the photo in `assets/images/`.
2. Copy an entry in `js/recipes.js`, give it a new `slug` and fill in the fields.

It shows up on the home page, recipes, archives and search automatically.

## Run locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.
