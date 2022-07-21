import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';
import useDialog from '../useDialog';
import { DIALOG_MOVE, DIRECTORY_ROOT } from '../constants';

const DialogMoveToButton = ({ selected }) => {
  const { t } = useTranslation('labels');
  const { close } = useDialog(DIALOG_MOVE);
  const onChange = useDirectoryFoldersChange();

  const handleChange = () =>
    onChange({
      id: null,
      folderId:
        Array.isArray(selected) ||
        selected === DIRECTORY_ROOT
          ? null
          : selected,
    }).then(() => {
      close();
    });

  return (
    <Box mt={2}>
      <Button
        onClick={handleChange}
        color="secondary"
        variant="contained"
      >
        {t('move')}
      </Button>
    </Box>
  );
};

DialogMoveToButton.defaultProps = {
  selected: DIRECTORY_ROOT,
};

DialogMoveToButton.propTypes = {
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default DialogMoveToButton;
