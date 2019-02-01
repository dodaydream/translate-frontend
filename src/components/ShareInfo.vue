<template>
  <div class="share-info">
    <el-popover
      placement="top-start"
      :title="hash"
      width="200"
      trigger="hover"
      content="this is content, this is content, this is content">
      <el-button slot="reference" class="share-info-btn" type="info" icon="el-icon-info" circle></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    hash: '',
    created_at: '',
    from: '',
    to: ''
  }
}
</script>

<style>
.share-info-btn {
  position: fixed;
  bottom: 64px;
  right: 64px;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
