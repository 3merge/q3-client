import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import useStyle from './useStyle';

const FilterListBreadcrumbs = ({
  files,
  setState,
  state,
}) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const { path = [] } = state;

  const handleDirectoryChange = (ind) => () => {
    const up = path.slice(0, ind + 1);

    return setState({
      data: get(files, up, {}),
      path: up,
    });
  };

  const handleDirectoryReset = () =>
    setState({
      data: files,
      path: [],
    });

  return (
    <Breadcrumbs aria-label={t('fileManagerBreadcrumbs')}>
      <Button
        component={Link}
        color="inherit"
        disabled={!path.length}
        onClick={handleDirectoryReset}
        className={cls.link}
      >
        {t('fileManager')}
      </Button>
      {path.map((item, i) => (
        <Button
          color="inherit"
          component={Link}
          disabled={i === path.length - 1}
          onClick={handleDirectoryChange(i)}
          className={cls.link}
          key={i}
        >
          {t(item)}
        </Button>
      ))}
    </Breadcrumbs>
  );
};

FilterListBreadcrumbs.propTypes = {
  files: PropTypes.shape({
    default: PropTypes.arrayOf(PropTypes.object),
  }),
  setState: PropTypes.func.isRequired,
  state: PropTypes.shape({
    data: PropTypes.shape({
      default: PropTypes.arrayOf(PropTypes.object),
    }),
    path: PropTypes.arrayOf(PropTypes.string),
  }),
};

FilterListBreadcrumbs.defaultProps = {
  files: {
    default: [],
  },
  state: {
    data: {
      default: [],
    },
    path: [],
  },
};

export default FilterListBreadcrumbs;
