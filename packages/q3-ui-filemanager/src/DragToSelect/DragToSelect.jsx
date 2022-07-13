import React from 'react';
import PropTypes from 'prop-types';
import FileManagerBatchContext from '../FileManagerBatchContext';
import useMultiSelect from '../useMultiSelect';
import useStyle from './styles';

const DragToSelect = ({ current, children }) => {
  const {
    clearSelected,
    container,
    disabled,
    selected,
    ...rest
  } = useMultiSelect();

  const cls = useStyle();
  const stateValue = React.useMemo(
    () => ({
      disabled,
      selected,
      ...rest,
    }),
    [disabled, selected],
  );

  React.useEffect(() => {
    // clears on directory change
    clearSelected();
  }, [current]);

  return (
    <FileManagerBatchContext.Provider value={stateValue}>
      <div className={cls.root} ref={container}>
        {children}
      </div>
    </FileManagerBatchContext.Provider>
  );
};

DragToSelect.defaultProps = {
  children: null,
  current: PropTypes.null,
};

DragToSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  current: PropTypes.string,
};

export default DragToSelect;
