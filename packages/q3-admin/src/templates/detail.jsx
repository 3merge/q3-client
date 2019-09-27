import React from 'react';
import PropTypes from 'prop-types';
import { get, invoke } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Components } from 'q3-ui';
import { useRest } from 'q3-ui-rest';

const { Header, Tabs, DeleteDialog } = Components;

const Detail = ({
  name,
  pathToTitle,
  canDelete,
  views,
  id,
  ...rest
}) => {
  const url = `/${name}/${id}`;
  const state = useRest({
    runOnInit: true,
    key: name,
    url,
    ...rest,
  });

  return (
    <>
      <Header
        name={get(state, pathToTitle)}
        renderLeft={() => 'LEts return'}
      />
      <Container>
        {state.fetching ? (
          <CircularProgress />
        ) : (
          <>
            <Tabs
              root={url}
              views={
                typeof views === 'function'
                  ? views({ id, ...state })
                  : views
              }
            />
            {canDelete && (
              <Container maxWidth="lg" component="footer">
                <Box textAlign="right">
                  <DeleteDialog
                    next={invoke(state, 'delete', id)}
                    redirect={name}
                  />
                </Box>
              </Container>
            )}
          </>
        )}
      </Container>
    </>
  );
};

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  canDelete: PropTypes.bool,
  loading: PropTypes.bool,
  views: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  services: PropTypes.shape({
    post: PropTypes.func,
    put: PropTypes.func,
    patch: PropTypes.func,
    delete: PropTypes.func,
  }).isRequired,
};

Detail.defaultProps = {
  canDelete: false,
  loading: false,
  views: [],
};

export default Detail;
