import React from 'react';
import { ButtonGroup, Grid } from '@material-ui/core';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import CodeIcon from '@material-ui/icons/Code';
import ToolbarDivider from '../ToolbarDivider';
import ToolbarHeaderIcon from '../ToolbarHeaderIcon';
import ModuleDivider from '../ModuleDivider';
import ModuleImage from '../ModuleImage';
import ModuleLink from '../ModuleLink';
import ModuleVideo from '../ModuleVideo';
import ModuleVideoHtml from '../ModuleVideoHtml';
import ModuleAudioHtml from '../ModuleAudioHtml';
import ModuleDocument from '../ModuleDocument';
import ToolbarButton from '../ToolbarButton';
import useStyle from './styles';

const Toolbar = React.forwardRef(
  ({ children, upload }, ref) => {
    const { nestedGroup, root } = useStyle();

    return (
      <Grid container className={root}>
        <Grid item>
          <ButtonGroup>
            <ToolbarButton quillKey="header" value="2">
              <ToolbarHeaderIcon value="1" />
            </ToolbarButton>
            <ToolbarButton quillKey="header" value="3">
              <ToolbarHeaderIcon value="2" />
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
            <ToolbarButton quillKey="strike">
              <StrikethroughSIcon />
            </ToolbarButton>
          </ButtonGroup>
        </Grid>
        <ToolbarDivider />
        <Grid item>
          <ButtonGroup>
            <ToolbarButton quillKey="list" value="bullet">
              <FormatListBulleted />
            </ToolbarButton>
            <ToolbarButton quillKey="list" value="ordered">
              <FormatListNumbered />
            </ToolbarButton>
            <ToolbarButton quillKey="code-block">
              <CodeIcon />
            </ToolbarButton>
            <ModuleDivider label="divider" ref={ref} />
            <ToolbarButton quillKey="blockquote">
              <FormatQuoteIcon />
            </ToolbarButton>
          </ButtonGroup>
        </Grid>
        <ToolbarDivider />
        <Grid item>
          <ButtonGroup className={nestedGroup}>
            <ModuleLink label="hyperlink" ref={ref} />
            <ModuleVideo label="embedVideo" ref={ref} />
            {isFunction(upload) && (
              <>
                <ModuleImage
                  label="image"
                  ref={ref}
                  upload={upload}
                />
                <ModuleVideoHtml
                  label="video"
                  ref={ref}
                  upload={upload}
                />
                <ModuleAudioHtml
                  label="audio"
                  ref={ref}
                  upload={upload}
                />
                <div>
                  <ModuleDocument
                    label="document"
                    ref={ref}
                    upload={upload}
                  />
                </div>
              </>
            )}
          </ButtonGroup>
        </Grid>
        {children}
      </Grid>
    );
  },
);

Toolbar.defaultProps = {
  children: null,
  upload: null,
};
Toolbar.propTypes = {
  children: PropTypes.node,
  upload: PropTypes.func,
};

export default React.memo(Toolbar);
