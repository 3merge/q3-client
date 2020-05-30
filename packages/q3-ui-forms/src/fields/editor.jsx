import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Editor } from '@tinymce/tinymce-react';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import useDecorator from '../helpers/useDecorator';

const TinyFormEditor = (props) => {
  const { name, required } = props;
  const {
    value,
    error,
    onChange,
    disabled,
    label,
    helperText,
  } = useDecorator(props);

  return (
    <Grid item xs={12}>
      <FormControl error={error} fullWidth>
        <Box my={1} p={2}>
          <Typography>
            <small>
              {label}
              {required && ' *'}
            </small>
          </Typography>
          <Editor
            name={name}
            value={value}
            disabled={Boolean(disabled)}
            inline
            apiKey="d8ty5nlimfbx3um6di4gxzs4tpbp0k2ugxhhdu3ewhxdb8sk"
            onEditorChange={onChange}
            init={{
              contextmenu: false,
              inline: true,
              menubar: false,
              toolbar: ['bold italic underline'],
            }}
          />
          {error && (
            <FormHelperText error={error}>
              <span>{helperText}</span>
            </FormHelperText>
          )}
        </Box>
      </FormControl>
    </Grid>
  );
};

TinyFormEditor.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

TinyFormEditor.defaultProps = {
  required: false,
};

export default TinyFormEditor;
