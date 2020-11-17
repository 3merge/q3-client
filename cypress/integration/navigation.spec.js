beforeEach(() => {
  cy.authenticate();
  cy.visit('http://localhost:8000/app');
  cy.get('button[aria-label="menu"]').click();
});

describe('navigation', () => {
  it('should render navigation', () => {
    cy.get('a[href="/app/characters"]').should(
      'to.have.text',
      'characters',
    );
  });

  it('should navigate to /app/characters', () => {
    cy.get('a[href="/app/characters"]').click();
    cy.url().should(
      'eq',
      'http://localhost:8000/app/characters?sort=-createdAt',
    );
    cy.get('button[aria-label="menu"]').click();
    cy.get('a[aria-current="page"]').should(
      'have.attr',
      'href',
      '/app/characters',
    );
  });
});
