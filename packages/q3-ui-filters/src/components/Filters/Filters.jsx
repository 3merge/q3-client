import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Collapse,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { map, sortBy, size } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'q3-ui-locale';
import { useToggle } from 'useful-state';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useAuth } from 'q3-ui-permissions';
import Actions from '../Actions';
import Search from '../Search';
import useLocation from '../useLocation';

const Filters = ({ collectionName, data }) => {
  const { t } = useTranslation('labels');
  const [search, setSearch] = React.useState();
  const loc = useLocation(data);
  const init = loc.initialValues;

  const { toggle, state } = useToggle();
  const auth = useAuth(collectionName);

  return (
    <Box>
      <Box mx={-0.5}>
        <Paper
          elevation={0}
          style={{
            background: 'transparent',
          }}
        >
          <Box px={1} py={0.5}>
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
            >
              <Grid item>
                <Search handleInput={setSearch} />
              </Grid>
              <Grid item>
                <Tooltip title="toggle inactive filters">
                  <IconButton
                    color="inherit"
                    onClick={toggle}
                  >
                    {state ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Builders.Form
        enableSubmit={false}
        initialValues={init}
        onSubmit={loc.apply}
      >
        {(values) => {
          const count = loc.makeCounter(values);

          return (
            <>
              {sortBy(
                loc.map((name, fields) => {
                  const num = count(name);
                  const fieldName = String(name).replace(
                    /~/g,
                    '.',
                  );

                  const group = t(fieldName);

                  return auth.canSeeSub(fieldName) ? (
                    <Grid
                      key={group}
                      item
                      xs={12}
                      style={{
                        padding: 0,
                      }}
                    >
                      <Collapse
                        in={
                          ((state && num) || !state) &&
                          (!size(search) ||
                            group
                              .toLowerCase()
                              .includes(
                                String(
                                  search,
                                ).toLowerCase(),
                              ))
                        }
                      >
                        <Accordion
                          elevation={0}
                          style={{
                            background: 'transparent',
                            borderBottom:
                              '1px solid var(--background-muted)',
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Grid
                              alignItems="center"
                              container
                              justifyContent="space-between"
                              spacing={1}
                            >
                              <Typography variant="overline">
                                {group}
                              </Typography>
                              {num > 0 && (
                                <Box
                                  alignItems="center"
                                  display="flex"
                                  bgcolor="secondary.main"
                                  color="secondary.contrastText"
                                  justifyContent="center"
                                  fontSize="0.833rem"
                                  height={22}
                                  width={22}
                                  borderRadius={500}
                                  style={{
                                    fontWeight: 'bold',
                                    transform: 'scale(.8)',
                                  }}
                                >
                                  {num}
                                </Box>
                              )}
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails style={{}}>
                            <Grid
                              container
                              spacing={0}
                              style={{
                                overflow: 'auto',
                                maxHeight: 250,
                              }}
                            >
                              {map(fields, (field) => (
                                <Builders.Field
                                  xl={12}
                                  lg={12}
                                  key={field.name}
                                  stopTeardown
                                  label={t(
                                    field.name.replace(
                                      `${name}__`,
                                      '',
                                    ),
                                  )}
                                  {...field}
                                />
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Collapse>
                    </Grid>
                  ) : null;
                }),
                'key',
              )}

              <Actions data={data} />
            </>
          );
        }}
      </Builders.Form>
    </Box>
  );
};

Filters.defaultProps = {
  data: {
    createdAt: {
      type: 'Date',
    },
    updatedAt: {
      type: 'Date',
    },
  },
};

Filters.propTypes = {
  collectionName: PropTypes.string.isRequired,
  // eslint-disable-next-line
  data: PropTypes.object,
};

export default Filters;
