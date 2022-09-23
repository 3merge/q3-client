import React from 'react';
import {
  asyncAct,
  asyncMount,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import { Navbar } from '../../src';
import Fixtures from '../fixtures';

jest.unmock('axios');
jest.unmock('useful-state');

const getElement = async (props) =>
  asyncMount(
    <Fixtures delay={0} developer {...props}>
      {(menu) => <Navbar items={menu} />}
    </Fixtures>,
  );

const isContextItem = (node) =>
  node.prop('data-context-item') === true &&
  !node.prop('role') &&
  !node.prop('classes');

const isId = (id) => (node) =>
  String(node.prop('id')) === String(id);

describe('contextMenus', () => {
  it('should add segment', async () => {
    const newSegmentName = 'Cartoons';
    const el = await getElement({
      initialPath: '/shows?genre=cartoon',
    });

    global.prompt = jest
      .fn()
      .mockReturnValue(newSegmentName);

    await asyncAct(() => {
      el.find('[data-list-item="shows"]')
        .childAt(0)
        .simulate('contextmenu');

      return el;
    });

    await asyncAct(() => {
      el.find('#shows-menu')
        .first()
        .findWhere(isContextItem)
        .first()
        .simulate('click');

      return el;
    });

    expect(el.find('[data-segment]').last().text()).toMatch(
      newSegmentName,
    );
  });

  it('should add folder', async () => {
    const newSegmentName = 'Series';
    const el = await getElement();

    global.prompt = jest
      .fn()
      .mockReturnValue(newSegmentName);

    await asyncAct(() => {
      el.find('[data-list-item="shows"]')
        .childAt(0)
        .simulate('contextmenu');

      return el;
    });

    await asyncAct(() => {
      el.find('#shows-menu')
        .first()
        .findWhere(isContextItem)
        .last()
        .simulate('click');

      return el;
    });

    expect(
      el.find('[data-segment-folder]').last().text(),
    ).toMatch(newSegmentName);
  });

  it('should add segment to folder', async () => {
    const newSegmentName = 'Cartoons';
    const el = await getElement({
      initialPath: '/shows?genre=cartoon',
    });

    global.prompt = jest
      .fn()
      .mockReturnValue(newSegmentName);

    await asyncAct(() => {
      el.find(
        '[data-list-item="shows"] [data-segment-folder]',
      )
        .last()
        .childAt(0)
        .simulate('contextmenu');

      return el;
    });

    await asyncAct(() => {
      el.findWhere(isId(7))
        .first()
        .findWhere(isContextItem)
        .first()
        .simulate('click');

      return el;
    });

    expect(el.find('[data-segment]').last().text()).toMatch(
      newSegmentName,
    );
  });

  it('should remove segment', async () => {
    const el = await getElement({
      initialPath: '/shows',
    });

    const getFirstSegment = () =>
      el
        .find('[data-list-item="shows"] [data-segment]')
        .first()
        .childAt(0);

    await asyncAct(() => {
      const n = getFirstSegment();
      expect(n.text()).toMatch('Newly created');
      n.simulate('contextmenu');
      return el;
    });

    await asyncAct(() => {
      el.findWhere(isId(1))
        .first()
        .findWhere(isContextItem)
        .at(2)
        .simulate('click');

      return el;
    });

    expect(getFirstSegment().text()).not.toBe(
      'Newly created',
    );
  });

  it('should rename segment', async () => {
    const newSegmentName = 'Replaced';
    const el = await getElement({
      initialPath: '/shows',
    });

    const getFirstSegment = () =>
      el
        .find('[data-list-item="shows"] [data-segment]')
        .first()
        .childAt(0);

    global.prompt = jest
      .fn()
      .mockReturnValue(newSegmentName);

    await asyncAct(() => {
      const n = getFirstSegment();
      expect(n.text()).toMatch('Newly created');
      n.simulate('contextmenu');
      return el;
    });

    await asyncAct(() => {
      el.findWhere(isId(1))
        .first()
        .findWhere(isContextItem)
        .first()
        .simulate('click');

      return el;
    });

    expect(getFirstSegment().text()).toBe(newSegmentName);
  });

  it('should rename folder', async () => {
    const newSegmentName = 'Replaced';
    const el = await getElement({
      initialPath: '/shows',
    });

    const getFirstSegmentFolder = () =>
      el
        .find(
          '[data-list-item="shows"] [data-segment-folder]',
        )
        .first()
        .childAt(0);

    global.prompt = jest
      .fn()
      .mockReturnValue(newSegmentName);

    await asyncAct(() => {
      const n = getFirstSegmentFolder();
      expect(n.text()).toMatch('Attributes');
      n.simulate('contextmenu');
      return el;
    });

    await asyncAct(() => {
      el.findWhere(isId(2))
        .first()
        .findWhere(isContextItem)
        .at(2)
        .simulate('click');

      return el;
    });

    expect(getFirstSegmentFolder().text()).toBe(
      newSegmentName,
    );
  });

  it('should change visibility', async () => {
    const el = await getElement({
      initialPath: '/shows',
    });

    const getFirstSegment = () =>
      el
        .find('[data-list-item="shows"] [data-segment]')
        .first()
        .childAt(0);

    const getMenuOption = () =>
      el
        .findWhere(isId(1))
        .first()
        .findWhere(isContextItem)
        .at(4);

    // checkmark, label
    // checkmark renders false when not applied
    const getChildLength = () =>
      getMenuOption().prop('children').filter(Boolean);

    await asyncAct(() => {
      const n = getFirstSegment();
      expect(n.text()).toMatch('Newly created');
      n.simulate('contextmenu');
      return el;
    });

    expect(getChildLength()).toHaveLength(1);
    await asyncAct(() => {
      getMenuOption().simulate('click');
      return el;
    });

    expect(getChildLength()).toHaveLength(2);
  });

  it('should replace segment', async () => {
    const el = await getElement({
      initialPath: '/shows?year=2022',
    });

    const getFirstSegment = () =>
      el
        .find('[data-list-item="shows"] [data-segment]')
        .first()
        .childAt(0);

    await asyncAct(() => {
      const n = getFirstSegment();
      expect(n.prop('to')).toMatch(
        '/shows?createdAt<=2021-08-01&createdAt>=2021-01-01',
      );
      n.simulate('contextmenu');
      return el;
    });

    await asyncAct(() => {
      el.findWhere(isId(1))
        .first()
        .findWhere(isContextItem)
        .at(1)
        .simulate('click');

      return el;
    });

    expect(getFirstSegment().prop('to')).toBe(
      '/shows?year=2022',
    );
  });
});
