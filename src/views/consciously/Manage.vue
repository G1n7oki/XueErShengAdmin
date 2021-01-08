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
            placeholder="姓名/身份证号/手机号"
          />
        </el-form-item>
        <el-form-item label="报考层次">
          <el-select v-model="listQuery.search" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
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
          <div class="name">管理列表</div>
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
          prop="id"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="teacher_name"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="性别"
          align="center"
        />
        <el-table-column
          prop="name"
          label="身份证"
          align="center"
        />
        <el-table-column
          prop="name"
          label="报读类型"
          align="center"
        />
        <el-table-column
          prop="name"
          label="年级"
          align="center"
        />
        <el-table-column
          prop="name"
          label="层次"
          align="center"
        />
        <el-table-column
          prop="name"
          label="院校"
          align="center"
        />
        <el-table-column
          prop="name"
          label="专业"
          align="center"
        />
        <el-table-column
          prop="name"
          label="考试县区"
          align="center"
        />
        <el-table-column
          prop="name"
          label="付款状态"
          align="center"
        />
        <el-table-column
          prop="video_num"
          label="报名时间"
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
              成绩单
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
  name: 'Manage',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      loading: '',
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
