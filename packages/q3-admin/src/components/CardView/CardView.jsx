import React from 'react';
import { Link } from '@reach/router';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { Formatter } from 'q3-components';
import { isObject, map, omit } from 'lodash';

const CardView = ({ children, data }) => (
  <Box
    bgcolor="background.default"
    height="100%"
    margin="auto"
    p={1}
    width="calc(100vw - 320px)"
  >
    {children}
    <Grid container spacing={1}>
      {map(data, (item) => (
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <Card>
            <CardActionArea to={item.url} component={Link}>
              <CardMedia
                image={item.imgSrc}
                style={{ height: 250 }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {item.description}
              </Typography>
              {Object.entries(
                omit(item, [
                  'id',
                  'name',
                  'description',
                  'url',
                  'imgSrc',
                ]),
              )
                .filter(
                  ([, value]) =>
                    value?.base || !isObject(value),
                )
                .map(([key, value]) => {
                  return (
                    <div>
                      {key}:
                      <Formatter key={key} value={value} />
                    </div>
                  );
                })}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CardView;
