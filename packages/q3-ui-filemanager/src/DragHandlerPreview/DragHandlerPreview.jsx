import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';
import useDragHandlerPreview from '../useDragHandlerPreview';

const DragHandlerPreview = () => {
  const ref = React.useRef();
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const track = useDragHandlerPreview();

  React.useEffect(() => {
    // tracks cursor motion/position
    track(ref?.current);
  }, []);

  return (
    <div className={cls.preview} ref={ref}>
      <Paper elevation={5}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          p={1}
        >
          <FileCopyIcon />
          <Box ml={0.5}>
            <Typography>
              {t('dropFileToMoveOrUpload')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default React.memo(DragHandlerPreview);
