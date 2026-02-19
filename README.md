# Engineering Backlog Search
A lightweight, high-performance search interface for engineering tickets. Built with Vue 3, this project demonstrates core frontend optimization techniques like debouncing, accessible theme management, and efficient DOM updates without heavy external dependencies.

## 📋 Features
Real-time Search: Instantly filters tickets by title or snippet.

Debounced API Simulation: Prevents API flooding by waiting for user input to settle (300ms threshold).

Theme Aware: Toggles Dark/Light mode on the <body> tag to ensure full-page theme consistency.

Performance: Zero-dependency CSS loaders and optimized Vue reactivity.

Accessibility: Semantic HTML structure and focus states for keyboard navigation.

## Start up

start by installing node modules by running `npm i`

then start the server by running `npm run dev`

## ✨ Scalability ✨

### Phase 1: Component Refactoring

Break App.vue into atomic components to improve maintainability:

components/SearchBar.vue: Handle input and debounce logic internally.

components/TicketCard.vue: Isolate the presentation of individual results.

components/ThemeToggle.vue: Reusable button for layout headers.

### Phase 2: Real API Integration

Replace the MOCK_TICKETS constant and setTimeout with a real data fetcher.

`// composables/useTickets.js

import axios from 'axios';
export async function searchTickets(query) {
  const { data } = await axios.get(`/api/v1/tickets?q=${query}`);
  return data;
}`
### Phase 3: State Management & Routing

Vue Router: Introduce routes for /ticket/:id to allow deep-linking to specific issues.

Pinia: If we add features like "My Saved Filters" or "User Auth", move the user and preferences state into a global Pinia store.

### Phase 4: Testing & Typing

TypeScript: Migrate .js logic to .ts to ensure strict typing for Ticket interfaces (e.g., interface Ticket { id: number; title: string; ... }).

Vitest: Add unit tests for the debounce logic and search filtering.

Cypress: Add E2E tests to verify the "No Results" state and Dark Mode toggling.
