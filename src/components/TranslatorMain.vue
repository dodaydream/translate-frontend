<template>
  <div class="translate-main">
    <el-row class="language-selection">
      <el-col :xs="12" :md="12">
        <LanguageSelector
          v-model="from"
          @input="doTranslate"
          displayauto />
      </el-col>
      <el-col :xs="12" :md="12">
        <LanguageSelector
          class="dest-language-selector"
          v-model="to"
          @input="doTranslate"
         />
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="12">
        <el-input
          type="textarea"
          class="translate-input"
          :autosize="{ minRows: 2 }"
          placeholder="Please input"
          @input.native="doTranslate"
          maxlength="5000"
          v-model="input">
        </el-input>
        <span class="limiter">{{ input.length }}/5000</span>
      </el-col>

      <el-col :md="12">
        <el-input
          class="translate-result"
          type="textarea"
          :autosize="{ minRows: 2 }"
          placeholder="Translate"
          v-model="result">
        </el-input>
      </el-col>
    </el-row>
  </div>
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
      to: 'zh'
    }
  },
  methods: {
    setPendingText () {
      if (this.result === '') {
        this.result = 'Translating'
      }

      if (this.input === '') {
        this.result = ''
      } else {
        this.result += '...'
      }
    },
    doTranslate: _.debounce(function () {
      this.setPendingText()
      if (this.input !== '') {
        this.sendWebRequest()
      }
    }, 500),
    sendWebRequest () {
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
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

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
  border-radius: 5px;
  overflow: hidden;
}

.limiter {
  float: right;
  padding-right: 16px;
  font-size: 0.8em;
}

@media screen and (max-width: 640px) {
  .translate-main {
    border: 0;
    margin: 0;
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