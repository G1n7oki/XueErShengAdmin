<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写广告图相关信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="广告图名称" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="广告图名称"
          />
        </el-form-item>
        <el-form-item label="广告图素材" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 1 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <el-image v-if="form.head" :src="form.head" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item
          label="试用范围"
          prop="title"
        >
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub', multiple: true }"
          />
        </el-form-item>
        <el-form-item label="跳转地址" prop="status">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="排序"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="status">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="排序"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreate">立即添加</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { url, headers } from '@/api/uplaod'
import { profession_list } from '@/api/profession'
export default {
  name: 'AdInfo',
  data() {
    return {
      url,
      headers,
      loading: false,
      form: {},
      rules: {}
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
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
    // Upload success
    successUpload(res) {
      const { host_url } = res.data
      this.form.head = host_url
    },
    handleCreate() {},
    handleCancel() {}
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
