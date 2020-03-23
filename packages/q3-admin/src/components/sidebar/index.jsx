import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import DateRange from '@material-ui/icons/DateRange';
import useStyle from './useStyle';
import Option from './option';
import SidebarTabs from './tabs';
import 'react-json-pretty/themes/acai.css';

const Sidebar = ({
  children,
  createdBy,
  lastUpdated,
  ...rest
}) => {
  const { t } = useTranslation();
  const [height, setHeight] = React.useState();
  const { columnWidth } = useStyle({ height });

  React.useEffect(() => {
    function calculateHeight() {
      let headerHeight = 0;
      let articleHeight = 0;

      const viewportWidth = window.innerWidth;
      const header = document.querySelector('header');
      const article = document.querySelector(
        '#detail-article',
      );

      if (header) headerHeight = header.clientHeight;
      if (article)
        articleHeight = Number(
          window
            .getComputedStyle(article)
            .getPropertyValue('padding')
            .replace('px', ''),
        );

      setHeight(
        viewportWidth > 1279
          ? `calc(100vh - ${headerHeight +
              articleHeight}px)`
          : 'auto',
      );
    }

    window.addEventListener('resize', calculateHeight);
    calculateHeight();

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <Grid item className={columnWidth}>
      <SidebarTabs {...rest}>
        <Option
          title={t('labels:creator')}
          description={createdBy || 'N/A'}
          icon={AccountBox}
        />
        <Option
          icon={DateRange}
          title={t('labels:lastUpdated')}
          description={
            lastUpdated
              ? moment(lastUpdated).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )
              : 'N/A'
          }
        />
        {children}
      </SidebarTabs>
    </Grid>
  );
};

Sidebar.propTypes = {
  /**
   * Displays in the first tab, underneath the standard meta information.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,

  /**
   * Ideally, a first and last name of the user who created the resource.
   */
  createdBy: PropTypes.string,

  /**
   * Date object representating last update date.
   */
  lastUpdated: PropTypes.string,
};

Sidebar.defaultProps = {
  createdBy: null,
  lastUpdated: null,
};

export default Sidebar;
