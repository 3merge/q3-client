import React from 'react';
import { asyncAct } from 'q3-ui-test-utils/lib/enzymeUtils';
import ArticleAside, {
  ArticleAsideContext,
} from './ArticleAside';

const makeTestComponent = () => {
  let context;

  const Test = () => {
    context = React.useContext(ArticleAsideContext);
    const { close, setState } = context;

    return (
      <>
        <button id="close" onClick={close} type="button">
          Close
        </button>
        <button
          id="open"
          onClick={() => {
            setState({
              id: 1,
              content: 'text',
            });
          }}
          type="button"
        >
          Open
        </button>
      </>
    );
  };

  return {
    Test,
    getContext() {
      return context;
    },
  };
};

describe('ArticleAsideContext', () => {
  it('should update/rest context', async () => {
    const { Test, getContext } = makeTestComponent();
    const el = global.mount(
      <ArticleAside>
        <Test />
      </ArticleAside>,
    );

    await asyncAct(() => {
      el.find('#open').simulate('click');
      return el;
    });

    const context = getContext();
    expect(el.text()).toMatch('text');
    expect(context).toMatchObject({
      content: 'text',
      id: 1,
    });

    await asyncAct(() => {
      el.find('#close').simulate('click');
      return el;
    });

    expect(getContext()).toMatchObject({
      content: null,
      id: null,
    });
  });
});
