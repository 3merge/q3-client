const SEARCH_ID = '#q3-searchbar';
const FILTER_ID = '#q3-filters';

const isLeaderRoleType = (el) =>
  // the datatable and search components share the same resolver function
  // so, we can use the same check to ensure both are connected
  el.first().should('contain', 'Leader');

context('Search', () => {
  before(() => {
    cy.authenticate();
    cy.visit('/app/characters');
  });

  it('should suggest documents', () => {
    const getSearch = () =>
      cy.get(SEARCH_ID).find('[name=search]');

    const getSearchResults = () =>
      cy.get('.MuiAutocomplete-popper').find('li');

    const clearSearchResults = () =>
      cy.get(SEARCH_ID).find('[aria-label=Clear]').click();

    const getSearchAndCountSearchResults = (
      phrase,
      expectedNumberOfResults,
    ) => {
      getSearch().type(phrase);
      getSearchResults().should(
        'have.length',
        expectedNumberOfResults,
      );
    };

    getSearchAndCountSearchResults('ick', 2);
    clearSearchResults();
    getSearchAndCountSearchResults('Rick', 1);

    // should define custom description resolver fn
    isLeaderRoleType(getSearchResults());
  });

  it('should filter documents', () => {
    const getFilterElement = (selector) =>
      cy.get(FILTER_ID).find(selector);

    const getTableResults = () =>
      cy.get('table').find('tbody').find('tr');

    const countTableResults = (expectedNumberOfResults) =>
      getTableResults().should(
        'have.length',
        expectedNumberOfResults,
      );

    countTableResults(5);
    getFilterElement('.q3-filter-group').eq(1).click();
    getFilterElement('input[value=Female]').click();
    getFilterElement('[type=submit]').click();

    countTableResults(2);
    isLeaderRoleType(getTableResults());
  });
});
