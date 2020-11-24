<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <div class="flex">
          <div
            v-for="item in tabbar.list"
            :key="item.id"
            :class="{'active': item.id === tabbar.current}"
            class="row"
            @click="handleTabItem(item.id)"
          >{{ item.name }}</div>
        </div>
        <el-button type="warning" @click="dialog.flag = true">继续下单</el-button>
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
            <el-tag :type="tag[row.type]">{{ row.type | formatType }}</el-tag>
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
    <!-- 弹窗 -->
    <el-dialog
      title="开课/继续下单"
      :visible.sync="dialog.flag"
      width="80%"
    >
      <!-- 筛选 -->
      <el-form
        ref="form"
        :model="listQuery"
        inline
        label-width="80px"
      >
        <el-form-item label="专业方向">
          <el-cascader
            v-model="listQuery.direction"
            :options="options"
            filterable
          />
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="listQuery.type">
            <el-option label="课程" value="1" />
            <el-option label="题库" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.name"
            clearable
            placeholder="请输入商品名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- /筛选 -->
      <!-- 操作按钮 -->
      <el-row>
        <el-button type="primary">直接下单</el-button>
        <el-button>下单不支付</el-button>
      </el-row>
      <!-- /操作按钮 -->
      <!-- 继续下单表格 -->
      <el-table
        v-loading="order.loading"
        :data="order.list"
        border
        fit
        highlight-current-row
        height="400"
        style="margin-top: 20px"
      >
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="image"
          label="封面图"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 50px"
              :src="row.iamge"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          align="center"
        >
          <template slot-scope="{row}">
            <span>￥{{ formatMoney(row.price) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类型"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.type]">{{ row.type | formatType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="上架状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.status]">{{ row.status ? '已上架' : '未上架' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template>
            <el-button type="primary" size="mini">确认选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /继续下单表格 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="order.page"
        :limit.sync="order.limit"
        @pagination="toData"
      />
    </el-dialog>
    <!-- /弹窗 -->
  </div>
</template>

<script>
import User from '@/api/user.json'
import Pagination from '@/components/Pagination'
import { formatMoney } from '@/utils'
import { area } from '@/utils/area'
export default {
  name: 'Lesson',
  components: {
    Pagination
  },
  filters: {
    formatType(type) {
      switch (type) {
        case 0:
          return '课程'
        case 1:
          return '题库'
        default:
          return ''
      }
    },
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
      tabbar: { // 切换卡
        list: [{
          id: 1,
          name: '个人信息'
        }, {
          id: 2,
          name: '开课信息'
        }, {
          id: 3,
          name: '学习详情'
        }],
        current: 2
      },
      page: 1,
      limit: 10,
      loading: true,
      list: [],
      total: 1,
      // 标签
      tag: ['', 'success', 'info', 'warning', 'danger'],
      dialog: { // 弹窗
        flag: true
      },
      listQuery: {
        page: 1,
        limit: 10,
        direction: '',
        type: ''
      },
      options: [],
      order: { // 继续下单
        list: [],
        loading: true,
        page: 1,
        limit: 5
      }
    }
  },
  created() {
    this.toData()
    this.toContinueData()
    this.options = area
  },
  methods: {
    formatMoney,
    // 获取开课信息列表
    toData() {
      this.list = User.lesson
      this.loading = false
    },
    // 获取继续下单列表
    toContinueData() {
      this.order.list = User.continue
      this.order.loading = false
    },
    // 点击筛选
    handleQuery() {},
    // 关闭弹窗
    close() {
      this.$emit('close', false)
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

  .flex {
    display: flex;

    .row {
      color: #101010;
      font-size: 16px;
      margin-right: 64px;
      cursor: pointer;

      &.active {
        color: #38A28A;
      }

      &:hover {
        color: #38A28A;
      }
    }
  }
}
</style>
