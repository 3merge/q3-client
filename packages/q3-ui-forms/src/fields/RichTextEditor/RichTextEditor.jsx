import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { Alert } from '@material-ui/lab';
import { invoke } from 'lodash';
import {
  Typography,
  Grid,
  Paper,
  Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Files from 'react-butterfiles';
import withState from '../withState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& #mui-rte-root': {
      marginTop: '-12px',
    },
    '& #mui-rte-editor, #mui-rte-editor-container': {
      maxHeight: 550,
      display: 'block',
      transition: 'min-height 150ms',
    },
    '& #mui-rte-container div:not(:first-child)': {
      padding: '0 8px !important',
    },
    '& #mui-rte-editor [role="textbox"]': {
      maxHeight: 550,
      overflow: 'auto',
      transition: 'min-height 150ms',
    },
  },
  paper: {
    backgroundColor: 'inherit',
    padding: theme.spacing(0.5),
    boxShadow: 'none',
    '&:focus-within, &:hover': {
      boxShadow: theme.shadows[1],
      background: theme.palette.background.paper,
    },
    '&:focus-within': {
      '& #mui-rte-editor, #mui-rte-editor-container, & #mui-rte-editor [role="textbox"]': {
        minHeight: 175,
      },
    },
    transition: 'background,box-shadow 350ms',
  },
  offset: {
    paddingLeft: 8,
  },
}));

const RichTextEditor = withState(
  ({ value, error, onChange, disabled, label }) => {
    const cls = useStyles({});
    const { t } = useTranslation('helpers');

    const editorRef = React.useRef();
    const wrapperRef = React.useRef();

    const getInit = () => {
      try {
        const v = JSON.parse(value);
        return 'blocks' in v
          ? JSON.stringify(v)
          : undefined;
      } catch (e) {
        return undefined;
      }
    };

    const getUnsavedChanges = () => {
      invoke(editorRef, 'current.save');
    };

    const handleFileUpload = () => {
      editorRef.current?.insertAtomicBlockAsync(
        'IMAGE',
        Promise.resolve({
          data: {
            url:
              'https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
        }),
        'Uploading now...',
      );
    };

    const [anchor, setAnchor] = React.useState();
    const [anchorFn, setAnchorFn] = React.useState();

    React.useEffect(() => {
      console.log(editorRef.current);
    }, []);

    return (
      <Grid item xs={12} className={cls.root}>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <input type="text" id="alt" name="alt" />
          <input type="text" id="width" name="width" />
          <button
            type="button"
            onClick={() => {
              console.log(anchorFn);
              if (anchorFn)
                anchorFn({
                  alt: document.getElementById('alt').value,
                  width: document.getElementById('width')
                    .value,
                });

              setAnchor(null);
              setAnchorFn(null);
            }}
          >
            Apply
          </button>
        </Popover>
        <Files
          maxSize="10mb"
          onSuccess={handleFileUpload}
          onError={() => {
            // UPLOAD IMAGES...
            // eslint-disable-next-line
            alert(t('uploadFailed.'));
          }}
        >
          {({ browseFiles }) => (
            <Paper className={cls.paper} ref={wrapperRef}>
              <Typography
                variant="overline"
                className={cls.offset}
              >
                {label}
              </Typography>
              <MUIRichTextEditor
                readOnly={disabled}
                label={t('startTyping')}
                ref={editorRef}
                onSave={onChange}
                onBlur={getUnsavedChanges}
                defaultValue={getInit()}
                controls={[
                  'title',
                  'bold',
                  'italic',
                  'underline',
                  'link',
                  'upload',
                  'numberList',
                  'bulletList',
                  'quote',
                ]}
                customControls={[
                  {
                    name: 'custom-media',
                    type: 'atomic',

                    atomicComponent: ({ blockProps }) => {
                      const [
                        state,
                        setState,
                      ] = React.useState({});

                      return (
                        <img
                          {...state}
                          src={blockProps.url}
                          onClick={(e) => {
                            e.preventDefault();
                            // null
                          }}
                        />
                        // <video
                        //   controls
                        //   style={{
                        //     outline: 0,
                        //     width: '100%',
                        //   }}
                        //   onClick={(e) => {
                        //     e.preventDefault();
                        //     setAnchor(e?.target);
                        //   }}
                        // >
                        //   <source
                        //     src={blockProps.url}
                        //     type="video/mp4"
                        //   />
                        // </video>
                      );
                    },
                  },
                  {
                    name: 'upload',
                    icon: <PermMediaIcon />,
                    type: 'callback',
                    onClick: browseFiles,
                  },
                ]}
              />
              {error && (
                <Alert severity="error">{error}</Alert>
              )}
            </Paper>
          )}
        </Files>
      </Grid>
    );
  },
);

RichTextEditor.propTypes = {};
RichTextEditor.defaultProps = {};

export default RichTextEditor;
