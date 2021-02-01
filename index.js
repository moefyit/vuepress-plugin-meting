const { resolve } = require('path')

module.exports = (options = {}, context) => ({
  define() {
    const {
      metingApi = 'https://api.i-meto.com/meting/api',
      meting = {},
      aplayer = {},
      mobile = {}
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
      storageName = 'vuepress-plugin-meting'
    } = aplayer

    const { cover = true, lrc = true } = mobile

    return {
      METING_API: metingApi,
      METING_OPTIONS: {
        auto,
        server,
        type,
        mid
      },
      APLAYER_OPTIONS: {
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
        storageName
      },
      MOBILE_OPTIONS: {
        cover,
        lrc
      }
    }
  },

  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents:
    options.meting !== undefined ? ['MetingGlobal'] : undefined
})
