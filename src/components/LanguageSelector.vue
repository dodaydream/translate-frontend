<template>
  <div class="language-selector">
    <div class="lang-wrapper">
      <el-menu
        :default-active="value"
        class="lang-group"
        mode="horizontal"
        @select="setLanguage"
        ref="recentLang"
        >
        <el-menu-item
          v-for="lang in recentUsedLang"
          v-bind:key="lang"
          :index="lang">
          {{ lang === 'auto' && detectedLang !== '' ?
            $t("lang." + detectedLang) + ' - ' + $t("detected") : $t("lang." + lang) }}
        </el-menu-item>
      </el-menu>
    </div>
    <el-dropdown
      trigger="click"
      class="language-more"
      @command="setLanguage">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="lang in languageList"
          v-bind:key="lang"
          :command="lang"
          >
          {{ $t("lang." + lang) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import languageData from '@/data/languages.json'
export default {
  name: 'LanguageSelector',
  props: {
    displayauto: Boolean,
    value: String,
    detectedLang: String
  },
  data () {
    return {
      languageList: [],
      recentUsedLang: ['zh', 'en', 'jp'],
    }
  },
  created () {
    this.languageList = this.languageList.concat(languageData)
    if (this.displayauto) {
      this.languageList.unshift('auto')
      this.recentUsedLang.unshift('auto')
    }
  },
  watch: {
    value: function(newVal, oldVal) { // watch it
      this.updateRecent(newVal)
    }
  },
  methods: {
    setLanguage (lang) {
      this.$emit('input', lang)
    },
    updateRecent (lang) {
      this.$refs.recentLang.activeIndex = lang
      if (this.recentUsedLang.indexOf(lang) === -1) {
        this.recentUsedLang.pop()
        this.recentUsedLang.splice(this.displayauto ? 1 : 0, 0, lang)
      }
    }
  }
}
</script>

<style>
.el-dropdown-menu {
  max-width: 480px;
}

.el-dropdown-menu li {
  width: 120px;
  display: inline-block;
}

.selected-language {
  border-bottom: 2px solid #409eff !important;
  border-bottom-style: inset !important;
}

.lang-wrapper {
  overflow: auto;
}

.lang-wrapper::-webkit-scrollbar {
  display: none;
}

.lang-group {
  display: flex;
  background: none;
  border-bottom: none !important;
}

.lang-group .el-menu-item {
  text-transform: uppercase;
}

.language-selector {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

@media screen and (max-width: 640px) {
  .lang-group > .el-menu-item {
    display: none;
  }

  .language-selector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lang-group > .el-menu-item[class*="is-active"] {
    display: block;
    border-bottom: none;
  }
}

</style>
