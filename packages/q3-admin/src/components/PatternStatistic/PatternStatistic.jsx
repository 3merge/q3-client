import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { string } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import { isObject, isString } from 'lodash';
import { Box } from '@material-ui/core';
import Pattern from '../Pattern';
import { useReportById } from '../../hooks';
import useStyle from './styles';

export const PatternStatistic = ({ report, size }) => {
  const { data, error, loading } = useReportById(report);
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const renderStat = (stat) => {
    if (!isObject(stat)) return null;

    const { deviation, label, unit, value } = stat;

    const isUnit = (xs) => unit === xs;

    const countDecimals = (v) => {
      if (Math.floor(v) === v) return 0;
      return (
        Number(v).toString().split('.')[1]?.length || 0
      );
    };

    const getClassName = () => {
      if (deviation > 0) return 'positive';
      if (deviation < 0) return 'negative';
      return 'hidden';
    };

    const renderValue = () => {
      if (!isObject(stat)) return 0;

      if (isUnit('percent')) return string.toPercent(value);
      if (isUnit('dollar')) return string.toPrice(value);
      if (isString(unit))
        return (
          <>
            {string.formatNumber(
              value,
              Math.min(countDecimals(value), 2),
            )}
            <span className={cls.unit}> {unit}</span>
          </>
        );

      return string.formatNumber(value);
    };

    return (
      <Pattern
        error={error}
        loading={loading}
        size={size}
        title={label}
      >
        <Box px={1.5}>
          <Box className={classnames(cls.value, 'stat')}>
            {renderValue()}
          </Box>
          <Box
            className={classnames(
              cls.deviation,
              getClassName(deviation),
            )}
          >
            {string.toPercent(deviation)} {t('change')}
          </Box>
        </Box>
      </Pattern>
    );
  };

  return Array.isArray(data)
    ? data.map(renderStat)
    : renderStat(data);
};

PatternStatistic.defaultProps = {
  ChartProps: {},
  title: undefined,
  size: 'xs',
};

PatternStatistic.propTypes = {
  ChartProps: PropTypes.shape({}),
  report: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
};

export default PatternStatistic;
