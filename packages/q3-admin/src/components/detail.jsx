import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useAuth } from 'q3-ui-permissions';
import Tile from 'q3-ui/lib/tile';
import Tabs from 'q3-ui/lib/tabs';
import Comparision from 'comparisons';
import Context from './state';
import Notes from './notes';
import Picture from './picture';
import Trash from './trash';
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
  const { t } = useTranslation();

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
    .filter((r) => {
      if (
        r &&
        state[resourceNameSingular] &&
        r.props.conditional
      )
        return new Comparision(r.props.conditional).eval(
          state[resourceNameSingular],
        );

      return Boolean(r);
    })
    .map((element, i) => {
      const str = element.type.name || element.props.name;
      const name = t(`titles:${str}`);
      const subtitle = t(`descriptions:${str}`);

      return {
        label: name,
        to: getPath(i, element.type.name.toLowerCase()),
        component: () => (
          <Tile title={name} subtitle={subtitle}>
            {React.cloneElement(element, {
              resourceName,
              resourceNameSingular,
              collectionName,
              authorization,
              state,
              id,
            })}
          </Tile>
        ),
      };
    });

  if (picture)
    tabs.push({
      label: 'picture',
      to: '/picture',
      component: Picture,
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
      component: Notes,
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
    <Container maxWidth="lg">
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
