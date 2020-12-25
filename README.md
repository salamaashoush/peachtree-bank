# Backbase

[![Netlify Status](https://api.netlify.com/api/v1/badges/644ed0b0-6369-49cb-a486-faf18866461e/deploy-status)](https://app.netlify.com/sites/festive-austin-a50ca8/deploys)
[![Test and deploy](https://github.com/salamaashoush/peachtree-bank/workflows/Test%20and%20deploy/badge.svg)](https://github.com/salamaashoush/peachtree-bank/actions)

This project was generated using [Nx](https://nx.dev).

Live app [https://festive-austin-a50ca8.netlify.app/](https://festive-austin-a50ca8.netlify.app/).

## Architure overview

This is a mono repo structure it is suitable for medium to large apps and makes it really easy to divide responsibility across different teams because it contains many single purpose libs.

### Libs/Layers

- `@backbase/api-client`: contains all API related code for handling API authentication, building requests, caching responses, etc
  - Each api service/resource should have a service in this library to makes it easier to scale large apps and separate codebase into logical composable/reusable pieces.
- `@backbase/data`: most of the time API's is not built specially for frontend apps and that why we need such lib to transform API responses to usable data structure/models that can be used to build ui
  - Useful to make the ui as dump as possible to make it easier for future refactoring.
  - The golden rule for good and performant apps is to make data driven components.
  - Custom bushiness logic that is not covered by API.
- `@backbase/ui`: Reusable/Generic/Dump components

### Apps

- `peach-tree`: The main frontend app.
- `peach-tree-e2e`: Cypress E2E testing app.

## Development server

Run `npm start <app/lib>` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build <app/lib>` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test <app/lib>` to execute the unit tests via [Jest](https://jestjs.io), change ``

## Running end-to-end tests

Run `npm run e2e <app/lib>` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Running storybooks for ui lib

Run `npm run nx run ui:storybook`

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
