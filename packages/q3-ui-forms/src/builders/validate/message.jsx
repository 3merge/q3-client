import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import IconButton from 'q3-ui/lib/iconButton';
import Collapse from '@material-ui/core/Collapse';
import Close from '@material-ui/icons/Close';
import { useToggle } from 'useful-state';
import useStyle from './useStyle';

const Message = ({ text }) => {
  const { t } = useTranslation();
  const { state, toggle, open } = useToggle(false);

  const isString = typeof text === 'string';

  const doesStatusStartWith = (name) =>
    isString ? !!text.startsWith(name) : false;

  const isError = doesStatusStartWith('Error:');
  const isSuccessful = doesStatusStartWith('Success:');
  const { inlineMsg, inlineIconButton } = useStyle({
    isError,
    isSuccessful,
  });

  React.useEffect(() => {
    if ((isError || isSuccessful) && !state) open();
  }, [text]);

  return isString ? (
    <Collapse in={state}>
      <Typography
        className={inlineMsg}
        component="small"
        gutterBottom
      >
        <IconButton
          label={t('labels:dismiss')}
          icon={Close}
          buttonProps={{
            onClick: toggle,
            className: inlineIconButton,
          }}
        />
        {t(`descriptions:${text.split(':').pop()}`)}
      </Typography>
    </Collapse>
  ) : null;
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
