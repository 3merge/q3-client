import React from 'react';
import { navigate } from '@reach/router';
import Confirm from 'q3-ui-confirm';
import { invoke } from 'lodash';
import Trash from './Trash';

const makeThennable = (method) =>
  jest.fn().mockReturnValue(invoke(jest.fn(), method));

jest.mock('q3-ui-confirm', () => () => <div />);
jest.mock('@reach/router', () => {
  const fn = jest.fn();

  return {
    useNavigate: () => fn,
    navigate: fn,
  };
});

beforeEach(() => {
  navigate.mockReset();
});

describe('Trash', () => {
  it('should redirect', (done) => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      remove: makeThennable('mockResolvedValue'),
    });

    global
      .shallow(<Trash />)
      .find(Confirm)
      .prop('service')()
      .then(() => {
        expect(navigate).toHaveBeenCalled();
        done();
      });
  });

  it('should not redirect', (done) => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      remove: makeThennable('mockRejectedValue'),
    });

    global
      .shallow(<Trash />)
      .find(Confirm)
      .prop('service')()
      .catch((e) => {
        expect(e.message).toMatch('trashFail');
        expect(navigate).not.toHaveBeenCalled();
        done();
      });
  });
});
