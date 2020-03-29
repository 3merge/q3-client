import React from 'react';
import useIndex from '../useIndex';

const Accordion = ({ children }) => {
  const { active, handleChange } = useIndex();

  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      onChange: handleChange(i),
      expanded: active === i,
    }),
  );
};

export default Accordion;
