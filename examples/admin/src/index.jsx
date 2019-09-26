import './mock';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { Components } from 'q3-admin';
import Pages from './pages';

const AppMenu = () => (
  <Components.Menu
    title="Hey"
    items={[
      {
        label: 'Dashboard',
        href: '/',
        visible: true,
      },
      {
        label: 'Users',
        href: '/users',
        visible: true,
      },
    ]}
  />
);

ReactDOM.render(
  <App
    name="Placeholder Corp"
    logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
    appIndex={Pages}
    appNav={AppMenu}
  />,
  document.getElementById('root'),
);
