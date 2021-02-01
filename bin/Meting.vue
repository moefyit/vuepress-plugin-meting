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
      default: ''
    },
    server: {
      required: false,
      type: String,
      default: ''
    },
    type: {
      required: false,
      type: String,
      default: ''
    },
    mid: {
      required: false,
      type: String,
      default: ''
    },
    additionalAudios: {
      required: false,
      type: Array,
      default: () => []
    },
    fixed: {
      required: false,
      type: Boolean,
      default: false
    },
    mini: {
      required: false,
      type: Boolean,
      default: null
    },
    autoplay: {
      required: false,
      type: Boolean,
      default: false
    },
    theme: {
      required: false,
      type: String,
      default: '#b7daff'
    },
    loop: {
      required: false,
      type: String,
      default: 'all'
    },
    order: {
      required: false,
      type: String,
      default: 'list'
    },
    preload: {
      required: false,
      type: String,
      default: 'auto'
    },
    volume: {
      required: false,
      type: Number,
      default: 0.7
    },
    customAudioType: {
      required: false,
      type: Object,
      default: undefined
    },
    mutex: {
      required: false,
      type: Boolean,
      default: true
    },
    lrcType: {
      required: false,
      type: Number,
      default: 0
    },
    listFolded: {
      required: false,
      type: Boolean,
      default: false
    },
    listMaxHeight: {
      required: false,
      type: Number,
      default: 250
    },
    storageName: {
      required: false,
      type: String,
      default: 'vuepress-plugin-meting'
    }
  },
  data() {
    return {
      metingApi: METING_API,
      audio: []
    }
  },

  mounted() {
    if (this.auto) this._parse_link()

    const params = {
      server: this.server,
      type: this.type,
      id: this.mid,
      r: Math.random()
    }

    let url = this.metingApi
    let paramsArray = []
    Object.keys(params).forEach(key =>
      paramsArray.push(key + '=' + params[key])
    )
    url += '?' + paramsArray.join('&')

    fetch(url, {
      headers: {
        referer: null
      }
    })
      .then(res => res.json())
      .then(result => {
        const res = result.map(obj => {
          const rObj = {}
          rObj.name = obj.title
          rObj.artist = obj.author
          rObj.url = obj.url
          rObj.cover = obj.pic
          rObj.lrc = obj.lrc
          return rObj
        })
        this.audio = res.concat(this.additionalAudios)
      })
  },

  methods: {
    _parse_link() {
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
        ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist']
      ]

      for (let rule of rules) {
        let patt = new RegExp(rule[0])
        let res = patt.exec(this.auto)
        if (res !== null) {
          this.server = rule[1]
          this.type = rule[2]
          this.mid = res[1]
          return
        }
      }
    }
  }
}
</script>
