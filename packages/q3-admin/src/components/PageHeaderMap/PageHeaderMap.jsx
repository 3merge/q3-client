import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'pigeon-maps';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import {
  compact,
  first,
  size,
  omit,
  isString,
  isObject,
} from 'lodash';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import useStyle from './styles';

const printValues = (xs) => {
  let output = [];

  if (Array.isArray(xs)) output = xs;
  if (isObject(xs)) output = Object.values(xs);
  return compact(output).join(' ');
};

const usePositionStack = (addressObj) => {
  const [coordinates, setCoordinates] = React.useState([]);

  const getCoordinatePair = (query) =>
    query && isString(query)
      ? fetch(
          `https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2&q=${encodeURIComponent(
            query,
          )}`,
        )
          .then((resp) => resp.json())
          .then((data) => {
            const match = first(data);
            return [Number(match.lat), Number(match.lon)];
          })
          .catch(() => [])
      : Promise.resolve([]);

  const attempt = (format) => {
    let query = [];

    if (format === 'full')
      query = Object.values(omit(addressObj, ['name']));
    else if (format === 'truncated')
      query = Object.values(
        omit(addressObj, ['name', 'streetLine2', 'postal']),
      );
    else if (format === 'simple')
      query = Object.values(
        omit(addressObj, [
          'name',
          'streetNumber',
          'streetLine2',
          'postal',
        ]),
      );

    return getCoordinatePair(printValues(query));
  };

  const reattempt = (format) => (xs) =>
    size(xs) ? xs : attempt(format);

  React.useEffect(() => {
    attempt('full')
      .then(reattempt('truncated'))
      .then(reattempt('simple'))
      .then(setCoordinates);
  }, [addressObj]);

  return coordinates;
};

const PageHeaderMap = ({ address }) => {
  const coordinates = usePositionStack(address);
  const cls = useStyle();

  return size(coordinates) > 0 ? (
    <Fade in>
      <Box
        color="secondary.main"
        position="relative"
        height={300}
      >
        <Map
          height={300}
          defaultCenter={coordinates}
          defaultZoom={15}
          attribution={false}
        >
          <Marker anchor={coordinates}>
            <div className={cls.heat} />
          </Marker>
        </Map>
        <Box
          position="absolute"
          top={0}
          right={0}
          zIndex="1"
          p={0.5}
        >
          <IconButton
            aria="google maps"
            color="inherit"
            component="a"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              printValues(address),
            )}`}
            rel="noreferrer"
            target="_blank"
          >
            <AspectRatioIcon />
          </IconButton>
        </Box>
      </Box>
    </Fade>
  ) : null;
};

PageHeaderMap.defaultProps = {};

PageHeaderMap.propTypes = {
  address: PropTypes.string.isRequired,
};

export default PageHeaderMap;
