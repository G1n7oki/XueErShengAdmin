<template>
  <div class="app-container">
    <!-- 用户筛选 -->
    <el-card class="filter-container">
      <div class="filter-title">用户筛选</div>
      <el-form :inline="true" :model="listQuery">
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
        <el-form-item label="注册来源">
          <el-select v-model="listQuery.source" clearable>
            <el-option label="小程序" value="1" />
            <el-option label="安卓" value="2" />
            <el-option label="IOS" value="3" />
            <el-option label="PC" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.search"
            clearable
            placeholder="请输入用户手机号"
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          width="80"
          prop="id"
          label="用户ID"
          align="center"
        />
        <el-table-column
          prop="username"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="source_cn"
          label="注册来源"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="注册时间"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="最后选择专业"
          align="center"
        />
        <el-table-column
          prop="last_login_time"
          label="最后登录时间"
          align="center"
        />
        <el-table-column
          prop="status"
          label="账户拉黑"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              v-model="row.status"
              :active-value="0"
              :inactive-value="1"
              @change="blackSwitch(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleCheck(row)">
              查看
            </el-button>
            <el-button type="primary" size="mini" @click="handleOpen(row)">
              开课
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="toData"
      />
    </el-card>
    <!-- 开课 -->
    <!-- Dialog -->
    <el-dialog
      title="开课/继续下单"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <continue :uid="uid" />
    </el-dialog>
    <!-- Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Continue from '@/views/user/Continue'
import { common_list, user_black } from '@/api/user'
export default {
  name: 'Common',
  components: {
    Pagination,
    Continue
  },
  data() {
    return {
      date: ['', ''],
      listQuery: {
        start: '',
        end: '',
        source: '',
        search: '',
        page: 1,
        per_page: 10
      },
      list: [],
      total: 0,
      loading: true,
      dialogVisible: false,
      uid: 0
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // 获取数据
    async toData() {
      this.loading = true
      const response = await common_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 查询
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // 拉黑操作
    async blackSwitch(row) {
      await user_black({
        id: row.id,
        status: row.status
      })
      this.$message.success('操作成功')
    },
    // 点击查看
    handleCheck(row) {
      if (!row.is_applies) {
        this.$message.error('该用户没有报名信息')
        return false
      }
      this.$router.push({ path: '/user/info', query: { id: row.id }})
    },
    // 点击开课
    async handleOpen(row) {
      this.uid = row.id
      this.dialogVisible = true
    }
  }
}
</script>
