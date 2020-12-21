<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="适用专业">
          <el-cascader
            v-model="id"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="考生必看" value="5" />
            <el-option label="报考流程" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="文章标题" />
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
          <div class="name">文章列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加文章</el-button>
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
          prop="p_name"
          label="适用专业"
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
        >
          <template slot-scope="{row}">
            <span>{{ row.status === 0 ? '未发布' : '已发布' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="click"
          label="浏览量"
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
import { article_list, article_delete } from '@/api/article'
import { profession_list } from '@/api/profession'
export default {
  name: 'Article',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        profession_id: '',
        type: '',
        search: '',
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      profession: [],
      id: '' // 适用专业id
    }
  },
  created() {
    this.toData()
    this.toProfession()
  },
  methods: {
    // 获取文章列表
    async toData() {
      this.loading = true
      const response = await article_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // 查询信息
    handleQuery() {
      const value = this.id[2]
      this.listQuery.profession_id = value
      this.listQuery.page = 1
      this.toData()
    },
    // 点击创建
    handleCreate() {
      this.$router.push({ path: '/article/create-article' })
    },
    // 点击编辑
    handleUpdate(row) {
      this.$router.push({ path: '/article/create-article', query: { id: row.id }})
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

