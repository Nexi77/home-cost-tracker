import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoneyBillWave, faBars, faUser, faXmark, faRightToBracket, faPlus, faCalculator, faPenToSquare, faPenNib, faBackward, faMinus, faShop, faBrain } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faMoneyBillWave);
library.add(faBars);
library.add(faUser);
library.add(faXmark);
library.add(faRightToBracket);
library.add(faPlus);
library.add(faMinus);
library.add(faCalculator)
library.add(faPenToSquare);
library.add(faPenNib);
library.add(faBackward);
library.add(faShop);
library.add(faBrain);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})