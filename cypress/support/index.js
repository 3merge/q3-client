import './commands';

Cypress.on('fail', (error) => {
  console.warn(error);
});
