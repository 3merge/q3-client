import React from 'react';
import { ArticleAsideContext } from '../components/ArticleAside/ArticleAside';

const useArticleAsideAction = ({
  actionId,
  autoOpen = false,
  content = null,
}) => {
  const { id, setState, close } = React.useContext(
    ArticleAsideContext,
  );

  const isOn = id === actionId;
  const toggle = () =>
    !isOn
      ? setState({
          id: actionId,
          content,
        })
      : close();

  React.useEffect(() => {
    if (autoOpen) toggle();
  }, []);

  return {
    isOn,
    toggle,
  };
};

export default useArticleAsideAction;
