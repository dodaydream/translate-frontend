<template>
  <div class="share-info">
    <el-popover
      placement="top-end"
      :title="hash"
      width="200"
      trigger="hover">
      <div>
        <p class="lang-indicator">
          {{ $t("lang." + from) }} → {{ $t("lang." + to) }}
        </p>
        <p>{{createdAt}}</p>
        <el-button type="danger" @click="dialogFormVisible = true">{{ $t('delete') }}</el-button>
      </div>
      <el-button slot="reference" class="share-info-btn" type="info" icon="el-icon-info" circle></el-button>
    </el-popover>
    <el-dialog
      :title="$t('delete-share')"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-press-escape="false"
      width="80%"
      >
      <el-form label-width="50px">
        <el-form-item :label="$t('token')">
          <el-input :autofocus="true" v-model="token"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="deleteShare"
          :loading="loading">{{ $t('delete') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    hash: String,
    createdAt: String,
    from: String,
    to: String
  },
  data () {
    return {
      token: '',
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    deleteShare () {
      this.loading = true
      this.$api.deleteShare(this.hash, {
        token: this.token
      })
        .then(res => {
          this.dialogFormVisible = false
          this.$message({
            message: this.$t(res.message),
            type: 'success'
          })
          this.$parent.$parent.$refs.history.clearHash(this.hash)
          this.$parent.$parent.toIndex()
        }).catch(err => {
          this.$message({
            message: this.$t(err.message),
            type: 'error'
          })
        }).then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.share-info-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

@media screen and (min-width: 640px) {
  .share-info-btn {
    bottom: 64px;
    right: 64px;
  }
}

.el-popover {
  text-align: right;
}
</style>
