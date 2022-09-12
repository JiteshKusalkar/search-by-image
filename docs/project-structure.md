# Project directory structure

The project is structured in the following way

```javascript
.
├── docs                    // Documentation
├── src                     // Source files
    ├── api                 // Common APIs
    ├── components          // Common Components
    ├── features            // Features
    ├── pages               // Pages
    ├── hooks               // Common Hooks
    ├── mocks               // Mocks for testing
    ├── index.css           // Main CSS file
    ├── index.html          // Main entry html file
    ├── index.tsx           // Entry point of the app
    ├── routes.tsx          // Main routes of the app
    └── app.tsx
├── LICENSE
└── README.md
```

## docs

This is where the all the docs related to the project are kept.

## src

This has all the source files of the project. Source folder consists of the
following folders:

- `api`: Consists of all apis used in the app.
- `components`: Common components.
- `features`: These are features used in various pages. eg: dashboard.
- `pages`: Consists of all the pages used in the app. The route imports these
  pages to associate with different routes in the app. The pages make use of
  corresponding features.
- `hooks`: Common hooks used throughtout the app.
- `mocks`: MSW setup for mocking api responses while testing.
- `index.css`: Main css file. Should consists of global styles.
- `index.html`: Main entry HTML file.
- `index.tsx`: Main entry TSX file.

### routes

Since the project consists of one page hence the main routes file isn't created.
But it'll be in parallel with `index.tsx`. The nested/children routes will be
created inside the respective pages or features.
