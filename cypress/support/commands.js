// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logout', () => {
    cy.get('button[aria-label="User menu"]').click(); // top right profile menu
    cy.contains('Log out').click();                   // logout option
    cy.url().should('include', '/login');             // verify back on login page
    
  });
  
  // Password reset flow
  Cypress.Commands.add('resetPassword', (email) => {
    cy.get('a[href*="reset-password"]').click();
    cy.get('input[name="email"]').type(email);
    cy.get('button[type="submit"]').click();
  });