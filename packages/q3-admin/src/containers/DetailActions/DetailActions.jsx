import React from 'react';
import PropTypes from 'prop-types';
import { size } from 'lodash';
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
import { Definitions } from '../state';
import Search from '../../components/Search';

const DetailActions = ({ audit, registerActions }) => {
  const { collectionName } = React.useContext(Definitions);
  const { canDelete, canSeeSub } = useAuth(collectionName);

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
          renderContent={Notes}
        />,
      )}
      {lhr(
        canSeeSub('uploads'),
        <ButtonWithIconDialog
          icon={AttachFileIcon}
          label="files"
          renderContent={Upload}
        />,
      )}
      {lhr(
        size(audit),
        <ButtonWithIconDialog
          icon={TrackChangesIcon}
          label="audit"
          renderContent={() => (
            <ActivityLog templates={audit} />
          )}
        />,
      )}
      {lhr(canDelete, <Trash />)}
      <DropdownMenu items={actions}>
        {(onClick) => (
          <ButtonWithIcon
            icon={MoreVertIcon}
            label="actions"
            onClick={onClick}
            disabled={!size(actions)}
          />
        )}
      </DropdownMenu>
    </Box>
  );
};

DetailActions.defaultProps = {
  audit: [],
  registerActions: null,
};

DetailActions.propTypes = {
  audit: PropTypes.arrayOf(PropTypes.string),
  registerActions: PropTypes.func,
};

export default React.memo(DetailActions);
