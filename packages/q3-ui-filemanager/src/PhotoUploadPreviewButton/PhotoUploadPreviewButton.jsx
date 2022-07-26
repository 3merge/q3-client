import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import { useOpen } from 'useful-state';
import BackupIcon from '@material-ui/icons/Backup';
import FileManagerContext from '../FileManagerContext';
import FileManagerAuthContext from '../FileManagerAuthContext';
import useStyle from './styles';
import useSaveAs from '../useSaveAs';
import { suppressEvent } from '../utils';

const PhotoUploadPreviewButton = ({ src }) => {
  // not that this will not be curried like useAuth implementations
  // see PhotoUpload component for how we adapted this context's use
  const { remove } = React.useContext(FileManagerContext);
  const { canCreate, canEdit, canDelete } =
    React.useContext(FileManagerAuthContext);

  const save = useSaveAs({
    name: 'photo',
    url: src,
  });

  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const { open, isOpen, close, anchorEl } = useOpen();
  const cls = useStyle();

  const handleClick = (e) => {
    suppressEvent(e, open);
  };

  const exec = (func) => (e) => {
    suppressEvent(e, close);
    func();
  };

  const triggerInput = () => {
    try {
      if (browser.isBrowserReady())
        ref.current
          .closest('.q3-photoupload-container')
          .querySelector('input')
          .click();
    } catch (e) {
      // noop
    }
  };

  return (
    <>
      <Fab
        ref={ref}
        color="secondary"
        className={cls.button}
        onClick={handleClick}
        fullWidth
        type="button"
      >
        <BackupIcon />
      </Fab>
      <Menu
        id="file-sorting"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        elevation={5}
      >
        <MenuItem
          disabled={!src}
          dense
          onClick={exec(save)}
        >
          {t('download')}
        </MenuItem>
        <MenuItem
          dense
          disabled={!canEdit || !canCreate}
          onClick={exec(triggerInput)}
        >
          {t('uploadFile')}
        </MenuItem>
        <MenuItem
          dense
          disabled={!canEdit || !canDelete || !src}
          onClick={exec(remove)}
        >
          {t('clearFile')}
        </MenuItem>
      </Menu>
    </>
  );
};

PhotoUploadPreviewButton.defaultProps = {
  src: undefined,
};

PhotoUploadPreviewButton.propTypes = {
  src: PropTypes.string,
};

export default PhotoUploadPreviewButton;
