import React from 'react';
import PropTypes from 'prop-types';
import { map, sortBy, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Chip } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useRegisterActions } from '../../hooks';
import useStyle from './styles';

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const options = sortBy(
    useRegisterActions(registerOptions),
    'href',
  ).reverse();
  const navigate = useNavigate();

  const renderLabel = (option) => (
    <span>
      <strong>{t(option.title)}</strong>{' '}
      {t(option.description)}
    </span>
  );

  return size(options) ? (
    <ul className={cls.list}>
      {map(options, (option) => {
        const label = renderLabel(option);
        const handleClick = () => {
          navigate(option.href);
        };

        return (
          <li
            key={option.title}
            title={t(option.description)}
          >
            {option.href ? (
              <Chip
                className={cls.chip}
                label={label}
                deleteIcon={<CallMadeIcon />}
                onDelete={handleClick}
                onClick={handleClick}
                variant="outlined"
              />
            ) : (
              <Chip
                className={cls.chip}
                label={label}
                variant="outlined"
              />
            )}
          </li>
        );
      })}
    </ul>
  ) : null;
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
