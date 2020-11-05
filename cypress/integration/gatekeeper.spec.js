describe('login', () => {
  it('should redirected to /login', () => {
    cy.visit('localhost:8000/app');
    cy.url().should('eq', 'http://localhost:8000/login/j');
  });

  it('should pass the gatekeeper', () => {
    cy.get('[name="email"]').type(Cypress.env('email'));
    cy.get('[name="password"]').type(
      Cypress.env('password'),
    );
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:8000/app');
  });
});
