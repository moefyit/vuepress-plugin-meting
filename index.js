const { resolve } = require('path')

module.exports = (options = {}, context) => ({
  define() {
    const {
      metingApi = 'https://api.i-meto.com/meting/api',
      meting = {},
      aplayer = {},
      mobile = {},
      defaultCover = 'https://github.com/SigureMo.png',
    } = options

    const { auto = '', server = '', type = '', mid = '' } = meting

    const {
      additionalAudios = [],
      mini = null,
      autoplay = false,
      theme = '#b7daff',
      loop = 'all',
      order = 'list',
      preload = 'auto',
      volume = 0.7,
      customAudioType,
      mutex = true,
      lrcType = 0,
      listFolded = false,
      listMaxHeight = 250,
      storageName = 'vuepress-plugin-meting',
    } = aplayer

    const { cover = true, lrc = true } = mobile

    return {
      __METING_API__: metingApi,
      __METING_OPTIONS__: {
        auto,
        server,
        type,
        mid,
      },
      __APLAYER_OPTIONS__: {
        additionalAudios,
        mini,
        autoplay,
        theme,
        loop,
        order,
        preload,
        volume,
        customAudioType,
        mutex,
        lrcType,
        listFolded,
        listMaxHeight,
        storageName,
      },
      __MOBILE_OPTIONS__: {
        cover,
        lrc,
      },
      __DEFAULT_COVER__: defaultCover,
    }
  },

  enhanceAppFiles: resolve(__dirname, './lib/enhanceAppFile.js'),
  globalUIComponents: options.meting !== undefined ? ['MetingGlobal'] : undefined,
})
