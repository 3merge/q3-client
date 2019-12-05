import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Editor } from '@tinymce/tinymce-react';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import useFormik from '../inputs/useFormik';

export function IntegratedTiny(props) {
  const { name, required } = props;
  const { t } = useTranslation();
  const { value, error, onChange, disabled } = useFormik(
    props,
  );

  async function uploadImage() {
    return null;
  }

  return (
    <FormControl error={error} fullWidth>
      <Box my={1}>
        <Typography>
          <small>
            {t(`labels:${name}`)}
            {required && ' *'}
          </small>
        </Typography>
        <Editor
          value={value}
          disabled={disabled}
          apiKey="d8ty5nlimfbx3um6di4gxzs4tpbp0k2ugxhhdu3ewhxdb8sk"
          onEditorChange={onChange}
          init={{
            images_upload_handler: uploadImage,
            contextmenu: false,
            menubar: false,
            plugins: 'link image',
            toolbar:
              'undo redo | bold italic underline | alignleft aligncenter alignright | image | link',
          }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </Box>
    </FormControl>
  );
}

export default connect(IntegratedTiny);

IntegratedTiny.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  formik: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
};

IntegratedTiny.defaultProps = {
  required: false,
};
