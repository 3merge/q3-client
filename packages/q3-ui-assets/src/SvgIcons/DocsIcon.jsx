import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import get from 'lodash.get';

export default () => {
  const theme = useTheme();

  return (
    <svg viewBox="0 0 512 512" xmlSpace="preserve">
      <circle
        cx="256"
        cy="256"
        r="256"
        fill={get(theme, 'palette.background.default')}
      />
      <path
        fill="var(--background-muted)"
        d="M275.787 511.245c110.132-8.418 200.761-86.526 227.895-190.311L361.625 178.878l-134.416 96.599 45.47 45.47-116.533 70.658 119.641 119.64z"
      />
      <path
        fill={get(theme, 'palette.secondary.main')}
        d="M296.439 113.693H171.613c-11.729 0-21.237 9.509-21.237 21.237v242.14c0 11.729 9.509 21.237 21.237 21.237h168.774c11.729 0 21.237-9.509 21.237-21.237V178.878l-65.185-65.185z"
      />
      <g fill="#FFF">
        <path d="M184.785 237.416H326.019V247.677H184.785z" />
        <path d="M184.785 262.775H326.019V273.036H184.785z" />
        <path d="M184.785 291.306H326.019V301.567H184.785z" />
        <path d="M184.785 317.871H258.42V328.132H184.785z" />
      </g>
      <path
        fill={get(theme, 'palette.secondary.dark')}
        d="M317.676 178.878h43.948l-65.184-65.184v43.948c-.001 11.728 9.507 21.236 21.236 21.236z"
      />
    </svg>
  );
};
