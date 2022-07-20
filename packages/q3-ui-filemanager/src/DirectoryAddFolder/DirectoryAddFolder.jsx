import React from 'react';
import Button from '@material-ui/core/Button';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useTranslation } from 'q3-ui-locale';
import { object } from 'q3-ui-helpers';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import FileManagerContext from '../FileManagerContext';

const DirectoryAddFolder = () => {
  const ctx = React.useContext(FileManagerContext);
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  const { t } = useTranslation();

  const handleClick = () => {
    // eslint-disable-next-line
    const name = prompt(t('descriptions:enterFolderName'));

    if (name)
      object.noop(
        ctx.post({
          name,
          folder: true,
          folderId: current,
        }),
      );
  };

  return (
    <Button
      color="secondary"
      startIcon={<CreateNewFolderIcon />}
      onClick={handleClick}
      variant="contained"
    >
      {t('labels:folder')}
    </Button>
  );
};

export default DirectoryAddFolder;
