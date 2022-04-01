import React from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Grid, Link } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import CategoryIcon from '@material-ui/icons/Category';
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
      {map(sortBy(options, 'href'), (option) => (
        <Grid
          item
          className={cls.listItem}
          component="li"
          key={option.title}
        >
          {option.href ? (
            <Link
              role="button"
              title={t(option.title)}
              className={cls.chip}
              onClick={() => {
                navigate(option.href);
              }}
            >
              <LinkIcon /> {t(option.description)}
            </Link>
          ) : (
            <Link
              disabled
              title={t(option.title)}
              className={cls.chip}
            >
              <CategoryIcon />
              {t(option.description)}
            </Link>
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
