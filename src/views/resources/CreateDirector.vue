<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写班主任相关信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="讲师名称" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="班主任名称"
          />
        </el-form-item>
        <el-form-item label="班主任头像" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 4 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="avatarUpload"
          >
            <el-image v-if="form.head" :src="form.head" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="手机号" prop="title">
          <el-input
            v-model="form.phone"
            style="width: 380px"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="微信号" prop="title">
          <el-input
            v-model="form.wechat_id"
            style="width: 380px"
            placeholder="请输入微信号"
          />
        </el-form-item>
        <el-form-item label="微信二维码" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 5 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="QRCodeUpload"
          >
            <el-image v-if="form.wechat_code" :src="form.wechat_code" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item
          label="分管专业"
          prop="title"
        >
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub', multiple: true }"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input
            v-model="form.address"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="请输入联系地址"
          />
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input
            v-model="form.signature"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="请输入个性签名"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreate">立即添加</el-button>
          <el-button @click="handleCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { profession_list } from '@/api/profession'
import { url, headers } from '@/api/uplaod'
import { director_detail, director_create, director_update } from '@/api/resources'
export default {
  name: 'CreateDirector',
  data() {
    return {
      url,
      headers,
      loading: false,
      form: {
        id: '',
        name: '',
        phone: '',
        head: '',
        wechat_id: '',
        wechat_code: '',
        status: '',
        signature: '',
        address: '',
        profession: []
      },
      rules: {},
      profession: [],
      id: ''
    }
  },
  created() {
    this.toProfession()
    this.id = this.$route.query.id
    if (!this.id) {
      return
    }
    this.init()
  },
  methods: {
    // init
    async init() {
      this.loading = true
      const response = await director_detail({ id: this.id })
      this.form = response.data
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // Limit upload type
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('只能上传图片格式的文件!')
      }
      return isImage
    },
    // Avatar upload
    avatarUpload(res) {
      const { host_url } = res.data
      this.form.head = host_url
    },
    // QR code upload
    QRCodeUpload(res) {
      const { host_url } = res.data
      this.form.wechat_code = host_url
    },
    // Handle create button
    handleCreate() {
      this.id ? this.update() : this.create()
    },
    // Create info
    async create() {
      const response = await director_create(this.form)
      this.$message.success(response.status)
    },
    // Update info
    async update() {
      const response = await director_update(this.form)
      this.$message.success(response.status)
    },
    // Handle cancle button
    handleCancle() {
      this.$router.push({ path: '/resources/director' })
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
