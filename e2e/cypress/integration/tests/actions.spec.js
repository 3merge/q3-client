// / <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('should redirect on index', () => {
    cy.location('pathname').should('eq', '/app');
  });
});
