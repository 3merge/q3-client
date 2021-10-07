import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const FreshbooksEmbed = ({ id }) => (
  <Helmet>
    <script>
      {`window.fwSettings={
'widget_id':${id}
};
!function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()`}
    </script>
    <script
      type="text/javascript"
      src={`https://widget.freshworks.com/widgets/${id}.js`}
      async
      defer
    />
    <style type="text/css">
      {'#launcher-frame { display: none; }'}
    </style>
  </Helmet>
);

FreshbooksEmbed.defaultProps = {
  id: 70000001065,
};

FreshbooksEmbed.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default FreshbooksEmbed;
