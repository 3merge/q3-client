import React from 'react';
import Charts from 'q3-ui-charts';
import { Helmet } from 'react-helmet';

export default (props) => {
  return (
    <button
      onClick={() => {
        window.localStorage.setItem(`q3-locale`, 'fr');
        window.location.reload();
      }}
    >
      CHANGE LOCALE
    </button>
  );
};
