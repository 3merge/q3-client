import React from 'react';
import CollapsiblePanel from '..';
import Alert from '../alert';

describe('"CollapsiblePanel"', () => {
  it('should render alerts', () => {
    const als = global
      .shallow(
        <CollapsiblePanel
          title="With alerts"
          alerts={[{ title: 'Foo', label: 'Bar' }]}
        >
          <div />
        </CollapsiblePanel>,
      )
      .find(Alert);

    expect(als).toHaveLength(1);
  });

  it('should render nothing', () => {
    const el = global.shallow(
      <CollapsiblePanel title="Without show" show={false}>
        <div />
      </CollapsiblePanel>,
    );

    expect(el).toEqual({});
  });
});
