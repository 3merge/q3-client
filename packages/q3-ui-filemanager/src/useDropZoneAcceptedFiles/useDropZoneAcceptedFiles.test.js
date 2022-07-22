import React from 'react';
import { isFunction } from 'lodash';
import useDropZoneAcceptedFiles from './useDropZoneAcceptedFiles';

let post;
let setState;

const makeBlob = () => {
  const blob = new Blob(['test'], {
    type: 'plain/txt',
  });

  blob.name = 'test';
  return blob;
};

beforeEach(() => {
  post = jest.fn();
  setState = jest.fn().mockImplementation((fn) =>
    isFunction(fn)
      ? fn([
          {
            name: 'test',
          },
        ])
      : fn,
  );

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([null, setState]);

  jest.spyOn(React, 'useContext').mockReturnValue({
    current: 1,
    post,
  });
});

describe('useDropZoneAcceptedFiles', () => {
  it('should post files', async () => {
    await useDropZoneAcceptedFiles().onDrop([makeBlob()]);
    expect(post).toHaveBeenCalled();
    const res = post.mock.lastCall[0].get('test');

    expect(res instanceof File).toBeTruthy();
    expect(setState).toHaveBeenCalledWith([]);
  });

  it('should assign folder id to blob', () => {
    const output =
      useDropZoneAcceptedFiles().assignFolderIdToFileBlob(
        makeBlob(),
      );

    expect(output.folderId).toEqual(1);
  });

  it('should flag errors', async () => {
    await useDropZoneAcceptedFiles().markPendingWithErrorProperty();
    expect(setState).toHaveBeenCalled();
    expect(setState.mock.results[0].value).toEqual([
      {
        name: 'test',
        error: true,
      },
    ]);
  });
});
