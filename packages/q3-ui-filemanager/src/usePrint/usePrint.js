import print from 'print-js';
import { isString } from 'lodash';

const usePrint = () => {
  const getElement = (container) => {
    if (container instanceof Node) return container;
    if (isString(container))
      return document.getElementById(container);

    return null;
  };

  return (options = {}) => {
    let position = null;
    let top = 0;

    const dataAttributeName = 'data-printing';
    const { printContainer, scrollContainer } = options;
    const printElement = getElement(printContainer);
    const scrollElement = getElement(scrollContainer);

    const move = () =>
      scrollElement.scrollTo({
        behavior: 'auto',
        left: 0,
        top,
      });

    const resetScrollElement = () => {
      top = 0;
      move();
      scrollElement.removeAttribute(dataAttributeName);
    };

    const startScrolling = () => {
      scrollElement.setAttribute(dataAttributeName, true);

      const checkIfScrollIsStatic = setInterval(() => {
        if (
          position >=
          scrollElement.scrollHeight -
            scrollElement.clientHeight
        ) {
          clearInterval(checkIfScrollIsStatic);
          print(printElement.id, 'html');
          resetScrollElement();
          return;
        }

        position = scrollElement.scrollTop;
        top += scrollElement.clientHeight / 4;
        move();
      }, 20);
    };

    if (printElement?.id && scrollElement) {
      startScrolling();
    }
  };
};

export default usePrint;
