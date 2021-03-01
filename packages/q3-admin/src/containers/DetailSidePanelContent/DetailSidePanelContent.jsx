import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AccountBox from '@material-ui/icons/AccountBox';
import Box from '@material-ui/core/Box';
import { teal, orange } from '@material-ui/core/colors';
import HistoryIcon from '@material-ui/icons/History';
import Grid from '@material-ui/core/Grid';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { getMeta } from 'q3-ui/lib/timeline';
import { omit } from 'lodash';
import Typography from '@material-ui/core/Typography';
import SidePanelContent from '../../components/SidePanelContent';
import { Dispatcher, Store } from '../state';
import { makeSidePanelContent } from './helpers';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const DetailSidePanelContent = ({
  registerOptions,
  registerPanels,
}) => {
  const { t } = useTranslation();
  const dispatchers = React.useContext(Dispatcher);
  const { data } = React.useContext(Store);
  const params = [data, dispatchers, t];

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  const defaultOptions = makeSidePanelContent(
    registerOptions,
    ...params,
  );

  const panels = makeSidePanelContent(
    registerPanels,
    ...params,
  );

  if (createdBy)
    defaultOptions.push({
      color: teal[700],
      icon: AccountBox,
      title: t('labels:creator'),
      description: createdBy,
    });

  if (updatedBy)
    defaultOptions.push({
      color: orange[700],
      icon: HistoryIcon,
      title: t('labels:lastUpdated'),
      description: updatedBy,
    });

  return (
    <Box p={2} width={295}>
      {defaultOptions.length > 0 && (
        <Box component="ul" margin={0} padding={0}>
          {defaultOptions.map((option, i) => (
            <Box
              component="li"
              mb={0.75}
              style={{ listStyle: 'none' }}
            >
              <Grid container spacing={1}>
                <Grid item>
                  <Typography
                    variant="overline"
                    style={{
                      whiteSpace: 'break-spaces',
                      lineHeight: 1,
                    }}
                  >
                    {option.title}:
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    whiteSpace: 'break-spaces',
                  }}
                >
                  <Typography
                    component="small"
                    style={{ fontSize: '0.911rem' }}
                  >
                    {option.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
      {panels.map((panel, i) => (
        <SidePanelContent
          {...panel}
          key={i}
          transitionDelay={i + 1 * 150}
          gutters
        >
          {panel.content}
        </SidePanelContent>
      ))}
    </Box>
  );
};

DetailSidePanelContent.propTypes = {
  /**
   * Programatically add options to the list.
   */
  registerOptions: PropTypes.func,

  /**
   * Programatically add panels to the list.
   */
  registerPanels: PropTypes.func,
};

DetailSidePanelContent.defaultProps = {
  registerOptions: null,
  registerPanels: null,
};

export default DetailSidePanelContent;
