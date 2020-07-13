import React from 'react';
import Back from '../back';
import Header from '../../components/Header';
import { useTitle } from '../../hooks';
import { Store } from '../state';

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);

  return (
    <Header
      {...props}
      backComponent={<Back />}
      {...useTitle(data, props)}
    />
  );
};

export default DetailHeader;
