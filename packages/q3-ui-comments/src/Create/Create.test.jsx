import React from 'react';
import { clearHtml } from './Create';

test('clearHtml should set on HTML', () => {
  const el = global.mount(
    <div className="ql-editor">
      <div />
    </div>,
  );

  clearHtml();

  el.update();
  expect(el.html()).toMatch(
    '<div class="ql-editor"><p></p></div>',
  );
});
