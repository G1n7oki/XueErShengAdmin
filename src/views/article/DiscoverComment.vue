<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="内容搜索 / 用户昵称" />
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
          <div class="name">评论列表</div>
        </div>
      </div>
      <!-- /Table header -->
      <!-- Table -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="50"
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
          prop="source"
          label="评论来源"
          align="center"
        />
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="addtime"
          label="时间"
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
      <!-- /Table -->
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
import { discover_comment_list } from '@/api/article'
export default {
  name: 'DiscoverComment',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        search: '',
        page: 1,
        per_page: 10
      },
      list: [],
      loading: false,
      total: 0
    }
  },
  created() {
    this.toData()
  },
  methods: {
    async toData() {
      this.loading = true
      const response = await discover_comment_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    handleDelete(row) {}
  }
}
</script>

<style scoped>

</style>
