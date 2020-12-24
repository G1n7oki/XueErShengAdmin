<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.name" placeholder="视频名称" />
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
          prop="title"
          label="视频名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="是否启用"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="是否试听"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="讲义名称"
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
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
    </el-card>
    <!-- Dialog -->
    <el-dialog
      title="添加讲义"
      :visible.sync="createDialogVisible"
    >
      <StsUpload accept=".pdf" @complete="complete" />
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
export default {
  name: 'Handout',
  components: {
    StsUpload
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      createDialogVisible: true,
      updateDialogVisible: false,
      formLoading: false,
      form: {}
    }
  },
  methods: {
    handleQuery() {},
    handleCreate() {},
    handleUpdate() {},
    handleDelete() {},
    complete(value) {
      this.createDialogVisible = value
    },
    handleSave() {}
  }
}
</script>

<style scoped>

</style>
