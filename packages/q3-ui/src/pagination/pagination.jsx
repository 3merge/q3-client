import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyle = makeStyles((theme) => ({
  matchHeight: {
    height: '100%',
  },
  order: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  card: {
    '&.Mui-disabled': {
      backgroundColor: grey[100],
      color: `${grey[900]} !important`,
    },
  },
}));

export const PaginationTypography = ({
  label,
  description,
  align,
}) => (
  <Box display="inline-block" ml={1} textAlign={align}>
    <Typography variant="overline">{label}</Typography>
    <Typography variant="body2" component="p">
      {description}
    </Typography>
  </Box>
);

export const PaginationCard = ({
  children,
  onClick,
  ...etc
}) => {
  const { card } = useStyle();

  return (
    <Card style={{ height: '100%' }}>
      <CardActionArea
        className={card}
        style={{ height: '100%' }}
        onClick={onClick}
        {...etc}
      >
        <Box p={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {children}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

PaginationCard.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

PaginationTypography.defaultProps = {
  align: 'left',
};

PaginationTypography.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  align: PropTypes.string,
};

const Pagination = ({
  onPrev,
  prevDescription,
  prevProps,
  onNext,
  nextDescription,
  nextProps,
  children,
}) => {
  const { t } = useTranslation('labels');
  const { order } = useStyle();

  return (
    <Box mt={2}>
      <Grid container spacing={1} className={order}>
        {onPrev && prevDescription ? (
          <Grid item sm={6} xs={12}>
            <PaginationCard onClick={onPrev} {...prevProps}>
              <KeyboardArrowLeft />
              <PaginationTypography
                align="right"
                label={t('previous')}
                description={prevDescription}
              />
            </PaginationCard>
          </Grid>
        ) : null}
        {onNext && nextDescription ? (
          <Grid item sm={6} xs={12}>
            <PaginationCard onClick={onNext} {...nextProps}>
              <PaginationTypography
                label={t('next')}
                description={nextDescription}
              />
              <KeyboardArrowRight />
            </PaginationCard>
          </Grid>
        ) : null}
        {children}
      </Grid>
    </Box>
  );
};

Pagination.propTypes = {
  onPrev: PropTypes.func,
  prevDescription: PropTypes.string,
  // eslint-disable-next-line
  prevProps: PropTypes.object,
  onNext: PropTypes.func,
  nextDescription: PropTypes.string,
  // eslint-disable-next-line
  nextProps: PropTypes.object,
  children: PropTypes.node,
};

Pagination.defaultProps = {
  onPrev: null,
  onNext: null,
  nextDescription: '',
  prevDescription: '',
  children: null,
};

export default Pagination;
