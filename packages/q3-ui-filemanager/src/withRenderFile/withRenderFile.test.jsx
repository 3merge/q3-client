import React from 'react';
import { first, last, capitalize } from 'lodash';
import withRenderFile, {
  renderFilesAlphabetically,
} from './withRenderFile';
import FileName from '../FileName';
import files from '../../tests/fixtures/files.json';
import support from '../../tests/support';

jest.mock('../Drop', () => {
  const Drop = ({ children }) => {
    return children([
      {
        name: 'Pending1',
      },
    ]);
  };

  return Drop;
});

const FileList = withRenderFile(FileName, (dirs, fs) => [
  dirs,
  fs,
]);

const { DropWrapper } = FileList.__$internalComponents;
const Comp = () => <div />;

const makeStubs = (keys) =>
  keys.reduce(
    (acc, curr) =>
      Object.assign(acc, {
        [curr]: {
          name: capitalize(curr),
        },
      }),
    {},
  );

const renderFileList = (fileProps, expectedLength) => {
  const wrapper = global.mount(
    <FileList
      files={fileProps}
      onDrop={support.onDrop.succeed}
    />,
  );
  expect(wrapper.find(FileName)).toHaveLength(
    expectedLength,
  );
};

describe('withRenderFile', () => {
  it('should not render FileName when no files', () => {
    // see pending file in the Drop mock
    renderFileList([], 1);
  });

  it('should render FileName when files exist', () => {
    // this includes directories as only 1 and does not count the inside files
    renderFileList(files, 5);
  });

  describe('"DropWrapper"', () => {
    it('should map File component with pending and prop items', () => {
      const el = global.mount(
        <DropWrapper listItems={[{ name: 'Real1' }]}>
          {(fns) => fns}
        </DropWrapper>,
      );

      const Fn = el.find(FileName);
      expect(Fn).toHaveLength(2);
      expect(Fn.first().props()).toHaveProperty(
        'name',
        'Pending1',
      );
    });
  });

  describe('"renderFilesAlphabetically"', () => {
    let fn;
    let list;

    beforeEach(() => {
      fn = jest.fn();

      list = renderFilesAlphabetically(
        Comp,
        makeStubs(['default', 'foo', 'bar', 'quuz']),
        fn,
      );
    });

    it('should map non-default files alphabetically', () => {
      const checkPropName = (invokeWith, expectedValue) =>
        expect(invokeWith(list)).toHaveProperty(
          'props.name',
          expectedValue,
        );

      expect(list).toHaveLength(3);
      checkPropName(first, 'bar');
      checkPropName(last, 'quuz');
    });

    it('should update directory on file click', () => {
      const { props } = first(list);
      props.onClick();
      expect(fn).toHaveBeenCalled();

      const out = fn.mock.calls[0][0]({
        data: {
          [props.name]: {
            default: [],
          },
        },
        path: ['foo'],
      });

      expect(out).toMatchObject({
        data: {
          default: [],
        },
        path: ['foo', props.name],
      });
    });
  });
});
