import React from 'react';
import DetailActions from '../DetailActions';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';

const DetailAppbar = (props) => (
  <Header>
    <DetailHeader {...props}>
      <ActionBar>
        <DetailActions {...props} />
      </ActionBar>
    </DetailHeader>
  </Header>
);

DetailAppbar.propTypes = {};
DetailAppbar.defaultProps = {};

export default React.memo(DetailAppbar);
