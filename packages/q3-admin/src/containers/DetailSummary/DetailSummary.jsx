import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hidden } from '@material-ui/core';
import ReactDOM from 'react-dom';
import WidgetsIcon from '@material-ui/icons/Widgets';
import { browser } from 'q3-ui-helpers';
import Widget from '../../components/Widget';
import { ArticleAsideContext } from '../../components/ArticleAside/ArticleAside';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import ArticleAsideHeader from '../../components/ArticleAsideHeader';
import useArticleAsideAction from '../../hooks/useArticleAsideAction';

export const DetailSummaryPortal = (props) => {
  const [anchor, setAnchor] = React.useState(null);

  React.useEffect(() => {
    if (browser.isBrowserReady())
      setAnchor(
        document.getElementById('q3-actions-portal'),
      );
  }, []);

  return (
    <Box>
      {anchor
        ? ReactDOM.createPortal(
            <ButtonWithIcon
              icon={WidgetsIcon}
              label="summary"
              transparent
              {...props}
            />,
            anchor,
          )
        : null}
    </Box>
  );
};

const DetailSummary = ({ autoOpenSummary, children }) => {
  const { isOn, toggle } = useArticleAsideAction({
    actionId: 'summary',
    autoOpen: autoOpenSummary,
    content: (
      <>
        <ArticleAsideHeader title="summary" />
        {children}
      </>
    ),
  });

  return (
    <>
      <Hidden lgUp>
        <Box mb={1}>
          <Widget title="summary">{children}</Widget>
        </Box>
      </Hidden>
      <Hidden mdDown>
        <DetailSummaryPortal on={isOn} onClick={toggle} />
      </Hidden>
    </>
  );
};

DetailSummary.defaultProps = {
  autoOpenSummary: true,
  children: null,
};

DetailSummary.propTypes = {
  autoOpenSummary: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.object,
  ]),
};

export default DetailSummary;
