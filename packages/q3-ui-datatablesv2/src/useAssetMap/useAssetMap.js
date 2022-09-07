import React from 'react';
import { get } from 'lodash';
import * as colors from '@material-ui/core/colors';
import * as icons from '@material-ui/icons';

const useAssetMap = ({ colorMap, iconMap }) => {
  const getColor = React.useCallback(
    (namespace) =>
      get(
        colors,
        `${get(
          {
            false: 'red',
            true: 'green',
            ...colorMap,
          },
          namespace,
        )}.500`,
      ),
    [colorMap],
  );

  const getIcon = React.useCallback(
    (iconName) => get(icons, get(iconMap, iconName)),
    [iconMap],
  );

  return {
    getColor,
    getIcon,
  };
};

export default useAssetMap;
