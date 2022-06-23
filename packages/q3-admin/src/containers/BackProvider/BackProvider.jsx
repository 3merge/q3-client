import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { compact } from 'lodash';
import { browser } from 'q3-ui-helpers';

const PAGE_HISTORY_STORAGE_KEY = 'q3-page-history-array';
const DELIMITER = '_-_';

export const getPageHistory = () =>
  String(
    browser.proxySessionStorageApi(
      'getItem',
      PAGE_HISTORY_STORAGE_KEY,
    ),
  ).split(DELIMITER);

const BackProvider = ({ children }) => {
  const { pathname, search } = useLocation();

  React.useLayoutEffect(() => {
    browser.proxySessionStorageApi(
      'setItem',
      PAGE_HISTORY_STORAGE_KEY,
      [compact([pathname, search]).join('')]
        .concat(getPageHistory())
        .join(DELIMITER),
    );
  }, [pathname, search]);

  return children;
};

BackProvider.defaultProps = {
  children: null,
};

BackProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default BackProvider;
