import React from 'react';
import PropTypes from 'prop-types';

export const propTypes = {
  component: PropTypes.element,
  captureSelection: PropTypes.func.isRequired,
  selection: PropTypes.shape({
    index: PropTypes.number,
    range: PropTypes.number,
  }),
};

const withCurrentSelection = (Component) =>
  React.forwardRef((props, ref) => {
    const [selection, setSelection] = React.useState();

    const captureSelection = (next) => (e) => {
      e.preventDefault();
      const nextSelection = ref.current.getSelection();
      setSelection(nextSelection);
      next(nextSelection);
    };

    return (
      <Component
        ref={ref}
        captureSelection={captureSelection}
        selection={selection}
        {...props}
      />
    );
  });

export default withCurrentSelection;
