<template>
  <div class="app-container">
    <el-card>
      <div class="title">直播课信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-width="100px"
        class="form"
      >
        <el-form-item label="直播课标题">
          <el-input
            v-model="form.title"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="讲师">
          <el-select
            v-model="form.teacher_id"
            placeholder="请选择"
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
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.start_time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.end_time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="直播状态">
          <el-select v-model="form.is_play" placeholder="请选择" clearable>
            <el-option label="未开播" :value="0" />
            <el-option label="正在直播" :value="1" />
            <el-option label="已结束" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-select v-model="form.status" placeholder="请选择" clearable>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="stream_name">
          <el-input
            v-model="form.stream_name"
            clearable
            placeholder="请输入stream_name"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="app_name">
          <el-input
            v-model="form.app_name"
            clearable
            placeholder="请输入app_name"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="回顾ID">
          <el-input
            v-model="form.review_video_id"
            clearable
            placeholder="请输入回顾ID"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="讲义文件">
          <el-select
            v-model="form.file_id"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="handout in handouts"
              :key="handout.id"
              :label="handout.file_name"
              :value="handout.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推流地址">
          <el-input
            v-model="form.tuiliu"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="播流地址">
          <el-input
            v-model="form.url"
            :disabled="true"
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
import { live_detail, live_create, live_update } from '@/api/live'
import { lecturer_list, handout_list } from '@/api/resources'
export default {
  name: 'CreateLive',
  data() {
    return {
      id: '',
      loading: false,
      form: {
        id: '',
        title: '',
        teacher_id: '',
        start_time: '',
        end_time: '',
        stream_name: '',
        app_name: '',
        review_video_id: '',
        file_id: '',
        tuiliu: '',
        url: ''
      },
      lecturers: [],
      handouts: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.init()
  },
  methods: {
    // init
    async init() {
      this.loading = true
      // lecturer list
      const lecturer = await lecturer_list({ type: 'all' })
      this.lecturers = lecturer.data
      // handout list
      const handout = await handout_list({ type: 'all' })
      this.handouts = handout.data
      // form info
      if (this.id) {
        const response = await live_detail({ id: this.id })
        response.data.file_id = +response.data.file_id
        this.form = response.data
      }
      this.loading = false
    },
    // Create info
    async create() {
      const response = await live_create(this.form)
      this.$message.success(response.status)
    },
    // Update info
    async update() {
      const response = await live_update(this.form)
      this.$message.success(response.status)
    },
    // Hanele save button
    handleSave() {
      this.id ? this.update() : this.create()
    },
    // Handle cancel button
    handleCancel() {
      this.$router.push({ path: '/live/live-list' })
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
.form {
  width: 80%;
}
</style>
