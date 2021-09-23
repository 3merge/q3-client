import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Hidden,
} from '@material-ui/core';
import Graphic from 'q3-ui-assets';
import EmailEditorWrapper from '../EmailEditorWrapper';
import useStyle from '../EmailEditor/styles';

const EmailEditorErrorGraphic = () => (
  <EmailEditorWrapper className={useStyle().center}>
    <Graphic icon="Code" title="emailEditorFailed" />
  </EmailEditorWrapper>
);

export default EmailEditorErrorGraphic;
