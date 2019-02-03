import URL from './entry'
import parseResponse from '@/utils/fetch'

class Api {
  install (Vue) {
    Vue.prototype.$api = this
  }
}

URL.forEach((entry) => {
  if (entry.method == 'GET') {
    Api.prototype[entry.name] = function (queryStr = '') {
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_URL + entry.url + queryStr, {
          method: entry.method
        }).then(parseResponse)
        .then(res => {
          resolve(res)
        }, reject)
      })
    }
  } else if (entry.method == 'POST' || entry.method == 'DELETE') {
    Api.prototype[entry.name] = function (queryStr = '', body = {}) {
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_URL + entry.url + queryStr, {
          method: entry.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(parseResponse)
        .then(res => {
          resolve(res)
        }, reject)
      })
    }
  }
})

const ApiInstance = new Api()

export default ApiInstance
