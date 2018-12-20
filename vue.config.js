module.exports = {
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    iconPaths: {
      favicon16: 'img/icons/16-16.png',
      favicon32: 'img/icons/32-32.png',
      msTileImage: 'img/icons/144-144.png',
      appleTouchIcon: 'img/icons/152-152.png',
      maskIcon: 'img/icon.svg',
    },
  },
};
