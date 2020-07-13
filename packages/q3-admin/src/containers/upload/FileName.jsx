import React from 'react';
import Add from '@material-ui/icons/Add';
import { EditableTypography } from 'q3-components';
import TextField from '@material-ui/core/TextField';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import {
  indigo,
  teal,
  orange,
} from '@material-ui/core/colors';

const renderFileIcon = (t = '') => {
  switch (t.toUpperCase()) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return <Image style={{ color: indigo[400] }} />;
    case 'PDF':
      return <PictureAsPdf style={{ color: teal[400] }} />;
    default:
      return <Description style={{ color: orange[400] }} />;
  }
};

const FileName = ({
  tagOptions,
  name,
  children,
  update,
  file,
}) => {
  const placeholder = ['Tags'];
  const [fileName, ext] = name.split('.');
  const [value, setValue] = React.useState(
    [...placeholder, ...file.tags].filter(Boolean),
  );

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>{renderFileIcon(ext)}</Grid>
            <Grid item>
              <EditableTypography
                isEditable
                initialValues={{
                  name: fileName,
                }}
                innerStyle={{
                  fontSize: '0.91rem',
                  maxWidth: 135,
                  display: 'inline-block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                onSubmit={({ name: newName }) =>
                  update({
                    ...file,
                    name: `${newName
                      .replace(/\s/g, '-')
                      .replace(
                        /[^a-zA-Z0-9\-]/g,
                        '',
                      )}.${ext}`,
                  })
                }
                fieldProps={{
                  name: 'name',
                  type: 'text',
                  value,
                }}
              >
                {fileName}
              </EditableTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
      <Autocomplete
        multiple
        id="tags-standard"
        options={tagOptions}
        freeSolo
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
          return update({
            ...file,
            tags: newValue
              .flat()
              .filter((v) => !placeholder.includes(v)),
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            freeSolo
            variant="standard"
            aria-label="Tags"
            size="small"
            margin="dense"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
          />
        )}
        renderTags={(values, getTagProps) =>
          values.map((option, index) => (
            <Chip
              variant="outlined"
              size="small"
              label={option}
              {...getTagProps({ index })}
              disabled={index === 0}
              deleteIcon={index === 0 ? <Add /> : undefined}
            />
          ))
        }
      />
    </>
  );
};

FileName.propTypes = {
  tagOptions: PropTypes.arrayOf(PropTypes.string),
};

FileName.defaultProps = {
  tagOptions: [],
};

export default FileName;
