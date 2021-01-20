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
            placeholder="姓名/身份证号"
          />
        </el-form-item>
        <el-form-item label="报考层次">
          <el-select v-model="listQuery.type" clearable placeholder="请选择">
            <el-option label="高升专" value="1" />
            <el-option label="专升本" value="2" />
            <el-option label="高升本" value="3" />
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
          type="index"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.sex === 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="idno"
          label="身份证"
          align="center"
        />
        <el-table-column
          prop="apply_type"
          label="报读类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.apply_type === 1 ? '自考' : '成考' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="year"
          label="年级"
          align="center"
        />
        <el-table-column
          prop="level"
          label="层次"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ levelMap[row.level] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="school_name"
          label="院校"
          align="center"
        />
        <el-table-column
          prop="major_name"
          label="专业"
          align="center"
        />
        <el-table-column
          prop="counties"
          label="考试县区"
          align="center"
        />
        <el-table-column
          prop="status"
          label="付款状态"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.status === 0 ? '未缴费' : '已缴费' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
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
            <el-button type="success" size="mini" @click="to(row)">
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
import { manage_list } from '@/api/consciously'
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
        per_page: 10,
        search: '',
        type: ''
      },
      loading: '',
      list: [],
      total: 0,
      levelMap: ['', '高升专', '专升本', '高升本']
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await manage_list(this.listQuery)
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
    // Router jump
    to(row) {
      this.$router.push({ path: '/consciously/transcript', query: { uid: row.user_id }})
    }
  }
}
</script>

<style scoped>

</style>
