import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import get from 'lodash.get';

export default (props) => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 837.99 773.52"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1="510.79"
          x2="510.79"
          y1="662.26"
          y2="179.29"
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
          x1="648.13"
          x2="648.13"
          y1="772.62"
          y2="93.76"
          gradientTransform="rotate(90 641.7 434.57)"
          xlinkHref="#a"
        />
        <linearGradient
          id="c"
          x1="364.83"
          x2="364.83"
          y1="773.52"
          y2="94.66"
          xlinkHref="#a"
        />
        <clipPath
          id="d"
          transform="translate(-147.54 -63.24)"
        >
          <path
            fill="url(#a)"
            d="M243.97 179.29H777.6V662.26H243.97z"
          />
        </clipPath>
        <linearGradient
          id="e"
          x1="551.85"
          x2="551.85"
          y1="711.91"
          y2="333.23"
          xlinkHref="#a"
        />
        <clipPath
          id="f"
          transform="translate(-147.54 -63.24)"
        >
          <path
            fill="#fff"
            d="M247.91 183.23H774.79V652.6899999999999H247.91z"
            data-name="&lt;Rectangle&gt;"
          />
        </clipPath>
      </defs>
      <path
        fill="url(#b)"
        d="M303.64 143.1H982.5V738.91H303.64z"
        transform="rotate(-81.96 532.894 494.31)"
      />
      <path
        fill="#fff"
        d="M318.27 146.18H968.98V728.03H318.27z"
        transform="rotate(-81.96 533.447 490.407)"
      />
      <path
        fill={get(theme, 'palette.primary.light')}
        d="M389.72 127.54H916.6V597H389.72z"
        data-name="&lt;Rectangle&gt;"
        transform="rotate(8.04 1029.376 -718.968)"
      />
      <path
        fill="none"
        stroke={get(theme, 'palette.primary.light')}
        strokeMiterlimit="10"
        strokeWidth="5"
        d="M389.72 127.54H916.6V597H389.72z"
        data-name="&lt;Rectangle&gt;"
        transform="rotate(8.04 1029.376 -718.968)"
      />
      <path
        fill="url(#c)"
        d="M66.92 94.66H662.7299999999999V773.52H66.92z"
      />
      <path
        fill="#fff"
        d="M73.91 104.8H655.76V755.51H73.91z"
      />
      <path
        fill="url(#a)"
        d="M96.43 116.05H630.06V599.02H96.43z"
      />
      <g clipPath="url(#d)">
        <path
          fill="url(#e)"
          d="M358.85 459c17.44 19.24 31.75 43 55 54.18 33.73 16.24 74.78-.11 102.56-25.42s47.25-58.7 73.5-85.66c75.33-77.38 203.3-89.22 297.3-37 13.42 7.45 26.46 16.25 35.94 28.44 12.33 15.86 17.64 36.09 21.61 55.89a585 585 0 0111.07 134.52c-1 30.69-6.84 65.43-32.12 82.25-8 5.31-17.23 8.27-26.39 11-135.88 40.07-280 37.32-421.39 31.3-105.4-4.49-212-10.85-312.67-43-4.63-1.48-9.53-3.21-12.51-7.1-3.37-4.4-3.46-10.48-3-16 1.45-18.27 7-35.91 11.21-53.74a364.51 364.51 0 008.3-113.43c-2.81-33.67-21.67-62.13 17.27-71.55 61.06-14.88 132.24 8.87 174.32 55.32z"
          transform="translate(-147.54 -63.24)"
        />
      </g>
      <path
        fill="#fff"
        d="M100.37 119.99H627.25V589.4499999999999H100.37z"
        data-name="&lt;Rectangle&gt;"
      />
      <g clipPath="url(#f)">
        <path
          fill="#bdbdbd"
          d="M361.33 455.09c17.22 18.7 31.34 41.78 54.31 52.66 33.3 15.78 73.83-.1 101.26-24.71s46.65-57.06 72.57-83.26c74.38-75.21 200.73-86.73 293.53-36 13.25 7.25 26.13 15.8 35.49 27.64 12.18 15.41 17.41 35.08 21.33 54.33a560.08 560.08 0 0110.93 130.75c-1 29.83-6.75 63.6-31.72 80-7.88 5.16-17 8-26.05 10.66-134.16 39-276.48 36.28-416.06 30.42-104.05-4.38-209.33-10.58-308.7-41.79-4.57-1.44-9.41-3.12-12.35-6.9-3.33-4.28-3.42-10.19-3-15.59 1.44-17.76 6.93-34.9 11.07-52.24a349 349 0 008.19-110.26c-2.77-32.72-21.39-60.39 17.05-69.55 60.33-14.37 130.61 8.75 172.15 53.84z"
          transform="translate(-147.54 -63.24)"
        />
      </g>
      <circle
        cx="165.66"
        cy="185.29"
        r="38.28"
        fill="#ff5252"
      />
      <path
        fill={get(theme, 'palette.primary.light')}
        stroke={get(theme, 'palette.primary.light')}
        strokeMiterlimit="10"
        strokeWidth="5"
        d="M448.24 435.22H466.25V573.69H448.24z"
      />
      <path
        fill={get(theme, 'palette.primary.light')}
        stroke={get(theme, 'palette.primary.light')}
        strokeMiterlimit="10"
        strokeWidth="5"
        d="M516.5 429.52L499.44 419.02 514.09 421.63 505.8 394.55 485.74 382.2 503.12 385.8 491.43 347.63 471.88 335.59 488.67 338.59 477.41 301.82 457.51 289.57 474.59 292.62 457.25 235.95 444.71 277.58 457.25 273.1 442.53 284.83 433.43 315.08 457.25 309.13 429.19 329.17 419.41 361.65 444.86 355.29 414.88 376.71 407.32 401.83 426.85 396.94 403.84 413.38 390.82 456.61 524.79 456.61 516.5 429.52z"
      />
      <path
        fill={get(theme, 'palette.primary.light')}
        d="M73.91 671.08H655.76V755.52H73.91z"
      />
    </svg>
  );
};
