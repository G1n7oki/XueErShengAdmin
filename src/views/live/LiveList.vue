<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="listQuery.start_time"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="listQuery.end_time"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="直播课标题" />
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
          type="index"
          align="center"
        />
        <el-table-column
          prop="title"
          label="直播标题"
          align="center"
        />
        <el-table-column
          prop="name"
          label="讲师名称"
          align="center"
        />
        <el-table-column
          prop="start_time"
          label="直播时间"
          align="center"
        />
        <el-table-column
          prop="end_time"
          label="结束时间"
          align="center"
        />
        <el-table-column
          prop="app_name"
          label="app_name"
          align="center"
        />
        <el-table-column
          prop="stream_name"
          label="stream_name"
          align="center"
        />
        <el-table-column
          prop="status"
          label="是否展示"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link :type="linkMap[row.status]" :underline="false">{{ row.status === 1 ? '是' : '否' }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_play"
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ playMap[row.is_play] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150"
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
import { live_list, live_delete } from '@/api/live'
export default {
  name: 'LiveList',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        search: '',
        status: '',
        start_time: '',
        end_time: ''
      },
      loading: false,
      list: [],
      total: 0,
      linkMap: ['danger', ''],
      playMap: ['未开播', '正在直播', '已结束']
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await live_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Hndle create button
    handleCreate() {
      this.$router.push({ path: '/live/create-live' })
    },
    // Handle update button
    handleUpdate(row) {
      this.$router.push({ path: '/live/create-live', query: { id: row.id }})
    },
    // Handle delete button
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await live_delete({ id: row.id })
        this.$message.success(response.status)
        this.toData()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
