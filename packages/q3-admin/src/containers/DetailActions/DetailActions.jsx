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
import {
  useAppContext,
  useDetailRegisterFunction,
} from '../../hooks';
import DropdownMenu from '../../components/DropdownMenu';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import ButtonWithIconDialog from '../../components/ButtonWithIconDialog';
import { Definitions } from '../state';
import Search from '../../components/Search';

const DetailActions = ({ audit, registerActions }) => {
  const { collectionName } = React.useContext(Definitions);

  const lhr = (condition, result) =>
    condition ? result : null;

  const { canDelete, canSeeSub } = useAuth(collectionName);

  const { can } = useAppContext({
    search: lhr(canSeeSub('grams'), <Search />),
    audit: lhr(
      size(audit),
      <ButtonWithIconDialog
        icon={TrackChangesIcon}
        label="audit"
        renderContent={() => (
          <ActivityLog templates={audit} />
        )}
      />,
    ),
    notes: lhr(
      canSeeSub('thread'),
      <ButtonWithIconDialog
        icon={ForumIcon}
        label="notes"
        renderContent={Notes}
      />,
    ),
    files: lhr(
      canSeeSub('uploads'),
      <ButtonWithIconDialog
        icon={AttachFileIcon}
        label="files"
        renderContent={Upload}
      />,
    ),
    trash: lhr(canDelete, <Trash />),
  });

  const actions =
    useDetailRegisterFunction(registerActions);

  return (
    <Box alignItems="center" display="flex">
      {can('search')}
      {can('notes')}
      {can('files')}
      {can('audit')}
      {can('trash')}
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
