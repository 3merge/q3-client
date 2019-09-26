import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Components } from 'q3-ui';

const { Tabs, DeleteDialog } = Components;

const Detail = ({
  name,
  rootPath,
  id,
  canDelete,
  loading,
  views,
  services,
  data,
}) => {
  const root = React.useMemo(() => {
    if (!id) return rootPath;
    return `${rootPath}/${id}/`;
  }, [rootPath, id]);

  return (
    <Container title={name}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Tabs
            root={root}
            views={
              typeof views === 'function'
                ? views({ id, data, ...services })
                : views
            }
          />
          {canDelete && (
            <Container maxWidth="lg" component="footer">
              <Box textAlign="right">
                <DeleteDialog
                  next={invoke(services, 'delete', id)}
                  redirect={rootPath}
                />
              </Box>
            </Container>
          )}
        </>
      )}
    </Container>
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
