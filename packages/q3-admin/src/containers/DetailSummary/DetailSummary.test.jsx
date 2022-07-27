import React from 'react';
import { createPortal } from 'react-dom';
import DetailSummary, {
  DetailSummaryPortal,
} from './DetailSummary';

jest.mock('react-dom', () => ({
  createPortal: jest.fn(),
}));

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  createPortal.mockClear();
});

describe('DetailSummary', () => {
  it('should toggle state', () => {
    const context = {
      close: jest.fn(),
      id: 'summary',
    };

    jest
      .spyOn(React, 'useContext')
      .mockReturnValue(context);

    global.shallow(<DetailSummary />);
    expect(context.close).toHaveBeenCalled();
  });

  it('should set ID and content', () => {
    const context = {
      setState: jest.fn(),
    };

    jest
      .spyOn(React, 'useContext')
      .mockReturnValue(context);

    global.shallow(<DetailSummary />);
    expect(context.setState).toHaveBeenCalledWith({
      content: expect.any(Object),
      id: 'summary',
    });
  });
});

describe('DetailSummaryPortal', () => {
  it('should render portal', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValue([true, jest.fn()]);

    global.shallow(<DetailSummaryPortal />);
    expect(createPortal).toHaveBeenCalledWith(
      expect.any(Object),
      true,
    );
  });

  it('should not render portal', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValue([null, jest.fn()]);

    global.shallow(<DetailSummaryPortal />);
    expect(createPortal).not.toHaveBeenCalled();
  });
});
