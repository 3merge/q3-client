import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Grid, Tooltip, Chip } from '@material-ui/core';
import { useDetailRegisterFunction } from '../../hooks';
import useStyle from './styles';

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const options =
    useDetailRegisterFunction(registerOptions);

  const navigate = useNavigate();

  return (
    <Grid
      container
      component="ul"
      className={cls.list}
      spacing={1}
    >
      {map(options, (option) => (
        <Grid
          item
          className={cls.listItem}
          component="li"
          key={option.title}
        >
          <Tooltip arrow title={t(option.title)}>
            {option.href ? (
              <Chip
                className={cls.chip}
                label={t(option.description)}
                onClick={() => {
                  navigate(option.href);
                }}
              />
            ) : (
              <Chip
                className={cls.chip}
                label={t(option.description)}
              />
            )}
          </Tooltip>
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
