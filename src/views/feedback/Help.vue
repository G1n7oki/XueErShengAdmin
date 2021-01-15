<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">帮助列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加帮助</el-button>
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
          label="编号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="问题"
          align="center"
        />
        <el-table-column
          prop="content"
          label="回答"
          align="center"
        />
        <el-table-column
          prop="cat_id"
          label="类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.cat_id === 1 ? '账号问题' : '其他问题' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150"
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
    <!-- Dialog -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="问题">
          <el-input v-model="form.title" placeholder="请输入问题标题" />
        </el-form-item>
        <el-form-item label="回答">
          <el-input v-model="form.content" type="textarea" :rows="4" resize="none" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.cat_id" placeholder="请选择">
            <el-option label="账号问题" :value="1" />
            <el-option label="其他问题" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="数字越大越靠前" />
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
import Pagination from '@/components/Pagination'
import { help_list, help_create, help_update, help_delete } from '@/api/feedback'
export default {
  name: 'Help',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      total: 0,
      dialogVisible: false,
      titleMap: ['添加帮助', '编辑帮助'],
      title: '',
      form: {
        id: '',
        title: '',
        content: '',
        cat_id: '',
        sort: ''
      }
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await help_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Create info
    async create() {
      const response = await help_create(this.form)
      this.$message.success(response.status)
    },
    // Handle update button
    handleUpdate(row) {
      this.form = row
      this.title = this.titleMap[1]
      this.dialogVisible = true
    },
    // Update info
    async update() {
      const response = await help_update(this.form)
      this.$message.success(response.status)
    },
    // Handle save button
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
      this.toData()
      this.dialogVisible = false
    },
    // Delete info
    async handleDelete(row) {
      const response = await help_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
