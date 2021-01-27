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
          prop="p_name"
          label="对应科目"
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
      <el-form label-width="80px">
        <el-form-item label="章节名字">
          <el-input v-model="form.name" placeholder="章节名字" />
        </el-form-item>
        <el-form-item label="对应科目">
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            @change="selectedSunject"
          />
        </el-form-item>
        <el-form-item label="试卷">
          <el-select
            v-model="form.paper_id"
            filterable
          >
            <el-option
              v-for="item in paper"
              :key="item.id"
              :label="item.title"
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
import Pagination from '@/components/Pagination'
import { practice_list, paper_all, delete_practice, create_practice, update_practice } from '@/api/topic'
import { profession_list } from '@/api/profession'
export default {
  name: 'Practise',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        search: ''
      },
      loading: false,
      list: [],
      profession: [],
      total: 0,
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        profession_list: [],
        profession_id: '',
        rid: 0,
        paper_id: ''
      },
      title: '',
      titleMap: ['创建章节', '编辑章节'],
      paper: []
    }
  },
  created() {
    this.toProfession()
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await practice_list(this.listQuery)
      const { total, data } = response.data
      this.total = total
      this.list = data
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 4 })
      this.profession = profession.data
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    async create() {
      this.form.profession_id = this.form.profession_list[3]
      const response = await create_practice(this.form)
      this.$message.success(response.status)
    },
    async handleUpdate(row) {
      this.title = this.titleMap[1]
      this.dialogVisible = true
      const response = await paper_all({
        profession: row.profession_list[3]
      })
      this.paper = response.data
      this.form = Object.assign({}, row)
    },
    async update() {
      this.form.profession_id = this.form.profession_list[3]
      const response = await update_practice(this.form)
      this.$message.success(response.status)
    },
    // Handle save button
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
      this.dialogVisible = false
      this.toData()
    },
    // Handle delete button
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await delete_practice({
          id: row.id
        })
        this.$message.success(response.status)
        this.toData()
      }).catch(() => {})
    },
    async selectedSunject() {
      const id = this.form.profession_list[3]
      const response = await paper_all({
        profession: id
      })
      this.paper = response.data
    }
  }
}
</script>

<style scoped>

</style>
