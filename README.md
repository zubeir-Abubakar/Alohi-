# Alohi Fax.plus Auth Cypress Test Suite

## Overview

This project contains **authentication and login tests** for Fax.Plus using **Cypress**. It covers:

* Authentication flows via **Keycloak** (Free and Enterprise users)
* Validating main application pages after login

This suite is intended for **manual and automated QA validation**, with reusable test patterns for different environments (staging, production, etc.).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Configuration](#configuration)
5. [Running Tests](#running-tests)
6. [Known Exceptions](#known-exceptions)
7. [Extending Tests](#extending-tests)

---

## Prerequisites

* Node.js >= 18.x
* npm >= 9.x
* Cypress >= 14.x

Optional: **Visual Studio Code** or another IDE for editing test files.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/faxplus-cypress-tests.git
cd alohi-auth-tests
```

2. Install dependencies:

```bash
npm install
```

3. Open Cypress Test Runner:

```bash
npx cypress open
```

Or run tests in headless mode:

```bash
npx cypress run
```

---

## Project Structure

```
cypress/
│
├─ e2e/
│   ├─ login.spec.js         # Keycloak login tests (Free & Enterprise users)
│
├─ fixtures/
│   └─ Example.json             
│
├─ support/
│   ├─ commands.js           # Custom Cypress commands
│   └─ e2e.js                # Global test setup & exception handling
│
cypress.config.js            # Cypress configuration (baseUrl, env, etc.)
package.json                 # Project dependencies & scripts
cypress.env.json             #Project enviroments and user credantials
README.md                    # Project documentation
```

---

## Configuration

Set the **base URL** in `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.fax.plus',
    setupNodeEvents(on, config) {
      // Node event listeners
    },
  },
});
```

Optional: Use environment variables for staging, production, etc.:

```bash
npx cypress run --env baseUrl=https://staging.fax.plus
```

---

## Running Tests

* Open Cypress Test Runner:

```bash
npx cypress open
```

* Run all tests headlessly:

```bash
npx cypress run
```

* Run a single test file:

```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
```

---

## Known Exceptions

Some scripts on Keycloak or the app trigger expected exceptions. These are **ignored globally** in `cypress/support/e2e.js`:

```javascript
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('checkCookiesAndSetTimer') ||
    err.message.includes('postMessage') ||
    err.message.includes('Failed to construct \'URL\'')
  ) {
    return false; // Ignore these exceptions
  }
});
```

* Google Analytics 204 requests are normal and **do not fail tests**.
* Module export errors from Keycloak are ignored to allow the test to continue.

---

## Extending Tests

1. **Add new users** in `cypress/e2e/login.spec.js` or `fixtures/users.json`.
2. **Create new test files** in `cypress/e2e/` for other app flows (e.g., dashboard, fax sending).
3. Use **custom commands** in `cypress/support/commands.js` for repetitive actions like login or navigation.

### Example: Adding a New Test

```javascript
it('Checks dashboard page', () => {
  cy.login('enterprise');  // custom command for login
  cy.url().should('include', '/dashboard');
  cy.get('.welcome-msg').should('contain.text', 'Welcome'); //incase a welcome page is added in the future.
});
```

