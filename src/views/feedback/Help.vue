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
          prop="title"
          label="编号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="问题"
          align="center"
        />
        <el-table-column
          prop="title"
          label="回答"
          align="center"
        />
        <el-table-column
          prop="title"
          label="类型"
          align="center"
        />
        <el-table-column
          prop="title"
          label="排序"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleDelete(row)">
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
      :title="text"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="问题">
          <el-input v-model="form.input" placeholder="请输入问题标题" />
        </el-form-item>
        <el-form-item label="回答">
          <el-input v-model="form.input" type="textarea" :rows="4" resize="none" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.value" placeholder="请选择">
            <el-option label="账号问题" value="1" />
            <el-option label="其他问题" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.input" placeholder="数字越大越靠前" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
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
      dialogVisible: true,
      titleMap: ['添加帮助', '编辑帮助'],
      text: '',
      form: {}
    }
  },
  methods: {
    toData() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
