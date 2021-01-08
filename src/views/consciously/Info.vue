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
        <el-form-item label="报考时间" prop="title">
          <el-date-picker
            v-model="form.title"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="年级" prop="title">
          <el-input
            v-model="form.title"
            placeholder="例如：2021级"
          />
        </el-form-item>
        <el-form-item label="推广页图片" prop="title">
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
            <el-image v-if="form.cover" :src="form.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="是否启用" prop="title">
          <el-select v-model="form.status" clearable>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="开通课程" prop="title">
          <el-input
            v-model="form.title"
            placeholder="课程名称"
          />
        </el-form-item>
        <el-form-item label="费用价格" prop="title">
          <el-input
            v-model="form.title"
            placeholder="课程名称"
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
export default {
  name: 'Info',
  data() {
    return {
      url,
      headers,
      loading: false,
      form: {},
      rules: {}
    }
  },
  methods: {
    handleCreate() {},
    handleCancel() {},
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
      this.form.cover = host_url
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
