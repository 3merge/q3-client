import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tile from 'q3-ui/lib/tile';
import Repeater from 'q3-ui-repeater';
import { Definitions, Dispatcher } from '../state';

const SubDetail = ({
  root,
  decorators,
  children,
  runPoll,
  renderTop,
  renderBottom,
  TileProps,
  ...rest
}) => {
  const { poll } = React.useContext(Dispatcher);
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const subdocumentState = useRest({
    key: root,
    pluralized: root,
    runOnInit: true,
    url: `/${collectionName}/${id}/${root}`,
    decorators,
    poll,
  });

  return subdocumentState.fetching ? (
    <Box align="center" pb={2}>
      <CircularProgress />
    </Box>
  ) : (
    <Tile
      title={root}
      subtitle={root}
      {...TileProps}
      divider
    >
      {renderTop}
      <Repeater
        name={root}
        collectionName={collectionName}
        data={subdocumentState[root]}
        edit={subdocumentState.patch}
        editBulk={subdocumentState.patchBulk}
        create={subdocumentState.post}
        remove={subdocumentState.remove}
        removeBulk={subdocumentState.removeBulk}
        {...subdocumentState}
        {...rest}
      >
        {children}
      </Repeater>
      {renderBottom}
    </Tile>
  );
};

SubDetail.propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.string.isRequired,
  decorators: PropTypes.shape({
    get: PropTypes.func,
    post: PropTypes.func,
    patch: PropTypes.func,
    put: PropTypes.func,
    remove: PropTypes.func,
  }),
  runPoll: PropTypes.bool,
};

SubDetail.defaultProps = {
  decorators: {},
  runPoll: false,
};

export default React.memo(SubDetail);
