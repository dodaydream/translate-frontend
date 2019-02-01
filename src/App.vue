<template>
  <div id="app">
    <el-main
      v-loading.fullscreen.lock="loading"
      >
      <translator-main ref="translator"/>
      <translate-history ref="history"/>
      <share-info
        v-if="share.hash"
        :hash="share.hash"
        :createdAt="share.createdAt"
        :from="share.from"
        :to="share.to"/>
    </el-main>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
import parseResponse from './utils/fetch'

export default {
  name: 'App',
  components: {
    'translator-main': () => import('./components/TranslatorMain'),
    'translate-history': () => import('./components/TranslateHistory'),
    'share-info': () => import('./components/ShareInfo'),
    Footer
  },
  data () {
    return {
      loading: false,
      share: {
        hash: '',
        createdAt: '',
        from: '',
        to:''
      }
    }
  },
  created () {
    window.addEventListener('popstate', this.updateHash)
    window.addEventListener('load', this.updateHash, false)
  },
  methods: {
    updateHash () {
      let path = window.location.pathname
      let shareHash = path.match(/^\/s\/(\w+)/)
      if (shareHash) {
        this.share.hash = shareHash[1]
        this.getShare()
      } else {
        this.share = {}
      }
    },
    getShare () {
      if (this.share.hash) {
        this.loading = true
        fetch(process.env.VUE_APP_API_URL + '/s/' + this.share.hash)
          .then(parseResponse)
          .then(res => {
            this.$refs.translator.setTranslation(res)
            this.loading = false
            this.share.createdAt = res.created_at
            this.share.from = res.from
            this.share.to = res.to
          }).catch(err => {
            window.history.replaceState({}, null, '/')
            this.loading = false
            this.$alert(err.message, 'Error', {
              confirmButtonText: 'OK',
              type: 'error'
            })
          })
      }
    }
  }
}
</script>

<style>
html {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, html, #app {
  height: 100%;
  margin: 0;
}

.el-main {
  min-height: 100%;
}

@media screen and (min-width: 1280px) {
  .el-main {
    width: 1280px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 640px) {
  .el-main {
    padding: 0;
  }
}
</style>
