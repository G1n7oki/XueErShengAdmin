<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="商品类型">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="课程" value="1" />
            <el-option label="直播" value="2" />
          </el-select>
        </el-form-item>
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
        <el-form-item>
          <el-input v-model="listQuery.search" clearable placeholder="请输入用户昵称/订单编号/手机号" />
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="listQuery.pay" placeholder="请选择" clearable>
            <el-option label="支付宝" value="1" />
            <el-option label="微信" value="2" />
            <el-option label="余额" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
            <el-option label="待支付" value="0" />
            <el-option label="已支付" value="1" />
            <el-option label="已取消" value="3" />
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
          <div class="name">订单列表</div>
        </div>
      </div>
      <!-- /Table header -->
      <!-- Table -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          prop="order_num"
          label="订单编号"
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
            {{ row.order_type | formatTypes }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_amount"
          label="订单金额"
          align="center"
        />
        <el-table-column
          prop="order_status"
          label="支付状态"
          align="center"
        >
          <template slot-scope="{row}">
            {{ statusMap[row.order_status] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="pay_time"
          label="支付时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleRead(row)">
              查看
            </el-button>
            <el-button v-if="row.order_status === 0" type="info" size="mini" @click="handleCancel(row)">
              取消
            </el-button>
            <el-button v-if="row.order_status === 3" type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /Table -->
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
    <!-- Dialog -->
    <el-dialog
      title="查看订单"
      :visible.sync="dialogVisible"
    >
      <div class="explain">
        <div class="explain-title">
          基本信息
        </div>
        <el-row class="explain-item">
          <el-col :span="12">昵称: {{ user.username }}</el-col>
          <el-col :span="12">支付金额: {{ info.real_amount }}</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">手机号: {{ user.login_tel }}</el-col>
          <el-col :span="12">支付状态: {{ statusMap[info.order_status] }}</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">订单编号: {{ info.order_num }}</el-col>
          <el-col :span="12">支付时间: {{ info.pay_time }}</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">创建时间: {{ info.created_at }}</el-col>
          <el-col :span="12">支付方式: {{ info.pay_type }}</el-col>
        </el-row>
      </div>
      <div class="explain">
        <div class="explain-title">
          商品信息
        </div>
        <el-row class="explain-item">
          <el-col :span="12">商品名称: {{ goods.title }}</el-col>
          <el-col :span="12">商品类型: {{ info.order_type | formatTypes }}</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">商品价格: {{ goods.price }}</el-col>
          <el-col :span="12">商品ID: {{ goods.id }}</el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { order_list, order_detail, order_update, order_delete } from '@/api/order'
export default {
  name: 'Order',
  components: {
    Pagination
  },
  filters: {
    formatTypes(value) {
      switch (value) {
        case 1:
          return '课程'
        case 2:
          return '直播'
        case 3:
          return '试卷'
        default:
          return ''
      }
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        search: '',
        type: '',
        start_time: '',
        end_time: '',
        pay: '',
        status: ''
      },
      loading: false,
      list: [],
      total: 0,
      dialogVisible: false,
      statusMap: ['待支付', '已支付', '已退款', '已取消'],
      user: {
        username: '',
        login_tel: ''
      },
      info: {
        order_num: '',
        pay_time: '',
        created_at: '',
        pay_type: '',
        order_status: '',
        order_type: '',
        real_amount: ''
      },
      goods: {
        id: '',
        title: '',
        price: ''
      }
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await order_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Read info
    async handleRead(row) {
      this.loading = true
      const response = await order_detail({ id: row.id })
      const { user, info, goods } = response.data
      this.info = info
      this.user = user
      this.goods = goods
      this.loading = false
      this.dialogVisible = true
    },
    // Cancel order
    async handleCancel(row) {
      const response = await order_update({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    },
    // Delete order
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await order_delete({ id: row.id })
        this.$message.success(response.status)
        this.toData()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.explain {
  border-bottom: 1px solid #D9D9D9;
  margin-bottom: 25px;
}
.explain-title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 24px;
}
.explain-item {
  margin-bottom: 32px;
}
</style>
