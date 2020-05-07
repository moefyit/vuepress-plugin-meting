import Meting from "./Meting.vue"
import MetingGlobal from "./MetingGlobal.vue"

export default ({ Vue }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aplayer-setting", "[]")
    Vue.use(require("@moefe/vue-aplayer").default)
  }
  Vue.component("Meting", Meting)
  Vue.component("MetingGlobal", MetingGlobal)
}
