<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <!--        <el-form-item label="适用专业">
          <el-cascader
            v-model="id"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
            clearable
          />
        </el-form-item>-->
        <el-form-item label="是否上架">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
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
          type="index"
          align="center"
        />
        <el-table-column
          prop="banner"
          label="封面"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.banner" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="直播课包标题"
          align="center"
        />
        <el-table-column
          prop="name"
          label="所属专业"
          align="center"
        />
        <el-table-column
          prop="price"
          label="直播价格"
          align="center"
        />
        <el-table-column
          prop="sol_num"
          label="课时"
          align="center"
        />
        <el-table-column
          prop="status"
          label="是否上架"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link :type="linkMap[row.status]" :underline="false">{{ row.status === 1 ? '是' : '否' }}</el-link>
          </template>
        </el-table-column>
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
          width="150"
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
  </div>
</template>

<script>
import { live_package_list, live_package_delete } from '@/api/live'
import Pagination from '@/components/Pagination'
export default {
  name: 'LivePackage',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        status: '',
        search: ''
      },
      profession: [],
      id: '',
      loading: false,
      list: [],
      total: 0,
      linkMap: ['danger', '']
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await live_package_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Handle create button
    handleCreate() {
      this.$router.push({ path: '/live/create-live-package' })
    },
    // Handle update button
    handleUpdate(row) {
      this.$router.push({ path: '/live/create-live-package', query: { id: row.id }})
    },
    // Handle delete button
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await live_package_delete({ id: row.id })
        this.$message.success(response.status)
        this.toData()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
