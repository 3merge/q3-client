import { isFunction, invoke } from 'lodash';

const useEscape = () => {
  const FOCUS_LIST =
    'input, button, select, textarea, a[href], [tabindex="0"], [tabindex="-1"]';

  const contains = (el, node) =>
    el && node && isFunction(el.contains)
      ? el.contains(node)
      : false;

  const checkDisplayText = (node) =>
    !invoke(
      node,
      'style.cssText.includes',
      'display: none',
    );

  const getAllFromFocusList = (el, check) =>
    Array.from(el.querySelectorAll(FOCUS_LIST)).filter(
      (node) => {
        try {
          const passesDomChecks =
            checkDisplayText(node) && node.tabIndex >= '0';

          if (!passesDomChecks) return false;
          if (check) return check(node);
          return true;
        } catch (err) {
          return true;
        }
      },
    );

  const invokeFocus = (el) => {
    if (el && isFunction(el.focus))
      el.focus({
        focusVisible: true,
      });
  };

  const getTabStops = (el) =>
    getAllFromFocusList(
      document,
      (node) => el === node || !contains(el, node),
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

      const toolbar =
        currentTarget.querySelector('.ql-toolbar');

      const preventDefaultAndInvokeFocus = (el) => {
        e.preventDefault();
        e.stopPropagation();
        invokeFocus(el);
      };

      const shiftIndexForToolbarFocusNodes = (
        increment,
      ) => {
        const nodes = getAllFromFocusList(toolbar);
        preventDefaultAndInvokeFocus(
          shiftIndex(nodes, target, increment),
        );
      };

      if (contains(toolbar, target)) {
        if (code === 'ArrowRight')
          shiftIndexForToolbarFocusNodes(1);
        else if (code === 'ArrowLeft')
          shiftIndexForToolbarFocusNodes(-1);
        else if (code === 'Tab') {
          e.preventDefault();
          currentTarget.focus();
        }
      } else if (altKey && code === 'F10')
        preventDefaultAndInvokeFocus(
          // likely the "Bold" button
          currentTarget.querySelector('.ql-header'),
        );
      else if (shiftKey && code === 'Tab')
        preventDefaultAndInvokeFocus(
          findPreviousTabStop(currentTarget),
        );
      else if (code === 'Escape' && currentTarget)
        preventDefaultAndInvokeFocus(
          findNextTabStop(currentTarget),
        );
    },
  };
};

export default useEscape;
