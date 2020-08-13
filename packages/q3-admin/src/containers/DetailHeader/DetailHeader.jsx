import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import Back from '../back';
import Header from '../../components/Header';
import { useAppContext } from '../../hooks';
import { useTitle } from '../../hooks';
import { Store } from '../state';

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);
  const { can } = useAppContext(props);

  return (
    <Header
      {...props}
      backComponent={
        <>
          <Back />
          {can('picture') ? (
            <Avatar src={data.photo} />
          ) : (
            // offset missing avatar
            <div style={{ height: 50 }} />
          )}
        </>
      }
      {...useTitle(data, props)}
    />
  );
};

export default DetailHeader;
