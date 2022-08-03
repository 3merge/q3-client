import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { useMediaQuery } from '@material-ui/core';
import ButtonWithIcon from '../ButtonWithIcon';
import ArticleAsideHeader from '../ArticleAsideHeader';
import useArticleAsideAction from '../../hooks/useArticleAsideAction';

export const ButtonWithIconDialog = ({
  DialogProps,
  renderContent,
  label,
  icon,
  ...rest
}) => {
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  const ButtonComponent = React.useCallback(
    (open) => {
      const { isOn, toggle } = useArticleAsideAction({
        ...rest,
        actionId: label,
        content: (
          <>
            <ArticleAsideHeader
              onOpen={open}
              title={label}
            />
            {renderContent()}
          </>
        ),
      });

      const handleClick = (e) => {
        if (isTablet) {
          open(e);
        } else {
          toggle();
        }
      };

      return (
        <ButtonWithIcon
          label={label}
          icon={icon}
          on={isOn}
          onClick={handleClick}
          {...rest}
        />
      );
    },
    [isTablet, rest],
  );

  return (
    <Dialog
      renderContent={renderContent}
      renderTrigger={ButtonComponent}
      title={label}
      variant="drawer"
      {...DialogProps}
    />
  );
};

ButtonWithIconDialog.defaultProps = {
  DialogProps: {},
};

ButtonWithIconDialog.propTypes = {
  DialogProps: PropTypes.shape({}),
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  renderContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

export default ButtonWithIconDialog;
