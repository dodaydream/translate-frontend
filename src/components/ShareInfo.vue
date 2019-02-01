<template>
  <div class="share-info">
    <el-popover
      placement="top-end"
      :title="hash"
      width="200"
      trigger="hover">
      <div>
        <p>Created at: {{createdAt}}</p>

        <p class="lang-indicator">
          {{ $t("lang." + from) }} → {{ $t("lang." + to) }}
        </p>
        <el-button type="danger" @click="dialogFormVisible = true">Delete</el-button>
      </div>
      <el-button slot="reference" class="share-info-btn" type="info" icon="el-icon-info" circle></el-button>
    </el-popover>
    <el-dialog
      title="Delete share"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-press-escape="false"
      >
      <el-form label-width="120px">
        <el-form-item label="Token">
          <el-input :autofocus="true" v-model="token"></el-input>
        </el-form-item>
        <el-button
          type="danger"
          @click="deleteShare"
          :loading="loading">Delete</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import parseResponse from '@/utils/fetch'
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
      fetch(process.env.VUE_APP_API_URL + '/s/' + this.hash, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.token
        })
      })
        .then(parseResponse)
        .then(res => {
          this.$message({
            message: this.$t(res.message),
            type: 'success'
          })
        }).catch(err => {
          this.$message({
            message: this.$t(err.message),
            type: 'error'
          })
        }).then(() => {
          this.loading = false
          this.dialogFormVisible = false
        })

    }
  }
}
</script>

<style>
.share-info-btn {
  position: absolute;
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
