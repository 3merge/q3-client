import React from 'react';
import ReactDOM from 'react-dom';
import App, { Templates } from 'q3-admin';

{/**   <App
    name="Placeholder"
    logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
  /> */}

const AppEntry = (
  <Templates.Main
    name="Placeholder"
    renderAside={() => null}
    render={() => null}
  />
);

ReactDOM.render(
  AppEntry,
  document.getElementById('root'),
);
