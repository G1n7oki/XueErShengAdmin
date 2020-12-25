<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="listQuery.start"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="listQuery.end"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="直播课包标题" />
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
          <div class="name">课程列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加直播课</el-button>
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
          prop="name"
          label="直播标题"
          align="center"
        />
        <el-table-column
          prop="name"
          label="讲师名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="直播时间"
          align="center"
        />
        <el-table-column
          prop="name"
          label="结束时间"
          align="center"
        />
        <el-table-column
          prop="name"
          label="app_name"
          align="center"
        />
        <el-table-column
          prop="name"
          label="stream_name"
          align="center"
        />
        <el-table-column
          prop="name"
          label="是否展示"
          align="center"
        />
        <el-table-column
          prop="name"
          label="状态"
          align="center"
        />
        <el-table-column
          prop="name"
          label="创建时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="info" size="mini" @click="handleUpdate(row)">
              查看
            </el-button>
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
export default {
  name: 'LiveList',
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
    handleQuery() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
