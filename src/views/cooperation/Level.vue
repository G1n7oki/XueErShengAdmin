<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">层次/专业列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加层次/专业</el-button>
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
          prop="type"
          label="类型"
          align="center"
        >
          <template slot-scope="{row}">
            {{ row.type === 1 ? '自考' : '成考' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="层次"
          align="center"
        >
          <template slot-scope="{row}">
            {{ levelMap[row.level] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="专业"
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
          width="200"
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
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="自考" :value="1" />
            <el-option label="成考" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="层次">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option label="高升专" :value="1" />
            <el-option label="专升本" :value="2" />
            <el-option label="高升本" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
          />
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
import { profession_list } from '@/api/profession'
import { major_list, major_create, major_update } from '@/api/cooperation'
export default {
  name: 'Level',
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
      profession: [],
      total: 0,
      dialogVisible: false,
      title: '',
      titleMap: ['创建', '编辑'],
      levelMap: ['', '高升专', '专升本', '高升本'],
      form: {
        school_id: '',
        type: '',
        level: '',
        sort: '',
        profession_id: '',
        profession_list: '',
        id: ''
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
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
      const response = await major_list(this.listQuery)
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
      this.form.profession_id = this.form.profession_list[2]
      const response = await major_create(this.form)
      this.$message.success(response.status)
    },
    // Handle update button
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.title = this.titleMap[1]
      this.dialogVisible = true
    },
    // Update info
    async update() {
      this.form.profession_id = this.form.profession_list[2]
      const response = await major_update(this.form)
      this.$message.success(response.status)
    },
    // Handle save button
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
      this.dialogVisible = false
      this.toData()
    }
  }
}
</script>

<style scoped>

</style>
