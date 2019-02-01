<template>
  <el-card class="box-card">
    <div>
      <p class="lang-indicator">
        {{ $t("lang." + content.from) }} → {{ $t("lang." + content.to) }}
        <span class="hash">{{ content.hash }}</span>
      </p>
      <p class="lang-src text-wrapper">{{ result.src }}</p>
      <p class="lang-dst text-wrapper">{{ result.dst }}</p>
      <el-button
        class="card-button"
        type="danger"
        icon="el-icon-delete"
        size="medium"
        @click="$emit('delete-row')"
        circle>
      </el-button>
      <el-button
        class="card-button"
        type="primary"
        icon="el-icon-share"
        size="medium"
        @click="$emit('share')"
        circle>
      </el-button>
    </div>
  </el-card>
</template>

<script>
import arr2str from '@/utils/arr2str'
export default {
  props: {
    content: Object
  },
  computed: {
    result: function () {
      return arr2str(this.content.trans_result)
    }
  }
}
</script>

<style>
.card-button {
  float: right;
  margin: 8px 4px;
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

.text-wrapper {
  white-space: pre-wrap;
}

.hash {
  float: right;
}
</style>
