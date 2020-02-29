import React from 'react';
import { Location, navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const clamp = (v) => (v === -1 ? 0 : v + 1);
const isString = (v) => typeof v === 'string';

const clean = (a) => (b) =>
  isString(a) &&
  isString(b) &&
  a
    .replace('?', '')
    .replace(/(%20)|\+/gi, ' ')
    .toLowerCase()
    .includes(b.toLowerCase());

export const findIndexByStartsWith = (queries, term) =>
  clamp(Object.values(queries).findIndex(clean(term)));

export const withSearchQuery = (Component) => (props) => (
  <Location>
    {({ location: { search } }) => (
      <Component {...props} search={search} />
    )}
  </Location>
);

export const Groups = ({ queries, search }) => {
  const { t } = useTranslation('labels');

  return (
    <Container>
      <Tabs
        centered
        value={findIndexByStartsWith(queries, search)}
        variant="fullWidth"
        scrollButtons="auto"
      >
        <Tab
          label={t('all')}
          onClick={() => navigate('?')}
          centered
        />
        {Object.entries(queries).map(([label, query]) => (
          <Tab
            key={query}
            label={t(label)}
            onClick={() => navigate(`?${query}`)}
          />
        ))}
      </Tabs>
    </Container>
  );
};

Groups.propTypes = {
  /**
   * Key-value list of query presets.
   */
  queries: PropTypes.shape({}).isRequired,

  /**
   * Active search query params.
   */
  search: PropTypes.string.isRequired,
};

export default withSearchQuery(Groups);
