<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">意见反馈列表</div>
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
          prop="title"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="title"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="title"
          label="时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template>
            <el-button type="info" size="mini">
              已处理
            </el-button>
            <el-button type="danger" size="mini">
              未处理
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
import Pagination from '@/components/Pagination'
export default {
  name: 'Feedback',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      total: 0
    }
  },
  methods: {
    toData() {}
  }
}
</script>

<style scoped>

</style>
