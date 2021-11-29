import React from 'react';
import Button from '@material-ui/core/Button';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';

const copyToClipboard = () => {
  if (browser.isBrowserReady()) {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

const FiltersShare = () => {
  const { t } = useTranslation('labels');
  return (
    <Button
      fullWidth
      size="small"
      style={{ cursor: 'copy' }}
      onClick={copyToClipboard}
    >
      {t('copyLink')}
    </Button>
  );
};

FiltersShare.propTypes = {};

export default FiltersShare;
