import React from 'react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Upload from '.';
import { Definitions } from '../state';

export default {
  title: 'Q3 Admin|Upload',
};

export const withFiles = () => (
  <MockApi
    define={(m) => {
      m.onGet('/uploader/1/uploads').reply(200, {
        uploads: [
          {
            name: 'myCsvFile.csv',
          },
          {
            name: 'myWordDoc.docx',
          },
          {
            name: 'myPicture.png',
          },
        ],
      });
    }}
  >
    <Definitions.Provider
      value={{ id: 1, collectionName: 'uploader' }}
    >
      <Upload />
    </Definitions.Provider>
  </MockApi>
);
