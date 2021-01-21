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
          prop="name"
          label="层次"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="专业"
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
        <el-form-item label="层次">
          <el-cascader
            v-model="form.level"
            :options="options"
            filterable
          />
        </el-form-item>
        <el-form-item label="专业">
          <el-cascader
            v-model="form.profession"
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
export default {
  name: 'Level',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      profession: [],
      total: 0,
      dialogVisible: false,
      title: '',
      titleMap: ['创建', '编辑'],
      form: {
        level: '',
        profession: ''
      },
      options: [{
        value: 1,
        label: '自考',
        children: [{
          value: 1,
          label: '高升专'
        }, {
          value: 2,
          label: '专升本'
        }]
      }, {
        value: 2,
        label: '成考',
        children: [{
          value: 1,
          label: '高升专'
        }, {
          value: 2,
          label: '专升本'
        }, {
          value: 3,
          label: '高升本'
        }]
      }]
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
      this.loading = false
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Create info
    create() {},
    // Handle update button
    handleUpdate(row) {
      this.title = this.titleMap[1]
      this.dialogVisible = true
    },
    // Update info
    update() {},
    // Handle save button
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
    }
  }
}
</script>

<style scoped>

</style>
