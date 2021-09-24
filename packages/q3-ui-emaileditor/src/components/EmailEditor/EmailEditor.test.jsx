import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailEditor from './EmailEditor';
import EmailEditorErrorGraphic from '../EmailEditorErrorGraphic';
import useEmailTemplates from '../useEmailTemplates';
import TreeView from '../TreeView';

jest.mock('../useEmailTemplates');

const expectElement = (El) =>
  expect(
    global
      .shallow(<EmailEditor />)
      .find(El)
      .exists(),
  ).toBeTruthy();

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
