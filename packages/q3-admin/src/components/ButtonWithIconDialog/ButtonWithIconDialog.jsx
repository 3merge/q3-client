import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { useMediaQuery } from '@material-ui/core';
import ButtonWithIcon from '../ButtonWithIcon';
import { ArticleAsideContext } from '../ArticleAside/ArticleAside';
import ArticleAsideHeader from '../ArticleAsideHeader';

export const ButtonWithIconDialog = ({
  renderContent,
  label,
  icon,
  ...rest
}) => {
  const { id, setState } = React.useContext(
    ArticleAsideContext,
  );

  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg'),
  );

  const ButtonComponent = React.useCallback(
    (open) => {
      const handleClick = (e) => {
        if (isTablet) {
          open(e);
          return;
        }

        setState({
          id: label,
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
      };

      return (
        <ButtonWithIcon
          label={label}
          icon={icon}
          on={id === label}
          onClick={handleClick}
          {...rest}
        />
      );
    },
    [id, isTablet],
  );

  return (
    <Dialog
      renderContent={renderContent}
      renderTrigger={ButtonComponent}
      title={label}
      variant="drawer"
    />
  );
};

ButtonWithIconDialog.propTypes = {
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
