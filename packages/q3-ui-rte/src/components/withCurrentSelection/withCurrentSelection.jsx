import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import { isFunction } from 'lodash';

export const propTypes = {
  buttonComponent: PropTypes.element,
  captureSelection: PropTypes.func.isRequired,
  selection: PropTypes.shape({
    index: PropTypes.number,
    range: PropTypes.number,
  }),
};

const withCurrentSelection = (Component, { icon, label }) =>
  React.forwardRef((props, ref) => {
    const CustomButtonComponent = props.component;
    const [selection, setSelection] = React.useState();

    const captureSelection = (e) => {
      e.preventDefault();
      const nextSelection = ref.current.getSelection();
      setSelection(nextSelection);
    };

    return (
      <Component
        ref={ref}
        buttonComponent={({ onClick }) => {
          React.useEffect(() => {
            // otherwise our decorated components
            // won't yet have selection defined
            if (selection) onClick();
          }, [selection]);

          return CustomButtonComponent ? (
            <CustomButtonComponent
              icon={icon}
              onClick={captureSelection}
            />
          ) : (
            <IconButton
              label={label}
              icon={icon}
              buttonProps={{
                onClick: captureSelection,
                type: 'button',
              }}
            />
          );
        }}
        captureSelection={captureSelection}
        selection={selection}
        {...props}
      />
    );
  });

export default withCurrentSelection;
