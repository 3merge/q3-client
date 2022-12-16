import React from 'react';
import PropTypes from 'prop-types';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import useMultiSelect from '../useMultiSelect';
import useStyle from './styles';

const DragToSelect = ({ children }) => {
  const { current = null } = React.useContext(
    FileManagerCurrentContext,
  );

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
      clearSelected,
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
      <div
        id="file-multiselect-container"
        className={cls.root}
        ref={container}
      >
        {children}
      </div>
    </FileManagerBatchContext.Provider>
  );
};

DragToSelect.defaultProps = {
  children: null,
};

DragToSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default DragToSelect;
