import React from 'react';
import CollapsiblePanel from '..';

describe('"CollapsiblePanel"', () => {
  it('should render nothing', () => {
    const el = global.shallow(
      <CollapsiblePanel title="Without show" show={false}>
        <div />
      </CollapsiblePanel>,
    );

    expect(el).toEqual({});
  });
});
