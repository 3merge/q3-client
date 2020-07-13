import {
  NONCE,
  TOKEN,
} from '../../packages/q3-ui-permissions/src/utils/constants';

Cypress.Commands.add('authenticate', () => {
  cy.request('POST', 'http://localhost:9000/authenticate', {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  }).then(({ body: { token, nonce } }) => {
    cy.setCookie(TOKEN, token);
    cy.setCookie(NONCE, nonce);

    // make sure the authentication values persist
    Cypress.Cookies.preserveOnce(TOKEN, NONCE);
  });
});
