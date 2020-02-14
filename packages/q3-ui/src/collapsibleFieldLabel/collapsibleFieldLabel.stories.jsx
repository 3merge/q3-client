import React from 'react';
import CollapsibleFieldLabel from '.';

export default {
  title: 'Components/Collapsible field label',
};

export const AsCollapsible = () => (
  <CollapsibleFieldLabel
    error={false}
    helperText="Clicker"
    label="Can collapse me!"
    collapse
  >
    Children
  </CollapsibleFieldLabel>
);

export const AsNonCollapsible = () => (
  <CollapsibleFieldLabel
    error
    helperText="Clicker"
    label="Cannot collapse me!"
    collapse={false}
  >
    Children
  </CollapsibleFieldLabel>
);
