import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useAuth } from 'q3-ui-permissions';
import Tabs from 'q3-ui/lib/tabs';
import Context from './state';
import Trash from '../views/trash';
import { isArray, getPath } from './utils';

const Detail = ({
  children,
  trash,
  notes,
  files,
  featured,
  history,
  picture,
}) => {
  const {
    resourceName,
    resourceNameSingular,
    collectionName,
    id,
    ...state
  } = React.useContext(Context);

  const authorization = useAuth(
    collectionName,
    get(state, `${resourceNameSingular}.createdBy.id`),
  );

  const tabs = isArray(children)
    .flat()
    .filter(Boolean)
    .map((element, i) => ({
      label: element.type.name,
      to: getPath(i, element.type.name.toLowerCase()),
      component: () =>
        React.cloneElement(element, {
          title: element.type.name,
          resourceName,
          resourceNameSingular,
          collectionName,
          authorization,
          state,
          id,
        }),
    }));

  if (picture)
    tabs.push({
      label: 'picture',
      to: '/picture',
      component: Trash,
    });

  if (featured)
    tabs.push({
      label: 'featured',
      to: '/featured',
      component: Trash,
    });

  if (files)
    tabs.push({
      label: 'files',
      to: '/files',
      component: Trash,
    });

  if (notes)
    tabs.push({
      label: 'notes',
      to: '/notes',
      component: Trash,
    });

  if (history)
    tabs.push({
      label: 'history',
      to: '/history',
      component: Trash,
    });

  if (trash)
    tabs.push({
      label: 'trash',
      to: '/trash',
      component: Trash,
    });

  return (
    <Container>
      <Box my={4}>
        {state.fetching ? (
          <CircularProgress />
        ) : (
          <Tabs
            root={`/${resourceName}/${id}`}
            views={tabs}
          />
        )}
      </Box>
    </Container>
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  trash: PropTypes.bool,
  notes: PropTypes.bool,
  featured: PropTypes.bool,
  files: PropTypes.bool,
  history: PropTypes.bool,
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  trash: false,
  notes: false,
  featured: false,
  files: false,
  history: false,
  picture: false,
};

export default Detail;
