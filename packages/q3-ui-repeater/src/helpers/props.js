import PropTypes from 'prop-types';

export const override = {
  propTypes: {
    /**
     * Remove the editor drawer.
     */
    disableEditor: PropTypes.bool,

    /**
     * Remove the editor drawer.
     */
    disableMultiselect: PropTypes.bool,

    /**
     * Remove the delete modal.
     */
    disableRemove: PropTypes.bool,
  },
  defaultProps: {
    disableEditor: false,
    disableMultiselect: false,
    disableRemove: false,
  },
};
