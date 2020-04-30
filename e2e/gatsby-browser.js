/* eslint-disable import/prefer-default-export, react/prop-types, react/jsx-filename-extension */
import React from 'react';
import Provider from 'q3-ui';
import FormProviders from 'q3-ui-forms';
import AuthProvider from 'q3-ui-permissions';
import MockWrapper from './cypress/fixtures';

export const wrapRootElement = ({ element }) => (
  <Provider>
    <AuthProvider>
      <FormProviders preventDuplicate>
        <MockWrapper>{element}</MockWrapper>
      </FormProviders>
    </AuthProvider>
  </Provider>
);
