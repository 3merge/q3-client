import React from 'react';
import Box from '@material-ui/core/Box';
import DetailActions from '../DetailActions';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';

const DetailAppbar = (props) => (
  <Header>
    <Box width="100%">
      <DetailHeader {...props}>
        <ActionBar>
          <DetailActions {...props} />
        </ActionBar>
      </DetailHeader>
    </Box>
  </Header>
);

DetailAppbar.propTypes = {};
DetailAppbar.defaultProps = {};

export default React.memo(DetailAppbar);
