import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import Dialog from 'q3-ui-dialog';
import { Box } from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ForumIcon from '@material-ui/icons/Forum';
import { useAuth } from 'q3-ui-permissions';
import { Avatar } from '@material-ui/core';
import Notes from '../notes';
import Upload from '../upload';
import Trash from '../trash';
import ActivityLog from '../activityLog';
import { useAppContext } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { Definitions } from '../state';
import Search from '../../components/Search';

export const DetailsActionDialog = ({
  renderContent,
  label,
  icon,
}) => (
  <Dialog
    renderContent={renderContent}
    renderTrigger={(onClick) => (
      <ButtonWithIcon
        label={label}
        icon={icon}
        onClick={onClick}
      />
    )}
    title={label}
    variant="drawer"
  />
);

DetailsActionDialog.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  renderContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

export const DetailActionsWrapper = (props) => (
  <Box alignItems="center" display="flex" {...props} />
);

const DetailActions = ({ audit, notes, files }) => {
  const { collectionName } = React.useContext(Definitions);

  const lhr = (condition, result) =>
    condition ? result : null;

  const { canDelete } = useAuth(collectionName);

  const { can } = useAppContext({
    search: <Search />,
    audit: lhr(
      audit && isObject(audit),
      <DetailsActionDialog
        icon={TrackChangesIcon}
        label="audit"
        renderContent={() => (
          <ActivityLog templates={audit} />
        )}
      />,
    ),
    notes: lhr(
      notes,
      <DetailsActionDialog
        icon={ForumIcon}
        label="notes"
        renderContent={Notes}
      />,
    ),
    files: lhr(
      files,
      <DetailsActionDialog
        icon={AttachFileIcon}
        label="files"
        renderContent={Upload}
      />,
    ),

    // can we do the same with permissions and notes?
    trash: lhr(canDelete, <Trash />),
  });

  return (
    <Box alignItems="center" display="flex">
      {can('search')}
      {can('notes')}
      {can('files')}
      {can('audit')}
      {can('trash')}
    </Box>
  );
};

DetailActions.defaultProps = {
  audit: null,
  files: false,
  notes: false,
};

DetailActions.propTypes = {
  // eslint-disable-next-line
  audit: PropTypes.object,
  files: PropTypes.bool,
  notes: PropTypes.bool,
};

export default React.memo(DetailActions);
