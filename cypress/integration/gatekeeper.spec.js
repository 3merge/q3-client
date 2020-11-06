beforeEach(() => {
  cy.clearCookies();
});

describe('login', () => {
  it('should redirected to /login', () => {
    cy.visit('localhost:8000/app');
    cy.url().should('eq', 'http://localhost:8000/login');
  });

  it('should pass the gatekeeper', () => {
    Cypress.env('email');
    cy.get('[name="email"]').type(Cypress.env('email'));
    cy.get('[name="password"]').type(
      Cypress.env('password'),
    );
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:8000/app');
  });
});

describe('navigate regular user to regular user route', () => {
  it('should redirect regular users', () => {
    cy.authenticate(
      Cypress.env('regularUserEmail'),
      Cypress.env('regularUserPassword'),
    );

    cy.visit('localhost:8000/app');

    cy.url().should('eq', 'http://localhost:8000/regular');
  });
});
