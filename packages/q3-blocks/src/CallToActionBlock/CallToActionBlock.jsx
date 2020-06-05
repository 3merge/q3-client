import React from 'react';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const CallToActionBlock = ({ backgroundColor, raise }) => (
  <Grid item md={6} xs={12}>
    <Card
      textAlign="center"
      style={{
        backgroundColor,
        height: '50vh',
        borderRadius: 0,
        marginTop: raise ? '-15vh' : 0,
      }}
    >
      <CardActionArea
        style={{ height: '100%', width: '100%' }}
      >
        <Box
          maxWidth="450px"
          width="100%"
          margin="auto"
          textAlign="center"
          style={{
            mixBlendMode: 'multiply',
          }}
        >
          <Typography
            variant="subtitle1"
            component="span"
            gutterBottom
          >
            Our products are supplied to spec to solve
            application challenges.
          </Typography>
          <Box mt={2}>
            <ArrowRightAltIcon
              style={{ fontSize: '2.076rem' }}
            />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  </Grid>
);

export default CallToActionBlock;
