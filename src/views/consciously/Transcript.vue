<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">成绩单列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加成绩单</el-button>
      </div>
      <!-- /Table header -->
      <!-- table -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          prop="course_code"
          label="代码"
          align="center"
        />
        <el-table-column
          prop="title"
          label="课程名称"
          align="center"
        />
        <el-table-column
          prop="point"
          label="成绩"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
    </el-card>
    <!-- Dialog -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="代码">
          <el-input v-model="form.course_code" placeholder="请输入代码" />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.title" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="form.point" placeholder="请输入成绩" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import { transcript_list, transcript_update, transcript_create } from '@/api/consciously'
export default {
  name: 'Transcript',
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      dialogVisible: false,
      title: '创建',
      titleMap: ['创建成绩单', '编辑成绩单'],
      form: {
        id: '',
        uid: '',
        course_code: '',
        title: '',
        point: ''
      }
    }
  },
  created() {
    this.form.uid = this.$route.query.uid
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await transcript_list({ uid: this.form.uid })
      const { data, total } = response
      this.list = data
      this.total = total
      this.loading = false
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Create info
    async create() {
      const response = await transcript_create(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle update button
    handleUpdate(row) {
      this.title = this.titleMap[1]
      this.form = Object.assign({}, row)
      this.dialogVisible = true
    },
    // Update info
    async update() {
      const response = await transcript_update(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Save info
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
    }
  }
}
</script>

<style scoped>

</style>
