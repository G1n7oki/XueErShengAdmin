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
          <div class="name">计划列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加报考计划</el-button>
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
          prop="id"
          label="计划ID"
          align="center"
        />
        <el-table-column
          prop="title"
          label="计划名称"
          align="center"
        />
        <el-table-column
          prop="teacher_name"
          label="报考开始时间"
          align="center"
        />
        <el-table-column
          prop="name"
          label="报考结束时间"
          align="center"
        />
        <el-table-column
          prop="status"
          label="是否启用"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link :type="linkMap[row.status]" :underline="false">{{ row.status === 1 ? '是' : '否' }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="video_num"
          label="创建时间"
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
              修改
            </el-button>
            <el-button type="success" size="mini" @click="handleDetail(row)">
              详情
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
  name: 'Plan',
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
      loading: '',
      list: [],
      total: 0,
      linkMap: ['danger', '']
    }
  },
  methods: {
    toData() {},
    handleQuery() {},
    handleCreate() {},
    handleUpdate() {},
    handleDetail(row) {}
  }
}
</script>

<style scoped>

</style>
