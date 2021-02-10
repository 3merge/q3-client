import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from 'q3-ui/lib/popover';
import useStyle from './useStyle';
import FileExtensions from '../FileExtensions';

const FileName = ({ name, url, onClick, loading }) => {
  const [isTruncated, setIsTruncated] = React.useState(
    false,
  );
  const [, ext] = name.split('.');
  const cls = useStyle();

  const make = (el, args = {}) =>
    React.createElement(
      el,
      {
        className: cls.link,
        ...args,
      },
      name,
    );

  const renderer = () => {
    if (url)
      return make('a', {
        target: '_blank',
        download: true,
        href: url,
      });

    if (onClick)
      return make('button', {
        type: 'button',
        onClick,
      });

    return make('span');
  };

  const renderTooltip = (predicate) =>
    predicate ? (
      <Popover popoverChildren={name}>{renderer()}</Popover>
    ) : (
      renderer()
    );

  const ref = React.useRef();

  const checkTruncate = () =>
    setIsTruncated(
      ref.current.offsetWidth < ref.current.scrollWidth,
    );

  React.useEffect(() => {
    checkTruncate();
    window.addEventListener('resize', checkTruncate);

    return () => {
      window.removeEventListener('resize', checkTruncate);
    };
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      className={cls.root}
    >
      <Grid item>
        <Avatar
          style={{
            backgroundColor: 'transparent',
            color: FileExtensions.getColor(ext),
          }}
        >
          {loading && (
            <CircularProgress className={cls.cover} />
          )}
          {FileExtensions.getIcon(ext)}
        </Avatar>
      </Grid>
      <Grid item className={cls.truncate} ref={ref}>
        {renderTooltip(isTruncated)}
      </Grid>
    </Grid>
  );
};

FileName.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  loading: PropTypes.bool,
};

FileName.defaultProps = {
  loading: false,
  onClick: null,
  url: '',
};

export default FileName;
