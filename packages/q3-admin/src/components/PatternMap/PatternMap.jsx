import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'pigeon-maps';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { size, get } from 'lodash';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { connect } from '../../containers';
import useGoogleMapLink from '../../hooks/useGoogleMapLink';
import usePositionStack from '../../hooks/usePositionStack';
import Pattern from '../Pattern';
import useStyle from './styles';

const PatternMap = ({ data, field, size: patternSize }) => {
  const address = get(data, field, data);
  const coordinates = usePositionStack(address);
  const href = useGoogleMapLink(address);
  const cls = useStyle();

  return size(coordinates) > 0 ? (
    <Pattern
      action={
        <IconButton
          aria="google maps"
          color="inherit"
          component="a"
          href={href}
          rel="noreferrer"
          target="_blank"
          size="small"
        >
          <AspectRatioIcon />
        </IconButton>
      }
      title="map"
      size={patternSize}
    >
      <Box
        position="absolute"
        height={350}
        top={0}
        left={0}
        bottom={0}
        right={0}
        overflow="hidden"
      >
        <Map
          height={350}
          defaultCenter={coordinates}
          defaultZoom={15}
          attribution={false}
        >
          <Marker anchor={coordinates}>
            <div className={cls.heat} />
          </Marker>
        </Map>
      </Box>
      <Box height={350} width="100%" />
    </Pattern>
  ) : null;
};

PatternMap.defaultProps = {
  data: {},
  field: undefined,
  size: 'md',
};

PatternMap.propTypes = {
  data: PropTypes.shape({}),
  field: PropTypes.string,
  size: PropTypes.string,
};

export default connect(PatternMap);
