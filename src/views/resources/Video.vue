<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="视频名称" />
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
          <div class="name">视频列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加视频</el-button>
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
          label="视频名称"
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
          prop="aliyun_id"
          label="阿里云ID"
          align="center"
        />
        <el-table-column
          prop="is_try"
          label="是否试听"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link
              :type="row.status === 1 ? 'success' : 'danger'"
              :underline="false"
            >
              {{ row.is_try === 1 ? '是' : '否' }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="play_num"
          label="播放次数"
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
      title="添加视频"
      :visible.sync="createDialogVisible"
    >
      <StsUpload @complete="complete" />
    </el-dialog>
    <!-- /Dialog -->
    <!-- Dialog -->
    <el-dialog
      title="编辑视频"
      :visible.sync="updateDialogVisible"
    >
      <el-form
        ref="form"
        v-loading="formLoading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="是否试听" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择讲义" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import StsUpload from '@/components/StsUpload'
import Pagination from '@/components/Pagination'
import { video_list } from '@/api/resources'
export default {
  name: 'Video',
  components: {
    StsUpload,
    Pagination
  },
  data() {
    return {
      listQuery: {
        search: '',
        page: 1,
        per_page: 10
      },
      loading: '',
      list: [],
      total: 0,
      title: '',
      createDialogVisible: false,
      updateDialogVisible: false,
      formLoading: false,
      form: {}
    }
  },
  created() {
    this.toData()
  },
  methods: {
    async toData() {
      this.loading = true
      const response = await video_list(this.listQuery)
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
    handleCreate() {
      this.fileList = []
      this.createDialogVisible = true
    },
    // Update dialog show
    handleUpdate() {
      this.updateDialogVisible = true
    },
    handleDelete() {},
    handleSave() {},
    complete(value) {
      this.createDialogVisible = value
    }
  }
}
</script>

<style scoped>

</style>
