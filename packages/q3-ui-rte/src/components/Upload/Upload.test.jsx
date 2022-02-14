import React from 'react';
import Files from 'react-butterfiles';
import { Button } from '@material-ui/core';
import Upload from './Upload';

describe('Upload', () => {
  it('should call success and update selection', (done) => {
    const onSuccess = jest.fn();
    const setSelection = jest.fn();

    global
      .shallow(
        <Upload
          accept={['media']}
          blot="test"
          buttonComponent={Button}
          selection={{
            index: 1,
          }}
          ref={{
            current: {
              setSelection,
            },
          }}
          onSuccess={onSuccess}
          upload={jest.fn().mockResolvedValue('foo.png')}
          updateSelection
        />,
      )
      .find(Files)
      .props()
      .onSuccess([
        {
          name: 'testing',
        },
      ])
      .then(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          'foo.png',
          expect.any(Object),
          1,
        );
        expect(setSelection).toHaveBeenCalledWith(
          2,
          'silent',
        );
        done();
      });
  });

  it('should not update selection', (done) => {
    const setSelection = jest.fn();

    global
      .shallow(
        <Upload
          accept={['media']}
          blot="test"
          buttonComponent={Button}
          selection={{
            index: 1,
          }}
          ref={{
            current: {
              setSelection,
            },
          }}
          onSuccess={jest.fn()}
          upload={jest.fn().mockResolvedValue('foo.png')}
          updateSelection={false}
        />,
      )
      .find(Files)
      .props()
      .onSuccess([
        {
          name: 'testing',
        },
      ])
      .then(() => {
        expect(setSelection).not.toHaveBeenCalledWith();
        done();
      });
  });

  it('should alert error', () => {
    const setSelection = jest.fn();
    const fn = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    global
      .shallow(
        <Upload
          accept={['media']}
          blot="test"
          buttonComponent={Button}
          selection={{
            index: 1,
          }}
          ref={{
            current: {
              setSelection,
            },
          }}
          onSuccess={jest.fn()}
          upload={jest.fn().mockResolvedValue('foo.png')}
          updateSelection={false}
        />,
      )
      .find(Files)
      .props()
      .onError();

    expect(fn).toHaveBeenCalled();
  });
});
