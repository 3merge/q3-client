import React from 'react';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import Documentation from './Documentation';

describe('Documentation', () => {
  it('should open widget', () => {
    jest.spyOn(React, 'useState').mockReturnValue([true]);
    window.FreshworksWidget = jest.fn();

    global
      .shallow(<Documentation />)
      .find(IconButton)
      .props()
      .onClick();

    expect(window.FreshworksWidget).toHaveBeenCalledWith(
      'open',
    );
  });

  it('should check for freshbooks', () => {
    jest.spyOn(React, 'useState').mockReturnValue([true]);
    window.FreshworksWidget = null;

    expect(() =>
      global
        .shallow(<Documentation />)
        .find(IconButton)
        .props()
        .onClick(),
    ).not.toThrowError();
  });

  it('should authenticate with freshbooks', (done) => {
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce(['TOKEN'])
      .mockReturnValueOnce([false, setState]);

    jest
      .spyOn(React, 'useEffect')
      .mockImplementation((fn) => fn());

    window.FreshworksWidget = jest.fn();

    global.shallow(<Documentation />);

    setTimeout(() => {
      expect(setState).toHaveBeenCalled();
      expect(window.FreshworksWidget).toHaveBeenCalledWith(
        'authenticate',
        {
          token: 'TOKEN',
          callback: expect.any(Function),
        },
      );

      done();
    }, 2500);
  });

  it('should get token', (done) => {
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([null, setState])
      .mockReturnValueOnce([false, setState]);

    jest
      .spyOn(React, 'useEffect')
      .mockImplementation((fn) => fn());

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        token: '123',
      },
    });

    global.shallow(<Documentation />);

    setTimeout(() => {
      expect(setState).toHaveBeenCalledWith('123');
      done();
    }, 2500);
  });
});
