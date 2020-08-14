import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
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
    <span id="q3-detail-back">
      <Back />
      {can('picture') ? (
        <>
          <FeaturedPhoto
            component={Avatar}
            src={data.photo}
            update={fn}
          />
        </>
      ) : (
        // offset missing avatar
        <div style={{ height: 50 }} />
      )}
    </span>
  );
};

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);

  return (
    <Header
      {...props}
      {...useTitle(data, props)}
      backComponent={
        <DetailHeaderBackComponent {...props} />
      }
    />
  );
};

export default DetailHeader;
