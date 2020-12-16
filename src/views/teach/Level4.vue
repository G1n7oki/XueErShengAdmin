<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">{{ category }}</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加科目</el-button>
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
          label="科目名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
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
    <create-subject
      v-if="dialogVisible"
      :id="id"
      :category="category"
      :pid="listQuery.pid"
      :title="title"
      @close="close"
      @update="fnUpdate"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CreateSubject from '@/views/teach/CreateSubject'
import { classify_list, classify_delete } from '@/api/teach'
export default {
  name: 'Level4',
  components: {
    Pagination,
    CreateSubject
  },
  data() {
    return {
      category: '',
      listQuery: {
        page: 1,
        per_page: 10,
        pid: 1
      },
      list: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      title: '',
      id: null,
      update: false
    }
  },
  watch: {
    update(newValue) {
      if (newValue === true) {
        this.toData()
      }
    }
  },
  created() {
    const { name, id } = this.$route.query
    if (!id) {
      this.$router.push({ path: '/' })
      return false
    }
    this.category = name
    this.listQuery.pid = +id
    this.toData()
  },
  methods: {
    async toData() {
      this.loading = true
      const response = await classify_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    handleCreate() {
      this.title = '添加'
      this.update = false
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.title = '编辑'
      this.update = false
      this.id = row.id
      this.dialogVisible = true
    },
    // 删除信息
    async handleDelete(row) {
      await classify_delete({ id: row.id })
      this.$message.success('删除成功')
      this.toData()
    },
    close(value) {
      this.dialogVisible = value
    },
    fnUpdate(value) {
      this.update = value
    }
  }
}
</script>

<style scoped>

</style>
