import React from 'react';
import PropTypes from 'prop-types';

const withActiveFormatting = (Component) => {
  const QuillListener = React.forwardRef((props, ref) => {
    const [active, setActive] = React.useState(false);
    const [activeLabel, setActiveLabel] = React.useState();

    const handleSelectionChange = ({
      detail: formatters,
    }) => {
      if (!formatters) return;

      if ('quillKey' in props) {
        setActive(formatters[props.quillKey]);
      } else if (Array.isArray(props.options)) {
        const match = props.options.find((opt) => {
          return (
            String(formatters[opt.quillClassKey]) ===
            String(opt.quillClassValue)
          );
        });

        setActive(Boolean(match));
        setActiveLabel(match?.label);
      }
    };

    React.useEffect(() => {
      if (!ref.current) return undefined;

      ref.current.addEventListener(
        'cat',
        handleSelectionChange,
      );

      return () =>
        ref.current.removeEventListener(
          'cat',
          handleSelectionChange,
        );
    }, [ref.current]);

    return (
      <Component
        active={active}
        activeLabel={activeLabel}
        {...props}
      />
    );
  });

  QuillListener.defaultProps = {};
  QuillListener.propTypes = {};

  return QuillListener;
};

export default withActiveFormatting;
