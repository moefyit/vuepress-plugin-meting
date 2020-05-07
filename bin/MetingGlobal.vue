<template>
  <Meting
    :auto="auto"
    :server="server"
    :type="type"
    :mid="mid"
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
  name: "MetingGlobal",

  data() {
    return {
      ...METING_OPTIONS,
      ...APLAYER_OPTIONS,
    }
  },
}
</script>
