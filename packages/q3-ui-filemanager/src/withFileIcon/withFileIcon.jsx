import React from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTheme } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import CodeIcon from '@material-ui/icons/Code';
import FolderIcon from '@material-ui/icons/FolderOpen';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SubjectIcon from '@material-ui/icons/Subject';
import { getFileType } from '../utils';

const iconMap = {
  jpeg: ImageIcon,
  jpg: ImageIcon,
  png: ImageIcon,
  gif: GifIcon,
  tiff: ImageIcon,
  svg: CodeIcon,
  md: CodeIcon,
  html: CodeIcon,
  pdf: PictureAsPdfIcon,
  csv: DataUsageIcon,
  xls: DataUsageIcon,
  xlsx: DataUsageIcon,
  ppt: SlideshowIcon,
  mp3: AudiotrackIcon,
  flac: AudiotrackIcon,
  wav: AudiotrackIcon,
  aif: AudiotrackIcon,
  mp4: VideoLibraryIcon,
  doc: SubjectIcon,
  docx: SubjectIcon,
  mobi: SubjectIcon,
  epub: SubjectIcon,
  mov: VideoLibraryIcon,
  wmv: VideoLibraryIcon,
  avi: VideoLibraryIcon,
  webm: VideoLibraryIcon,
  fvl: VideoLibraryIcon,
};

const withFileIcon = (Component) => {
  const FileIconSelector = (props) => {
    const { folder = false, name, url } = props;
    const color = useTheme()?.palette?.secondary?.main;
    const fileType = !folder
      ? getFileType(url) || getFileType(name)
      : null;

    const El = React.useMemo(
      // eslint-disable-next-line
      () => () =>
        fileType ? (
          React.createElement(
            iconMap[fileType] || DescriptionIcon,
            {
              style: {
                color,
              },
            },
          )
        ) : (
          <FolderIcon
            style={{
              color,
            }}
          />
        ),
      [color, fileType],
    );

    return (
      <Component {...props} fileType={fileType} icon={El} />
    );
  };

  FileIconSelector.defaultProps = {
    folder: false,
    name: undefined,
  };

  FileIconSelector.propTypes = {
    folder: PropTypes.bool,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
  };

  return FileIconSelector;
};

export default withFileIcon;
