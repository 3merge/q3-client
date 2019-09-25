import React from 'react';
import ReactDOM from 'react-dom';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import { orange, blue } from '@material-ui/core/colors';
import App, { Templates, Axios } from 'q3-admin';
import { Components } from 'q3-ui';
 
const mock = new MockAdapter(Axios);
const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: blue
  },
});

mock.onGet('/profile').reply(200, {
  profile: {
    firstName: 'Mike',
    lastName: 'Ibberson',
  }
});

const AppEntry = (
  <ThemeProvider theme={theme}>
  <App
    name="Placeholder"
    logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
    applicationIndex={() =>
      <Templates.Main
    name="Placeholder"
    renderAside={() => (
      <Components.Menu title="Hey" items={[
        { 
          label: 'Dashboard',
          href: '/',
          visible: true,
        },
        { 
          label: 'Users',
          href: '/users',
          visible: true,
        }
      ]} />
    )}
    render={() => null}
  />
    }
  /> 
  </ThemeProvider>
);

ReactDOM.render(
  AppEntry,
  document.getElementById('root'),
);
