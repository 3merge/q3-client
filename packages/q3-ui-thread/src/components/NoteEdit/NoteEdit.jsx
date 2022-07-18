import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { compact, get, isFunction } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import NoteForm from '../NoteForm';
import ThreadContextHttp from '../ThreadContextHttp';
import ThreadContext from '../ThreadContext';

const NoteEdit = ({ id, children }) => {
  const { canEdit, canDelete } =
    React.useContext(ThreadContext);
  const { patch, remove } = React.useContext(
    ThreadContextHttp,
  );

  const [isEditing, setIsEditing] = React.useState(false);

  const edit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing((prevState) => !prevState);
  };

  const invokeWithId = (fn) =>
    isFunction(fn) ? fn(String(id)) : Promise.resolve(null);

  const IconComponent = React.useMemo(
    () => (isEditing ? CloseIcon : EditIcon),
    [isEditing],
  );

  const EditorComponent = React.useMemo(
    () => (initialValues) =>
      canEdit ? (
        <NoteForm
          enableReset={canDelete}
          initialValues={{
            message: get(initialValues, 'message', ''),
            pin: get(initialValues, 'pin', false),
            tags: compact(get(initialValues, 'tags', [])),
            title: get(initialValues, 'title', ''),
          }}
          onReset={invokeWithId(remove)}
          onSubmit={(values) =>
            invokeWithId(patch)(values).then(() => {
              setIsEditing(false);
            })
          }
          resetLabel="delete"
        />
      ) : null,
    [canEdit, canEdit],
  );

  return children({
    EditorComponent,
    IconComponent,
    canEdit,
    edit,
    isEditing,
  });
};

NoteEdit.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default NoteEdit;
