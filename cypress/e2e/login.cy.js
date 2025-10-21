/// <reference types="cypress" />
import Chance from 'chance';

const chance = new Chance();

describe('Fax.Plus Authentication Flow', () => {
    it('Logs in successfully with Free user', () => {
      cy.visit('/');
        cy.get('#username')
          .type(Cypress.env('FREE_EMAIL'));
        cy.contains('Sign In').click();
  
        cy.get('input[type="password"]').should('be.visible')
          .type(Cypress.env('FREE_PASSWORD'));
        cy.contains('Sign In').click();
  
        // cy.get('.kcFormCardClass');
        // cy.get(':nth-child(3) > .css-1j2b0xt-cardContent').click();
        cy.get('.tss-bjcg3e-iconContainer').click() //to ignore the popup

        // To logout
        cy.get('.tss-zipife-iconWrapper').click(); 
        cy.get('[data-cy="logout-btn"]').click();

    });

    it(' Logs in successfully with ENTERPRISE user', () => {
        cy.visit('/');
          cy.get('#username')
            .type(Cypress.env('ENTERPRISE_EMAIL'));
          cy.contains('Sign In').click();
    
          cy.get('input[type="password"]').should('be.visible')
            .type(Cypress.env('ENTERPRISE_PASSWORD'));
          cy.contains('Sign In').click();
    
          // cy.get('.kcFormCardClass');
          // cy.get(':nth-child(3) > .css-1j2b0xt-cardContent').click();
  
          // To logout
          cy.get('.tss-zipife-iconWrapper').click(); 
          cy.get('[data-cy="logout-btn"]').click();
  
      });

      it(' Invalid user', () => {
        cy.visit('/');
          cy.get('#username')
            .type(Cypress.env('INVALID_EMAIL'));
          cy.contains('Sign In').click();
    
          cy.get('input[type="password"]').should('be.visible')
            .type(Cypress.env('INVALID_PASSWORD'));
          cy.contains('Sign In').click();
          cy.contains('Invalid email or password. Please try again.').should('be.visible')
          //Upon wrong Login a user is re routed back to Login page with an error message 
      });

      it('Password reset flow', () => {
        cy.visit('/');
          cy.get('#username')
            .type(Cypress.env('INVALID_EMAIL'));
          cy.contains('Sign In').click();
          cy.get(':nth-child(1) > a > span').click()
          cy.contains('Submit').click();
          cy.contains('You should receive an email shortly with further instructions').should('be.visible')
      });
    
});