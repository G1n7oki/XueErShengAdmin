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
          prop="id"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="评论人昵称"
          align="center"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
        />
        <el-table-column
          prop="hit"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="date"
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
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { circle_comment } from '@/api/article'
export default {
  name: 'CirclesComment',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      list: [],
      loading: false,
      total: 0
    }
  },
  created() {
    this.toData()
  },
  methods: {
    toData() {
      this.loading = true
      circle_comment().then(response => {
        this.list = response.data
        this.total = this.list.length
        this.loading = false
      }).catch(error => {
        this.list = []
        this.loading = false
        console.log(error)
      })
    },
    handleDelete() {}
  }
}
</script>

<style scoped>

</style>
