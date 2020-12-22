<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="发布人昵称搜索" />
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
          <div class="name">圈子列表</div>
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
          width="100"
          prop="id"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="username"
          label="发布人昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="content"
          label="发布内容"
          align="center"
        >
          <template slot-scope="{row}">
            <div class="content">{{ row.content }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="admire"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="comment_num"
          label="评论数"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link type="primary" @click="handleComment(row)">{{ row.comment_num }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="发布时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleRead(row)">
              查看内容
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
      <!-- Dialog -->
      <el-dialog
        title="查看内容"
        :visible.sync="dialogVisible"
      >
        <div class="rich-text-content">{{ content }}</div>
      </el-dialog>
      <!-- /Dialog -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { circle_list, article_delete } from '@/api/article'
export default {
  name: 'Circles',
  components: {
    Pagination
  },
  data() {
    return {
      date: ['', ''],
      content: '',
      listQuery: {
        start: '',
        end: '',
        search: '',
        page: 1,
        per_page: 10
      },
      total: 0,
      loading: false,
      list: [],
      dialogVisible: false
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // 获取列表数据
    async toData() {
      this.loading = true
      const response = await circle_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 点击查看内容
    handleRead(row) {
      this.content = row.content
      this.dialogVisible = true
    },
    // 点击查询
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // 点击删除
    async handleDelete(row) {
      const response = await article_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    },
    // 点击评论数
    handleComment(row) {
      this.$router.push({ path: '/article/circles-comment', query: { id: row.id }})
    }
  }
}
</script>

<style scoped>
.content {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
