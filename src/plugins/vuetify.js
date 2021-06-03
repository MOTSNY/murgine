import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import colors from 'vuetify/lib/util/colors'

import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

Vue.use(Vuetify)

const myTransition = createSimpleTransition('toolbar')
Vue.component('toolbar', myTransition)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.pink.accent1 // #E040FB
      },
      dark: {
        primary: colors.pink.accent1 // #E040FB
      }
    }
  }
})
