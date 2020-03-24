import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import get from 'lodash.get';

export default (props) => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 930 796"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1="476.5"
          x2="476.5"
          y1="796"
          y2="356"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="gray"
            stopOpacity="0.25"
          />
          <stop
            offset="0.54"
            stopColor="gray"
            stopOpacity="0.12"
          />
          <stop
            offset="1"
            stopColor="gray"
            stopOpacity="0.1"
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1="233"
          x2="233"
          y1="468"
          y2="390"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#b3b3b3"
            stopOpacity="0.25"
          />
          <stop
            offset="0.54"
            stopColor="#b3b3b3"
            stopOpacity="0.1"
          />
          <stop
            offset="1"
            stopColor="#b3b3b3"
            stopOpacity="0.05"
          />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeDasharray="0 23"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M692 362s28-104-28-211"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M300.59 350.5L300.59 350.5"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeDasharray="0 23.61"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M308.1 328.14c9.88-40.36 12.83-124.5-117.66-160.22"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M179 165L179 165"
      />
      <path fill="url(#a)" d="M71 356H882V796H71z" />
      <path fill="#fff" d="M78 362H876V784.5H78z" />
      <circle cx="233" cy="429" r="39" fill="url(#b)" />
      <circle
        cx="233"
        cy="429"
        r="35"
        fill={get(theme, 'palette.primary.main')}
      />
      <path fill="#bdbdbd" d="M313 416H510V436H313z" />
      <path
        fill="#e0e0e0"
        d="M232.5 545.5H724.5V565.5H232.5z"
      />
      <path
        fill="#e0e0e0"
        d="M232.5 501.5H724.5V521.5H232.5z"
      />
      <path
        fill="#e0e0e0"
        d="M232.5 589.5H724.5V609.5H232.5z"
      />
      <path
        fill="#e0e0e0"
        d="M232.5 633.5H724.5V653.5H232.5z"
      />
      <path
        fill="#e0e0e0"
        d="M232.5 677.5H724.5V697.5H232.5z"
      />
      <path
        fill="#e0e0e0"
        d="M232.5 721.5H724.5V741.5H232.5z"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M153.33 355.5L153.33 355.5"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeDasharray="0 22.87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M155.59 332.75c.76-21.62-1.88-53.94-20.78-75.41"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M126.5 249.5L126.5 249.5"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M605.33 364.5L605.33 364.5"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeDasharray="0 22.87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M607.59 341.75c.76-21.62-1.88-53.94-20.78-75.41"
      />
      <path
        fill="none"
        stroke="#e0e0e0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M578.5 258.5L578.5 258.5"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M797.67 355.5L797.67 355.5"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeDasharray="0 22.87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M795.41 332.75c-.76-21.62 1.88-53.94 20.78-75.41"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M824.5 249.5L824.5 249.5"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M0 114.78H111V175.21H0z"
        opacity="0.7"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M608 73.78H719V134.21H608z"
        opacity="0.7"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M513 181.78H624V242.21H513z"
        opacity="0.7"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M83 127.58H263.78V225.99H83z"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M749.22 132.58H930V230.99H749.22z"
      />
      <path
        fill={get(theme, 'palette.primary.main')}
        d="M339.71 0H520.49V98.41H339.71z"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M414 354.5L414 354.5"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeDasharray="0 24.01"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M422.82 332.21c6.13-21.36 10.12-55.49-9.32-90.72-24-43.51-2.42-85.9 9.85-104.36"
      />
      <path
        fill="none"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        d="M430.5 127.5L430.5 127.5"
      />
    </svg>
  );
};
