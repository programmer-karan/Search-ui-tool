## Setup
npm install
npm run dev

## Architecture Decisions
- Composable over Vuex: state is local to search feature, no cross-route sharing needed
- Accordion via expandedId in composable: single source of truth, avoids prop drilling
- Manual debounce: no lodash dependency, keeps bundle lean
- CSS custom properties for dark mode: no runtime JS cost

## Scaling
- Swap searchService for real API with an adapter pattern — components never change
- Add Pinia if state needs to persist across routes
- Add vue-virtual-scroller for 1000+ result lists
- Add query caching in composable using a Map<query, results[]>
- Move to Nuxt for SSR if SEO is required