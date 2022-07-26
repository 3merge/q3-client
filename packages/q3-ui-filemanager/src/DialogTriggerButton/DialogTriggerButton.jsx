import React from 'react';

const DialogTriggerButton = (props) => (
  // eslint-disable-next-line
  <button
    aria-label="hidden trigger"
    style={{
      display: 'none',
    }}
    {...props}
  />
);

export default DialogTriggerButton;
