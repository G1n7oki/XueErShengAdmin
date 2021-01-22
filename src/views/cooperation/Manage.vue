<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">区/县列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加地区</el-button>
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
          prop="city"
          label="所在城市"
          align="center"
        />
        <el-table-column
          prop="counties"
          label="所在区县"
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
        :model="form"
        label-width="80px"
      >
        <el-form-item label="所在城市">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="form.counties" />
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
import { area_list, area_create, area_update } from '@/api/cooperation'
export default {
  name: 'Manage',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        school_id: ''
      },
      loading: false,
      list: [],
      total: 0,
      dialogVisible: false,
      title: '',
      titleMap: ['创建地区', '编辑地区'],
      form: {
        school_id: '',
        city: '',
        counties: ''
      }
    }
  },
  created() {
    this.listQuery.school_id = this.$route.query.id
    this.form.school_id = this.$route.query.id
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await area_list(this.listQuery)
      const { data, total } = response.data
      this.total = total
      this.list = data
      this.loading = false
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Create info
    async create() {
      const response = await area_create(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle update button
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.title = this.titleMap[1]
      this.dialogVisible = true
    },
    // Update info
    async update() {
      const response = await area_update(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle save button
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
    }
  }
}
</script>

<style scoped>

</style>
