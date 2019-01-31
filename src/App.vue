<template>
  <div id="app">
    <el-main>
      <TranslatorMain />
      <TranslateHistory />
    </el-main>
    <Footer />
  </div>
</template>

<script>
import TranslatorMain from './components/TranslatorMain.vue'
import TranslateHistory from './components/TranslateHistory'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    TranslatorMain,
    TranslateHistory,
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

  body {
    margin: 0;
  }
}
</style>
