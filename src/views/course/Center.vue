<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="所属科目">
          <el-cascader
            v-model="id"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="listQuery.source" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.value"
            clearable
            placeholder="课程名称 / 老师名字"
          />
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
          <div class="name">课程列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加课程</el-button>
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
          label="封面"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="课程名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="老师名称"
          align="center"
        />
        <el-table-column
          prop="status"
          label="所属科目"
          align="center"
        />
        <el-table-column
          prop=""
          label="价格"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="课时"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="是否上架"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="info" size="mini" @click="handleUpdate(row)">
              下架
            </el-button>
            <el-button type="primary" size="mini" @click="handleDelete(row)">
              上架
            </el-button>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { profession_list } from '@/api/profession'
export default {
  name: 'Center',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10
      },
      profession: [],
      id: '',
      loading: '',
      list: [],
      total: 0
    }
  },
  created() {
    this.toData()
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
    handleCreate() {},
    handleUpdate() {},
    handleDelete() {}
  }
}
</script>

<style>

</style>
