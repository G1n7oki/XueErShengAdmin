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
          <el-select v-model="listQuery.status" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.search"
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
          prop="id"
          label="ID"
          align="center"
        />
        <el-table-column
          prop="cover"
          label="封面"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.cover" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="课程名称"
          align="center"
        />
        <el-table-column
          prop="teacher_name"
          label="老师名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="所属科目"
          align="center"
        />
        <el-table-column
          prop="price"
          label="价格"
          align="center"
        />
        <el-table-column
          prop="video_num"
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
          label="添加时间"
          align="center"
        />
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
import { course_list } from '@/api/course'
export default {
  name: 'Center',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        profession: '',
        status: '',
        search: ''
      },
      profession: [],
      id: '',
      loading: '',
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
    // Get list
    async toData() {
      this.loading = true
      const response = await course_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 4 })
      this.profession = profession.data
    },
    // Query list
    handleQuery() {
      this.listQuery.profession = this.id[3] || ''
      this.listQuery.page = 1
      this.toData()
    },
    // Handle create button
    handleCreate() {
      this.$router.push({ path: '/course/course-info' })
    },
    // Handle update button
    handleUpdate(row) {
      this.$router.push({ path: '/course/course-info', query: { id: row.id }})
    }
  }
}
</script>

<style>

</style>
