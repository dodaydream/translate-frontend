<template>
  <div class="translate-history">
    <TranslateHistoryCard
      v-for="item in history"
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
      try {
        this.history = JSON.parse(localStorage.history);
        console.log(this.history)
      } catch (err) {
        this.history = []
        console.log(err)
      }
    }
  },
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
