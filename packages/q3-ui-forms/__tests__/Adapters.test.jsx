import React from 'react';
import { act } from 'react-dom/test-utils';
import { Adapters, Builders } from '../src';
import { countries } from '../src/fields/__fixtures__/options';

jest.unmock('useful-state');

const eventStub = (value) => ({
  target: {
    value,
  },
});

const renderChips = (options) => (
  <Builders.Field
    name="chips"
    type="chips"
    options={options}
  />
);

class EncodedUrlRenderer {
  constructor(renderer) {
    this.$__onSubmit = jest.fn();

    this.$__wrapper = global.mount(
      <Adapters.EncodedUrl onSave={this.$__onSubmit}>
        {renderer}
        <Builders.Next submit />
      </Adapters.EncodedUrl>,
    );
  }

  // eslint-disable-next-line
  async $__do(fn) {
    await act(fn);
    this.$__wrapper.update();
    return this;
  }

  async search(value) {
    return this.$__do(async () => {
      this.$__wrapper
        .find('input')
        .simulate('change', eventStub(value));
    });
  }

  async select() {
    return this.$__do(async () => {
      this.$__wrapper
        .find('.MuiAutocomplete-popper li')
        .first()
        .simulate('click');
    });
  }

  async searchAndSelect(value) {
    await this.search(value);
    await this.select();
  }

  async submit() {
    return this.$__do(async () => {
      this.$__wrapper.find('form').simulate('submit');
    });
  }

  async test(res) {
    await this.submit();
    return expect(this.$__onSubmit).toHaveBeenCalledWith(
      res,
    );
  }
}

describe('Adapters', () => {
  it('should flatten the state', async () => {
    const renderer = new EncodedUrlRenderer(
      renderChips(countries),
    );

    await renderer.searchAndSelect('Ca');
    return renderer.test('?chips=CA');
  });

  it('should choose from simple options', async () => {
    const renderer = new EncodedUrlRenderer(
      renderChips(['Canada']),
    );

    await renderer.searchAndSelect('Ca');
    return renderer.test('?chips=Canada');
  });

  it.only('should comma-delineate the state', async () => {
    const renderer = new EncodedUrlRenderer(
      renderChips(countries),
    );

    await renderer.searchAndSelect('Ca');
    await renderer.searchAndSelect('Unit');
    return renderer.test('?chips=CA%2CUS');
  });
});
