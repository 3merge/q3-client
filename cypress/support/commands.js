import {
  NONCE,
  TOKEN,
} from '../../packages/q3-ui-permissions/src/utils/constants';

// authenticate with Dev user if not email and password are passed
Cypress.Commands.add('authenticate', (email, password) => {
  cy.request('POST', 'http://localhost:9000/authenticate', {
    email: email || Cypress.env('email'),
    password: password || Cypress.env('password'),
  }).then(({ body: { token, nonce } }) => {
    cy.setCookie(TOKEN, token);
    cy.setCookie(NONCE, nonce);

    // make sure the authentication values persist
    Cypress.Cookies.preserveOnce(TOKEN, NONCE);
  });
});
