import { isFunction } from 'lodash';

const useEscape = () => {
  const FOCUS_LIST =
    'input, button, select, textarea, a[href], [tabindex="0"], [tabindex="-1"]';

  const invokeFocus = (el) => {
    if (el && isFunction(el.focus)) {
      el.focus({ focusVisible: true });
    }
  };

  const contains = (el, node) =>
    el && node && isFunction(el.contains)
      ? el.contains(node)
      : false;

  const getTabStops = (el) =>
    Array.from(
      document.querySelectorAll(FOCUS_LIST),
    ).filter(
      (node) =>
        node.tabIndex >= '0' &&
        (!contains(el, node) || el === node),
    );

  const shiftIndex = (nodes, element, increment) => {
    const currentIndex = nodes.indexOf(element);
    const defaultNode = nodes[0];

    if (currentIndex === -1) return defaultNode;
    return nodes[currentIndex + increment] || defaultNode;
  };

  const findPreviousTabStop = (el) =>
    shiftIndex(getTabStops(el), el, -1);

  const findNextTabStop = (el) =>
    shiftIndex(getTabStops(el), el, 1);

  return {
    onFocus({ currentTarget }) {
      const { activeElement } = document;

      if (currentTarget && currentTarget === activeElement)
        invokeFocus(
          currentTarget.querySelector('.ql-editor'),
        );
    },
    onKeyDown(e) {
      const {
        altKey,
        code,
        currentTarget,
        shiftKey,
        target,
      } = e;

      if (
        contains(
          currentTarget.querySelector('.ql-toolbar'),
          target,
        )
      ) {
        const nodes = Array.from(
          currentTarget
            .querySelector('.ql-toolbar')
            .querySelectorAll(FOCUS_LIST),
        ).filter((node) => {
          try {
            return !node.style.cssText.includes(
              'display: none',
            );
          } catch (err) {
            return true;
          }
        });

        if (code === 'ArrowRight') {
          e.preventDefault();
          invokeFocus(shiftIndex(nodes, target, 1));
        } else if (code === 'ArrowLeft') {
          e.preventDefault();
          invokeFocus(shiftIndex(nodes, target, -1));
        } else if (code === 'Tab') {
          e.preventDefault();
          currentTarget.focus();
        }
      }

      if (altKey && code === 'F10') {
        e.preventDefault();
        e.stopPropagation();

        const node =
          currentTarget.querySelector('.ql-header');

        invokeFocus(node);
      } else if (shiftKey && code === 'Tab') {
        e.preventDefault();
        invokeFocus(findPreviousTabStop(currentTarget));
      } else if (code === 'Escape' && currentTarget) {
        e.preventDefault();
        invokeFocus(findNextTabStop(currentTarget));
      }
    },
  };
};

export default useEscape;
