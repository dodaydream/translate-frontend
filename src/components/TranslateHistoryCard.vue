<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>
      {{ $t("lang." + content.from) }} → {{ $t("lang." + content.to) }}</span>
    </div>
    <div>
      <p>{{ content.trans_result.reduce((str, cur) => str + cur.src + '\n', '') }}</p>
      <p>{{ content.trans_result.reduce((str, cur) => str + cur.dst + '\n', '') }}</p>
      <el-button
        class="card-button"
        type="danger"
        icon="el-icon-delete"
        size="medium"
        @click="$emit('delete-row')"
        circle>
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    content: Object
  }
}
</script>

<style>
.card-button {
  float: right;
  margin: 8px 0;
}

.box-card p {
  margin: 0;
  margin-bottom: 5px;
}

.box-card {
  margin-bottom: 16px;
}
</style>
