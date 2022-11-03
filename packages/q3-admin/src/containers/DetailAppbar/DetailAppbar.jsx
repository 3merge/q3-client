import React from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import DetailActions from '../DetailActions';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';
import Back from '../back';

const DetailAppbar = (props) => (
  <Header>
    <Box display="flex" alignItems="center" mb={1}>
      <Hidden mdDown>
        <Back />
      </Hidden>
      <ActionBar>
        <DetailActions {...props} />
      </ActionBar>
    </Box>
    <DetailHeader {...props} />
  </Header>
);

DetailAppbar.propTypes = {};
DetailAppbar.defaultProps = {};

export default React.memo(DetailAppbar);
