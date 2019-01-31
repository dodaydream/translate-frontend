<template>
  <el-card class="box-card">
    <div>
      <p class="lang-indicator">
        {{ $t("lang." + content.from) }} → {{ $t("lang." + content.to) }}
      </p>
      <p class="lang-src">{{ content.trans_result.reduce((str, cur) => str + cur.src + '\n', '') }}</p>
      <p class="lang-dst">{{ content.trans_result.reduce((str, cur) => str + cur.dst + '\n', '') }}</p>
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
}

.box-card {
  margin-bottom: 16px;
}

.box-card .lang-indicator {
  color: #909399;
  padding-bottom: 10px;
}

.box-card .lang-dst {
  color: #606266;
  padding-top: 10px;
}
</style>
