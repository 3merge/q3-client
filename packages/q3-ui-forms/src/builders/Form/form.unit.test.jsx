import React from 'react';
import { FormBuilder } from './Form';
import Back from '../back';
import Next from '../next';

const diveIntoFormik = (props) =>
  global.shallow(
    <FormBuilder
      {...props}
      onSubmit={jest.fn()}
      onReset={jest.fn()}
    >
      <div />
    </FormBuilder>,
  );

describe('FormBuilder', () => {
  it('should render <Back />', () =>
    expect(
      diveIntoFormik({ enableReset: true }).find(Back),
    ).toHaveLength(1));

  it('should not render <Back />', () =>
    expect(diveIntoFormik().find(Back)).toHaveLength(0));

  it('should render custom label on <Back />', () =>
    expect(
      diveIntoFormik({
        enableReset: true,
        resetLabel: 'testing',
      })
        .find(Back)
        .props(),
    ).toHaveProperty('label', 'testing'));

  it('should render <Next />', () =>
    expect(diveIntoFormik().find(Next)).toHaveLength(1));

  it('should not render <Next />', () =>
    expect(
      diveIntoFormik({ enableSubmit: false }).find(Next),
    ).toHaveLength(0));

  it('should render custom label on <Next />', () =>
    expect(
      diveIntoFormik({ submitLabel: 'testing' })
        .find(Next)
        .props(),
    ).toHaveProperty('label', 'testing'));
});
