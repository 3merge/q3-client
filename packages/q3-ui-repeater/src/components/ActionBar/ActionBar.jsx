import React from 'react';
import PropTypes from 'prop-types';
import { State } from 'q3-ui-exports';
import BulkEditorDrawer from '../BulkEditorDrawer';
import BulkDeleteModal from '../BulkDeleteModal';

const CustomActionBar = ({ renderSelected, length }) => {
  const { setChecked } = React.useContext(State);

  // must reset selection if data length changes
  // otherwise accidental updates/deletes could happen
  React.useEffect(() => {
    setChecked([]);
  }, [length]);

  return React.useMemo(
    () => (
      <>
        {renderSelected && (
          <BulkEditorDrawer>
            {renderSelected}
          </BulkEditorDrawer>
        )}
        <BulkDeleteModal />
      </>
    ),
    [],
  );
};

CustomActionBar.defaultProps = {
  renderSelected: null,
};

CustomActionBar.propTypes = {
  renderSelected: PropTypes.node,
  length: PropTypes.number.isRequired,
};

export default CustomActionBar;
