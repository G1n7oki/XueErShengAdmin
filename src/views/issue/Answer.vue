<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="回答人/问题标题" />
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
          <div class="name">回答列表</div>
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
          prop="title"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="回答人"
          align="center"
        />
        <el-table-column
          prop="title"
          label="回答内容"
          align="center"
        />
        <el-table-column
          prop="title"
          label="回答时间"
          align="center"
        />
        <el-table-column
          prop="title"
          label="问题标题"
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
export default {
  name: 'Answer',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      total: 0
    }
  },
  methods: {
    toData() {},
    handleQuery() {}
  }
}
</script>

<style scoped>

</style>
