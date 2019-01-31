// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Switch,
  Card,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  MenuItem
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueI18n from 'vue-i18n'

import LangEN from './lang/en.json'
import LangZH from './lang/zh.json'

Vue.use(VueI18n)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Switch)
Vue.use(Card)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)

Vue.config.productionTip = false

const messages = {
  en: LangEN,
  zh: LangZH
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: getLanguage(), // set locale
  messages // set locale messages
})

function getLanguage() {
  let lang = window.localStorage.getItem('language')
  if (lang === 'en' || lang === 'zh') {
    return lang
  }
  return 'en'
}

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
