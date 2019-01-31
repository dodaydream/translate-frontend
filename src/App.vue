<template>
  <div id="app">
    <el-main>
      <translator-main />
      <translate-history ref="history"/>
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
    Footer
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
