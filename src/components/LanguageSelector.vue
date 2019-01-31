<template>
  <div class="language-selector">
    <div class="lang-wrapper">
      <el-button-group class="lang-group">
        <el-button
          v-for="lang in recentUsedLang"
          v-bind:key="lang"
          @click="setLanguage(lang)"
          :class="{ 'selected-language' : value === lang }">
          {{ lang === 'auto' && detectedLang !== '' ?
            $t("lang." + detectedLang) + ' - ' + $t("detected") : $t("lang." + lang) }}
        </el-button>
      </el-button-group>
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
  methods: {
    setLanguage (lang) {
      if (this.recentUsedLang.indexOf(lang) === -1) {
        this.recentUsedLang.pop()
        this.recentUsedLang.splice(this.displayauto ? 1 : 0, 0, lang)
      }

      this.$emit('input', lang)
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
}

.lang-group .el-button {
  text-transform: uppercase;
  background: none;
}

.language-selector {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

@media screen and (max-width: 640px) {
  .selected-language {
    border-bottom: none !important;
    border-radius: 0 !important;
  }

  .lang-group > .el-button {
    display: none;
  }

  .language-selector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lang-group > .el-button[class*="selected-language"] {
    display: block;
  }
}

</style>
