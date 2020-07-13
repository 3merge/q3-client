import React from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Box from '@material-ui/core/Box';
import { withA11y } from '@storybook/addon-a11y';
import Paper from '@material-ui/core/Paper';
import {
  TITLE_TEXT,
  DESCRIPTION,
} from '../__fixtures__/dummy-content';
import FeatureListWithIcons from './FeatureListWithIcons';
import ContentSection from '../ContentSection';
import ContentSectionHeader from '../ContentSectionHeader';

export default {
  title: 'Q3 Blocks|Features/ListWithIcons',
  decorators: [withA11y],
};

export const WithContentSection = () => (
  <Paper>
    <Box py={4}>
      <ContentSection maxWidth="lg">
        <ContentSectionHeader
          title="ContentSectionHeader"
          subtitle="Wrapped inside <ContentSection /> and rendered below <ContentSectionHeader />"
        />
        <FeatureListWithIcons
          features={[
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
            {
              title: TITLE_TEXT,
              description: DESCRIPTION,
              icon: AccountBalanceIcon,
            },
          ]}
        />
      </ContentSection>
    </Box>
  </Paper>
);
