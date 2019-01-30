<template>
  <div id="app">
    <el-main>
      <TranslatorMain />
      <TranslateHistory />
    </el-main>
  </div>
</template>

<script>
import TranslatorMain from './components/TranslatorMain.vue'
import TranslateHistory from './components/TranslateHistory'

export default {
  name: 'App',
  components: {
    TranslatorMain,
    TranslateHistory
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
