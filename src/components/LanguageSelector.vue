<template>
  <div class="language-selector">
  <el-button-group class="lang-group">
    <el-button
      v-for="lang in recentUsedLang"
      v-bind:key="lang"
      @click="setLanguage(lang)"
      :class="{ 'selected-language' : value === lang }">
      {{ $t("lang." + lang) }}
    </el-button>
  </el-button-group>
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
    value: String
  },
  data () {
    return {
      languageList: languageData,
      recentUsedLang: ['zh', 'en', 'jp']
    }
  },
  created () {
    if (this.displayauto) {
      this.recentUsedLang.unshift('auto')
      this.languageList.unshift('auto')
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
  max-width: 500px;
}

.selected-language {
  border-bottom: 2px solid #409eff !important;
  border-bottom-style: inset !important;
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
