import React from 'react';
import CollapsiblePanel from '.';

export default {
  title: 'Q3 UI/Components|CollapsiblePanel',
  parameters: {
    component: CollapsiblePanel,
    componentSubtitle: 'Accordion-style panels',
  },
};

export const Stacked = () => (
  <>
    <CollapsiblePanel
      show
      title="Uno!"
      alerts={[
        { title: 'This is an alert', label: 'ALERT' },
        {
          title: 'This is important',
          label: 'MESSAGE',
          important: true,
        },
      ]}
    >
      Hey
    </CollapsiblePanel>
    <CollapsiblePanel
      show
      warning
      title="Dos!"
      description="This one has a warning to display"
      transparent
    >
      Hey
    </CollapsiblePanel>
    <CollapsiblePanel
      show
      error
      title="Tres!"
      description="This one has an error to display"
      transparent
    >
      Hey
    </CollapsiblePanel>
  </>
);
