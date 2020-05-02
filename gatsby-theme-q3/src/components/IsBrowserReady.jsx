import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';

const { isBrowserReady } = browser;

const IsBrowserReady = ({ children }) =>
  isBrowserReady() ? children : null;

IsBrowserReady.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsBrowserReady;
