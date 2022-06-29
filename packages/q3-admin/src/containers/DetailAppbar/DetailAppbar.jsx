import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import DetailActions from '../DetailActions';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';

const DetailAppbar = ({ children, ...rest }) => (
  <Header>
    <Box width="100%">
      <DetailHeader {...rest}>
        <ActionBar>
          <DetailActions {...rest} />
        </ActionBar>
      </DetailHeader>
    </Box>
  </Header>
);

DetailAppbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

DetailAppbar.defaultProps = {
  children: null,
};

export default React.memo(DetailAppbar);
