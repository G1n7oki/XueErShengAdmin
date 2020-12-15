<template>
  <div class="app-container">
    <!-- Filter -->
    <!-- <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="学科分类">
          <el-cascader
            v-model="listQuery.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <!-- /Filter -->
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div
            v-for="item in tabBar.data"
            :key="item.pid"
            :class="{'active': tabBar.current === item.pid}"
            class="item"
            @click="handleItem(item.pid)"
          >{{ item.name }}</div>
        </div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加二级学科</el-button>
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
          prop="name"
          label="二级学科名称"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link :type="row.status === 0 ? 'danger' : ''" :underline="false">{{ row.status === 0 ? '禁用' : '启用' }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="下属分类"
          align="center"
        >
          <template slot-scope="{row}">
            <div class="link">{{ row.count }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
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
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
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
      title="添加二级学科"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input v-model="form.value" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="form.value1" placeholder="请选择">
            <el-option label="自学考试" :value="1" />
            <el-option label="成人高考" :value="2" />
            <el-option label="研究生" :value="3" />
            <el-option label="职业资格" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.value2" placeholder="数字越大约排前" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="form.value3" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
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
import Pagination from '@/components/Pagination'
import { classify_list } from '@/api/teach'
// import { profession_list } from '@/api/profession'
export default {
  name: 'Teach',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        pid: 1
      },
      loading: false,
      list: [],
      total: 0,
      // 切换卡
      tabBar: {
        data: [{
          pid: 1,
          name: '自学考试'
        }, {
          pid: 2,
          name: '成人高考'
        }, {
          pid: 3,
          name: '研究生'
        }, {
          pid: 4,
          name: '职业资格'
        }],
        current: 1
      },
      dialogVisible: false,
      form: {
        value: '',
        value1: '',
        value2: '',
        value3: ''
      },
      profession: []
    }
  },
  created() {
    this.toData()
    // this.toProfession()
  },
  methods: {
    // 表格数据
    async toData() {
      this.loading = true
      const response = await classify_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 专业数据
    // async toProfession() {
    //   const profession = await profession_list({ level: 3 })
    //   this.profession = profession.data
    // },
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    handleSave() {},
    handleUpdate() {},
    handleDelete(row) {
      if (row.count > 0) {
        this.$message.error('下属分类大于0时，不可删除')
        return false
      }
    },
    handleItem(pid) {
      this.tabBar.current = pid
      this.listQuery.pid = pid
      this.toData()
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  color: #38A28A;
  cursor: pointer;
}
</style>
