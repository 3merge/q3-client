import React from 'react';
import { act } from 'react-dom/test-utils';
import Provider, {
  AddToCart,
  Drawer,
  Launcher,
  LineItem,
} from '../src';
import useFixtures from './useFixtures';

let Stage;

jest.unmock('useful-state');

beforeAll(() => {
  Stage = () => {
    const fixtures = useFixtures();

    return (
      <Provider {...fixtures}>
        <Launcher>
          {(close, isOpen) => (
            <Drawer
              titleKey="title"
              close={close}
              isOpen={isOpen}
              shopPath="/shop"
              checkoutPath="/checkout"
            >
              <LineItem />
            </Drawer>
          )}
        </Launcher>
        <AddToCart
          product="abc"
          variant="spread"
          size="small"
        />
      </Provider>
    );
  };
});

describe('Cart', () => {
  it('should', async () => {
    let el;

    await act(async () => {
      el = global.mount(<Stage />);
    });

    await act(async () => {
      el.find('.add-to-cart')
        .first()
        .simulate('click');
    });

    act(() => {
      el.find(Launcher)
        .find('button')
        .simulate('click');
    });

    el.update();
    return expect(
      el.find('.q3-cart-line-item'),
    ).toHaveLength(2);
  });
});
