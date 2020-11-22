import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Tooltip from 'q3-ui/lib/tooltip';
import { array } from 'q3-ui-helpers';
import useStyle from './useStyle';

const Horizontal = ({ items }) => {
  const { t } = useTranslation('labels');

  const [step, setStep] = React.useState(0);
  const cls = useStyle();

  const handleChange = (e, tabIndex) => setStep(tabIndex);

  const renderItem = () => {
    const El = items[step]?.renderer;
    return El ? <El /> : null;
  };

  return array.hasLength(items) ? (
    <>
      <Paper elevation={0} className={cls.root}>
        <BottomNavigation
          value={step}
          onChange={handleChange}
        >
          {items.map((item, i) => (
            <Tooltip title={t(item.label)} key={i}>
              <BottomNavigationAction
                className={classnames([
                  'q3-tabs-item',
                  cls.item,
                ])}
                icon={<item.icon />}
                value={i}
              />
            </Tooltip>
          ))}
        </BottomNavigation>
      </Paper>
      {renderItem()}
    </>
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
