import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Help from '@material-ui/icons/Help';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useAuth } from 'q3-ui-permissions';
import Tile from 'q3-ui/lib/tile';
import Tabs from 'q3-ui/lib/tabs';
import Comparision from 'comparisons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Persistence } from 'q3-ui-forms/lib/builders/persist';
import FullScreen from './fullScreen';
import Context from '../containers/state';
import Files from './files';
import Trash from './trash';
import { isArray, getPath } from './utils';
import Sidebar from './sidebar';
import Section from './section';
import Notes from '../containers/notes';

const LazyContent = ({ filepath }) => {
  const [content, setContent] = React.useState();

  React.useEffect(() => {
    filepath
      .then(({ default: r }) =>
        axios.create({ baseURL: '/' }).get(r),
      )
      .then(({ data }) => {
        setContent(data);
      });
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

const Detail = ({
  filepath,
  children,
  trash,
  notes,
  files,
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
      const str = String(element.props.name).toLowerCase();

      return {
        label: str,
        to: getPath(i, element.props.name.toLowerCase()),
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
    <>
      {isArray(children)
        .flat()
        .map((el) => (
          <Persistence id={el.props.id} />
        ))}

      <Section
        loading={state.fetching}
        renderSidebar={() => (
          <Sidebar
            persistenceIds={isArray(children)
              .flat()
              .map((el) => el.props.id)}
            commentTab={
              notes && authorization.canSeeSub('thread') ? (
                <Notes
                  id={id}
                  collectionName={collectionName}
                />
              ) : null
            }
          />
        )}
      >
        <Tabs
          root={`/${resourceName}/${id}`}
          views={tabs}
        />
      </Section>
    </>
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  trash: PropTypes.bool,
  notes: PropTypes.bool,
  files: PropTypes.bool,
};

Detail.defaultProps = {
  trash: false,
  notes: false,
  files: false,
};

export default Detail;

/* 
          <Grid item sm={3} xs={12}>
            {filepath && (
              <FullScreen
                title="documentation"
                renderTrigger={(open) => (
                  <Paper
                    style={{ position: 'sticky' }}
                    type="button"
                    elevation={0}
                  >
                    <Box p={2}>
                      <Help />
                      <Typography variant="h4" gutterBottom>
                        {t('titles:needHelp')}
                      </Typography>
                      <Typography gutterBottom>
                        {t('labels:needHelp')}
                      </Typography>
                      <Button
                        onClick={open}
                        variant="outlined"
                      >
                        {t('labels:docs')}
                      </Button>
                    </Box>
                  </Paper>
                )}
              >
                {() => <LazyContent filepath={filepath} />}
              </FullScreen>
            )}
          </Grid>
          */
