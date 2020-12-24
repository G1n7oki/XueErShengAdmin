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
        <el-form-item>
          <el-input
            v-model="listQuery.value"
            clearable
            placeholder="课程名称"
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
          <div class="name">评价列表</div>
        </div>
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
          label="序号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="课程名称"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="status"
          label="评价分数"
          align="center"
        />
        <el-table-column
          prop="现价/原价"
          label="评论内容"
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
  name: 'Evaluate',
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
      loading: false,
      list: [],
      total: 0
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
    handleDelete() {}
  }
}
</script>

<style scoped>

</style>
