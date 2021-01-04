<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="讲义名称" />
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
          <div class="name">讲义列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加讲义</el-button>
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
          type="index"
          align="center"
        />
        <el-table-column
          prop="file_name"
          label="讲义名称"
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
      title="添加讲义"
      :visible.sync="dialogVisible.create"
      @close="close"
    >
      <el-form>
        <el-form-item align="center">
          <el-upload
            class="upload-demo"
            drag
            :action="url"
            :headers="headers"
            name="image"
            :data="{ type: 3 }"
            multiple
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
    <!-- Dialog -->
    <el-dialog
      title="编辑讲义"
      :visible.sync="dialogVisible.update"
    >
      <el-form
        v-loading=""
        :model="form"
        label-width="80px"
      >
        <el-form-item label="讲义名称">
          <el-input v-model="form.name" placeholder="请输入讲义名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">保存</el-button>
          <el-button @click="dialogVisible.update = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import { url, headers } from '@/api/uplaod'
import { handout_list, handout_create, handout_update } from '@/api/resources'
import Pagination from '@/components/Pagination'
export default {
  name: 'Handout',
  components: {
    Pagination
  },
  data() {
    return {
      url,
      headers,
      listQuery: {
        search: '',
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      dialogVisible: {
        create: false,
        update: false
      },
      form: {
        id: '',
        name: ''
      },
      formLoading: false
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await handout_list(this.listQuery)
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
      this.dialogVisible.create = true
    },
    // Handle update button
    handleUpdate(row) {
      this.form = {
        id: row.id,
        name: row.file_name
      }
      this.dialogVisible.update = true
    },
    // Update handout
    async update() {
      this.formLoading = true
      const response = await handout_update(this.form)
      this.$message.success(response.status)
      this.dialogVisible.update = false
      this.formLoading = false
      this.toData()
    },
    // Restricted file type
    beforeUpload(file) {
      if (file.type !== 'application/pdf') {
        this.$message.error('只能上传PDF文件')
        return false
      }
    },
    // Upload success
    async successUpload(res, file) {
      await handout_create({
        src: res.data.host_url,
        file_name: file.name
      })
    },
    // Close create dialog
    close() {
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
