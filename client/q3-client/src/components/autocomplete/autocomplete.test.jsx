import React from 'react';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lock from '@material-ui/icons/Lock';
import {
  materialShallow,
  materialMount,
} from '../../helpers/testUtils';
import { countries } from '../../helpers/fakeData';
import {
  AutoCompleteWrapper as AutoComplete,
  DropDownMenuItems,
  DropDownMenu,
  AutoCompleteField,
} from '.';

describe('Autocomplete state integration', () => {
  let spy;
  let effect;

  const [country] = countries;
  const emptySearch = {
    label: '',
    value: '',
  };

  const props = {
    formik: {
      errors: {},
      values: {
        country,
      },
    },
    inputProps: {
      name: 'country',
      label: 'search',
    },
  };

  const mockComponentInitState = (a, b, c) => {
    const mock = jest.fn();
    spy
      .mockReturnValueOnce([a, mock])
      .mockReturnValueOnce([b, mock])
      .mockReturnValueOnce([c, mock]);
    return mock;
  };

  beforeAll(() => {
    spy = jest.spyOn(React, 'useState');
    effect = jest.spyOn(React, 'useEffect');
  });

  beforeEach(() => {
    Object.assign(props, {
      loadOptions: jest.fn().mockResolvedValue(countries),
      formik: {
        ...props.formik.props,
        setFieldValue: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should render default state', (done) => {
    materialShallow(AutoComplete, props);
    setImmediate(() => {
      expect(spy).toHaveBeenCalledWith([]);
      expect(spy).toHaveBeenCalledWith(false);
      expect(spy).toHaveBeenCalledWith(emptySearch);
      done();
    });
  });

  it('Should not fetch items without a search term', (done) => {
    effect.mockImplementation((fn) => fn());
    mockComponentInitState([], false, country);
    materialShallow(AutoComplete, props);
    setImmediate(() => {
      expect(props.loadOptions).not.toHaveBeenCalled();
      done();
    });
  });

  it('Should fetch items on loading', (done) => {
    effect.mockImplementation((fn) => fn());
    mockComponentInitState([], true, country);
    materialShallow(AutoComplete, props);
    setImmediate(() => {
      expect(props.loadOptions).toHaveBeenCalledWith(
        country,
      );
      done();
    });
  });

  it('Should listen to Downshift change', (done) => {
    const mock = mockComponentInitState([], false, {});
    materialShallow(AutoComplete, props)
      .find(Downshift)
      .props()
      .onInputValueChange(country);
    setImmediate(() => {
      expect(mock).toHaveBeenCalledWith(true);
      expect(mock).toHaveBeenCalledWith(country);
      done();
    });
  });

  it('Should pass change to formik', (done) => {
    effect.mockImplementation((fn) => fn());
    mockComponentInitState([], true, emptySearch);
    materialShallow(AutoComplete, props)
      .find(Downshift)
      .props()
      .onChange(country);
    setImmediate(() => {
      expect(
        props.formik.setFieldValue,
      ).toHaveBeenCalledWith('country', country);
      done();
    });
  });
});

describe('TextField integration', () => {
  it('Should render loading and readOnly icons', () => {
    const mount = materialMount(AutoCompleteField, {
      readOnly: true,
      loading: true,
      name: 'foo',
      label: 'bar',
      inputProps: {},
    });
    expect(mount.find(Lock)).toHaveLength(1);
    expect(mount.find(CircularProgress)).toHaveLength(1);
  });
});

describe('DropDownMenu', () => {
  it('Should not render the paper', () => {
    expect(
      materialShallow(DropDownMenu, {
        isOpen: false,
        menuProps: {},
        children: <p>Foo</p>,
      }),
    ).toMatchObject({});
  });

  it('Should render the paper', () => {
    expect(
      materialShallow(DropDownMenu, {
        isOpen: true,
        menuProps: {},
        children: <p>Bar</p>,
      }).find(Paper),
    ).toHaveLength(1);
  });
});

describe('Dropdown items', () => {
  it('Should iterate and highlight selected', () => {
    const itemProps = jest.fn().mockReturnValue({});
    const mounted = materialShallow(DropDownMenuItems, {
      options: countries,
      selected: 1,
      itemProps,
    });
    expect(mounted.find('.Mui-selected')).toHaveLength(1);
    expect(itemProps.mock.calls.length).toBe(
      countries.length,
    );
  });
});
