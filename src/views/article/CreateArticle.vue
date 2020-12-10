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
        <el-form-item label="文章简介" prop="introduction">
          <el-input
            v-model="form.introduction"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="请输入文章简介"
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
        <el-form-item label="适用专业" prop="profession">
          <el-cascader
            v-model="form.profession"
            :options="[]"
            :props="{ value: 'label' }"
            filterable
          />
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
        <el-form-item label="排序">
          <el-input
            v-model="form.sort"
            style="width: 200px"
            placeholder="请输入排序"
          />
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
  name: 'CreateArticle',
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        title: '',
        introduction: '',
        type: '',
        content: '',
        profession: '',
        use: '',
        sort: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请填写文章简介', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '请选择适用专业', trigger: 'blur' }
        ],
        use: [
          { required: true, message: '请选择是否发布', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 20px;
}
</style>
