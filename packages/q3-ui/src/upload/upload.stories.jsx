import React from 'react';
import Upload from '.';

export default {
  title: 'Q3 UI|Components|Upload',
};

export const Demo = () => (
  <Upload
    fn={() =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 1500),
      )
    }
  />
);
