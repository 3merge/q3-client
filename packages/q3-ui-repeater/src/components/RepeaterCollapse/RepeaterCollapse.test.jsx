import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import RepeaterCollapse from './RepeaterCollapse';

const getAccordionCls = (container) =>
  container.querySelector('.MuiAccordion-root');

const renderContainer = (label) =>
  render(
    <RepeaterCollapse label={label}>
      <div />
    </RepeaterCollapse>,
  ).container;

describe('RepeaterCollapse', () => {
  it('should render an accordion', () =>
    expect(
      getAccordionCls(renderContainer('testing')),
    ).toBeInTheDocument());

  it('should not render an accordion', () =>
    expect(
      getAccordionCls(renderContainer()),
    ).not.toBeInTheDocument());
});
