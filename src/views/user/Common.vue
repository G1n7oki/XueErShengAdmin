<template>
  <div class="app-container">
    <!-- 用户筛选 -->
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
    <!-- 表格 -->
    <el-card>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="1">
          <el-checkbox>全选</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-link type="primary">批量导出</el-link>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          align="center"
          width="50"
        >
          <template slot-scope="">
            <el-checkbox />
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
        >
          <template slot-scope="{row}">
            <span>{{ row.source | formatSource }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          align="center"
        />
        <el-table-column
          prop="last"
          label="最后选择专业"
          align="center"
        />
        <el-table-column
          prop="update_time"
          label="最后登录时间"
          align="center"
        />
        <el-table-column
          prop="is_black"
          label="账户拉黑"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              v-model="row.is_black"
              @change="blackSwitch"
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
            <el-button type="success" size="mini" @click="handleCheck(row.id)">
              查看
            </el-button>
            <el-button type="primary" size="mini" @click="handleOpen">
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
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
    </el-card>
    <!-- 开课 -->
    <continue :flag="dialogVisible" @close="hide" />
  </div>
</template>

<script>
/**
 * Excel 导出需要后台支持
 */
import User from '@/api/user.json'
import Pagination from '@/components/Pagination'
import Continue from '@/views/user/Continue'
export default {
  name: 'Common',
  components: {
    Pagination,
    Continue
  },
  filters: {
    formatSource(source) {
      switch (source) {
        case '1':
          return '小程序'
        case '2':
          return '安卓'
        case '3':
          return 'IOS'
        case '4':
          return 'PC'
        default:
          return ''
      }
    }
  },
  data() {
    return {
      listQuery: {
        date: '',
        source: '',
        value: '',
        page: 1,
        limit: 10
      },
      list: [],
      total: 0,
      loading: true,
      dialogVisible: false
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // 获取数据
    toData() {
      this.list = User.list
      this.total = this.list.length
      this.loading = false
    },
    // 查询
    handleQuery() {
      // console.log(this.listQuery.date)
      // console.log(this.listQuery.source)
      // console.log(this.listQuery.value)
    },
    // 拉黑操作
    blackSwitch(value) {
      // console.log(value)
    },
    // 点击查看
    handleCheck(id) {
      this.$router.push({ path: '/user/info', query: { id } })
    },
    // 点击开课
    handleOpen() {
      this.dialogVisible = true
    },
    hide(value) {
      this.dialogVisible = false
    }
  }
}
</script>
