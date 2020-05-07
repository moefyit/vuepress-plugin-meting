const { resolve } = require("path")

module.exports = (options = {}, context) => ({
  define() {
    const {
      metingApi,
      meting: {
        auto,
        server,
        type,
        mid,
      },
      aplayer: {
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
      }
    } = options

    return {
      METING_API: metingApi || "https://api.i-meto.com/meting/api",
      METING_OPTIONS: {
        auto: auto || "",
        server: server || "",
        type: type || "",
        mid: mid || ""
      },
      APLAYER_OPTIONS: {
        mini: mini || null,
        autoplay: autoplay || false,
        theme: theme || '#b7daff',
        loop: loop || 'all',
        order: order || 'list',
        preload: preload || 'auto',
        volume: volume || 0.7,
        customAudioType,
        mutex: mutex || true,
        lrcType: lrcType || 0,
        listFolded: listFolded || false,
        listMaxHeight: listMaxHeight || 250,
        storageName: storageName || "vuepress-plugin-meting"
      }
    }
  },

  enhanceAppFiles: resolve(__dirname, "./bin/enhanceAppFile.js"),
  globalUIComponents: options.meting !== undefined ? ["MetingGlobal"] : [],
})
