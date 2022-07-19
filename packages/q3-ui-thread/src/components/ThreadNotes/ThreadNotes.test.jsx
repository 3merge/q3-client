import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import ThreadNotes from './ThreadNotes';
import AlertFetchingError from '../AlertFetchingError';
import useThread from '../useThread';
import Note from '../Note';

jest.mock('../useThread');

// eslint-disable-next-line
const Renderer = ({ checkProps }) => (
  <ThreadNotes collectionName="testing" id="test">
    {(props) => {
      if (checkProps) checkProps(props);
      return null;
    }}
  </ThreadNotes>
);

const collectNoteProps = () => {
  const collected = [];

  global
    .shallow(<Renderer />)
    .dive()
    .find(Note)
    .forEach((node) => {
      collected.push(node.props());
    });

  return collected;
};

describe('ThreadNotes', () => {
  it('should render fetching', () => {
    useThread.mockReturnValue({
      fetching: true,
    });

    exists(
      global
        .shallow(<Renderer />)
        .dive()
        .find(CircularProgress),
    );
  });

  it('should render fetching error', () => {
    useThread.mockReturnValue({
      fetching: false,
      fetchingError: true,
    });

    exists(
      global
        .shallow(<Renderer />)
        .dive()
        .find(AlertFetchingError),
    );
  });

  it('should render grouped notes', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canPin: true,
    });

    useThread.mockReturnValue({
      fetching: false,
      fetchingError: false,
      thread: [
        {
          id: 1,
          pin: true,
        },
      ],
    });

    expect(
      global
        .shallow(<Renderer />)
        .dive()
        .find(Typography)
        .first()
        .text(),
    ).toMatch('pinned');
  });

  it('should render linear notes', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canPin: false,
    });

    useThread.mockReturnValue({
      fetching: false,
      fetchingError: false,
      thread: [
        {
          id: 1,
          pin: true,
        },
      ],
    });

    doesNotExist(
      global
        .shallow(<Renderer />)
        .dive()
        .find(Typography),
    );
  });

  it('should sort', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce(['', jest.fn()])
      .mockReturnValueOnce(['desc', jest.fn()])
      .mockReturnValueOnce([[], jest.fn()]);

    useThread.mockReturnValue({
      fetching: false,
      fetchingError: false,
      thread: [
        {
          id: 1,
          createdAt: '2022-01-02T14:39:19.000Z',
        },
        {
          id: 2,
          createdAt: '2022-05-02T14:39:19.000Z',
        },
        {
          id: 3,
          createdAt: '2022-02-02T14:39:19.000Z',
        },
      ],
    });

    const collected = collectNoteProps();
    expect(collected.map((item) => item.id)).toEqual([
      2, 3, 1,
    ]);
  });

  it('should search', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce(['Tes', jest.fn()])
      .mockReturnValueOnce(['asc', jest.fn()])
      .mockReturnValueOnce([[], jest.fn()]);

    useThread.mockReturnValue({
      fetching: false,
      fetchingError: false,
      thread: [
        {
          id: 1,
          createdAt: '2022-01-02T14:39:19.000Z',
          title: 'Testing',
        },
        {
          id: 2,
          createdAt: '2022-05-02T14:39:19.000Z',
        },
        {
          id: 3,
          createdAt: '2022-02-02T14:39:19.000Z',
          message: 'Testing',
        },
      ],
    });

    const collected = collectNoteProps();
    expect(collected.map((item) => item.id)).toEqual([
      1, 3,
    ]);
  });

  it('should filter by tag', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce(['', jest.fn()])
      .mockReturnValueOnce(['asc', jest.fn()])
      .mockReturnValueOnce([['foo'], jest.fn()]);

    useThread.mockReturnValue({
      fetching: false,
      fetchingError: false,
      thread: [
        {
          id: 1,
          createdAt: '2022-01-02T14:39:19.000Z',
        },
        {
          id: 2,
          createdAt: '2022-05-02T14:39:19.000Z',
          tags: ['foo', 'bar'],
        },
        {
          id: 3,
          createdAt: '2022-02-02T14:39:19.000Z',
          tags: ['foo'],
        },
      ],
    });

    const collected = collectNoteProps();
    expect(collected.map((item) => item.id)).toEqual([
      3, 2,
    ]);
  });
});
