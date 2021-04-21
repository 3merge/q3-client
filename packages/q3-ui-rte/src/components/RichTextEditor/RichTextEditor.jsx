import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import { Paper, Box, ButtonGroup } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LinkIcon from '@material-ui/icons/Link';
import TitleIcon from '@material-ui/icons/Title';
import { makeStyles } from '@material-ui/core/styles';
import MediaUpload from '../MediaUpload';
import ToolbarButton from '../ToolbarButton';
import MediaResizeHandler from '../MediaResizeHandler';
import MediaResize from '../../modules/MediaResize';
import MediaAttributes from '../MediaAttributes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .ql-editor': {
      outline: 0,
      padding: theme.spacing(1),

      '& > *': {
        margin: '.25rem !important',
      },
    },
  },
  toolbar: {
    textAlign: 'center',
    padding: theme.spacing(0.75),
  },
}));

const hash = (xs) => `#${xs}`;

const RichTextEditor = ({
  defaultValue,
  onChange,
  upload,
}) => {
  const ID = 'q3-editor';
  const TOOLBAR_ID = `${ID}-toolbar`;

  const ref = React.useRef();
  const container = React.useRef();

  const [anchor, setAnchor] = React.useState();

  const cls = useStyles();

  React.useEffect(() => {
    Quill.register(
      'modules/imageResize',
      (q) => new MediaResize(q, setAnchor),
    );

    ref.current = new Quill(hash(ID), {
      modules: {
        toolbar: hash(TOOLBAR_ID),
        imageResize: {},
      },
    });
  }, []);

  const renderResizeHandlerCoordinates = () =>
    ['ne', 'se', 'sw', 'nw'].map((coordinate) => (
      <MediaResizeHandler
        key={coordinate}
        coordinate={coordinate}
        ref={anchor?.image}
        next={anchor?.repositionElements}
      />
    ));

  React.useEffect(() => {
    if (anchor?.overlay)
      ReactDOM.render(
        <>
          <MediaAttributes
            deleteMedia={() => {
              anchor.overlay.remove();
              anchor.image.remove();
              ref.current.update();
            }}
          />
          {renderResizeHandlerCoordinates()}
        </>,
        anchor?.overlay,
      );
  }, [anchor?.overlay]);

  return (
    <Paper variant="outlined" square>
      {/* <PopoverImageAttributes
        anchorEl={anchor}
        removeAnchorEl={() => setAnchor(null)}
        containerEl={container}
      /> */}
      <Box className={cls.toolbar} id={TOOLBAR_ID}>
        <ButtonGroup
          aria-label="content-formatting"
          variant="text"
        >
          <ToolbarButton quillKey="header" value="2">
            <TitleIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="bold">
            <FormatBoldIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="italic">
            <FormatItalicIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="underline">
            <FormatUnderlinedIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="list" value="ordered">
            <FormatListNumberedIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="list" value="unordered">
            <FormatListBulletedIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="link">
            <LinkIcon />
          </ToolbarButton>
          <MediaUpload ref={ref} upload={upload} />
        </ButtonGroup>
      </Box>
      <Box p={1} className={cls.root} id={ID}>
        <div
          dangerouslySetInnerHTML={{ __html: defaultValue }}
        />
      </Box>
    </Paper>
  );
};

export default RichTextEditor;
