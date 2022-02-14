import React from 'react';
import PropTypes from 'prop-types';
import { get, size, isFunction } from 'lodash';
import { Box } from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ForumIcon from '@material-ui/icons/Forum';
import { useAuth } from 'q3-ui-permissions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Notes from '../notes';
import Upload from '../upload';
import Trash from '../trash';
import ActivityLog from '../activityLog';
import { useDetailRegisterFunction } from '../../hooks';
import DropdownMenu from '../../components/DropdownMenu';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import ButtonWithIconDialog from '../../components/ButtonWithIconDialog';
import { Definitions, Store } from '../state';
import Search from '../../components/Search';

const DetailActions = ({
  audit,
  defineActionProps,
  registerActions,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);

  const {
    canDelete,
    canSeeSub,
    state: authState,
  } = useAuth(collectionName);

  const actionProps = isFunction(defineActionProps)
    ? defineActionProps(data, authState?.profile)
    : {};

  const actions =
    useDetailRegisterFunction(registerActions);

  const lhr = (condition, result) =>
    condition ? result : null;

  return (
    <Box alignItems="center" display="flex">
      {lhr(canSeeSub('grams'), <Search />)}
      {lhr(
        canSeeSub('thread'),
        <ButtonWithIconDialog
          icon={ForumIcon}
          label="notes"
          renderContent={() => (
            <Notes {...get(actionProps, 'thread', {})} />
          )}
        />,
      )}
      {lhr(
        canSeeSub('uploads'),
        <ButtonWithIconDialog
          icon={AttachFileIcon}
          label="files"
          renderContent={() => (
            <Upload {...get(actionProps, 'uploads', {})} />
          )}
        />,
      )}
      {lhr(
        size(audit),
        <ButtonWithIconDialog
          icon={TrackChangesIcon}
          label="audit"
          renderContent={() => (
            <ActivityLog
              templates={audit}
              {...get(actionProps, 'audit', {})}
            />
          )}
        />,
      )}
      {lhr(canDelete, <Trash />)}
      {size(actions) > 0 && (
        <DropdownMenu items={actions}>
          {(onClick) => (
            <ButtonWithIcon
              icon={MoreVertIcon}
              label="actions"
              onClick={onClick}
            />
          )}
        </DropdownMenu>
      )}
    </Box>
  );
};

DetailActions.defaultProps = {
  audit: [],
  registerActions: null,
  defineActionProps: null,
};

DetailActions.propTypes = {
  audit: PropTypes.arrayOf(PropTypes.string),
  defineActionProps: PropTypes.func,
  registerActions: PropTypes.func,
};

export default React.memo(DetailActions);
