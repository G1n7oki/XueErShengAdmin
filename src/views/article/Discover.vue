<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="文章类型">
          <el-select v-model="listQuery.type" clearable placeholder="请选择">
            <el-option label="资讯" value="1" />
            <el-option label="活动" value="3" />
            <el-option label="上进故事" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" clearable placeholder="文章标题" />
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
          <div class="name">发现文章列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加文章</el-button>
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
          prop="title"
          label="文章标题"
          align="center"
        />
        <el-table-column
          prop="name"
          label="文章类型"
          align="center"
        />
        <el-table-column
          prop="admire"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="click"
          label="浏览量"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="status"
          label="发布状态"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
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
import { discover_list, article_delete } from '@/api/article'
export default {
  name: 'Discover',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        type: '',
        search: '',
        page: 1,
        per_page: 1
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
    // 获取列表
    async toData() {
      this.loading = true
      const response = await discover_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 点击查询
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // 点击创建
    handleCreate() {
      this.$router.push({ path: '/article/create-discover' })
    },
    // 点击更新
    handleUpdate(row) {
      this.$router.push({ path: '/article/create-discover', query: { id: row.id }})
    },
    // 点击删除
    async handleDelete(row) {
      const response = await article_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
