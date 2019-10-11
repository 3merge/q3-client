import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Grow from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '../list';
import Tile from '../tile';
import { ErrorGraphic } from '../graphic';

const isObject = (item) => typeof item === 'object';

const assignIDs = (a) =>
  a.map((item, i) => {
    if (isObject(item) && !item.id) {
      return { ...item, id: i };
    }
    return item;
  });

const GrowIn = ({ children }) => (
  <Grow in>
    <div>{children}</div>
  </Grow>
);

GrowIn.propTypes = {
  children: PropTypes.node.isRequired,
};

const Repeater = ({
  name,
  subtitle,
  img,
  primary,
  secondary,
  data,
  renderRowToolbar,
  renderPost,
  fetchingError,
  fetching,
}) => {
  const { t } = useTranslation();

  return (
    <Tile
      title={t(`titles:${name}`)}
      loading={fetching}
      error={fetchingError}
    >
      <Container maxWidth="md">
        {fetchingError ? (
          <GrowIn>
            <ErrorGraphic />
          </GrowIn>
        ) : (
          <GrowIn>
            <List
              subtitle={subtitle}
              img={img}
              items={assignIDs(data).map((item) => ({
                ...item,
                primary: get(item, primary),
                secondary: get(item, secondary),
                render: () => (
                  <Grid container>
                    {renderRowToolbar(item)}
                  </Grid>
                ),
              }))}
            />
          </GrowIn>
        )}
      </Container>
      {renderPost()}
    </Tile>
  );
};

Repeater.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  subtitle: PropTypes.string,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  renderRowToolbar: PropTypes.func,
  fetchingError: PropTypes.bool,
  fetching: PropTypes.bool,
  renderPost: PropTypes.func,
};

Repeater.defaultProps = {
  renderPost: () => null,
  renderRowToolbar: () => null,
  fetching: false,
  fetchingError: false,
  subtitle: null,
  data: [],
  img: null,
};

export default Repeater;
