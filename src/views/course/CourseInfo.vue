<template>
  <div class="app-container">
    <el-card>
      <div class="title">课程信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="课程名称" prop="title">
          <el-input
            v-model="form.name"
            placeholder="课程名称"
          />
        </el-form-item>
        <el-form-item label="封面图" prop="title">
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
        <el-form-item label="教学分类" prop="title">
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
          />
        </el-form-item>
        <el-form-item label="课程班型" prop="title">
          <el-select v-model="form.profession" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="现价" prop="title">
          <el-input
            v-model="form.name"
            placeholder="现价"
          />
        </el-form-item>
        <el-form-item label="原价" prop="title">
          <el-input
            v-model="form.name"
            placeholder="原价"
          />
        </el-form-item>
        <el-form-item label="课程有效期" prop="title">
          <el-input
            v-model="form.name"
            placeholder="课程有效期 单位: 天（有效期从学员购买之日起开始计算）"
          />
        </el-form-item>
        <el-form-item label="课程介绍" prop="title">
          <tinymce v-model="form.content" :height="300" />
        </el-form-item>
        <el-form-item label="讲师" prop="title">
          <el-select v-model="form.profession" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="讲义" prop="title">
          <el-select v-model="form.profession" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreate">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { profession_list } from '@/api/profession'
import { url, headers } from '@/api/uplaod'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'CourseInfo',
  components: {
    Tinymce
  },
  data() {
    return {
      url,
      headers,
      loading: false,
      form: {},
      rules: {},
      profession: []
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    handleCreate() {},
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 4 })
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
    // Cover upload
    successUpload(res) {
      const { host_url } = res.data
      this.form.head = host_url
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
