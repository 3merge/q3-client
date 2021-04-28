import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import { isEqual, invoke } from 'lodash';

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
    const cb = React.useRef();
    const CustomButtonComponent = props.component;
    const [selection, setSelection] = React.useState();

    React.useEffect(() => {
      // otherwise our decorated components
      // won't yet have selection defined
      if (selection) invoke(cb, 'current');
    }, [selection?.index]);

    return (
      <Component
        ref={ref}
        buttonComponent={({ onClick }) => {
          cb.current = onClick;

          const captureSelection = () => {
            const nextSelection = ref.current.getSelection();

            if (!nextSelection) {
              ref.current.focus();
              return;
            }

            if (isEqual(nextSelection, selection))
              onClick();
            else setSelection(nextSelection);
          };

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
        selection={selection}
        {...props}
      />
    );
  });

export default withCurrentSelection;
