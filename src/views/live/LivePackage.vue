<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="适用专业">
          <el-cascader
            v-model="id"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="listQuery.type" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="直播课包标题" />
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
        <el-button type="primary" @click="handleCreate">添加直播课包</el-button>
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
          label="封面"
          align="center"
        />
        <el-table-column
          prop="name"
          label="直播课包标题"
          align="center"
        />
        <el-table-column
          prop="name"
          label="所属专业（三级）"
          align="center"
        />
        <el-table-column
          prop="name"
          label="所属科目"
          align="center"
        />
        <el-table-column
          prop="name"
          label="直播价格"
          align="center"
        />
        <el-table-column
          prop="name"
          label="课时"
          align="center"
        />
        <el-table-column
          prop="name"
          label="是否上架"
          align="center"
        />
        <el-table-column
          prop="name"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="name"
          label="创建时间"
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
              查看
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
export default {
  name: 'LivePackage',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      profession: [],
      id: '',
      loading: false,
      list: [],
      total: 0
    }
  },
  methods: {
    toData() {},
    handleQuery() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
