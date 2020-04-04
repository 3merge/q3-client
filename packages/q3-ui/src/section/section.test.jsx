import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Section from '.';

const getTypographyCount = (props) =>
  global
    .shallow(
      <Section {...props}>
        <div />
      </Section>,
    )
    .find(Typography).length;

describe('Section', () => {
  it('should conditionally render Typography', () => {
    const stub = {
      label: 'foo!',
      title: 'bar!',
      subtitle: 'quuz!',
    };

    expect(getTypographyCount(stub)).toBe(3);
    delete stub.label;
    expect(getTypographyCount(stub)).toBe(2);
    delete stub.subtitle;
    expect(getTypographyCount(stub)).toBe(1);
  });

  it('should interpret "fullWidth" as maximum container size', () => {
    const el = global
      .shallow(
        <Section title="Fullwidth" fullWidth>
          <div />
        </Section>,
      )
      .find(Container)
      .first()
      .props();
    expect(el).toHaveProperty('maxWidth', 'xl');
  });

  it('should not include a margin between photos and title', () => {
    const el = global
      .shallow(
        <Section title="Fullwidth" fullWidth>
          <div />
        </Section>,
      )
      .find(Box)
      .first()
      .props();
    expect(el).toHaveProperty('pt', 0);
  });
});
