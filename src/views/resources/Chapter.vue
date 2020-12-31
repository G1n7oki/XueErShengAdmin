<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="章节名称" />
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
          <div class="name">章节列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加章节</el-button>
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
          label="章节名称"
          align="center"
        />
        <el-table-column
          prop="status"
          label="是否启用"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link
              :type="row.status === 1 ? 'success' : 'danger'"
              :underline="false"
            >
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="关联视频"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="创建时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
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
        :limit.sync="listQuery.per_page"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
    <!-- Dialog -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form
        v-loading="formLoading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="章节名称">
          <el-input v-model="form.name" placeholder="请输入章节名称" />
        </el-form-item>
        <el-form-item label="关联视频">
          <el-select v-model="videoMap">
            <el-options
              v-for="item in video"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import { chapter_list } from '@/api/resources'
import Pagination from '@/components/Pagination'
export default {
  name: 'Chapter',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        search: '',
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      title: '',
      titleMap: ['添加章节',  '编辑章节'],
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        video: ''
      },
      formLoading: false,
      videoMap: [],
      video: []
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await chapter_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Handle update button
    handleUpdate(row) {
      this.form = {
        id: row.id,
        name: row.name
      }
      this.dialogVisible = true
    },
    handleSave() {}
  }
}
</script>

<style scoped>

</style>
