import React from 'react';
import PropTypes from 'prop-types';
import {
  invokeHandlerByIndex,
  setActiveIndex,
  getLabelByIndex,
  getDescriptionByIndex,
} from './utils';
import { ButtonGroup, Popper } from './components';

const id = 'button-split-options';

const ButtonSplit = ({ options }) => {
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    0,
  );

  return (
    <Popper
      id={id}
      innerRef={anchorRef}
      items={setActiveIndex(
        options,
        setSelectedIndex,
        selectedIndex,
      )}
      render={(toggle) => (
        <ButtonGroup
          id={id}
          toggleOpenState={toggle}
          anchorRef={anchorRef}
          onClick={invokeHandlerByIndex(
            options,
            selectedIndex,
          )}
          label={getLabelByIndex(options, selectedIndex)}
          description={getDescriptionByIndex(
            options,
            selectedIndex,
          )}
        />
      )}
    />
  );
};

ButtonSplit.propTypes = {
  /**
   * Labels, descriptions and event handlers for actions in the button.
   * Note that the first item in the array acts as default.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      handler: PropTypes.func,
      label: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};

ButtonSplit.defaultProps = {
  options: [],
};

export default ButtonSplit;
