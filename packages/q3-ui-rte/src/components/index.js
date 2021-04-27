import React from 'react';

const Editor = React.lazy(() => import('./RichTextEditor'));

export default (props) => (
  // eslint-disable-next-line
  <React.Suspense fallback={<div />}>
    <Editor {...props} />
  </React.Suspense>
);
