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
import Files from './files';
import Trash from './trash';
import { isArray, getPath } from './utils';

const Detail = ({
  children,
  trash,
  notes,
  files,
  featured,
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
      const str = String(
        element.type.name || element.props.name,
      ).toLowerCase();

      return {
        label: str,
        to: getPath(i, element.type.name.toLowerCase()),
        component: () => (
          <Tile title={str} subtitle={str}>
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

  const addToTabs = (Component, name) =>
    tabs.push({
      label: name,
      to: `/${name}`,
      component: Component,
    });

  if (files)
    addToTabs(
      () => (
        <Files id={id} collectionName={collectionName} />
      ),
      'uploads',
    );

  if (notes && authorization.canSeeSub('thread'))
    addToTabs(
      () => (
        <Notes id={id} collectionName={collectionName} />
      ),
      'notes',
    );

  if (trash && authorization.canDelete)
    addToTabs(
      () => (
        <Trash
          url={`/${resourceName}`}
          onClick={state.remove()}
        />
      ),
      'trash',
    );

  return (
    <Container maxWidth="xl">
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
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  trash: false,
  notes: false,
  featured: false,
  files: false,
  picture: false,
};

export default Detail;
