import React from 'react';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import SidePanel, { truthy } from './SidePanel';
import useStyle from './useStyle';

jest.mock('../SidePanelMobile', () => () => <div />);

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({}),
);

const theme = createMuiTheme({
  props: { MuiWithWidth: { initialWidth: 'lg' } },
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

const Component = () => <div>test</div>;

const spy = jest.spyOn(React, 'useState');

beforeEach(jest.clearAllMocks);

describe('toState', () => {
  test.each([
    [null, false],
    [undefined, false],
    ['false', false],
    [true, true],
    ['true', true],
  ])(
    'should return true if value is nil',
    (xs, expected) => {
      expect(truthy(xs)).toBe(expected);
    },
  );
});

describe('SidePanel toggle', () => {
  test.each([[false], [true]])(
    'should render side panel content based on the state',
    (arg) => {
      spy.mockReturnValue([arg, jest.fn()]);

      global.mount(
        <ThemeProvider>
          <SidePanel id="test">
            <Component />
          </SidePanel>
        </ThemeProvider>,
      );

      expect(useStyle).toHaveBeenCalledWith({
        state: arg,
      });
    },
  );
});
