# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Key commands

This repository is the `astro-erudite` Astro blogging template.

All commands are run from the project root (`package.json`):

- Start dev server (port 1234): `npm run dev`
- Alternate dev alias: `npm run start`
- Type-check and build for production: `npm run build`
- Preview the built site: `npm run preview`
- Run arbitrary Astro CLI commands: `npm run astro -- <subcommand>`
  - Example: `npm run astro -- check` (type-check only)
  - Example: `npm run astro -- sync` (update content collection types after schema changes)
- Format the codebase with Prettier: `npm run prettier`

There is no test runner configured in this template (no `test` script in `package.json`). If you add tests in this project, also update this file with the appropriate test commands.

## Project architecture

### Tech stack and configuration

- Framework: [Astro] with content collections, MDX, and Islands architecture.
- Styling: Tailwind CSS v4 with OKLCH design tokens and custom fonts, wired via `src/styles/global.css` and `src/styles/typography.css`.
- UI primitives: shadcn/ui-style React components defined under `src/components/ui`, configured by `components.json` and `tailwind.config.ts`.
- Content: Astro content collections for `blog`, `authors`, and `projects` under `src/content`.
- Code blocks and markdown:
  - `astro-expressive-code` for themed code fences.
  - Remark/rehype pipeline (math, emoji, external links, KaTeX, pretty code) configured in `astro.config.ts`.
- Tooling and TypeScript:
  - `tsconfig.json` extends `astro/tsconfigs/strict`, enables React JSX, and defines the `@/*` path alias to `src/*`.
  - Tailwind is integrated through Vite in `astro.config.ts` and `src/styles/global.css`.

`astro.config.ts` is the main integration hub and also configures:

- `site` URL used for sitemap/RSS and SEO metadata.
- Port `1234` and `host: true` for the dev server.
- Disabled Astro dev toolbar (`devToolbar.enabled = false`).
- Expressive Code theme mapping that keys off `data-theme="light" | "dark"` on the root HTML (`Layout.astro`).

### Routing and pages (`src/pages`)

Astro’s file-based routing is used; key routes:

- `src/pages/index.astro`
  - Home page that describes the template and lists the latest posts.
  - Fetches recent posts via `getRecentPosts(SITE.featuredPostCount)` from `src/lib/data-utils.ts`.
  - Wrapped in the shared `Layout` and uses `PageHead` for per-page metadata.

- `src/pages/blog/[...page].astro`
  - Paginated blog index. Uses `getAllPosts()` and Astro’s `paginate` helper with page size `SITE.postsPerPage`.
  - Groups posts by year via `groupPostsByYear` and renders them with `BlogCard`.
  - Uses `PaginationComponent` (React) from `src/components/ui/pagination.tsx` for client-side pagination controls.

- `src/pages/blog/[...id].astro`
  - Single post and subpost route, driven by the `blog` content collection.
  - `getStaticPaths` wires each `blog` entry (including subposts) into a route parameter `id`.
  - Uses `render` from `astro:content` to obtain the MDX `Content` and headings for a given post.
  - Heavily relies on `src/lib/data-utils.ts` to:
    - Distinguish subposts vs parent posts (`isSubpost`, `getParentId`).
    - Fetch adjacent posts/subposts and parent post (`getAdjacentPosts`, `getParentPost`).
    - Compute reading time for a single post or combined across a post and its subposts.
    - Build table-of-contents sections (`getTOCSections`) which combine headings from the parent and any subposts.
  - Layout:
    - Uses the shared `Layout` with slots for `PostHead` (SEO), `SubpostsHeader`, and `TOCHeader` in the sticky header area.
    - Main grid includes the hero image, metadata (authors, date, reading time, subpost count), tag badges, and the MDX content inside a `.prose` container.
    - `SubpostsSidebar` and `TOCSidebar` provide side navigation for long, multi-part articles.
    - Includes a `scroll-to-top` floating button wired with a small client-side script.

- Other route groups:
  - `src/pages/authors/...` (author index/detail) and `src/pages/tags/...` (tag listings) exist and are expected to build on `getAllAuthors`, `getPostsByAuthor`, `getAllTags`, and `getPostsByTag` from `src/lib/data-utils.ts`.

When making routing changes, prefer to keep shared logic inside `src/lib/data-utils.ts` and route-specific presentation in `src/pages` and `src/components`.

### Layout, theming, and typography

