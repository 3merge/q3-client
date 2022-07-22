import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import FileManagerContext from '../FileManagerContext';

const DirectoryAddFolderForm = ({ onDone }) => {
  const ctx = React.useContext(FileManagerContext);
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  return (
    <Builders.Form
      initialValues={{
        name: '',
      }}
      onSubmit={(values) =>
        ctx
          .post({
            ...values,
            folder: true,
            folderId: current,
          })
          .then(onDone)
      }
    >
      <Builders.Field
        autoFocus
        type="text"
        name="name"
        required
        xl={12}
        lg={12}
        md={12}
      />
    </Builders.Form>
  );
};

DirectoryAddFolderForm.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default DirectoryAddFolderForm;
