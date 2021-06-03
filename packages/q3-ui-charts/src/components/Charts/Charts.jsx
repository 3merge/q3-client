import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
  Hidden,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import Bar from '../Bar';
import Line from '../Line';
import Table from '../Table';

const BAR = 'Bar';
const LINE = 'Line';
const TABLE = 'Table';

const Charts = ({ initialChartType, ...rest }) => {
  const { t } = useTranslation('labels');
  const [state, setState] = React.useState(
    initialChartType,
  );

  const El =
    {
      Bar,
      Line,
      Table,
    }[state] || initialChartType;

  const renderChartTypeButton = (type, Icon) => {
    const changeChartType = () => {
      setState(type);
    };

    return (
      <Button
        style={{ padding: '.5rem 1rem' }}
        color={state === type ? 'secondary' : undefined}
        onClick={changeChartType}
      >
        <Hidden smDown>
          <Box
            component="span"
            style={{ marginRight: '.25rem' }}
          >
            {t(type)}
          </Box>
        </Hidden>
        <Icon />
      </Button>
    );
  };

  return (
    <El {...rest}>
      <Box mr={1}>
        <ButtonGroup
          variant="text"
          aria-label="display-options"
        >
          {renderChartTypeButton(LINE, ShowChartIcon)}
          {renderChartTypeButton(BAR, BarChartIcon)}
          {renderChartTypeButton(TABLE, TableChartIcon)}
        </ButtonGroup>
      </Box>
    </El>
  );
};

Charts.defaultProps = {
  initialChartType: LINE,
};

Charts.propTypes = {
  initialChartType: PropTypes.oneOf([BAR, LINE, TABLE]),
};

export default Charts;
