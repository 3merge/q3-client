import React from 'react';
import CreditCard from '@material-ui/icons/CreditCard';
import Accordion from './accordion';
import CollapsiblePanel from '.';

export default {
  title: 'Q3 UI/Components/CollapsiblePanel',
  parameters: {
    component: CollapsiblePanel,
    componentSubtitle: 'Accordion-style panels',
  },
};

export const Stacked = () => (
  <Accordion>
    <CollapsiblePanel show title="Uno!" muted>
      Hey
    </CollapsiblePanel>
    <CollapsiblePanel
      show
      warning
      title="Dos!"
      description="This one has a warning to display"
      icon={CreditCard}
      muted
    >
      Hey
    </CollapsiblePanel>
    <CollapsiblePanel
      show
      error
      title="Tres!"
      description="This one has an error to display"
      muted
    >
      Hey
    </CollapsiblePanel>
    <CollapsiblePanel
      title="Tres!"
      success
      description="This is just a panel that doesn't have anything to render. Without children, it's disabled automatically."
      muted
    />
    <CollapsiblePanel
      title="Tres!"
      informational
      description="This is just a panel that doesn't have anything to render. Without children, it's disabled automatically."
      muted
    />
  </Accordion>
);
