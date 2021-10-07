module.exports = (src) => {
  try {
    if (!src) throw new Error('No theme file detected');

    // eslint-disable-next-line
    return require(src);
  } catch (e) {
    return {};
  }
};
