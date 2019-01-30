// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueI18n from 'vue-i18n'

import LangEN from './lang/en.json'
import LangZH from './lang/zh.json'

Vue.use(VueI18n)
Vue.use(Element)

Vue.config.productionTip = false

const messages = {
  en: LangEN,
  zh: LangZH
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
