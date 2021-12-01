import React from 'react';
import Accordion from './Accordion';

const checkExistenceOfChild = (props) => {
  const TestChild = () => <div />;
  return global
    .shallow(
      <Accordion title="test" {...props}>
        <TestChild />
      </Accordion>,
    )
    .find(TestChild)
    .exists();
};

describe('Accordion', () => {
  it('should render empty', () => {
    expect(
      checkExistenceOfChild({ data: [], showEmpty: false }),
    ).toBeFalsy();
  });

  it('should render', () => {
    expect(
      checkExistenceOfChild({
        data: [],
        showEmpty: true,
      }),
    ).toBeTruthy();
  });

  it('should render with data', () => {
    expect(
      checkExistenceOfChild({
        data: [{ id: 1 }],
        showEmpty: false,
      }),
    ).toBeTruthy();
  });
});
