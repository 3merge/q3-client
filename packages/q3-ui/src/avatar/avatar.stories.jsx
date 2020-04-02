import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '.';

export default {
  title: 'Q3 UI|Components/Avatar',
  parameters: {
    component: Avatar,
  },
};

export const LargeAndClickable = () => (
  <Box p={4}>
    <Avatar
      word="Large"
      superscript="Large"
      large
      onClick={() => null}
      tooltip="Hey"
    />
  </Box>
);

export const alphabetical = () => (
  <Box p={4}>
    <Grid container>
      <Avatar word="Alex" superscript={0} />
      <Avatar word="Brandon" superscript={1} />
      <Avatar word="Cecilia" superscript={2} />
      <Avatar word="Daniella" superscript={3} />
      <Avatar word="Efron" superscript={4} />
      <Avatar word="Frank" superscript={5} />
      <Avatar word="Gary" superscript={6} />
      <Avatar word="Helen" superscript={7} />
      <Avatar word="Ingrid" superscript={8} />
      <Avatar word="Jacob" superscript={9} />
      <Avatar word="Kendra" superscript={10} />
      <Avatar word="Laura" superscript={11} />
      <Avatar word="Marvin" superscript={12} />
      <Avatar word="Nick" superscript={13} />
      <Avatar word="Ophelia" superscript={14} />
      <Avatar word="Peter" superscript={15} />
      <Avatar word="Quinzy" superscript={16} />
      <Avatar word="Robert" superscript={17} />
      <Avatar word="Steve" superscript={18} />
      <Avatar word="Tara" superscript={19} />
      <Avatar word="Uma" superscript={20} />
      <Avatar word="Victor" superscript={21} />
      <Avatar word="Wendy" superscript={22} />
      <Avatar word="Xavier" superscript={23} />
      <Avatar word="Yanni" superscript={24} />
      <Avatar word="Zam" superscript={25} />
      <Avatar
        word="Adam"
        imgSrc="https://picsum.photos/200/300"
      />
    </Grid>
  </Box>
);
