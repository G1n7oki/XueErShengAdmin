<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="商品类型">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="课程" value="5" />
            <el-option label="课程包" value="6" />
            <el-option label="直播课" value="6" />
            <el-option label="题库" value="6" />
          </el-select>
        </el-form-item>
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
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="请输入用户昵称/订单编号/手机号" />
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="课程" value="5" />
            <el-option label="课程包" value="6" />
            <el-option label="直播课" value="6" />
            <el-option label="题库" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="课程" value="5" />
            <el-option label="课程包" value="6" />
            <el-option label="直播课" value="6" />
            <el-option label="题库" value="6" />
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
          prop="id"
          label="订单编号"
          align="center"
        />
        <el-table-column
          prop="id"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="id"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="id"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="id"
          label="商品类型"
          align="center"
        />
        <el-table-column
          prop="id"
          label="订单金额"
          align="center"
        />
        <el-table-column
          prop="id"
          label="支付状态"
          align="center"
        />
        <el-table-column
          prop="id"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="id"
          label="支付时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleRead(row)">
              查看
            </el-button>
            <el-button type="info" size="mini" @click="handleRead(row)">
              取消
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
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
          <el-col :span="12">昵称: 昵称</el-col>
          <el-col :span="12">支付金额: 支付金额</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">手机号: 手机号</el-col>
          <el-col :span="12">支付状态: 支付状态</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">订单编号: 订单编号</el-col>
          <el-col :span="12">支付时间: 支付时间</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">创建时间: 创建时间</el-col>
          <el-col :span="12">支付方式: 支付方式</el-col>
        </el-row>
      </div>
      <div class="explain">
        <div class="explain-title">
          商品信息
        </div>
        <el-row class="explain-item">
          <el-col :span="12">商品名称: 商品名称</el-col>
          <el-col :span="12">商品类型: 商品类型</el-col>
        </el-row>
        <el-row class="explain-item">
          <el-col :span="12">商品价格: 商品价格</el-col>
          <el-col :span="12">商品ID: 商品ID</el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Order',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      total: 0,
      dialogVisible: true
    }
  },
  methods: {
    toData() {},
    handleQuery() {}
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
