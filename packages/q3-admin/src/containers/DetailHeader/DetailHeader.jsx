import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import Back from '../back';
import Header from '../../components/Header';
import { useAppContext } from '../../hooks';
import { useTitle } from '../../hooks';
import { Dispatcher, Store } from '../state';

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const DetailHeader = (props) => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const { can } = useAppContext(props);
  const fn = patch();

  return (
    <Header
      {...props}
      backComponent={
        <>
          <Back />
          {can('picture') ? (
            <Avatar
              src={data.photo}
              customizer={() => {
                return FEATURED_UPLOAD_KEY;
              }}
              onDrop={fn}
              onDelete={() =>
                fn({
                  [FEATURED_UPLOAD_KEY]: null,
                })
              }
            />
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
