import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import { Paper, Box, ButtonGroup } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TitleIcon from '@material-ui/icons/Title';
import { makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ModuleLink from '../ModuleLink';
import MediaUpload from '../MediaUpload';
import ToolbarButton from '../ToolbarButton';
import MediaResizeHandler from '../MediaResizeHandler';
import MediaResize from '../../modules/MediaResize';
import MediaAttributes from '../MediaAttributes';

const useStyles = makeStyles((theme) => ({
  paper: ({ fullscreen }) =>
    fullscreen
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          height: '100%',
          overflow: 'auto',
        }
      : {},
  root: {
    '& .ql-editor': {
      overflow: 'hidden',
      outline: 0,
      padding: theme.spacing(1),

      '& > *': {
        margin: '.25rem !important',
      },

      '& img': {
        cursor: 'pointer',
        display: 'block',
        padding: '.5rem',
      },
    },
  },
  toolbar: {
    textAlign: 'center',
    padding: theme.spacing(0.75),
    flexWrap: 'wrap',
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    '& button': {
      fontSize: '1.15rem !important',
    },
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

  const [anchor, setAnchor] = React.useState();
  const [fullscreen, setFullscreen] = React.useState(false);

  const cls = useStyles({ fullscreen });

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

    const ImageBlot = Quill.import('formats/image');
    const Parchment = Quill.import('parchment');

    ref.current.root.addEventListener('click', (e) => {
      const img = Parchment.find(e.target);

      if (img instanceof ImageBlot) {
        ref.current.setSelection(
          img.offset(ref.current.scroll),
          1,
          'user',
        );
      }
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
            editorEl={ref.current}
            next={anchor?.repositionElements}
            imageEl={anchor.image}
            deleteMedia={() => {
              const el = ref.current.getSelection();
              anchor.overlay.remove();
              anchor.image.remove();
              ref.current.update();
              ref.current.focus();
              ref.current.setSelection(el - 1, el);
            }}
          />
          {renderResizeHandlerCoordinates()}
        </>,
        anchor?.overlay,
      );
  }, [anchor?.overlay]);

  return (
    <Paper variant="outlined" square className={cls.paper}>
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
          <ModuleLink ref={ref} />
          <MediaUpload ref={ref} upload={upload} />
          <ToolbarButton
            quillKey="fullscreen"
            onClick={() => setFullscreen(!fullscreen)}
          >
            {fullscreen ? (
              <FullscreenExitIcon />
            ) : (
              <FullscreenIcon />
            )}
          </ToolbarButton>
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
