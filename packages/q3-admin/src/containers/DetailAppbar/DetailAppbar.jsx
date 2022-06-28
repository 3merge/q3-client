import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';

const DetailAppbar = ({ children, actions, ...rest }) => (
  <Header>
    <Box width="100%">
      <DetailHeader {...rest}>
        <ActionBar>{actions}</ActionBar>
      </DetailHeader>
    </Box>
  </Header>
);

DetailAppbar.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

DetailAppbar.defaultProps = {
  actions: null,
  children: null,
};

export default React.memo(DetailAppbar);
