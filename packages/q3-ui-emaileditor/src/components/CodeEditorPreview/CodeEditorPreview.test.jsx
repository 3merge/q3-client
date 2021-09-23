import React from 'react';
import CodeEditorPreview from './CodeEditorPreview';

jest.mock('./styles', () => () => ({
  root: 'classname',
}));

const documentMethods = {
  open: jest.fn(),
  write: jest.fn(),
  close: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      contentWindow: {
        document: documentMethods,
      },
    },
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

afterEach(() => {
  Object.values(documentMethods).forEach((method) => {
    method.mockClear();
  });
});

describe('CodeEditorPreview', () => {
  it('should not update iframe without HTML', () => {
    global.shallow(<CodeEditorPreview />);
    expect(documentMethods.write).not.toHaveBeenCalled();
  });

  it('should not update iframe without HTML', () => {
    global.shallow(<CodeEditorPreview />);
    expect(documentMethods.write).not.toHaveBeenCalled();
  });

  it('should not render iframe', () => {
    expect(
      global
        .shallow(<CodeEditorPreview disable />)
        .find('iframe')
        .exists(),
    ).toBeFalsy();
  });

  it('should render iframe', () => {
    expect(
      global
        .shallow(<CodeEditorPreview />)
        .find('iframe')
        .exists(),
    ).toBeTruthy();
  });
});
