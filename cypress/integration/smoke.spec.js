import {
  NONCE,
  TOKEN,
} from 'q3-ui-permissions/lib/utils/constants';

context('Smoke', () => {
  before(() => {
    Cypress.Cookies.preserveOnce(TOKEN, NONCE);
  });

  it('should render title tag', () => {
    // see en/titles.json for raw value
    // will append brand name to the site title too
    cy.visit('/');
    cy.title().should('includes', 'This is a sample title');
  });

  it('should redirect on private route', () => {
    // see en/titles.json for raw value
    // will append brand name to the site title too
    cy.visit('/app/characters');
    cy.location('pathname').should('includes', 'login');
  });

  it('should authenticate with the server', () => {
    cy.visit('/login');

    // simple auth strategy
    cy.get('[name=email]').type('mibberson@3merge.ca');
    cy.get('[name=password]').type('4Demo!12');
    cy.get('form').submit();

    // will redirect on success and store secured session cookies
    cy.location('pathname').should('include', '/app');
    cy.getCookie(TOKEN).should('exist');
    cy.getCookie(NONCE).should('exist');
  });

  it('should activate menu item', () => {
    cy.visit('/app/characters');
    cy.get('#q3-admin-mobile-menu').click();
    cy.get('.q3-admin-menu-item').should(
      'have.attr',
      'aria-selected',
      'true',
    );
  });
});
