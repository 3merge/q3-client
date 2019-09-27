import './mock';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'q3-admin';
import Nav from './nav';
import Pages from './pages';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';
const root = document.getElementById('root');

ReactDOM.render(
  <App logoImgSrc={logo} appIndex={Pages} appNav={Nav} />,
  root,
);
