import React from 'react';
import { act } from 'react-dom/test-utils';
import { Builders } from 'q3-ui-forms';
import Inline from '../Inline';
import InlineEditor, {
  InlineEditorFormContent,
} from './InlineEditor';
import { simulateNetworkDelay } from '../../tests/support';

const renderInlineEditor = (props) =>
  global
    .shallow(
      <InlineEditor
        title="test"
        onSubmit={jest.fn()}
        initialValues={{}}
        {...props}
      >
        <div />
      </InlineEditor>,
    )
    .find(Inline)
    .props();

describe('InlineEditor', () => {
  describe('"default"', () => {
    it('should render default button component', () => {
      const { renderTrigger } = renderInlineEditor();
      expect(renderTrigger).toEqual(expect.any(Function));
      expect(renderTrigger(jest.fn()).type.name).toMatch(
        'IconButton',
      );
    });

    it('should render custom button component', () => {
      const buttonComponent = jest.fn();
      renderInlineEditor({
        buttonComponent,
      }).renderTrigger();

      expect(buttonComponent).toHaveBeenCalled();
    });
  });

  describe('"InlineEditorFormContent"', () => {
    it('should disable button during submit', async () => {
      const onSubmitHandler = jest
        .fn()
        .mockImplementation(simulateNetworkDelay);

      const el = global.mount(
        <InlineEditorFormContent
          close={jest.fn()}
          onSubmit={onSubmitHandler}
        >
          <Builders.Field
            name="demo"
            type="text"
            suppressLabel
            xl={12}
            lg={12}
          />
        </InlineEditorFormContent>,
      );

      await act(async () => {
        el.find('form').first().simulate('submit');
      });

      el.update();
      expect(onSubmitHandler).toHaveBeenCalled();

      expect(
        el.find('[type="submit"]').last().props(),
      ).toHaveProperty('disabled', true);
    });
  });
});
