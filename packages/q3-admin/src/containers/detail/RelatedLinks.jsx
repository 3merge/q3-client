import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { object } from 'q3-ui-helpers';
import useStyle from './useStyle';
import RelatedLinksResolver from './RelatedLinksResolver';

const RelatedLinks = ({ children, links }) => {
  const cls = useStyle();

  return object.isFn(links) ? (
    <Grid container justify="space-between">
      <Grid item className={cls.fill}>
        {children}
      </Grid>
      <Grid
        id="q3-related-links"
        item
        className={cls.column}
      >
        <RelatedLinksResolver fn={links} />
      </Grid>
    </Grid>
  ) : (
    children
  );
};

RelatedLinks.propTypes = {
  children: PropTypes.node.isRequired,
  links: PropTypes.func,
};

RelatedLinks.defaultProps = {
  links: null,
};

export default RelatedLinks;
