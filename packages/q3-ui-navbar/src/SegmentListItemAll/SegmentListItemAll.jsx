import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';
import { Link } from '@reach/router';
import { some } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { usePartialMatch } from '../useToggleWithLocationDefaults/useToggleWithLocationDefaults';
import useStyle from '../SegmentListItemLink/styles';

const SegmentList = ({ segments, to }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle({
    applied:
      usePartialMatch(to) && !some(segments, 'applied'),
  });

  return (
    <ListItem
      button
      disableRipple
      className={cls.link}
      component={Link}
      to={to}
      style={{
        // just on this first link
        paddingTop: '1rem',
      }}
    >
      {t('all')}
    </ListItem>
  );
};

SegmentList.defaultProps = {
  segments: [],
  to: '/',
};

SegmentList.propTypes = {
  to: PropTypes.string,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default SegmentList;
