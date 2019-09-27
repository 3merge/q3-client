import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import SearchBar, { SearchTrigger, Adornment } from '.';
import { materialShallow } from '../../helpers/testUtils';

describe('Adornment', () => {
  it('should only render with text', () => {
    expect(
      materialShallow(Adornment, {
        children: 'Hey',
        onClear: jest.fn(),
        term: null,
      }).text(),
    ).toBe('Hey');
    expect(
      materialShallow(Adornment, {
        onClear: jest.fn(),
        term: 'One',
      }).find(IconButton),
    ).toHaveLength(1);
  });
});

describe('Seachbar', () => {
  const renderConditionally = (expanded = false) =>
    materialShallow(SearchBar, {
      expanded,
    });

  it('should render TextField conditionally', () => {
    const renderAsExpanded = (expanded, num) =>
      expect(
        renderConditionally(expanded).find(TextField),
      ).toHaveLength(num);

    renderAsExpanded(true, 1);
    renderAsExpanded(false, 0);
  });

  it('should toggle open state of Drawer', () => {
    const wrapper = renderConditionally();
    const getOpenState = () => {
      const { open } = wrapper.find(Drawer).props();
      return open;
    };

    expect(getOpenState()).toBeFalsy();
    wrapper
      .find(SearchTrigger)
      .props()
      .onOpen();
    expect(getOpenState()).toBeTruthy();
  });

  it('should control value of search fields', () => {
    const wrapper = renderConditionally(true);
    wrapper.find(TextField).simulate('change', {
      target: {
        value: '123',
      },
    });

    wrapper.update();
    const field = wrapper.find(TextField);
    expect(field.props().value).toBe('123');
  });
});
