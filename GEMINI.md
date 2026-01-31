# Project Context: Grocy Receipt Scanner Frontend

## Overview
This project, `grocy-receipt-scanner-fe`, is the frontend application for scanning receipts for Grocy. It is built with **Angular v21** and utilizes **Angular Material** for UI components. The project is set up to run in a Node.js environment and uses **npm** for dependency management.

## Tech Stack
- **Framework:** Angular 21.1.0
- **Language:** TypeScript
- **UI Library:** Angular Material 21.1.1
- **Testing:** Vitest
- **Package Manager:** npm (v11.7.0 specified)

## Key Files & Structure
- `src/`: Contains the source code of the application.
  - `src/main.ts`: The main entry point.
  - `src/app/`: Contains the application logic, components, and services.
- `angular.json`: Angular CLI configuration.
- `package.json`: Project dependencies and scripts.
- `Dockerfile` & `nginx.conf`: Configuration for containerizing and serving the application.

## Development Workflow

### Installation
Ensure dependencies are installed:
```bash
npm install
```

### Running the Application
To start the local development server:
```bash
npm start
# OR
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload on source changes.

### Building
To build the project for production (artifacts stored in `dist/`):
```bash
npm run build
# OR
ng build
```

### Testing
To run unit tests using Vitest:
```bash
npm test
# OR
ng test
```

## Conventions
- **Code Style:** The project uses **Prettier** for code formatting.
  - Configuration is embedded in `package.json`:
    - `printWidth`: 100
    - `singleQuote`: true
    - Special parser options for `.html` files.
- **Scaffolding:** Follow standard Angular CLI conventions.
  - Generate components: `ng generate component component-name`

## AI Assistance & Tool Usage
To ensure efficient development, utilize the following MCP tools meaningfully:
- **Serena Toolset:** Use for deep codebase exploration, symbolic analysis, and refactoring. Prefer symbolic tools (like `find_symbol` or `replace_symbol_body`) over full file reads for better context management and precision.
- **Context7:** Use this to retrieve the latest documentation and code examples for Angular, Angular Material, or any other library (e.g., RxJS). Always check documentation via `query-docs` before implementing complex framework features to ensure adherence to current best practices.
