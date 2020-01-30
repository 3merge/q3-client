import React from 'react';
import SplitButton from 'q3-ui/lib/splitButton';
import { SubmitActions } from '../submitActions';

const getProps = () => ({
  formik: {
    status: 'init',
    submitForm: jest.fn(),
    resetForm: jest.fn(),
    isSubmitting: false,
    values: {
      garply: true,
      foo: {
        bar: {
          baz: true,
        },
      },
      quuz: [1, 2],
    },
  },
  params: {
    delete: jest.fn(),
  },
});

const callHandlerByIndex = (props, i) =>
  global
    .shallow(<SubmitActions {...props} />)
    .find(SplitButton)
    .props()
    .options[i].handler();

describe('"Filter/SubmitActions"', () => {
  it('should call formik submitForm', () => {
    const props = getProps();
    callHandlerByIndex(props, 0);
    expect(props.formik.submitForm).toHaveBeenCalled();
  });

  it('should call delete on all value keys', () => {
    const props = getProps();
    callHandlerByIndex(props, 1);
    expect(props.formik.resetForm).toHaveBeenCalled();

    expect(props.params.delete).toHaveBeenCalledWith(
      'garply',
    );

    expect(props.params.delete).toHaveBeenCalledWith(
      'quuz',
    );

    expect(props.params.delete).toHaveBeenCalledWith(
      'foo.bar.baz',
    );
  });
});
