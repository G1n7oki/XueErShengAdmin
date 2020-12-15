<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">班型列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加班型</el-button>
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
          prop="name"
          label="课程班型名称"
          align="center"
        />
        <el-table-column
          prop="type"
          label="班型分类"
          align="center"
        />
        <el-table-column
          prop="show"
          label="是否显示"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
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
export default {
  name: 'Type',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      list: [],
      total: 0
    }
  },
  created() {
    // this.toData()
  },
  methods: {
    toData() {},
    handleCreate() {},
    handleUpdate() {}
  }
}
</script>

<style scoped>

</style>
