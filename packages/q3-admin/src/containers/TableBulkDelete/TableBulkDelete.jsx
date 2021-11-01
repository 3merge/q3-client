import React from 'react';
import { get, size } from 'lodash';
import Confirm from 'q3-ui-confirm';
import { State } from 'q3-ui-exports';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useAuth } from 'q3-ui-permissions';
import { Definitions, Dispatcher } from '../state';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const TableBulkDelete = () => {
  const { collectionName } = React.useContext(Definitions);
  const { removeBulk } = React.useContext(Dispatcher);
  const exportState = React.useContext(State);
  const { Hide } = useAuth(collectionName);

  const checked = get(exportState, 'checked');
  const len = size(checked);

  return React.useMemo(
    () =>
      len ? (
        <Hide op="Delete">
          <Confirm
            phrase="DELETE"
            title="deleteMany"
            service={removeBulk(checked)}
            ButtonComponent={(props) => (
              <ButtonWithIcon
                {...props}
                label="deleteMany"
                icon={DeleteSweepIcon}
                count={len}
                color="inherit"
              />
            )}
          />
        </Hide>
      ) : null,
    [len],
  );
};

TableBulkDelete.defaultProps = {};
TableBulkDelete.propTypes = {};

export default TableBulkDelete;
