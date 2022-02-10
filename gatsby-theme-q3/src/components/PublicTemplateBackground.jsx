import React from 'react';
import { Box, Link, useTheme } from '@material-ui/core';

const PublicTemplateBackground = () => {
  const theme = useTheme();

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left={0}
      bottom={0}
      overflow="hidden"
    >
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        bottom={0}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1523293836414-f04e712e1f3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=703&q=80)',
          opacity: 0.1,
        }}
      />
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        bottom={0}
        style={{
          background: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 35%, ${theme.palette.secondary.main} 100%)`,
          opacity: 0.1,
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: 0.15,
          minHeight: '100vh',
          minWidth: '100vw',
        }}
      >
        <defs>
          <linearGradient
            id="a"
            x1="0"
            x2="0"
            y1="1"
            y2="0"
          >
            <stop
              offset="0"
              stopColor={theme.palette.background.muted}
            />
            <stop
              offset="1"
              stopColor={theme.palette.secondary.dark}
            />
          </linearGradient>
          <linearGradient
            id="b"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0"
              stopColor={theme.palette.secondary.light}
            />
            <stop
              offset="1"
              stopColor={theme.palette.secondary.main}
            />
          </linearGradient>
        </defs>
        <g
          fill={theme.palette.background.muted}
          fillOpacity="0"
          strokeMiterlimit="10"
        >
          <g stroke="url(#a)" strokeWidth="2">
            <path
              transform="translate(0 0)"
              d="M1409 581 1450.35 511 1490 581z"
            />
            <circle
              strokeWidth="4"
              transform="rotate(0 800 450)"
              cx="500"
              cy="100"
              r="40"
            />
            <path
              transform="translate(0 0)"
              d="M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z"
            />
          </g>
          <g stroke="url(#b)" strokeWidth="4">
            <path
              transform="translate(0 0)"
              d="M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z"
            />
            <rect
              strokeWidth="8"
              transform="rotate(0 1089 759)"
              x="1039"
              y="709"
              width="100"
              height="100"
            />
            <path
              transform="rotate(0 1400 132)"
              d="M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z"
            />
          </g>
        </g>
      </svg>
      <Box
        position="fixed"
        bottom="1rem"
        right="1rem"
        zIndex={10}
      >
        <small>
          Texture made with{' '}
          <Link href="https://www.design.svgbackgrounds.com/">
            SVGBackgrounds.com
          </Link>
        </small>
      </Box>
    </Box>
  );
};

export default PublicTemplateBackground;
