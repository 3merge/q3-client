import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Tooltip from 'q3-ui/lib/tooltip';
import { array } from 'q3-ui-helpers';
import Grid from '@material-ui/core/Grid';

const Horizontal = ({ items }) => {
  const { t } = useTranslation('labels');

  const [step, setStep] = React.useState(0);

  const handleChange = (e, tabIndex) => setStep(tabIndex);

  const renderItem = () => {
    const El = items[step]?.renderer;
    return El ? <El /> : null;
  };

  return array.hasLength(items) ? (
    <Grid
      container
      spacing={1}
      style={{ marginTop: '2rem' }}
    >
      <Grid item>
        <Paper elevation={0}>
          <BottomNavigation
            value={step}
            onChange={handleChange}
            style={{
              flexDirection: 'column',
              height: 'auto',
              borderRight: '2px solid',
            }}
          >
            {items.map((item, i) => (
              <Tooltip title={t(item.label)} key={i}>
                <BottomNavigationAction
                  className={classnames(['q3-tabs-item'])}
                  icon={<item.icon />}
                  value={i}
                />
              </Tooltip>
            ))}
          </BottomNavigation>
        </Paper>
      </Grid>
      <Grid item>{renderItem()}</Grid>
    </Grid>
  ) : null;
};

Horizontal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string,
      renderer: PropTypes.node,
    }),
  ),
};

Horizontal.defaultProps = {
  items: [],
};

export default Horizontal;
