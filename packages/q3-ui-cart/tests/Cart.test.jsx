import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  POPOVER_CLASS,
  TYPOGRAPHY_CLASS,
} from 'q3-components/lib/EditableTypography/constants';
import { Drawer } from '../src';
import {
  DRAWER_TITLE_ID,
  ADD_TO_CART_CLASS,
  DRAWER_LAUNCHER,
  DRAWER_LINE_ITEM_CLASS,
  DRAWER_LINE_ITEM_UPDATE_CLASS,
  DRAWER_LINE_ITEM_REMOVE_CLASS,
} from '../src/constants';
import { withFixtures as Fixtures } from './Cart.stories.jsx';

let Stage;

jest.unmock('formik');
jest.unmock('useful-state');
jest.useFakeTimers();

jest.mock(
  '@material-ui/core/Hidden',
  () => ({ children }) => children,
);

beforeAll(() => {
  Stage = Fixtures;
});

const addItemToCart = async (el) =>
  act(async () => {
    el.find(`.${ADD_TO_CART_CLASS}`)
      .first()
      .simulate('click');
  });

const getItemsInCart = (el) =>
  el
    .find(Drawer)
    .find(`.${DRAWER_LINE_ITEM_CLASS}`)
    .hostNodes();

const openCartDrawer = (el) =>
  el.find(`.${DRAWER_LAUNCHER}`).first().simulate('click');

const renameCartDrawer = async (el, value) =>
  act(async () => {
    const pop = el.find(`.${POPOVER_CLASS}`);

    pop
      .find('input')
      .props()
      .onChange({
        target: {
          persist: jest.fn(),
          value,
        },
      });

    jest.runOnlyPendingTimers();
    pop.find('form').first().simulate('submit');
  });

describe('Cart', () => {
  it('should add to and remove a product from the cart', async () => {
    const el = global.mount(<Stage />);
    await addItemToCart(el);
    openCartDrawer(el);
    expect(getItemsInCart(el)).toHaveLength(1);

    await act(async () => {
      el.find(Drawer)
        .find(`.${DRAWER_LINE_ITEM_REMOVE_CLASS}`)
        .first()
        .simulate('click');
    });

    el.update();
    return expect(getItemsInCart(el)).toHaveLength(0);
  });

  it('should add to and change the quantity of an item', async () => {
    const el = global.mount(<Stage />);
    await addItemToCart(el);
    openCartDrawer(el);

    const btn = el
      .find(Drawer)
      .find(`.${DRAWER_LINE_ITEM_UPDATE_CLASS}`)
      .find('input');

    await act(async () => {
      btn.props().onBlur({
        target: {
          value: 6,
        },
      });
    });

    el.update();

    expect(
      el
        .find(`.${DRAWER_LINE_ITEM_UPDATE_CLASS}`)
        .find('input')
        .props(),
    ).toHaveProperty('value', 6);
  });

  it('should change the cart name', async () => {
    const el = global.mount(<Stage />);
    const newTitle = 'Something brand new';

    await addItemToCart(el);
    openCartDrawer(el);

    await act(async () => {
      el.find(Drawer)
        .find(`.${TYPOGRAPHY_CLASS}`)
        .first()
        .simulate('click');
    });

    el.update();
    await renameCartDrawer(el, newTitle);

    expect(
      el.find(`#${DRAWER_TITLE_ID}`).first().text(),
    ).toMatch(newTitle);
  });
});
