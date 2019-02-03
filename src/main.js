// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  MessageBox,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Input,
  Switch,
  Card,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  MenuItem,
  Message,
  Form,
  FormItem,
  Loading,
  Popover
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import Api from '@/api/Api'
import VueI18n from 'vue-i18n'

import LangEN from './lang/en.json'
import LangZH from './lang/zh.json'
import './registerServiceWorker'

Vue.use(VueI18n)
Vue.use(Api)

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
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Popover)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm

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
