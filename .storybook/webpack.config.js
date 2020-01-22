module.exports = async ({ config, mode }) => {
  config.module.rules = config.module.rules.map((rule) => {
    if (
      String(rule.test) ===
      String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
      };
    }

    return rule;
  });

  config.module.rules.push({
    use: ['@svgr/webpack', 'url-loader'],
    test: /\.svg$/,
  });

  return config;
};
