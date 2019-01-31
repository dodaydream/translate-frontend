<template>
  <div class="translate-history">
    <TranslateHistoryCard
      v-for="(item, index) in history"
      v-bind:key="index"
      v-on:delete-row="deleteRow(index)"
      :content="item" />
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
        console.log(this.history)
      } catch (err) {
        this.history = []
        console.log(err)
      }
    },
    deleteRow (index) {
      this.history.splice(index, 1)
      localStorage.history = JSON.stringify(this.history)
    }
  }
}
</script>

<style>
.translate-history {
  padding-top: 48px;
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
