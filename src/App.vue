<template>
  <div id="app">
    <el-main>
      <translator-main ref="translator"/>
      <translate-history ref="history"/>
      <share-info />
    </el-main>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'

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
      hash: ''
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
      this.hash = shareHash ? shareHash[1] : ''
      this.$refs.translator.getSharedTranslation(this.hash)
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
