import React from 'react';
import { get, size } from 'lodash';
import Confirm from 'q3-ui-confirm';
import { State } from 'q3-ui-exports';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Dispatcher } from '../state';
import AuthDelete from '../AuthDelete';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const TableBulkDelete = () => {
  const { removeBulk } = React.useContext(Dispatcher);
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked');
  const len = size(checked);

  return React.useMemo(
    () => (
      <AuthDelete>
        <Confirm
          phrase="DELETE"
          title="deleteMany"
          service={removeBulk(checked)}
          ButtonComponent={(props) => (
            <ButtonWithIcon
              {...props}
              disabled={!len}
              label="deleteMany"
              icon={DeleteSweepIcon}
              count={len}
            />
          )}
        />
      </AuthDelete>
    ),
    [len],
  );
};

TableBulkDelete.defaultProps = {};
TableBulkDelete.propTypes = {};

export default TableBulkDelete;
