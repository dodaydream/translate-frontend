<template>
  <div class="translate-history">
    <div v-if="history.length !== 0">
      <div class="history-toolbar">
        <div class="count">{{ $tc('translation', history.length) }}</div>
        <el-button type="text" class="clear" @click="clearAll">Clear All</el-button>
      </div>
      <transition-group name="history">
        <TranslateHistoryCard
          v-for="(item, index) in history"
          v-bind:key="index * 2"
          v-on:delete-row="deleteRow(index)"
          :content="item" />
      </transition-group>
    </div>
    <div v-else class="history-empty-state">
      <i class="el-icon-time"></i>
      <p>{{ $t('history-empty-state') }}</p>
    </div>
  </div>
</template>

<script>
import TranslateHistoryCard from '@/components/TranslateHistoryCard'

export default {
  components: { TranslateHistoryCard },
  data () {
    return {
      history: []
    }
  },
  mounted() {
    if (localStorage.history) {
      this.loadLocalStorage()
    }
  },
  methods: {
    loadLocalStorage () {
      try {
        this.history = JSON.parse(localStorage.history);
      } catch (err) {
        this.history = []
      }

      if (!Array.isArray(this.history)) {
        this.history = []
      }
    },
    deleteRow (index) {
      this.history.splice(index, 1)
      this.saveLocalStorage()
    },
    saveToHistory (res) {
      if (this.history.length >= 10) {
        this.history.pop()
      }
      this.history.unshift(res)
      this.saveLocalStorage()
    },
    saveLocalStorage () {
      setTimeout(() => {
        localStorage.history = JSON.stringify(this.history)
      }, 0)
    },
    clearAll () {
      this.history = []
      this.saveLocalStorage()
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
