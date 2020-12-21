<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <user-tab-bar :id="id" :current="2" />
        <el-button type="warning" @click="dialogVisible = true">继续下单</el-button>
      </div>
      <!-- /卡片头 -->
      <!-- 表单 -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="order"
          label="订单编号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="type"
          label="商品类型"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.type]">{{ row.type ? '题库' : '课程' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.price) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="should"
          label="应付金额"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.should) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="actual"
          label="实付金额"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.actual) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.status]">{{ row.status | formatStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="下单时间"
          align="center"
        />
        <el-table-column
          prop="way"
          label="支付方式"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.way]">{{ row.way | formatWay }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表单 -->
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="page"
        :limit.sync="limit"
        @pagination="toData"
      />
      <!-- /分页 -->
    </el-card>
    <continue :flag="dialogVisible" @close="hide" />
  </div>
</template>

<script>
import User from '@/api/user.json'
import UserTabBar from '@/views/user/TabBar'
import Pagination from '@/components/Pagination'
import Continue from '@/views/user/Continue'
import { formatMoney } from '@/utils'
export default {
  name: 'Lesson',
  components: {
    Pagination,
    UserTabBar,
    Continue
  },
  filters: {
    formatStatus(status) {
      // 订单状态 0 未支付 1 已支付 2 待支付 3 已退款
      switch (status) {
        case 0:
          return '未支付'
        case 1:
          return '已支付'
        case 2:
          return '待支付'
        case 3:
          return '已退款'
        default:
          return ''
      }
    },
    formatWay(way) {
      // 支付方式 1 后台开通 2 余额 3 微信 4 支付宝
      switch (way) {
        case 1:
          return '后台开通'
        case 2:
          return '余额'
        case 3:
          return '微信'
        case 4:
          return '支付宝'
        default:
          return ''
      }
    }
  },
  data() {
    return {
      page: 1,
      limit: 10,
      loading: true,
      list: [],
      total: 1,
      // 标签
      tag: ['', 'success', 'info', 'warning', 'danger'],
      dialogVisible: false
    }
  },
  created() {
    this.id = this.$route.query.id

    this.toData()
  },
  methods: {
    formatMoney,
    // 获取开课信息列表
    toData() {
      this.list = User.lesson
      this.loading = false
    },
    hide(value) {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.flex-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
