import React from 'react';
import Typography from '@material-ui/core/Typography';

export const TITLE_TEXT = 'Lorem ipsum dolor sit amet';

export const TITLE_TEXT_LONG =
  'Sed in turpis ultricies, ultrices mi vel, condimentum mauris';

export const TITLE_TEXT_SHORT = 'mi vel';

export const DESCRIPTION =
  'Sed in turpis ultricies, ultrices mi vel, condimentum mauris. Donec faucibus ante quis orci maximus euismod. Etiam id erat quis est bibendum interdum nec ut massa. Aenean quis commodo justo. Etiam ultricies ultricies felis. Morbi mollis tincidunt pretium.';

export const Title = () => (
  <Typography variant="h2">{TITLE_TEXT}</Typography>
);

export const ParagraphLong = () => (
  <Typography>{DESCRIPTION + DESCRIPTION}</Typography>
);
