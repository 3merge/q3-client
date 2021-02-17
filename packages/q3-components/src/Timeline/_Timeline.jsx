import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import useStyle from './useStyle';

const isBase = (target) => target === 'baseSchema';

const formatPrevCurrDescription = ({ prev, curr }) =>
  prev
    ? `changed from "${prev}" to "${curr}"`
    : `set to "${curr}"`;

const formatNestedProperty = (target, name) =>
  name && name.includes('%2E') && !isBase(target)
    ? name.replace(target, '').replace(/(%2E)\d+(%2E)/, '')
    : name;

const getColor = (op) => {
  switch (op) {
    case 'Create':
      return 'green';
    case 'Delete':
      return 'red';
    case 'Update':
      return 'purple';
    default:
      return 'blue';
  }
};

const getUser = (modifiedBy) => {
  if (!modifiedBy) return 'Untracked user';
  return `${modifiedBy.firstName} ${modifiedBy.lastName}`;
};

export const TimelineListItemWrapper = ({
  children,
  op,
}) => {
  const { item } = useStyle({ color: getColor(op) });

  return (
    <Box component="li" className={item}>
      <div>{children}</div>
    </Box>
  );
};

const getDescription = (op, resource, t) => {
  if (isBase(resource))
    return `${op.toLowerCase()}d the document`;

  if (op === 'Delete')
    return `remove an entry from ${t(resource)}`;
  if (op === 'Create') return `added to ${t(resource)}`;
  return `updated entries in ${t(resource)}`;
};

const TimelineListItem = ({
  description,
  modifiedOn,
  modifiedBy,
  modified,
  target,
  op,
}) => {
  const { t } = useTranslation('labels');
  return op ? (
    <TimelineListItemWrapper op={op}>
      <Grid container spacing={1}>
        <Grid item>
          <Typography style={{ margin: 0 }}>
            {`${getUser(modifiedBy)} ${getDescription(
              op,
              target,
              t,
            )} on ${moment(modifiedOn).format('LLLL')}`}
          </Typography>
          <Typography component="ul">
            {Object.entries(modified).map(
              ([key, value]) => (
                <li key={key}>
                  <strong>
                    <u>
                      {t(formatNestedProperty(target, key))}
                    </u>
                  </strong>{' '}
                  {formatPrevCurrDescription(value)}
                </li>
              ),
            )}
          </Typography>
        </Grid>
      </Grid>
    </TimelineListItemWrapper>
  ) : null;
};

export const TimelineSkeleton = (props) => (
  <TimelineListItemWrapper {...props}>
    <Skeleton
      variant="rect"
      height={45}
      width="100%"
      style={{ marginBottom: '0.5rem' }}
    />
    <Skeleton variant="rect" height={85} width="100%" />
  </TimelineListItemWrapper>
);

export default ({ entries, fetching }) => {
  const { root } = useStyle();
  return (
    <Box className={root} component="ul">
      {fetching
        ? null
        : entries.map(({ ref: id, ...etc }) => (
            <TimelineListItem key={id} {...etc} />
          ))}
    </Box>
  );
};