- Global layout is defined in `src/layouts/Layout.astro`:
  - Imports global and typography styles once at the layout level.
  - Wraps all pages in a consistent HTML shell with `<Head>`, `<Header>`, `<Footer>`, and a central `<main>`.
  - Accepts an optional `class` prop to tweak the width of the main column per page.
  - Exposes slots for `head`, `subposts-navigation`, and `table-of-contents` so individual pages can participate in the header and meta.

- Theming and fonts:
  - `src/styles/global.css` defines CSS variables for background, foreground, primary, etc., and their dark-mode variants under `[data-theme='dark']`.
  - `Layout.astro` sets `class="bg-background text-foreground scheme-light-dark"` and `lang={SITE.locale}` on `<html>`, and `Header.astro` / `ThemeToggle.astro` are responsible for toggling the `data-theme` attribute.
  - `src/styles/typography.css` defines the `.prose` typography system used in post bodies and configures headings, links, lists, code, tables, and KaTeX.

### Components (`src/components`)

- Top-level Astro components:
  - Structural/SEO: `Head.astro`, `PageHead.astro`, `PostHead.astro`, `Favicons.astro`.
  - Navigation: `Header.astro`, `Footer.astro`, `Breadcrumbs.astro`, `PostNavigation.astro`, `ThemeToggle.astro`.
  - Content presentation: `BlogCard.astro`, `AuthorCard.astro`, `ProjectCard.astro`, `Callout.astro`, `SocialIcons.astro`.
  - Long-form reading aids: `SubpostsHeader.astro`, `SubpostsSidebar.astro`, `TOCHeader.astro`, `TOCSidebar.astro`.

- React UI primitives in `src/components/ui`:
  - Tailwind + shadcn-style components like `button.tsx`, `badge.tsx`, `pagination.tsx`, `avatar.tsx`, `scroll-area.tsx`, and `separator.tsx`.
  - These are used by Astro via `client:*` hydration where interactivity is needed (pagination, scroll areas, etc.).

Common pattern: keep route-agnostic visual components in `src/components` or `src/components/ui` and keep content/query logic in `src/lib` and `src/content`.

### Content model (`src/content`)

This project uses Astro content collections; schemas live alongside the content config (see `src/content`), and the README documents the frontmatter in detail.

- `src/content/blog/`
  - Each blog post is a directory with an `index.mdx` and optional `banner.png` plus additional MDX files for subposts.
  - Frontmatter includes `title`, `description`, `date`, optional `order`, `image`, `tags`, `authors`, and `draft`.
  - Subposts share the same parent folder and are identified by IDs that contain a `/` (e.g., `my-post/subpost`); `data-utils.ts` uses this structure to compute navigation, reading time, and TOC sections.

- `src/content/authors/`
  - Each author is a Markdown file named `[author-id].md` whose frontmatter defines `name`, optional `pronouns`, `avatar`, `bio`, and social links.
  - `parseAuthors` in `src/lib/data-utils.ts` joins `authors` arrays in blog frontmatter to these author documents.

- `src/content/projects/`
  - Each project is a Markdown file with metadata like `name`, `description`, `tags`, `image`, `link`, and optional `startDate`/`endDate`.
  - `getAllProjects` in `src/lib/data-utils.ts` returns projects sorted by start date.

When changing schemas or adding new collections, update the content config in `src/content` and run `npm run astro -- sync` so type definitions stay in sync.

### Utilities (`src/lib`)

- `src/lib/utils.ts`
  - `cn` – Tailwind-aware class name helper built on `clsx` and `tailwind-merge`.
  - `formatDate` – Formats `Date` objects as long-form `en-US` dates.
  - `calculateWordCountFromHtml` and `readingTime` – Used to compute post reading times based on HTML content.
  - `getHeadingMargin` – Returns Tailwind margin classes for headings based on depth.

- `src/lib/data-utils.ts`
  - Wraps all interaction with Astro content collections for authors, blog posts (including subposts), and projects.
  - Provides helpers for:
    - Fetching all posts, authors, projects, and tags.
    - Grouping posts by year.
    - Determining parent/subpost relationships and whether a post has subposts.
    - Computing per-post and combined reading times.
    - Building structured TOC sections used by `TOCSidebar` and `TOCHeader`.

Centralizing data logic here keeps `src/pages` and `src/components` focused on presentation; when adding new data-driven views, prefer to extend `data-utils.ts` first, then consume those helpers from your routes/components.
