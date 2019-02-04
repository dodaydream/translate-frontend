<template>
  <div class="translate-history">
    <div v-if="history.length !== 0">
      <div class="history-toolbar">
        <div class="count">{{ $tc('translation', history.length) }}</div>
        <el-button type="text" class="clear" @click="clearAll">{{ $t('clear-all') }}</el-button>
      </div>
      <transition-group name="history">
        <TranslateHistoryCard
          v-for="(item, index) in history"
          v-bind:key="item.hash ? item.hash : index"
          v-on:delete-row="deleteRow(index)"
          v-on:share="shareContent(index)"
          :content="item" />
      </transition-group>
    </div>
    <div v-else class="history-empty-state">
      <i class="el-icon-time"></i>
      <p>{{ $t('history-empty-state') }}</p>
    </div>
    <el-dialog
      :title="$t('share-to-others')"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-press-escape="false"
      width="80%"
      >
      <el-form v-loading="loading">
        <el-form-item :label="$t('shareable-link')">
          <el-input :autofocus="true" v-model="share.shareLink"></el-input>
        </el-form-item>
        <el-form-item :label="$t('token')" v-if="share.shareToken">
          <el-input :autofocus="true" v-model="share.shareToken"></el-input>
        </el-form-item>
        <el-button type="primary" @click="dialogFormVisible = false">{{ $t('confirm') }}</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TranslateHistoryCard from '@/components/TranslateHistoryCard'
import arr2str from '@/utils/arr2str'
import hash from 'object-hash'

export default {
  components: { TranslateHistoryCard },
  data () {
    return {
      history: [],
      dialogFormVisible: false,
      share: {
        shareLink: '',
        shareToken: ''
      },
      loading: false,
    }
  },
  mounted() {
    if (localStorage.history) {
      this.loadLocalStorage()
    }
  },
  watch: {
    history: function () {
      this.saveLocalStorage()
    }
  },
  methods: {
    isDuplicate (lhs, rhs) {
      return lhs.hash && rhs.hash ? this.findIndexByHash(lhs, rhs.hash) : this.findIndexByMD5(lhs, rhs)
    },
    findIndexByHash (i, hash) {
      return i.hash === hash
    },
    findIndexByMD5 (lhs, rhs) {
      let lHash = lhs.hash
      let rHash = rhs.hash
      lhs.hash = rhs.hash = ''
      let eq = hash.MD5(lhs) === hash.MD5(rhs)
      lhs.hash = lHash
      rhs.hash = rHash
      return eq
    },
    // used to clear saved hash when share is deleted
    clearHash (hash) {
      let index = this.history.findIndex(i => this.findIndexByHash(i, hash))
      this.history[index].hash = ''
      // workaround
      this.saveLocalStorage()
    },
    loadLocalStorage () {
      this.history = JSON.parse(localStorage.history || '[]');
    },
    deleteRow (index) {
      this.history.splice(index, 1)
    },
    saveToHistory (res) {
      let index = this.history.findIndex(i => this.isDuplicate(i, res))
      if (index !== -1) {
        res = this.history.splice(index, 1)[0]
      }
      this.history.unshift(res)
    },
    saveLocalStorage () {
      localStorage.history = JSON.stringify(this.history)
    },
    clearAll () {
      this.history = []
    },
    shareContent(index) {
      this.loading = true
      this.dialogFormVisible = true
      let hash = this.history[index].hash
      if (hash) {
        this.share.shareLink = process.env.VUE_APP_URL + '/s/' + hash
        this.share.shareToken = ''
        this.loading = false
        return
      }
      this.$api.createShare('', {
          from: this.history[index].from,
          to: this.history[index].to,
          source: arr2str(this.history[index].trans_result).src
        })
        .then(res => {
          this.share.shareLink = process.env.VUE_APP_URL + '/s/' + res.hash
          this.share.shareToken = res.token
          this.history[index].hash = res.hash
          // workaround
          this.saveLocalStorage()
          this.loading = false
        }).catch(err => {
          this.dialogFormVisible = false
          this.$message({
            message: this.$t(err.message),
            type: 'error'
          })
        })
    }
  }
}
</script>

<style>
.translate-history {
}

.history-enter-active, .history-leave-active {
  transition: all 0.1s;
}
.history-enter, .history-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.history-toolbar {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
}

.history-empty-state {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 48px;
  color: #c0c4cc;
}

.history-empty-state i {
  font-size: 96px;
}

@media screen and (min-width: 1280px) {
  .translate-history {
    width: 960px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 640px) {
  .translate-history {
    padding: 8px;
  }
}
</style>
