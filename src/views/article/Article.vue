<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="适用专业">
          <el-cascader
            v-model="listQuery.profession"
            :options="[]"
            :props="{ value: 'label' }"
            filterable
          />
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="listQuery.type" placeholder="请选择">
            <el-option label="全部" value="0" />
            <el-option label="考生必看" value="1" />
            <el-option label="报考流程" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.value" placeholder="文章标题" />
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
        <el-button type="primary" @click="dialogVisible = true">添加文章</el-button>
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
          prop="type"
          label="文章类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.type === 0 ? '考生必看' : '报考流程' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="profession"
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
          prop="browse"
          label="浏览量"
          align="center"
        />
        <el-table-column
          prop="date"
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
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
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
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
  </div>
</template>

<script>
import Article from '@/api/article.json'
import Pagination from '@/components/Pagination'
export default {
  name: 'Article',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        profession: '',
        type: '',
        value: '',
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      loading: true,
      list: [],
      total: 0
    }
  },
  created() {
    this.toData()
  },
  methods: {
    toData() {
      this.list = Article.list
      this.loading = false
      this.total = Article.list.length
    },
    handleQuery() {}
  }
}
</script>

<style scoped>

</style>
