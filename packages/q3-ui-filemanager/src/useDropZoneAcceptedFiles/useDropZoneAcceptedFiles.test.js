import React from 'react';
import { isFunction } from 'lodash';
import useDropZoneAcceptedFiles from './useDropZoneAcceptedFiles';

let uploadS3;
let setState;

const makeBlob = () => {
  const blob = new Blob(['test'], {
    type: 'plain/txt',
  });

  blob.name = 'test';
  return blob;
};

beforeEach(() => {
  uploadS3 = jest.fn();
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
    uploadS3,
  });
});

describe('useDropZoneAcceptedFiles', () => {
  it('should upload files', async () => {
    await useDropZoneAcceptedFiles().onDrop([makeBlob()]);
    expect(uploadS3).toHaveBeenCalled();

    const res = uploadS3.mock.lastCall[0].at(0);

    expect(res.name).toMatch('test');
    expect(setState).toHaveBeenCalledWith([]);
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
