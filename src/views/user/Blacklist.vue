<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">用户筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="listQuery.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="注册来源">
          <el-select v-model="listQuery.source">
            <el-option label="小程序" value="1" />
            <el-option label="安卓" value="2" />
            <el-option label="IOS" value="3" />
            <el-option label="PC" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.value"
            clearable
            placeholder="请输入用户ID、昵称、手机号"
            style="width: 300px"
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
          <div class="name">黑名单列表</div>
        </div>
        <div class="left">
          <el-checkbox v-model="all" style="margin-right: 20px" @click="checkAll">全选</el-checkbox>
          <el-link :underline="false" type="success">移出黑名单</el-link>
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
          prop="black"
          align="center"
          width="50"
        >
          <template slot-scope="{row}">
            <el-checkbox v-module="row.black" />
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="source"
          label="注册来源"
          align="center"
        />
        <el-table-column
          prop="status"
          label="注册时间"
          align="center"
        />
        <el-table-column
          prop="browse"
          label="操作人"
          align="center"
        />
        <el-table-column
          prop="date"
          label="最后登录时间"
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
              移出黑名单
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
import Pagination from '@/components/Pagination'
export default {
  name: 'Blacklist',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      list: [{
        id: '0035432',
        black: true
      }, {
        id: '0035433',
        black: true
      }],
      total: 0,
      all: false
    }
  },
  methods: {
    toData() {},
    // 筛选
    handleQuery() {},
    handleUpdate() {},
    checkAll() {}
  }
}
</script>

<style scoped>

</style>
