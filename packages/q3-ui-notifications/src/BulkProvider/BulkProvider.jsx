import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import DraftsIcon from '@material-ui/icons/Drafts';
import { number } from 'q3-ui-helpers';
import { size } from 'lodash';
import Confirm from 'q3-ui-confirm';
import { useTranslation } from 'q3-ui-locale';
import BulkContext from '../BulkContext';
import BulkProviderSelect from '../BulkProviderSelect';
import useBulk from '../useBulk';

const BulkProvider = ({
  children,
  bulkArchiveByIds,
  bulkReadByIds,
  bulkRemoveByIds,
  bulkUnarchiveByIds,
  bulkUnreadByIds,
  ids,
  messageType,
  view,
}) => {
  const { t } = useTranslation('labels');
  const { all, count, state, reset, ...rest } = useBulk();
  const handleClick = (fn) => () => fn(state);

  React.useEffect(() => {
    reset();
  }, [messageType, view]);

  // can't memoize it
  const renderAction = ({ icon: Icon, label, onClick }) => (
    <Grid item>
      <Tooltip title={t(label)}>
        <IconButton color="inherit" onClick={onClick}>
          {Icon}
        </IconButton>
      </Tooltip>
    </Grid>
  );

  return (
    <BulkContext.Provider value={rest}>
      <BulkProviderSelect
        count={count}
        onDeselectAll={reset}
        onSelectAll={() => {
          all(ids);
        }}
        show={number.greaterThan(size(ids))}
      />
      {number.greaterThan(count) && (
        <Box position="sticky" top="1rem" zIndex={2} mt={1}>
          <Paper>
            <Box px={1.5} py={1}>
              <Grid alignItems="center" container>
                <Grid item>
                  <Box component="span" mr={1}>
                    {t('hasSelected', {
                      count,
                    })}
                    :
                  </Box>
                </Grid>
                {renderAction({
                  icon: <DraftsIcon />,
                  label: 'markAsRead',
                  onClick: handleClick(bulkReadByIds),
                })}
                {renderAction({
                  icon: <MarkunreadIcon />,
                  label: 'markAsUnread',
                  onClick: handleClick(bulkUnreadByIds),
                })}
                {renderAction({
                  icon: <ArchiveIcon />,
                  label: 'archive',
                  onClick: handleClick(bulkArchiveByIds),
                })}
                {view === 'archived' && (
                  <>
                    {renderAction({
                      icon: <UnarchiveIcon />,
                      label: 'restore',
                      onClick: handleClick(
                        bulkUnarchiveByIds,
                      ),
                    })}
                    <Confirm
                      title="confirm"
                      description="confirm"
                      service={handleClick(bulkRemoveByIds)}
                      label="addToTrash"
                      phrase="DELETE"
                      // eslint-disable-next-line
                      ButtonComponent={({ onClick }) =>
                        renderAction({
                          icon: <DeleteOutlineIcon />,
                          label: 'delete',
                          onClick,
                        })
                      }
                    />
                  </>
                )}
              </Grid>
            </Box>
          </Paper>
        </Box>
      )}
      {children}
    </BulkContext.Provider>
  );
};

BulkProvider.defaultProps = {
  ids: [],
  messageType: undefined,
  view: undefined,
};

BulkProvider.propTypes = {
  children: PropTypes.node.isRequired,
  bulkArchiveByIds: PropTypes.func.isRequired,
  bulkReadByIds: PropTypes.func.isRequired,
  bulkRemoveByIds: PropTypes.func.isRequired,
  bulkUnarchiveByIds: PropTypes.func.isRequired,
  bulkUnreadByIds: PropTypes.func.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string),
  messageType: PropTypes.string,
  view: PropTypes.string,
};

export default BulkProvider;
