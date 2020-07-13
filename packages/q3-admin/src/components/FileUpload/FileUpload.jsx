import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import Files from 'react-butterfiles';

const UploadButton = ({
  label,
  icon: Icon,
  done,
  ...rest
}) => {
  const { t } = useTranslation('descriptions');
  return (
    <Box mb={0.5}>
      <Files
        {...rest}
        maxSize="100mb"
        onSuccess={done}
        onError={() => {
          // eslint-disable-next-line
          alert(t('uploadFailed.'));
        }}
      >
        {({ browseFiles }) => (
          <IconButton
            label={label}
            icon={Icon}
            onClick={browseFiles}
          />
        )}
      </Files>
    </Box>
  );
};

UploadButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  done: PropTypes.func.isRequired,
};

export default UploadButton;
