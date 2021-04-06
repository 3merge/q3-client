import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import { State } from 'q3-ui-exports';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import BulkEditorDrawer from '../BulkEditorDrawer';
import BulkDeleteModal from '../BulkDeleteModal';

export const findByLabel = (a, b) =>
  a.find(({ label }) => label === b.label);

const CustomActionBar = ({ renderSelected, length }) => {
  const { checked, setChecked } = React.useContext(State);

  React.useEffect(() => {
    setChecked([]);
  }, [length]);

  return (
    checked.length > 0 && (
      <Hidden implementation="css" smDown>
        <Grid
          item
          style={{ minHeight: 40, padding: '0 1rem' }}
        >
          {renderSelected && (
            <BulkEditorDrawer
              ids={checked}
              renderTrigger={(onClick) => (
                <IconButton
                  icon={Edit}
                  label="bulkUpdate"
                  buttonProps={{ onClick }}
                />
              )}
            >
              {renderSelected}
            </BulkEditorDrawer>
          )}
          <BulkDeleteModal
            ids={checked}
            renderTrigger={(onClick) => (
              <IconButton
                icon={DeleteForeverIcon}
                label="bulkDelete"
                buttonProps={{
                  onClick,
                }}
              />
            )}
          />
        </Grid>
      </Hidden>
    )
  );
};

CustomActionBar.propTypes = {
  renderSelected: PropTypes.element.isRequired,
  length: PropTypes.number.isRequired,
};

export default CustomActionBar;
