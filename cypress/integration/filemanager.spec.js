import 'cypress-file-upload';

const png = 'cat.jpg';

const handleAvatar = function runAvatarComponent() {
  return {
    get el() {
      return cy.get('#q3-detail-avatar');
    },

    close() {
      cy.get('[aria-label="Close"]').click();
      return this;
    },

    open() {
      this.el.click();
      return this;
    },

    checkImgSrc(assertion) {
      this.el.get('img').should(assertion, 'src');
      return this;
    },
  };
};

context('Search', () => {
  before(() => {
    cy.authenticate();
    cy.visit('/app/characters/5f2031ebbfa1b45ea0b8416d');
  });

  it('should set a featured photo', () => {
    const av = handleAvatar().open();
    cy.get('#dropper [type="file"]').attachFile(png, {
      force: true,
    });

    av.close().checkImgSrc('have.attr').open();
    cy.get('#q3-photo-remove]').click();
    av.close().checkImgSrc('not.have.attr');
  });
});
