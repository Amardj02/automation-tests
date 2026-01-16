# Playwright Automation Framework

## 📑 Table of Contents
- [About The Project](#about-the-project)
- [Framework Architecture](#-framework-architecture)
- [Project Structure](#-project-structure-top-level)
- [Getting Started](#-local-setup)
- [Environment Configuration](#-environment-configuration)
- [Running Tests](#-running-tests)
- [UI Testing Approach](#-ui-testing-approach)
- [API Testing Approach](#-api-testing-approach)
- [Fixtures & Dependency Injection](#-fixtures--dependency-injection)
- [Configuration](#-configuration)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [Maintenance & Onboarding](#-maintenance--onboarding)
## 📌 About The Project

This repository contains a **Playwright-based automation framework** for validating both **UI and API functionality** of the [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php) web application.

The framework is designed to support scalable and maintainable test automation by enforcing clear separation of concerns:

- **UI automation** is implemented using the Page Object Model (POM), encapsulating UI structure and user interactions
- **API automation** is implemented using Resource classes that model API domains and endpoints
- **Fixtures** handle test setup, authentication, and dependency injection, enabling consistent and reusable test execution

The framework supports **UI-only, API-only, and hybrid UI + API test scenarios**, and serves as the **single source of truth** for onboarding, daily development, and long-term maintenance.

---

## 🏗 Framework Architecture

At a high level, the framework is structured into:

* **UI Layer** – Page Objects that encapsulate UI locators and user actions
* **API Layer** – Resource classes that encapsulate API endpoints and HTTP logic
* **Test Layer** – UI and API tests that consume pages/resources via fixtures
* **Support Layer** – Fixtures, utilities, configuration, and shared helpers

UI and API tests are executed using **separate Playwright projects** (`ui` and `api`) but share the same codebase and configuration standards.

---

## 📁 Project Structure (Top-Level)

```
.github/                # CI/CD workflows (e.g. GitHub Actions)
assets/                 # Static assets (screenshots, diagrams, test data)
fixtures/               # Playwright fixtures (UI & API setup, auth, resources)
pages/                  # UI Page Object Models (POM)
	resources/              # API Resource classes (API Object Model)
tests/                  # UI and API test specifications
utils/                  # Shared helpers (auth, data generation, utilities)

playwright.config.ts    # Playwright configuration (projects, reporters, etc.)
tsconfig.json           # TypeScript configuration
package.json            # Dependencies and npm scripts

```

## 🧱 Built With

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- Playwright Test Runner


### Folder Responsibilities

#### `pages/`

Contains **UI Page Object classes**. Each class:

* Represents a logical application page or feature
* Encapsulates locators and UI interactions
* Receives a shared Playwright `Page` instance via constructor

#### `resources/`

Contains **API Resource classes** (API equivalent of Page Objects). Each class:

* Represents an API domain or endpoint group
* Encapsulates request logic (headers, auth, endpoints)
* Extends `ResourceBase` for shared functionality

#### `fixtures/`

Defines **custom Playwright fixtures** that:

* Instantiate Page Objects and Resource objects
* Handle authentication (UI login, API session cookies)
* Share state safely between tests

Fixtures are the primary way tests access pages and resources.

#### `tests/`

Contains **test specifications**:

* UI tests consuming Page Objects
* API tests consuming Resource objects
* Tests are grouped logically by feature or domain

#### `utils/`

Holds reusable helpers such as:

* Authentication helpers (session cookie retrieval)
* Data generators
* Shared utility functions

---

## ⚙️ Local Setup

### Prerequisites

* Node.js (LTS recommended)
* npm

### Installation

```bash
npm install
npx playwright install

```

---

## 🔐 Environment Configuration

Create a `.env` file at the root of the project:

```env
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php
```

These values are used by:

* UI login flows
* API authentication helpers
* Playwright base URL configuration

`dotenv` loads these values automatically for local runs; ensure the same variables are provided in CI (e.g., pipeline secrets or environment variables).

---

## ▶️ Running Tests

The framework uses **multiple Playwright projects**:

* `ui` – UI (browser-based) tests
* `api` – API-only tests (no browser)

### Run All Tests

```bash
npm test
```

Or via npx:

```bash
npx playwright test
```

### Run UI Tests Only

```bash
npm run test:ui
```

### Run API Tests Only

```bash
npm run test:api
```

### View HTML Report

After a run, open the generated HTML report:

```bash
npx playwright show-report
```
The report is written to `playwright-report/`.

---

## 🧩 UI Testing Approach

* Page Object Model (POM)
* One shared Playwright `Page` per test
* Navigation and actions are encapsulated in Page classes
* Tests focus on **behavior**, not implementation details

Example:

* `LoginPage` handles authentication
* `DashboardPage` handles dashboard-level actions
* Feature pages (PIM, Leave, etc.) encapsulate domain logic

---

## 🔗 API Testing Approach

* API Resource classes act as **API Page Objects**
* Each resource maps to a specific API domain
* Shared `APIRequestContext` managed by `ResourceBase`
* Authentication handled via session cookies

Benefits:

* Clean, reusable API calls
* Consistent logging and error handling
* Easy chaining of API flows

---

## 🧪 Fixtures & Dependency Injection

Fixtures provide:

* Logged-in UI sessions
* Preconfigured API resources
* Clean test isolation

Tests never manually create Page or Resource objects.

---

## 🛠 Configuration

### `playwright.config.ts`

Defines the global Playwright configuration for the framework, including:

- test projects and execution contexts
- browser and runtime settings
- base configuration shared across UI and API tests
- reporting, timeouts, and retry behavior
- environment-specific defaults

### `tsconfig.json`

Ensures:

* Strict typing
* Consistent module resolution

---

## 📘 Best Practices

* Keep tests thin, logic in Pages/Resources
* Do not mix UI logic into tests
* Do not call API directly from tests without a Resource
* Prefer fixtures over manual setup
* Reuse helpers from `utils/`

---

## 🤝 Contributing

* Use feature branches from `main` or `documentation`; prefer concise names (e.g., `feature/pim-api-tests`).
* Run the relevant suites (`npm test`, `npm run test:ui`, or `npm run test:api`) before opening a PR.
* Keep docs in sync: update this README when adding fixtures, resources, or notable conventions.
* Include or update test data/fixtures when adding new API/UI flows.

---

## 📄 Maintenance & Onboarding

This README is the **authoritative documentation** for the framework.

When updating the framework:

* Keep structure changes reflected here
* Document new fixtures, projects, or conventions

---

