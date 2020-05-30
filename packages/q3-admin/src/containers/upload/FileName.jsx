import React from 'react';
import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';

const renderFileIcon = (t) => {
  switch (t) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return <Image />;
    case 'PDF':
      return <PictureAsPdf />;
    default:
      return <Description />;
  }
};

export default ({ name, children, update, file }) => {
  const [fileName] = name.split('.');
  const { value, onChange } = useValue(fileName);
  const { t } = useTranslation('labels');

  return (
    <InputBase
      fullWidth
      size="large"
      value={value}
      aria-label={t('changeFileName')}
      onChange={onChange}
      endAdornment={children}
      onBlur={() =>
        value !== fileName
          ? update({
              ...file,
              name: value
                .replace(/\s/g, '-')
                .replace(/[^a-zA-Z0-9\-]/g, ''),
            })
          : null
      }
    />
  );
};
