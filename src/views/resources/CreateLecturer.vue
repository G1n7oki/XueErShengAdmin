<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写讲师相关信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="讲师名称" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="请输入讲师名称"
          />
        </el-form-item>
        <el-form-item label="讲师头像" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            name="image"
            :data="{ type: 1 }"
            :show-file-list="false"
            :on-success="handleUpload"
          >
            <el-image v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item
          label="授课学科"
          prop="title"
        >
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub', multiple: true }"
          />
        </el-form-item>
        <el-form-item label="状态" prop="title">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
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
import { lecturer_create, lecturer_detail, lecturer_update } from '@/api/resources'
import { url, headers } from '@/api/uplaod'
export default {
  name: 'CreateLecturer',
  data() {
    return {
      url,
      headers,
      id: '',
      loading: false,
      form: {
        id: '',
        name: '',
        image: '',
        status: '',
        profession: []
      },
      image: '',
      profession: []
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
      const response = await lecturer_detail({ id: this.id })
      this.form = response.data
      this.loading = false
    },
    // Get professional list
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // Image upload
    handleUpload(res) {
      const { host_url } = res.data
      this.form.image = host_url
    },
    // Handle create button
    handleCreate() {
      this.id ? this.update() : this.create()
    },
    // Create lecturer
    async create() {
      const response = await lecturer_create(this.form)
      this.$message.success(response.status)
    },
    // Update lecturer
    async update() {
      const response = await lecturer_update(this.form)
      this.$message.success(response.status)
    },
    // Handle cancle button
    handleCancle() {
      this.$router.push({ path: '/resources/lecturer' })
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
