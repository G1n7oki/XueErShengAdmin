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
          prop="name"
          label="所在城市"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="所在区县"
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
          <el-input v-model="form.county" />
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
export default {
  name: 'Manage',
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
      title: '',
      titleMap: ['创建地区', '编辑地区'],
      form: {
        city: '',
        county: ''
      }
    }
  },
  methods: {
    // Get list
    toData() {},
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
