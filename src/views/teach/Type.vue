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
          prop="category"
          label="班型分类"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.category === 0 ? '单科' : '全科' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="p_name"
          label="所属专业"
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
      :title="title + '班型'"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        v-loading="formLoading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="班型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="班型分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="单科" :value="0" />
            <el-option label="全科" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目" prop="profession_list">
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
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
import { class_type_list, class_type_create, class_type_detail, class_type_update } from '@/api/teach'
import { profession_list } from '@/api/profession'
export default {
  name: 'Type',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      form: {
        id: '',
        profession_list: [],
        name: '',
        category: '',
        profession_id: ''
      },
      dialogVisible: false,
      title: '',
      formLoading: false,
      profession: []
    }
  },
  created() {
    this.toData()
    this.toProfession()
  },
  methods: {
    // 获取列表数据
    async toData() {
      this.loading = true
      const response = await class_type_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // 点击添加按钮
    handleCreate() {
      this.title = '添加'
      this.reset()
      // this.initValidate()
      this.dialogVisible = true
    },
    // 创建信息
    async create() {
      this.formLoading = true
      this.form.profession_id = this.form.profession_list[2]
      const response = await class_type_create(this.form)
      this.$message.success(response.status)
      this.toData()
      this.formLoading = false
      this.dialogVisible = false
    },
    // 点击编辑按钮
    async handleUpdate(row) {
      this.reset()
      // this.initValidate()
      this.loading = true
      this.title = '编辑'
      const response = await class_type_detail({ id: row.id })
      this.form = response.data
      this.dialogVisible = true
      this.loading = false
      console.log(this.form)
    },
    // 更新信息
    async update() {
      this.formLoading = true
      this.form.profession_id = this.form.profession_list[2]
      const response = await class_type_update(this.form)
      this.$message.success(response.status)
      this.toData()
      this.formLoading = false
      this.dialogVisible = false
    },
    // 保存信息
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.title === '添加' ? this.create() : this.update()
        } else {
          return false
        }
      })
    },
    // 初始化验证信息
    initValidate() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    // 重置表单
    reset() {
      this.form = {
        id: '',
        profession_list: [],
        name: '',
        category: '',
        profession_id: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
