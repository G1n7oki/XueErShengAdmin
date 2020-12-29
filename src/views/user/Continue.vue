<template>
  <!-- 弹窗 -->
  <div v-if="flag">
    <el-dialog
      title="开课/继续下单"
      :visible.sync="dialogVisible"
      width="80%"
      @close="close"
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
            v-model="listQuery.id"
            :options="options"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="listQuery.type" clearable>
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
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        height="400"
        style="margin-top: 20px"
      >
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="order_amount"
          label="商品价格"
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
          prop="status"
          label="上架状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="linkMap[row.status]">{{ row.status ? '已上架' : '未上架' }}</el-tag>
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
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
    </el-dialog>
  </div>
  <!-- /弹窗 -->
</template>

<script>
import Pagination from '@/components/Pagination'
import { formatMoney } from '@/utils'
import { course_info } from '@/api/user'
import { profession_list } from '@/api/profession'
export default {
  name: 'Continue',
  components: {
    Pagination
  },
  filters: {
    formatOrderType(value) {
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
  props: {
    id: {
      type: Number,
      default: 1
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 5,
        direction: '',
        type: '',
        name: ''
      },
      list: [],
      loading: false,
      total: 0,
      options: [],
      dialogVisible: true,
      linkMap: ['warning', 'success', 'danger', 'info']
    }
  },
  watch: {
    id(newValue) {
      this.toData(newValue)
    }
  },
  created() {
    this.toProfessionList()
  },
  methods: {
    formatMoney,
    // Get List
    async toData(id) {
      this.loading = true
      const response = await course_info({ id })
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Get profession list
    async toProfessionList() {
      const response = await profession_list({ level: 3 })
      this.options = response.data
    },
    handleQuery() {},
    close() {
      this.dialogVisible = true
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>

</style>
