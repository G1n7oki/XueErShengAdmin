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
          <div class="name">视频列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加视频</el-button>
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
      :title="title + '班型'"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        v-loading="formLoading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="视频上传" prop="name">
          <el-upload
            class="upload-demo"
            drag
            action=""
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
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
        <el-form-item label="讲义上传" prop="name">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将讲义拖到此处，或<em>点击上传</em></div>
          </el-upload>
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
const OSS = require('ali-oss')
export default {
  name: 'Video',
  data() {
    return {
      listQuery: {},
      loading: '',
      list: [],
      title: '',
      dialogVisible: true,
      formLoading: false,
      form: {}
    }
  },
  created() {
    console.log(OSS)
  },
  methods: {
    handleQuery() {},
    handleCreate() {},
    handleUpdate() {},
    handleDelete() {},
    handleSave() {}
  }
}
</script>

<style scoped>

</style>
