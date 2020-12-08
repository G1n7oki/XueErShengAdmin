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
        v-loading="loading"
        :data="list"
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
            <el-tag :type="tag[row.type]">{{ row.type ? '题库' : '课程' }}</el-tag>
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
import User from '@/api/user.json'
import { area } from '@/utils/area'
export default {
  name: 'Continue',
  components: {
    Pagination
  },
  props: {
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
      loading: true,
      total: 0,
      options: [],
      dialogVisible: true,
      tag: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  created() {
    this.toData()
    this.options = area
  },
  methods: {
    formatMoney,
    toData() {
      this.list = User.continue
      this.total = this.list.length
      this.loading = false
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
