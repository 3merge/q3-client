import React from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {
  TITLE_TEXT,
  DESCRIPTION,
} from '../__fixtures__/dummy-content';
import Feature from './Feature';

export default {
  title: 'Q3 Blocks|Features',
};

export const Base = () => (
  <Feature title={TITLE_TEXT} description={DESCRIPTION} />
);

export const WithIcon = () => (
  <Feature
    icon={AccountBalanceIcon}
    title={TITLE_TEXT}
    description={DESCRIPTION}
  />
);
