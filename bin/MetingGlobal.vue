<template>
  <Meting
    id="aplayer-fixed"
    :auto="auto"
    :server="server"
    :type="type"
    :mid="mid"
    :additional-audios="additionalAudios"
    :fixed="true"
    :mini="mini"
    :autoplay="autoplay"
    :theme="theme"
    :loop="loop"
    :order="order"
    :preload="preload"
    :volume="volume"
    :mutex="mutex"
    :lrc-type="lrcType"
    :list-folded="listFolded"
    :list-max-height="listMaxHeight"
    :storage-name="storageName"
  />
</template>

<script>
import Meting from './Meting.vue'

export default {
  name: 'MetingGlobal',

  data() {
    return {
      ...METING_OPTIONS,
      ...APLAYER_OPTIONS
    }
  },

  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.aplayer_fixed_mobile_switch()
    }
  },

  methods: {
    aplayer_fixed_mobile_switch() {
      const aplayer = document.getElementById('aplayer-fixed')
      if (aplayer === null) return
      const body = aplayer.querySelector('.aplayer-body')
      const btn = aplayer.querySelector('.aplayer-miniswitcher')
      const lrc = aplayer.querySelector('.aplayer-lrc')
      let isShow = false

      function hide_mini_player() {
        if (!MOBILE_OPTIONS.cover) {
          body.childNodes.forEach(child => {
            child.style.display = 'none'
          })
          body.style.background = 'transparent'
          btn.style.display = 'block'
          btn.style.right = 'auto'
        }
        if (!MOBILE_OPTIONS.lrc) {
          lrc.style.display = 'none'
        }
        isShow = false
      }

      function show_mini_player() {
        if (!MOBILE_OPTIONS.cover) {
          body.childNodes.forEach(child => {
            child.style.display = 'block'
          })
          body.style.background = 'white'
          btn.style.right = '0'
        }
        if (!MOBILE_OPTIONS.lrc) {
          lrc.style.display = 'block'
        }
        isShow = true
      }

      hide_mini_player()

      btn.onclick = () => {
        isShow ? hide_mini_player() : show_mini_player()
      }
    }
  }
}
</script>
