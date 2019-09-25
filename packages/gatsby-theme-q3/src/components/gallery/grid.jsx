import React from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const GridItem = ({ img, title, subtitle }) => (
  <GridListTile key={img}>
    <img src={img} alt={title} />
    <GridListTileBar title={title} subtitle={subtitle} />
  </GridListTile>
);

const TitlebarGridList = ({ data, columns, title }) => {
  return (
    <Container component="section">
      <Box my={4}>
        {title && (
          <Typography variant="h2" align="center" gutterBottom>
            {title}
          </Typography>
        )}
        <GridList cellHeight={210} cols={columns}>
          {data.map(GridItem)}
        </GridList>
      </Box>
    </Container>
  );
};

TitlebarGridList.defaultProps = {
  data: [],
  columns: 3,
};

export default TitlebarGridList;
