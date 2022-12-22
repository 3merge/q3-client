import React from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { includes } from 'lodash';
import useMotionCapture from '../useMotionCapture';
import useDocumentBoundaryDetection from '../useDocumentBoundaryDetection';
import useStyle from './styles';

// eslint-disable-next-line
const SvgBoundary = ({ stream }) => {
  const [frame, setFrame] = React.useState();
  const theme = useTheme();
  const { t } = useTranslation();
  const cls = useStyle();

  const { canvasElement, detect } =
    useDocumentBoundaryDetection(stream);

  const isMoving = useMotionCapture(stream, {
    onCaptureReady() {
      try {
        setFrame(detect());
      } catch (e) {
        // noop
      }
    },
  });

  return isMoving ? (
    <Box className={cls.caption}>
      {t('descriptions:holdStill')}
    </Box>
  ) : (
    <>
      <canvas
        ref={canvasElement}
        title={t('labels:boundaryDetection')}
      />
      {!includes(frame?.coordinates, 'NaN') ? (
        <svg
          {...frame}
          className={cls.svg}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <polygon
            fill="transparent"
            points={frame?.coordinates}
            stroke={theme?.palette?.secondary?.light}
            strokeDasharray="4 1"
            strokeWidth="0.5"
          />
        </svg>
      ) : null}
    </>
  );
};

export default SvgBoundary;
