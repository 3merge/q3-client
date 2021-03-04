import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Back from '../back';
import Header from '../../components/Header';
import { useAppContext } from '../../hooks';
import { useTitle } from '../../hooks';
import { Dispatcher, Store } from '../state';
import FeaturedPhoto from '../FeaturedPhoto';

export const DetailHeaderBackComponent = (props) => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const { can } = useAppContext(props);
  const fn = patch();

  return (
    <>
      <Back />
    </>
  );
};

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);

  return (
    <Header
      {...props}
      {...useTitle(data, props)}
      backComponent={<FeaturedPhoto component={Avatar} />}
    />
  );
};

export default DetailHeader;
