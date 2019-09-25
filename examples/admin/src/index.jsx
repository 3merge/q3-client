import './mock';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import { yellow, teal } from '@material-ui/core/colors';
import App, { Components, Templates  } from 'q3-admin';
import theme from './theme.json';

const AppEntry = (
  <App
    theme={createMuiTheme(theme)}
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
);

ReactDOM.render(
  AppEntry,
  document.getElementById('root'),
);
