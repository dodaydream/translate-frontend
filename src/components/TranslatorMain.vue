<template>
  <el-card
    class="translate-main"
    >
    <el-row class="language-selection">
      <el-col :span="11">
        <LanguageSelector
          v-model="from"
          @input="getTranslation(false)"
          :detectedLang="detected"
          displayauto />
      </el-col>
      <el-col :span="2" class="swap-wrapper">
        <el-button type="text" @click="swapLanguage">⇌</el-button>
      </el-col>
      <el-col :span="11">
        <LanguageSelector
          class="dest-language-selector"
          v-model="to"
          @input="getTranslation(false)"
         />
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="12" style="position: inherit">
        <el-input
          type="textarea"
          class="translate-input"
          :autosize="{ minRows: 4 }"
          :placeholder="$t('please-input')"
          @input.native="doTranslate"
          maxlength="5000"
          v-model="input">
        </el-input>
        <el-button
          v-if="input"
          type="primary"
          @click="getTranslation(true)"
          class="translate-button"
          icon="el-icon-arrow-right"
          size="small"
          circle>
        </el-button>
        <el-button
          v-if="input"
          type="info"
          @click="clearInput()"
          class="clear-button"
          icon="el-icon-close"
          size="small"
          circle>
        </el-button>
        <span class="limiter">{{ input.length }}/5000</span>
      </el-col>

      <el-col :md="12">
        <el-input
          class="translate-result"
          type="textarea"
          :autosize="{ minRows: 4 }"
          :placeholder="$t('translation-result')"
          v-model="result">
        </el-input>
      </el-col>
    </el-row>
    <span style="float: right; font-size: 0.8em; padding: 8px; font-style: italic;">Powered by Baidu Translate</span>
  </el-card>
</template>

<script>
import _debounce from 'lodash.debounce'
import LanguageSelector from '@/components/LanguageSelector'
import arr2str from '@/utils/arr2str'

export default {
  name: 'TranslatorMain',
  components: { LanguageSelector },
  data () {
    return {
      input: '',
      result: '',
      from: 'auto',
      to: 'zh',
      detected: ''
    }
  },
  methods: {
    setTranslation (res) {
      this.input = res.source
      this.from = res.from
      this.to = res.to
      this.sendWebRequest(true)
    },
    swapLanguage () {
      if (this.from !== 'auto') {
        [this.from, this.to] = [this.to, this.from]
      }
    },
    setPendingText () {
      this.result = this.result === '' ? 'Translating' : this.result
      this.result = this.input === '' ? '' : this.result += '...'
    },
    doTranslate: _debounce(function () {
      this.$parent.$parent.toIndex()
      this.getTranslation(false)
    }, 500),
    getTranslation (isSavable) {
      this.setPendingText()
      this.input !== '' && this.sendWebRequest(isSavable)
    },
    sendWebRequest (isSavable) {
      this.$api.getTranslation('', {
          q: this.input,
          from: this.from,
          to: this.to
        })
        .then(res => {
          this.result = arr2str(res.trans_result).dst
          this.detected = this.from === 'auto' ? res.from : ''
          isSavable && this.saveToHistory(res)
        }).catch(err => {
          this.$message({
            message: this.$t(err.message),
            type: 'error'
          })
        })
    },
    saveToHistory (res) {
      this.$parent.$parent.$refs.history.saveToHistory(res)
    },
    clearInput () {
      this.input = this.result = ''
      this.$parent.$parent.toIndex()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-textarea__inner {
  border: 0;
  resize: none;
  padding-right: 48px;
}

.lang-group > .el-dropdown .el-button, .lang-group > .el-button {
  border: 0px;
  border-radius: 0;
}

.translate-main {
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
}

.translate-main .el-card__body {
  padding: 0;
}

.limiter {
  float: right;
  padding-right: 8px;
  font-size: 0.8em;
  color: #909399;
  padding-bottom: 8px;
}

.translate-button {
  position: absolute;
  top: 16px;
  right: 8px;
}

.clear-button {
  position: absolute;
  top: 64px;
  right: 8px;
}

textarea {
  font-size: 1.5em !important;
}

.swap-wrapper {
  display: flex;
  justify-content: center;
}

.swap-wrapper .el-button {
  font-size: 18px;
  font-weight: bold;
}

.language-selection {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 640px) {
  .translate-main {
    border: 0;
    margin: 0;
    border-radius: 0;
  }

  .el-textarea__inner {
    padding: 16px;
    border-radius: 0px;
  }

  .language-selection {
    border-bottom: 1px solid #ccc;
  }

  .translate-result {
    border-top: 1px solid #ccc;
  }
}
</style>
