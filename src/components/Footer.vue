<template>
  <el-footer height="128px">
    <p class="footer-text">
      <el-switch
        v-model="isChinese"
        :active-text="$t('lang.cht')"
        :inactive-text="$t('lang.en')">
      </el-switch>
    </p>
    <p class="footer-text">{{ $t('made-by-stanley-cao') }} <b>{{ $t('liver') }}</b></p>
    <p class="footer-text">
      <a href="https://github.com/dodaydream/translate-frontend">
        <img src="../assets/icons8-github-48.png" width="32px" />
      </a>
      <a href="https://api.fanyi.baidu.com/api/trans/product/index">
        <img src="../assets/icons8-baidu-48.png" width="32px" />
      </a>
    </p>
  </el-footer>
</template>

<style>
.footer-text {
  text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
      isChinese: false
    }
  },
  mounted () {
    if (this.$i18n.locale === 'zh') {
      this.isChinese = true
    }
  },
  watch: {
    isChinese: function (newVal) {
      let lang = newVal ? 'zh' : 'en'
      this.$i18n.locale = lang
      localStorage.language = lang
    }
  }
}
</script>
