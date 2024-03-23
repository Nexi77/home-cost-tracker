import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoneyBillWave, faBars, faUser } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faMoneyBillWave);
library.add(faBars);
library.add(faUser);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})