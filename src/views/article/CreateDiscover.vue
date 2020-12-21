<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写文章相关信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="form.title"
            style="width: 380px"
            placeholder="请输入文章标题"
          />
        </el-form-item>
        <el-form-item label="文章类型" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option
              label="资讯"
              :value="1"
            />
            <el-option
              label="活动"
              :value="3"
            />
            <el-option
              label="上进故事"
              :value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <tinymce v-model="form.content" :height="300" />
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              label="发布"
              :value="1"
            />
            <el-option
              label="暂不发布"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章图片" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="url"
            list-type="picture-card"
            :headers="headers"
            :data="{ type: 1 }"
            name="image"
            multiple
            :file-list="form.image"
            :limit="9"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleUpload"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div>只能上传jpg/png文件，且不超过500kb</div>
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
import Tinymce from '@/components/Tinymce'
import { url, headers } from '@/api/uplaod'
import { article_create, article_read, article_update, image_delete } from '@/api/article'
export default {
  name: 'CreateDiscover',
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        title: '',
        type: '',
        content: '',
        status: '',
        image: []
      },
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否发布', trigger: 'blur' }
        ]
      },
      url: url,
      headers: headers,
      dialogVisible: false,
      dialogImageUrl: '',
      loading: false,
      host: ''
    }
  },
  created() {
    const id = this.$route.query.id
    this.id = id
    if (this.id) {
      this.toInfo()
    }
  },
  methods: {
    // 获取文章信息
    async toInfo() {
      this.loading = true
      const image = []
      const info = await article_read({ id: this.id })
      this.form.id = info.data.id
      this.form.title = info.data.title
      this.form.type = info.data.c_id
      this.form.content = info.data.content
      this.form.status = info.data.status
      this.host = info.data.imagehost
      // 处理图片
      info.data.image.forEach(item => {
        image.push({
          name: item.id,
          url: this.host + item.image_url
        })
      })
      this.form.image = image
      this.loading = false
    },
    // 预览图片
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    async handleRemove(file, fileList) {
      this.form.list = fileList
      await image_delete({ id: file.name })
    },
    // 图片上传之前
    beforeUpload(file) {
      if (file.size > 50000) {
        this.$message.warning('图片超过500kb')
        return false
      }
    },
    // 图片上传成功
    handleUpload(response) {
      this.form.image.push(response.data.url)
    },
    // 点击保存
    async handleSave() {
      const image = []
      this.form.image.forEach(item => {
        if (!item.name) {
          image.push(item)
        }
      })
      this.loading = true
      const response = this.id ? await article_update({
        id: this.id,
        title: this.form.title,
        type: this.form.type,
        content: this.form.content,
        status: this.form.status,
        image
      }) : await article_create({
        title: this.form.title,
        type: this.form.type,
        content: this.form.content,
        status: this.form.status,
        image
      })
      this.$message.success(response.status)
      this.loading = false
    },
    // 点击取消
    handleCancel() {
      this.$router.push({ path: '/article/discover' })
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
