<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="试卷名称" />
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
          <div class="name">试卷列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加试卷</el-button>
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
          prop="content"
          label="试卷名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="对应科目"
          align="center"
        />
        <el-table-column
          prop="content_type"
          label="类别"
          align="center"
        />
        <el-table-column
          prop="name"
          label="状态"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
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
          width="250"
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
        <el-form-item label="试卷名字">
          <el-input v-model="form.name" placeholder="A/B/C/D" />
        </el-form-item>
        <el-form-item label="对应科目">
          <el-input v-model="form.name" placeholder="A/B/C/D" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.name" placeholder="A/B/C/D" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.name" placeholder="A/B/C/D" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.name" placeholder="A/B/C/D" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Paper',
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
      form: {},
      title: '',
      titleMap: ['创建试卷', '编辑试卷']
    }
  },
  methods: {
    toData() {},
    handleQuery() {},
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.title = this.titleMap[1]
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
