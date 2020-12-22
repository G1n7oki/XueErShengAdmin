<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header" />
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
          width="100"
          prop="id"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="username"
          label="评论人昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="admire"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="addtime"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
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
import { circle_comment, discover_comment_delete } from '@/api/article'
export default {
  name: 'CirclesComment',
  components: {
    Pagination
  },
  data() {
    return {
      id: '',
      listQuery: {
        page: 1,
        per_page: 10
      },
      list: [],
      loading: false,
      total: 0
    }
  },
  created() {
    const { id } = this.$route.query
    this.id = id
    this.toData()
  },
  methods: {
    // 获取列表数据
    async toData() {
      this.loading = true
      const response = await circle_comment({ id: this.id })
      const { total, data } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 点击删除
    async handleDelete(row) {
      const response = await discover_comment_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
