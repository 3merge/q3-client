import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import FileManager from './FileManager';
import AlertAuthError from '../AlertAuthError';
import AlertFetchingError from '../AlertFetchingError';
import useFileManagerInit from '../useFileManagerInit';
import useUploads from '../useUploads';
import useUploadsAuth from '../useUploadsAuth';

jest.mock('../useUploadsAuth');
jest.mock('../useFileManagerInit');
jest.mock('../useUploads');

const checkExistenceOf = (El) =>
  exists(
    global
      .shallow(
        <FileManager collectionName="foo" id="bar" />,
      )
      .find(El),
  );

describe('FileManager', () => {
  it('should show loading indicator when not initialized', () => {
    useUploadsAuth.mockReturnValue({});
    useFileManagerInit.mockReturnValue(false);
    useUploads.mockReturnValue({});
    checkExistenceOf(CircularProgress);
  });

  it('should show loading indicator when fetching', () => {
    useUploadsAuth.mockReturnValue({});
    useFileManagerInit.mockReturnValue(true);
    useUploads.mockReturnValue({
      fetching: true,
    });

    checkExistenceOf(CircularProgress);
  });

  it('should show fetching error', () => {
    useUploadsAuth.mockReturnValue({
      canSee: true,
    });
    useFileManagerInit.mockReturnValue(true);
    useUploads.mockReturnValue({
      fetching: false,
      fetchingError: true,
    });

    checkExistenceOf(AlertFetchingError);
  });

  it('should show auth error', () => {
    useUploadsAuth.mockReturnValue({
      canSee: false,
    });

    useFileManagerInit.mockReturnValue(true);
    useUploads.mockReturnValue({});
    checkExistenceOf(AlertAuthError);
  });
});
