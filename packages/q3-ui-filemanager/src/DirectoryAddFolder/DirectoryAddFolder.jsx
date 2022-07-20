import React from 'react';
import Button from '@material-ui/core/Button';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Dialog from 'q3-ui-dialog';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import FileManagerContext from '../FileManagerContext';

const DirectoryAddFolder = () => {
  const { t } = useTranslation('labels');
  const ctx = React.useContext(FileManagerContext);
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  return (
    <Dialog
      renderTrigger={(open) => (
        <Button
          color="secondary"
          startIcon={<CreateNewFolderIcon />}
          onClick={open}
          variant="contained"
        >
          {t('addFolder')}
        </Button>
      )}
      renderContent={(close) => (
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
              .then(close)
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
      )}
      title="addFolder"
    />
  );
};

export default DirectoryAddFolder;
