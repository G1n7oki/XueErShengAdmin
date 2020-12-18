<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="反馈类型">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="答案有问题" value="1" />
            <el-option label="答案与解析不符" value="2" />
            <el-option label="有错别字" value="3" />
            <el-option label="选项有问题" value="4" />
            <el-option label="其他" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="解决状态">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
            <el-option label="未解决" value="5" />
            <el-option label="已解决" value="6" />
          </el-select>
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
          <div class="name">反馈列表</div>
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
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="题目名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="反馈类型"
          align="center"
        />
        <el-table-column
          prop="status"
          label="反馈描述"
          align="center"
        />
        <el-table-column
          prop="click"
          label="添加时间"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="解决状态"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="解决时间"
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
              已解决
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
  name: 'Correction',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        type: '',
        status: '',
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 1
    }
  },
  methods: {
    toData() {},
    handleQuery() {},
    handleUpdate() {}
  }
}
</script>

<style scoped>

</style>
