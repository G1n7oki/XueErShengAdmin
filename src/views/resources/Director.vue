<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="选择学科">
          <el-cascader
            v-model="listQuery.id"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
            <el-option label="启用" value="5" />
            <el-option label="禁用" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.name" placeholder="班主任名称" />
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
          <div class="name">班主任列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加班主任</el-button>
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
          label="ID"
          align="center"
        />
        <el-table-column
          prop="name"
          label="班主任头像"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="班主任名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="微信号"
          align="center"
        />
        <el-table-column
          prop="status"
          label="分管专业"
          align="center"
        />
        <el-table-column
          prop="click"
          label="手机号码"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="状态"
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
            <el-button type="info" size="mini" @click="handleDelete(row)">
              禁用
            </el-button>
            <el-button type="primary" size="mini" @click="handleDelete(row)">
              启用
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { profession_list } from '@/api/profession'
export default {
  name: 'Director',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        id: '',
        name: '',
        status: '',
        page: 1,
        per_page: 10
      },
      profession: [],
      loading: false,
      list: [],
      total: 1
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    toData() {},
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    handleQuery() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
