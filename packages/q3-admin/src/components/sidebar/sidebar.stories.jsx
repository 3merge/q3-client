import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CreditCard from '@material-ui/icons/CreditCard';
import Sidebar from '.';

export default {
  title: 'Q3 Admin|Components/Sidebar',
  parameters: {
    component: Sidebar,
    componentSubtitle: 'Pre-built aside for detail views',
  },
};

export const WithPanels = () => (
  <Sidebar
    registerOptions={(params, t) => [
      {
        title: 'Billing',
        description:
          'This is the billing address. It goes to 123 Toronto Street, Ont.',
        icon: CreditCard,
        actions: [
          {
            label: 'Hey',
            onClick: () => null,
          },
        ],
      },
      {
        title: 'Payment option',
        description: 'Mastercard',
        icon: CreditCard,
        actions: [
          {
            label: 'Hey',
            onClick: () => null,
          },
        ],
      },
    ]}
    registerPanels={(params, t) => [
      {
        title: 'Interesting',
        onClick: () => null,
        content: (
          <Box component="address">
            This is a content block that will render
            underneath. Useful for paragraphs
          </Box>
        ),
      },
    ]}
  />
);

export const WithoutTabs = () => <Sidebar />;

export const WithComments = () => (
  <Sidebar
    commentTab={() => <div />}
    historyTab={() => <div />}
  />
);
