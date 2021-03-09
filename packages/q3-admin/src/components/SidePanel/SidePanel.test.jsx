import React from 'react';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import SidePanel, { toState } from './SidePanel';

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
  test.each([[true], [false]])(
    'should return return as is when argument is boolean',
    (x) => {
      expect(toState(x)).toBe(x);
    },
  );

  test.each([[null], [undefined]])(
    'should return true if value is nil',
    (nil) => {
      expect(toState(nil)).toBe(true);
    },
  );
});

describe('SidePanel toggle', () => {
  test.each([[false], [true]])(
    'should render side panel content based on the state',
    (arg) => {
      spy.mockReturnValue([arg, jest.fn()]);
      const wrapper = global.mount(
        <ThemeProvider>
          <SidePanel id="test">
            <Component />
          </SidePanel>
        </ThemeProvider>,
      );
      expect(wrapper.find(Component).exists()).toBe(arg);
    },
  );
});
