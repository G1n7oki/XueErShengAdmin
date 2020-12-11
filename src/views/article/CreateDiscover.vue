<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写文章相关信息</div>
      <el-form
        ref="form"
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
              label="考生必看"
              value="1"
            />
            <el-option
              label="报考流程"
              value="2"
            />
            <el-option
              label="咨询"
              value="3"
            />
            <el-option
              label="活动"
              value="4"
            />
            <el-option
              label="上进故事"
              value="5"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <tinymce v-model="form.content" :height="300" />
        </el-form-item>
        <el-form-item label="是否发布" prop="use">
          <el-select v-model="form.use" placeholder="请选择">
            <el-option
              label="发布"
              value="1"
            />
            <el-option
              label="暂不发布"
              value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUpload"
          >
            <el-image v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>只能上传jpg/png文件，且不超过500kb</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
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
        use: '',
        image: ''
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
        use: [
          { required: true, message: '请选择是否发布', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUpload() {}
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
