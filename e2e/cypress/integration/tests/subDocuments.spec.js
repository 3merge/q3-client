// / <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:8000/app/investors/1/investments',
    );
  });

  it('should load', () => {});
});
