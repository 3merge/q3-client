import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ListMui from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchBar from '../searchBar';
import ListSubHeader from '../listSubHeader';
import Empty from '../empty';
import { hasLength } from '../../utils';

const List = ({
  title,
  enableSearch,
  children,
  onCreate,
}) => {
  const { t } = useTranslation('labels');

  const hasChildren =
    (children && !Array.isArray(children)) ||
    hasLength(children);

  return (
    <SearchBar>
      {(renderer) => (
        <ListMui
          aria-labelledby={title}
          subheader={
            <ListSubHeader title={title}>
              {enableSearch && hasChildren
                ? renderer()
                : null}
            </ListSubHeader>
          }
        >
          {hasChildren ? (
            <>
              {children}
              {onCreate && (
                <Box mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onCreate}
                  >
                    {t('addToList')}
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Empty onClick={onCreate} />
          )}
        </ListMui>
      )}
    </SearchBar>
  );
};

List.propTypes = {
  /*
   * An array of ListItem components
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node, PropTypes.object]),
    PropTypes.node,
    PropTypes.object,
  ]),

  /**
   * A semantic title for the list
   */
  title: PropTypes.string,

  /**
   * Enable result text filtering.
   */
  enableSearch: PropTypes.bool,

  /**
   * Will populate the empty view with button.
   */
  onCreate: PropTypes.func,
};

List.defaultProps = {
  title: null,
  enableSearch: true,
  children: null,
  onCreate: null,
};

export default List;
