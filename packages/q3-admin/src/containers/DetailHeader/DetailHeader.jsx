import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import Box from '@material-ui/core/Box';
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
        <div
          style={{
            display: 'inline-block',
            height: 50,
          }}
        />
      )}
    </>
  );
};

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);

  return (
    <Box my={{ xl: 0.75, lg: 0.75 }}>
      <Header
        {...props}
        {...useTitle(data, props)}
        backComponent={
          <DetailHeaderBackComponent {...props} />
        }
      />
    </Box>
  );
};

export default DetailHeader;
