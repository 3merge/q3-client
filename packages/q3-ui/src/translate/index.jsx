import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { useTranslation } from 'react-i18next';
import { DropDownMenu } from '../toolbar';

export default (props) => {
  const { t } = useTranslation();
  return (
    <DropDownMenu id="translator" {...props}>
      {(open) => (
        <IconButton
          onClick={open}
          color="inherit"
          aria-label={t('labels:translate')}
        >
          <GTranslateIcon />
        </IconButton>
      )}
    </DropDownMenu>
  );
};
