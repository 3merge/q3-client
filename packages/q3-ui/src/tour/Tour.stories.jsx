import React from 'react';
import { browser } from 'q3-ui-helpers';
import Tour, { storageKey } from './Tour';

export default {
  title: 'Q3 UI|Components/Tour',
};

export const Demo = () => (
  <>
    <button
      type="button"
      onClick={() => {
        browser.proxyLocalStorageApi(
          'removeItem',
          storageKey,
        );

        window.location.reload();
      }}
    >
      Clear storage
    </button>
    <div
      id="featured1"
      style={{ height: 350, backgroundColor: 'red' }}
    />
    <div
      id="featured2"
      style={{ height: 350, backgroundColor: 'blue' }}
    />
    <Tour
      steps={[
        {
          target: '#featured1',
          title: 'Feature 1',
          content: 'Feature 1 content',
        },
        {
          target: '#featured2',
          title: 'Feature 2',
          content: 'Feature 2 content',
        },
      ]}
    />
  </>
);
