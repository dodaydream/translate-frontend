<template>
  <el-card class="translate-main">
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
          @click="getTranslation(true)"
          class="translate-button"
          icon="el-icon-arrow-right"
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
  </el-card>
</template>

<script>
import _ from 'lodash'
import LanguageSelector from '@/components/LanguageSelector'

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
    swapLanguage () {
      if (this.from !== 'auto') {
        [this.from, this.to] = [this.to, this.from]
      }
    },
    setPendingText () {
      if (this.result === '') {
        this.result = 'Translating'
      }

      if (this.input === '') {
        this.result = ''
      } else {
        this.result += '...'
      }

      this.detected = ''
    },
    doTranslate: _.debounce(function () {
      this.setPendingText()
      if (this.input !== '') {
        this.sendWebRequest()
      }
    }, 500),
    getTranslation (isSavable) {
      this.setPendingText()
      if (this.input !== '') {
        this.sendWebRequest(isSavable)
      }
    },
    sendWebRequest (isSavable) {
      fetch(process.env.VUE_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: this.input,
          from: this.from,
          to: this.to
        })
      })
        .then(res => res.json())
        .then((res) => {
          this.result = res.trans_result.reduce((str, cur) => str + cur.dst + '\n', '')
          if (this.from === 'auto') {
            this.detected = res.from
          }
          if (isSavable) {
            this.$parent.$parent.$refs.history.saveToHistory(res)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-textarea__inner {
  border: 0;
  resize: none;
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
  padding-right: 16px;
  font-size: 0.8em;
  color: #909399;
  padding-bottom: 8px;
}

.translate-button {
  position: absolute;
  top: 8px;
  right: 32px;
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
