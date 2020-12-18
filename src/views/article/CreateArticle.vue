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
              label="考生必看"
              value="5"
            />
            <el-option
              label="报考流程"
              value="6"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <tinymce v-model="form.content" :height="300" />
        </el-form-item>
        <el-form-item label="适用专业" prop="profession_list">
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
          />
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
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
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { article_create } from '@/api/article'
import { profession_list } from '@/api/profession'
export default {
  name: 'CreateArticle',
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        profession_list: [],
        title: '',
        type: '',
        content: '',
        profession_id: '',
        status: '',
        sort: ''
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
        profession_list: [
          { required: true, message: '请选择适用专业', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否发布', trigger: 'blur' }
        ]
      },
      profession: [],
      loading: false,
      id: ''
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    async toProfession() {
      const response = await profession_list({ level: 3 })
      this.profession = response.data
    },
    async handleSave() {
      this.loading = true
      this.form.profession_id = this.form.profession_list[2]
      const response = await article_create(this.form)
      this.loading = false
      this.$message.success(response.status)
    },
    handleCancel() {
      this.$router.push({ path: '/article/article' })
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
