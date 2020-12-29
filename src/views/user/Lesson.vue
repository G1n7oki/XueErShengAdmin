<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <user-tab-bar :uid="id" :current="2" />
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
          prop="order_num"
          label="订单编号"
          align="center"
        />
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="order_type"
          label="商品类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.order_type | formatOrderType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_amount"
          label="单价"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.order_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="due_amount"
          label="应付金额"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.due_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_amount"
          label="实付金额"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.real_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="订单状态"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.order_status | formatOrderStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="下单时间"
          align="center"
        />
        <el-table-column
          prop="pay_type"
          label="支付方式"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link type="success">{{ row.pay_type | formatPayType }}</el-link>
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
import UserTabBar from '@/views/user/TabBar'
import Pagination from '@/components/Pagination'
import Continue from '@/views/user/Continue'
import { formatMoney } from '@/utils'
import { course_info } from '@/api/user'
export default {
  name: 'Lesson',
  components: {
    Pagination,
    UserTabBar,
    Continue
  },
  filters: {
    formatOrderType(type) {
      switch (type) {
        case 1:
          return '课程'
        case 2:
          return '直播'
        case 3:
          return '试卷'
        default:
          return ''
      }
    },
    formatOrderStatus(status) {
      switch (status) {
        case 0:
          return '未支付'
        case 1:
          return '已支付'
        case 2:
          return '已退款'
        case 3:
          return '已取消'
        default:
          return ''
      }
    },
    formatPayType(type) {
      switch (type) {
        case 1:
          return '支付宝'
        case 2:
          return '微信'
        case 3:
          return '余额'
        case 4:
          return '兑换码'
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
      total: 0,
      dialogVisible: false,
      id: 0
    }
  },
  created() {
    this.id = +this.$route.query.id
    console.log(this.id)
    this.toData()
  },
  methods: {
    formatMoney,
    // Get list
    async toData() {
      this.loading = true
      const response = await course_info({ id: this.id })
      const { data, total } = response.data
      this.list = data
      this.total = total
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
