---
name: modern-web-guidance
description: Enforces modern web standards (semantic HTML5, modern CSS Grid/Flexbox, ES2022+ vanilla JavaScript, WCAG accessibility, and zero-server file:// compatibility) for frontend applications. Use when creating, refactoring, or reviewing HTML, CSS, and JS interfaces in organogramas-ufrgs.
---

# Modern Web Guidance (Frontend Standards)

This skill operationalizes modern web engineering best practices for the zero-dependency, standalone simulators of the **Organogramas UFRGS** platform.

---

## 1. Semantic HTML5 & Architecture

1. **Landmark & Structural Elements**:
   - Use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<footer>`) instead of generic nested `<div>` wrappers.
   - Use `<dialog>` for modal dialogs with native `.showModal()` and `.close()` methods.
   - Use `<template>` elements for repetitive DOM stamping instead of manual string concatenation.

2. **Accessibility & Usability (WCAG 2.1 AA)**:
   - Provide explicit `aria-label`, `aria-expanded`, or `role` attributes where interactive elements lack visible text.
   - All interactive components (drag-and-drop targets, semester columns, discipline cards) must be focusable and operable via keyboard (`tabindex="0"`, `keydown` handlers for Enter/Space/Arrow keys).
   - Ensure color contrast ratios $\ge 4.5:1$ for standard text against the dark `#0B0F19` / `#161F30` backgrounds.

---

## 2. Modern CSS (Responsive, Maintainable, Zero Frameworks)

1. **Layout Standards**:
   - Prefer **CSS Grid** for two-dimensional semester/discipline boards (`grid-template-columns: repeat(...)`).
   - Prefer **Flexbox** for one-dimensional linear bars (headers, toolbars, badge rows, credit meters).
   - Leverage modern CSS selectors (`:is()`, `:where()`, `:has()`) to minimize specificity wars.

2. **Design Tokens & Variables**:
   - Keep design tokens centralized in `:root` CSS custom properties (`--bg-primary`, `--surface-card`, `--accent-color`, `--font-sans`).
   - Use `rem` and `em` for scalable typography; reserve `px` strictly for thin borders or canvas coordinate scaling.

3. **Performance & Rendering**:
   - Use `will-change: transform` sparingly and only during active pan/zoom/drag operations.
   - Rely on `transform: translate3d()` for hardware-accelerated pan and zoom animations.

---

## 3. Modern Vanilla JavaScript (ES2022+)

1. **Language Standards**:
   - Strictly `const` and `let` (never `var`).
   - Prefer native array and collection methods (`map`, `filter`, `reduce`, `find`, `some`, `every`, `Set`, `Map`).
   - Use modern syntax: optional chaining (`?.`), nullish coalescing (`??`), and structured cloning (`structuredClone()`).

2. **DOM Operations & Lifecycle**:
   - Batch DOM mutations using `DocumentFragment` or modify off-screen elements before reattaching to avoid layout thrashing.
   - Manage event listeners defensively: remove obsolete listeners or pass `{ signal: abortController.signal }` when elements are torn down.
   - Use `Event.target.closest()` for event delegation across dynamic nodes.

3. **Zero-Server Hygiene (`file://` Protocol)**:
   - Never assume an active HTTP server or module loader (`type="module"` is blocked by local CORS on some browsers when run via `file://`).
   - Always retain the dual data-loading strategy: attempt `fetch('curriculum_data.json')` with immediate fallback to global `window.CURRICULUM_DATA`.

---

## 4. Canvas 2D & Export Optimization

- Scale canvas operations using `window.devicePixelRatio` for crisp 2x retina exports.
- Clean up transient offscreen canvas references immediately to prevent browser memory leaks during high-resolution PDF/PNG exports.
