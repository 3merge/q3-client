import React from 'react';
import PropTypes from 'prop-types';
import {
  invokeHandlerByIndex,
  setActiveIndex,
  getLabelByIndex,
  getDescriptionByIndex,
} from './utils';
import {
  ButtonGroup,
  Popper,
  MenuItems,
} from './components';

const id = 'button-split-options';

const ButtonSplit = ({ options, ...etc }) => {
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    0,
  );

  const handleSelection = (fn) => (i) => {
    setSelectedIndex(i);
    fn();
  };

  return (
    <Popper
      id={id}
      innerRef={anchorRef}
      renderInside={(close) => (
        <MenuItems
          activeIndex={selectedIndex}
          items={setActiveIndex(
            options,
            handleSelection(close),
            selectedIndex,
          )}
        />
      )}
      renderOutside={(toggle) => (
        <ButtonGroup
          {...etc}
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

  /**
   * Will disable click actions
   */
  disabled: PropTypes.func,

  /**
   * Will showing a loading icon
   */
  loading: PropTypes.func,
};

ButtonSplit.defaultProps = {
  disabled: false,
  loading: false,
  options: [],
};

export default ButtonSplit;
