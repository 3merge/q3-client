import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { compact, get, isFunction } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import NoteForm from '../NoteForm';
import ThreadContextHttp from '../ThreadContextHttp';
import ThreadContext from '../ThreadContext';
import useTitle from '../useTitle';

export const invert = (xs) => !xs;

export const invokeWithStaticParam = (param) => (fn) =>
  isFunction(fn)
    ? fn(String(param))
    : Promise.resolve(null);

const NoteEdit = ({ id, children }) => {
  const { canEdit, canDelete } =
    React.useContext(ThreadContext);
  const { patch, remove } = React.useContext(
    ThreadContextHttp,
  );

  const [isEditing, setIsEditing] = React.useState(false);
  const invokeWithId = invokeWithStaticParam(id);

  const edit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(invert);
  };

  const IconComponent = React.useMemo(
    () => (isEditing ? CloseIcon : EditIcon),
    [isEditing],
  );

  const EditorComponent = React.useMemo(
    () => (initialValues) => {
      const title = useTitle(initialValues);

      return canEdit ? (
        <NoteForm
          enableReset={canDelete}
          initialValues={{
            message: get(initialValues, 'message', ''),
            pin: get(initialValues, 'pin', false),
            tags: compact(get(initialValues, 'tags', [])),
            title,
          }}
          onReset={invokeWithId(remove)}
          onSubmit={(values) =>
            invokeWithId(patch)(values).then(() => {
              setIsEditing(false);
            })
          }
          resetLabel="delete"
        />
      ) : null;
    },
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
