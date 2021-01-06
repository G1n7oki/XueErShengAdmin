<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item label="是否启用">
          <el-select v-model="listQuery.status" placeholder="请选择" clearable>
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="班主任名称" />
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
          prop="id"
          label="ID"
          align="center"
        />
        <el-table-column
          prop="head"
          label="班主任头像"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.head" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="班主任名称"
          align="center"
        />
        <el-table-column
          prop="wechat_id"
          label="微信号"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link :type="linkMap[row.status]" :underline="false">{{ row.status === 1 ? '启用' : '禁用' }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
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
import { director_list } from '@/api/resources'
export default {
  name: 'Director',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        id: '',
        search: '',
        status: '',
        page: 1,
        per_page: 10
      },
      profession: [],
      loading: false,
      list: [],
      total: 0,
      linkMap: ['danger', '']
    }
  },
  created() {
    this.toData()
    this.toProfession()
  },
  methods: {
    // Get director list
    async toData() {
      this.loading = true
      const response = await director_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Handle create button
    handleCreate() {
      this.$router.push({ path: '/resources/create-director' })
    },
    // Handle update button
    handleUpdate(row) {
      this.$router.push({ path: '/resources/create-director', query: { id: row.id }})
    }
  }
}
</script>

<style scoped>

</style>
