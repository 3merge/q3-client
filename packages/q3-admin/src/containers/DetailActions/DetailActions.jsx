import React from 'react';
import PropTypes from 'prop-types';
import { get, size, isFunction } from 'lodash';
import { Box } from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useAuth } from 'q3-ui-permissions';
import DescriptionIcon from '@material-ui/icons/Description';
import Notes from '../notes';
import Upload from '../upload';
import Trash from '../trash';
import ActivityLog from '../activityLog';
import ActionBarTemplate from '../../components/ActionBarTemplate';
import ButtonWithIconDialog from '../../components/ButtonWithIconDialog';
import { Definitions, Store } from '../state';

const DetailActions = ({
  audit,
  defineActionProps,
  registerActions,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);

  const {
    canSeeSub,
    state: authState,
    canDeleteSub,
  } = useAuth(collectionName);

  const actionProps = isFunction(defineActionProps)
    ? defineActionProps(data, authState?.profile)
    : {};

  const lhr = (condition, result) =>
    condition ? result : null;

  return (
    <Box alignItems="center" display="flex">
      <div id="q3-actions-portal" />
      {lhr(
        canSeeSub('thread'),
        <ButtonWithIconDialog
          transparent
          icon={DescriptionIcon}
          label="notes"
          renderContent={() => (
            <Notes {...get(actionProps, 'thread', {})} />
          )}
        />,
      )}
      {lhr(
        canSeeSub('uploads'),
        <ButtonWithIconDialog
          transparent
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
          transparent
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
      <ActionBarTemplate
        registerActions={registerActions}
      />
      {lhr(canDeleteSub('id'), <Trash />)}
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
