import React from 'react';
import Quill from 'quill';
import { Box } from '@material-ui/core';
import { get, isFunction } from 'lodash';
import useStyle from '../useStyle';
import MediaAttributes from '../MediaAttributes';
import MediaResizeHandler from '../MediaResizeHandler';

const ImageOverlay = React.forwardRef((props, ref) => {
  const classes = useStyle();
  const [styles, setStyles] = React.useState({
    display: 'none',
  });

  const img = React.useRef();

  const calculateStyles = () => {
    const parent = ref.current.root.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const imgRect = img.current.getBoundingClientRect();

    setStyles({
      left:
        imgRect.left -
        parentRect.left -
        1 +
        parent.scrollLeft,
      top: imgRect.top - parentRect.top + parent.scrollTop,
      width: imgRect.width,
      height: imgRect.height,
    });
  };

  const handleClick = (e) => {
    const Parchment = Quill.import('parchment');
    const ImageBlot = Quill.import('formats/image');
    const el = Parchment.find(e.target);

    if (el instanceof ImageBlot) {
      ref.current.setSelection(
        el.offset(ref.current.scroll),
        1,
        'user',
      );

      img.current = el.domNode;
      calculateStyles();
    } else {
      setStyles({
        display: 'none',
      });
    }
  };

  React.useEffect(() => {
    if (
      !isFunction(get(ref, 'current.root.addEventListener'))
    )
      return undefined;

    ref.current.root.addEventListener(
      'click',
      handleClick,
      true,
    );

    const resizeObserver = new ResizeObserver(
      calculateStyles,
    );

    if (img.current) resizeObserver.observe(img.current);

    return () => {
      if (ref?.current?.root)
        ref.current.root.removeEventListener(
          'click',
          handleClick,
        );

      if (img.current)
        resizeObserver.unobserve(img.current);
    };
  }, [ref.current]);

  return (
    <Box className={classes.overlay} style={styles}>
      <MediaAttributes
        editorEl={ref.current}
        imageEl={img.current}
        deleteMedia={() => {
          const el = ref.current.getSelection();
          img.current.remove();
          ref.current.update();
          ref.current.focus();
          ref.current.setSelection(el - 1, el);

          img.current = null;
          calculateStyles();
        }}
      />
      {['ne', 'se', 'sw', 'nw'].map((coordinate) => (
        <MediaResizeHandler
          key={coordinate}
          coordinate={coordinate}
          ref={img}
        />
      ))}
    </Box>
  );
});

export default ImageOverlay;
