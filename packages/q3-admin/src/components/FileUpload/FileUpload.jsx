import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import Files from 'react-butterfiles';
import { isFunction } from 'lodash';

const UploadButton = ({
  component,
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
        {({ browseFiles }) =>
          isFunction(component) ? (
            component(browseFiles)
          ) : (
            <IconButton
              label={label}
              icon={Icon}
              buttonProps={{
                onClick: browseFiles,
              }}
            />
          )
        }
      </Files>
    </Box>
  );
};

UploadButton.defaultProps = {
  label: undefined,
  icon: undefined,
  component: undefined,
};

UploadButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.node,
  done: PropTypes.func.isRequired,
  component: PropTypes.func,
};

export default UploadButton;
