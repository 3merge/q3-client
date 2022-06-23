import React from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Grid, Chip } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useDetailRegisterFunction } from '../../hooks';
import useStyle from './styles';

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const options =
    useDetailRegisterFunction(registerOptions);

  const navigate = useNavigate();
  const renderLabel = (option) => (
    <span>
      <strong>{t(option.title)}</strong>{' '}
      {t(option.description)}
    </span>
  );

  return (
    <Grid
      container
      component="ul"
      className={cls.list}
      spacing={1}
    >
      {map(sortBy(options, 'href'), (option) => (
        <Grid
          item
          className={cls.listItem}
          component="li"
          key={option.title}
        >
          {option.href ? (
            <Chip
              className={cls.chip}
              label={renderLabel(option)}
              icon={<CallMadeIcon />}
              onClick={() => {
                navigate(option.href);
              }}
              variant="outlined"
              color="secondary"
              size="small"
            />
          ) : (
            <Chip
              className={cls.chip}
              label={renderLabel(option)}
              variant="outlined"
              color="secondary"
              size="small"
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
