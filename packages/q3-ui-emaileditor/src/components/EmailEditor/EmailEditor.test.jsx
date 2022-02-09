import React from 'react';
import {
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import {
  EmailEditor,
  EmailEditorDeviceWrapper,
} from './EmailEditor';
import EmailEditorErrorGraphic from '../EmailEditorErrorGraphic';
import useEmailTemplates from '../useEmailTemplates';
import TreeView from '../TreeView';

jest.mock('../useEmailTemplates');
jest.mock('@material-ui/core/useMediaQuery');

const expectElement = (El) =>
  exists(global.shallow(<EmailEditor />).find(El));

describe('EmailEditor', () => {
  it('should display loading indiciator', () => {
    useEmailTemplates.mockReturnValue({
      ready: false,
    });

    expectElement(CircularProgress);
  });

  it('should display graphic', () => {
    useEmailTemplates.mockReturnValue({
      ready: true,
      error: true,
    });

    expectElement(EmailEditorErrorGraphic);
  });

  it('should display code preview', () => {
    useEmailTemplates.mockReturnValue({
      ready: true,
      error: false,
    });

    expectElement(TreeView);
  });
});

describe('EmailEditorDeviceWrapper', () => {
  it('should return alert on mobile devices', () => {
    useMediaQuery.mockReturnValue(true);
    exists(
      global
        .shallow(<EmailEditorDeviceWrapper />)
        .find(Alert),
    );
  });

  it('should return email editor', () => {
    useMediaQuery.mockReturnValue(false);
    exists(
      global
        .shallow(<EmailEditorDeviceWrapper />)
        .find(EmailEditor),
    );
  });
});
