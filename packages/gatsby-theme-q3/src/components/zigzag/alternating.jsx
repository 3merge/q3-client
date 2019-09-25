import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Wrapper from './wrapper';
import Section from './section';

const Alternating = ({ align, sections, title, space }) => (
  <Box component="main">
    {title && (
      <Typography variant="h2" align="center">
        {title}
      </Typography>
    )}
    {sections.map((section, i) => (
      <Wrapper
        key={section.id}
        index={i}
        backgroundColor={section.backgroundColor}
        space={space}
      >
        <Section {...section} index={i} align={align} />
      </Wrapper>
    ))}
  </Box>
);

Alternating.defaultProps = {
  sections: [],
};

export default Alternating;
