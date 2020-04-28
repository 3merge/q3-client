import React from 'react';
import PropTypes from 'prop-types';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Actionbar, State } from 'q3-ui-exports';
import BulkEditorDrawer from './BulkEditorDrawer';
import BulkDeleteModal from './BulkDeleteModal';

export const findByLabel = (a, b) =>
  a.find(({ label }) => label === b.label);

const CustomActionBar = ({ children, ...props }) => {
  const { checked, hasChecked } = React.useContext(State);
  const [actions, setActions] = React.useState([]);
  const matches = useMediaQuery('(min-width:992px)');

  const registerAction = (action) => (onClick) => {
    if (matches && !findByLabel(actions, action))
      setActions([...actions, { ...action, onClick }]);

    return null;
  };

  React.useEffect(() => setActions([]), [hasChecked()]);

  return (
    <>
      {children && (
        <BulkEditorDrawer
          ids={checked}
          renderTrigger={registerAction({
            label: 'bulkEdit',
            icon: <EditLocationIcon />,
          })}
        >
          {children}
        </BulkEditorDrawer>
      )}
      <BulkDeleteModal
        ids={checked}
        renderTrigger={registerAction({
          label: 'bulkDelete',
          icon: <DeleteForeverIcon />,
        })}
      />
      <Actionbar {...props} actions={actions} />
    </>
  );
};

CustomActionBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomActionBar;
