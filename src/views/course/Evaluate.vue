<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input
            v-model="listQuery.search"
            clearable
            placeholder="课程名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /Filter -->
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">评价列表</div>
        </div>
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
          prop="title"
          label="课程名称"
          align="center"
        />
        <el-table-column
          prop="username"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="mark"
          label="评价分数"
          align="center"
        />
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="add_time"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
      <!-- Page -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { course_comment, comment_delete } from '@/api/course'
export default {
  name: 'Evaluate',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        search: ''
      },
      id: '',
      loading: false,
      list: [],
      total: 0
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await course_comment(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Delete info
    async handleDelete(row) {
      const response = await comment_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
