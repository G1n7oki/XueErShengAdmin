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
            v-model="form.title"
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
            <el-image v-if="form.cover" :src="form.cover" class="avatar" />
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
          <el-select v-model="form.category" clearable>
            <el-option
              v-for="type in types"
              :key="type.id"
              :label=" type.type + ' - ' + type.name"
              :value="type.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="现价" prop="title">
          <el-input
            v-model="form.price"
            placeholder="现价"
          />
        </el-form-item>
        <el-form-item label="原价" prop="title">
          <el-input
            v-model="form.virtual_price"
            placeholder="原价"
          />
        </el-form-item>
        <el-form-item label="课程有效期" prop="title">
          <el-input
            v-model="form.validity"
            placeholder="课程有效期 单位: 天（有效期从学员购买之日起开始计算）"
          />
        </el-form-item>
        <el-form-item label="状态" prop="title">
          <el-select v-model="form.status" clearable>
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程介绍" prop="title">
          <tinymce v-model="form.details" :height="300" />
        </el-form-item>
        <el-form-item label="讲师" prop="title">
          <el-select
            v-model="form.teacher_id"
            clearable
            filterable
          >
            <el-option
              v-for="lecturer in lecturers"
              :key="lecturer.id"
              :label="lecturer.name"
              :value="lecturer.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关联章节" prop="title">
          <el-select
            v-model="form.chapter"
            clearable
            filterable
            multiple
          >
            <el-option
              v-for="chapter in chapters"
              :key="chapter.id"
              :label="chapter.name"
              :value="chapter.id"
            />
          </el-select>
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
import { profession_list } from '@/api/profession'
import { url, headers } from '@/api/uplaod'
import { course_create, course_type, course_detail, course_update } from '@/api/course'
import { lecturer_list, chapter_list } from '@/api/resources'
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
      form: {
        id: '',
        title: '',
        cover: '',
        virtual_price: '',
        price: '',
        teacher_id: '',
        details: '',
        category: '',
        validity: '',
        chapter: ''
      },
      rules: {},
      profession: [],
      types: [],
      lecturers: [],
      chapters: [],
      category: '',
      id: ''
    }
  },
  created() {
    this.toProfession()
    this.toCourseType()
    this.toLecturerList()
    this.toChapterList()
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
      const response = await course_detail({ id: this.id })
      this.form = response.data
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 4 })
      this.profession = profession.data
    },
    // Get course type list
    async toCourseType() {
      const response = await course_type()
      response.data.map(item => {
        item.type = item.category === 1 ? '全科' : '单科'
      })
      this.types = response.data
    },
    // Get lecturer list
    async toLecturerList() {
      const response = await lecturer_list({ type: 'all' })
      this.lecturers = response.data
    },
    // Get Chapter list
    async toChapterList() {
      const response = await chapter_list({ type: 'all' })
      console.log(response)
      this.chapters = response.data
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
      this.form.cover = host_url
    },
    // Create course
    async create() {
      const response = await course_create(this.form)
      this.$message.success(response.status)
    },
    // Update course
    async update() {
      const response = await course_update(this.form)
      this.$message.success(response.status)
    },
    // Handle create button
    handleCreate() {
      this.id ? this.update() : this.create()
    },
    // Handle cancel button
    handleCancel() {
      this.$router.push({ path: '/course/center' })
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
