<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input v-model="listQuery.value" placeholder="内容搜索 / 用户昵称" />
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
          prop="title"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="title"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="评论来源"
          align="center"
        />
        <el-table-column
          prop="title"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="title"
          label="时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
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
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'DiscoverComment',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        value: '',
        page: 1,
        limit: 10
      },
      list: [],
      loading: false,
      total: 0
    }
  },
  methods: {
    toData() {},
    handleQuery() {},
    handleDelete() {}
  }
}
</script>

<style scoped>

</style>
