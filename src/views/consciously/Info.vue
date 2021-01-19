<template>
  <div class="app-container">
    <el-card>
      <div class="title">报考计划</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="计划名称" prop="title">
          <el-input
            v-model="form.title"
            placeholder="例如：2021级筑梦计划"
          />
        </el-form-item>
        <el-form-item label="计划类型" prop="type">
          <el-select v-model="form.type" clearable>
            <el-option label="自考" :value="1" />
            <el-option label="成考" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="year">
          <el-input
            v-model="form.year"
            placeholder="例如：2021级"
          />
        </el-form-item>
        <el-form-item label="推广图" prop="image_url">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 9 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <el-image v-if="form.image_url" :src="form.image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-select v-model="form.status" clearable>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="礼包" prop="gift_id">
          <el-select v-model="form.gift_id" clearable>
            <el-option label="自考" :value="1" />
            <el-option label="成考" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">立即添加</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { url, headers } from '@/api/uplaod'
import { plan_create, plan_update, plan_detail } from '@/api/consciously'
export default {
  name: 'Info',
  data() {
    return {
      url,
      headers,
      loading: false,
      form: {
        id: '',
        title: '',
        type: '',
        image_url: '',
        year: '',
        status: '',
        gift_id: ''
      },
      rules: {},
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    if (!this.id) return
    this.init()
  },
  methods: {
    // init
    async init() {
      this.loading = true
      const response = await plan_detail({ id: this.id })
      this.form = response.data
      this.loading = false
    },
    // Handle create button
    handleSave() {
      this.id ? this.update() : this.create()
    },
    // Create info
    async create() {
      const response = await plan_create(this.form)
      this.$message.success(response.status)
    },
    // Update info
    async update() {
      const response = await plan_update(this.form)
      this.$message.success(response.status)
    },
    // Handle cancle button
    handleCancel() {
      this.$router.push({ path: '/consciously/plan' })
    },
    // Limit upload type
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('只能上传图片格式的文件!')
      }
      return isImage
    },
    // Cover upload
    successUpload(res) {
      const { host_url } = res.data
      this.form.image_url = host_url
    }
  }
}
</script>

<style>
.title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 104px;
  height: 104px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 104px;
  height: 104px;
  display: block;
}
</style>
