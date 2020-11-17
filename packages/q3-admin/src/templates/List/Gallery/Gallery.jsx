import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from '@reach/router';
import Fade from '@material-ui/core/Fade';
import Dialog from 'q3-ui-dialog';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Typography,
  Container,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from 'q3-ui/lib/iconButton';
import { useSegments } from 'q3-hooked';
import Article from '../../../components/Article';
import { useAppContext } from '../../../hooks';
import CollectionDatasource from '../../../containers/CollectionDatasource';
import CollectionFilter from '../../../containers/CollectionFilter';

export default ({
  filterComponent: Filter,
  resolvers,
  ...rest
}) => {
  const { can } = useAppContext({
    filter: Filter ? (
      <Dialog
        renderTrigger={(onClick) => (
          <IconButton
            label="filter"
            icon={FilterListIcon}
            buttonProps={{
              onClick,
            }}
          />
        )}
        renderContent={() => (
          <CollectionFilter {...rest}>
            <Filter />
          </CollectionFilter>
        )}
        variant="drawer"
      />
    ) : null,
  });

  const { filters, getCurrent } = useSegments();
  const navigate = useNavigate();

  return (
    <Article>
      <Box bgcolor="background.default" py={4}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
        >
          Collection name here
        </Typography>
        <Container>
          <Box component="nav" my={2}>
            <Tabs centered value={getCurrent()}>
              {filters.map((item) => (
                <Tab
                  component={item.renderer}
                  key={item.searchValue}
                  label={item.label}
                  value={item.searchValue}
                />
              ))}
            </Tabs>
          </Box>
          <CollectionDatasource {...rest}>
            {({ data }) => (
              <Grid container spacing={1}>
                {data.map((item, i) => (
                  <Grid item xs={6} sm={4} md={3}>
                    <Fade in timeout={i * 100 + 150}>
                      <Card>
                        <CardActionArea
                          onClick={() => navigate(item.url)}
                        >
                          <CardMedia
                            image={item.photo}
                            style={{
                              height: 150,
                              width: '100%',
                            }}
                          />
                          <CardContent>
                            <Typography
                              component="h3"
                              variant="body2"
                            >
                              {item.name}
                            </Typography>
                          </CardContent>{' '}
                        </CardActionArea>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </CollectionDatasource>
        </Container>
      </Box>
    </Article>
  );
};
