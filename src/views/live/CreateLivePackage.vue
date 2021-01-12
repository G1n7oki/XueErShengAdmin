<template>
  <div class="app-container">
    <el-card>
      <div class="title">直播课包信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-width="100px"
        class="form"
      >
        <el-form-item label="直播课包标题">
          <el-input
            v-model="form.title"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 7 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <img v-if="form.banner" :src="form.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="现价">
          <el-input
            v-model="form.price"
            clearable
            placeholder="请输入姓名"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="原价">
          <el-input
            v-model="form.virtual_price"
            clearable
            placeholder="可不填"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="form.status" placeholder="请选择" clearable>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
          />
        </el-form-item>
        <el-form-item label="课程有效期">
          <el-input
            v-model="form.validity"
            clearable
            placeholder="课程有效期"
            style="width: 220px"
          >
            <template slot="append">天</template>
          </el-input>
          <span style="color: #bbb">（有效期从学员购买之日起开始计算）</span>
        </el-form-item>
        <el-form-item label="课程介绍">
          <tinymce v-model="form.details" :height="200" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { url, headers } from '@/api/uplaod'
import { profession_list } from '@/api/profession'
import { live_package_detail, live_package_create, live_package_update } from '@/api/live'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'CreateLivePackage',
  components: {
    Tinymce
  },
  data() {
    return {
      url,
      headers,
      id: '',
      form: {
        id: '',
        title: '',
        banner: '',
        price: '',
        virtual_price: '',
        status: '',
        validity: '',
        details: '',
        profession: []
      },
      loading: false,
      cover: '',
      profession: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      // Get profession list
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
      // Assign a value to the form
      if (this.id) {
        const response = await live_package_detail({ id: this.id })
        this.form = response.data
      }
      this.loading = false
    },
    // Create info
    async create() {
      const response = await live_package_create(this.form)
      this.$message.success(response.status)
    },
    // Update info
    async update() {
      const response = await live_package_update(this.form)
      this.$message.success(response.status)
    },
    // Hanele save button
    handleSave() {
      this.id ? this.update() : this.create()
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
      this.form.banner = host_url
    },
    // Handle cancel button
    handleCancel() {
      this.$router.push({ path: '/live/live-package' })
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
.form {
  width: 80%;
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
