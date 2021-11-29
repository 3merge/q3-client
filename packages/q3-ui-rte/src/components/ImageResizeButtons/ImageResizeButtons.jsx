import React from 'react';
import { Box } from '@material-ui/core';
import { invoke, filter } from 'lodash';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
// eslint-disable-next-line
import { useTranslation } from 'q3-ui-locale';
import { FloatIcon } from '../../assets';
import ImageAltTag from '../ImageAltTag';

const FULL = 'ql-full';
const HALF = 'ql-half';
const FLOAT = 'ql-float';

const filterByEquals = (a, b) =>
  filter(a, (xs) => xs !== b);

const ImageResizeButtons = React.forwardRef(
  (props, ref) => {
    const { t } = useTranslation('labels');

    const resetClassList = (keep) => {
      invoke(ref, 'current.style.removeProperty', 'width');
      invoke(
        ref,
        'current.classList.remove',
        ...filterByEquals([FULL, HALF, FLOAT], keep),
      );
    };

    const handleStyleChange = (cls) => () => {
      resetClassList(cls);
      invoke(ref, 'current.classList.toggle', cls);
    };

    const makeFullWidth = handleStyleChange(FULL);
    const makeHalfWidth = handleStyleChange(HALF);
    const makeFloat = handleStyleChange(FLOAT);

    return (
      <Box
        color="primary.contrastText"
        position="absolute"
        right={0}
        top={0}
        p={1}
      >
        <ImageAltTag ref={ref}>
          {({ onClick: openPopover }) => (
            <SpeedDial
              direction="down"
              ariaLabel="SpeedDial tooltip example"
              icon={<SpeedDialIcon />}
              open
              hidden
            >
              <SpeedDialAction
                icon={<ViewDayIcon />}
                tooltipTitle={t('full')}
                onClick={makeFullWidth}
              />
              <SpeedDialAction
                icon={<CalendarViewDayIcon />}
                tooltipTitle={t('standard')}
                onClick={makeHalfWidth}
              />
              <SpeedDialAction
                icon={<FloatIcon />}
                tooltipTitle={t('float')}
                onClick={makeFloat}
              />
              <SpeedDialAction
                icon={<ChromeReaderModeIcon />}
                tooltipTitle={t('alt')}
                onClick={openPopover}
              />
            </SpeedDial>
          )}
        </ImageAltTag>
      </Box>
    );
  },
);

export default ImageResizeButtons;
