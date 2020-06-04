import React from 'react';
import Typography from '@material-ui/core/Typography';

export const TITLE_TEXT = 'Lorem ipsum dolor sit amet';

export const Title = () => (
  <Typography variant="h2">{TITLE_TEXT}</Typography>
);

export const ParagraphLong = () => (
  <Typography>
    Sed in turpis ultricies, ultrices mi vel, condimentum
    mauris. Donec faucibus ante quis orci maximus euismod.
    Etiam id erat quis est bibendum interdum nec ut massa.
    Aenean quis commodo justo. Etiam ultricies ultricies
    felis. Morbi mollis tincidunt pretium. Interdum et
    malesuada fames ac ante ipsum primis in faucibus. Ut
    tincidunt neque a purus pretium volutpat. Donec eu ante
    a erat efficitur semper quis eget leo. In convallis
    tortor ac rutrum varius. Suspendisse sagittis id elit
    vitae aliquam.
  </Typography>
);
