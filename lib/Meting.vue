<template>
  <APlayer
    :audio="audio"
    :fixed="fixed"
    :mini="mini"
    :autoplay="autoplay"
    :theme="theme"
    :loop="loop"
    :order="order"
    :preload="preload"
    :volume="volume"
    :custom-audio-type="customAudioType"
    :mutex="mutex"
    :lrc-type="lrcType"
    :list-folded="listFolded"
    :list-max-height="listMaxHeight"
    :storage-name="storageName"
  />
</template>

<script>
export default {
  name: 'Meting',
  props: {
    auto: {
      required: false,
      type: String,
      default: '',
    },
    server: {
      required: false,
      type: String,
      default: '',
    },
    type: {
      required: false,
      type: String,
      default: '',
    },
    mid: {
      required: false,
      type: String,
      default: '',
    },
    additionalAudios: {
      required: false,
      type: Array,
      default: () => [],
    },
    fixed: {
      required: false,
      type: Boolean,
      default: false,
    },
    mini: {
      required: false,
      type: Boolean,
      default: null,
    },
    autoplay: {
      required: false,
      type: Boolean,
      default: false,
    },
    theme: {
      required: false,
      type: String,
      default: '#b7daff',
    },
    loop: {
      required: false,
      type: String,
      default: 'all',
    },
    order: {
      required: false,
      type: String,
      default: 'list',
    },
    preload: {
      required: false,
      type: String,
      default: 'auto',
    },
    volume: {
      required: false,
      type: Number,
      default: 0.7,
    },
    customAudioType: {
      required: false,
      type: Object,
      default: undefined,
    },
    mutex: {
      required: false,
      type: Boolean,
      default: true,
    },
    lrcType: {
      required: false,
      type: Number,
      default: 0,
    },
    listFolded: {
      required: false,
      type: Boolean,
      default: false,
    },
    listMaxHeight: {
      required: false,
      type: Number,
      default: 250,
    },
    storageName: {
      required: false,
      type: String,
      default: 'vuepress-plugin-meting',
    },
  },
  data() {
    return {
      metingApi: METING_API,
      audio: [],
    }
  },

  mounted() {
    let params
    if (this.auto) {
      const parsed_params = this.parse_link(this.auto)
      params = {
        ...parsed_params,
        r: Math.random(),
      }
    } else {
      params = {
        server: this.server,
        type: this.type,
        id: this.mid,
        r: Math.random(),
      }
    }

    let url = this.metingApi
    let paramsArray = []
    Object.keys(params).forEach((key) => paramsArray.push(key + '=' + params[key]))
    url += '?' + paramsArray.join('&')

    fetch(url, {
      headers: {
        referer: null,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const res = result.map((obj) => ({
          name: obj.name || obj.title || 'Audio name',
          artist: obj.artist || obj.author || 'Audio artist',
          url: obj.url,
          cover: obj.cover || obj.pic,
          lrc: obj.lrc || obj.lyric || '',
          type: obj.type || 'auto',
        }))
        this.audio = res.concat(this.additionalAudios)
      })
  },

  methods: {
    parse_link(link) {
      let rules = [
        ['music.163.com.*song.*id=(\\d+)', 'netease', 'song'],
        ['music.163.com.*album.*id=(\\d+)', 'netease', 'album'],
        ['music.163.com.*artist.*id=(\\d+)', 'netease', 'artist'],
        ['music.163.com.*playlist.*id=(\\d+)', 'netease', 'playlist'],
        ['music.163.com.*discover/toplist.*id=(\\d+)', 'netease', 'playlist'],
        ['y.qq.com.*song/(\\w+).html', 'tencent', 'song'],
        ['y.qq.com.*album/(\\w+).html', 'tencent', 'album'],
        ['y.qq.com.*singer/(\\w+).html', 'tencent', 'artist'],
        ['y.qq.com.*playsquare/(\\w+).html', 'tencent', 'playlist'],
        ['y.qq.com.*playlist/(\\w+).html', 'tencent', 'playlist'],
        ['xiami.com.*song/(\\w+)', 'xiami', 'song'],
        ['xiami.com.*album/(\\w+)', 'xiami', 'album'],
        ['xiami.com.*artist/(\\w+)', 'xiami', 'artist'],
        ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist'],
      ]

      for (let rule of rules) {
        let patt = new RegExp(rule[0])
        let res = patt.exec(link)
        if (res !== null) {
          return {
            server: rule[1],
            type: rule[2],
            id: res[1],
          }
        }
      }
      console.error(`无法解析的链接: ${link}，请检查链接是否书写正确`)
      return {
        server: '',
        type: '',
        id: '',
      }
    },
  },
}
</script>
