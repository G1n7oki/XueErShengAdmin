<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="省份">
          <el-select v-model="listQuery.value" clearable>
            <el-option label="江西省" value="1" />
            <el-option label="江西省" value="2" />
            <el-option label="江西省" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="层次">
          <el-cascader
            v-model="listQuery.value1"
            :options="options"
          />
        </el-form-item>
        <el-form-item label="学习形式">
          <el-select v-model="listQuery.value" clearable>
            <el-option label="函授" value="1" />
            <el-option label="脱产" value="2" />
            <el-option label="业余" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.name" clearable placeholder="学校名称" />
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
          <div class="name">院校列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加院校</el-button>
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
          label="学校名称"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="省份"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="层次"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="学习形式"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="可报专业数"
          align="center"
        />
        <el-table-column
          prop="sort"
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
            <el-button type="info" size="mini" @click="handleUpdate(row)">
              查看
            </el-button>
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              启用
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              禁用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cooperation',
  data() {
    return {
      listQuery: {},
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
      }],
      loading: false,
      list: []
    }
  },
  methods: {
    handleQuery() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
