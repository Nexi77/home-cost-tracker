import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoneyBillWave, faBars, faUser, faXmark, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faMoneyBillWave);
library.add(faBars);
library.add(faUser);
library.add(faXmark);
library.add(faRightToBracket);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})