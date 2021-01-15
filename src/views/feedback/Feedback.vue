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
          prop="id"
          label="序号"
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
          prop="msg"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="created_time"
          label="时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button v-if="row.status === 1" type="info" size="mini" @click="handleUpdate(row)">
              已处理
            </el-button>
            <el-button v-else type="danger" size="mini" @click="handleUpdate(row)">
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
import { feedback_list, feedback_update } from '@/api/feedback'
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
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await feedback_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Update info
    async handleUpdate(row) {
      if (row.status === 1) {
        return
      }
      const response = await feedback_update({
        id: row.id,
        status: 1
      })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
