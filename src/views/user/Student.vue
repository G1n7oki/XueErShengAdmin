<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">用户筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="专业方向">
          <el-cascader
            v-model="listQuery.direction"
            :options="[]"
            :props="{ value: 'label' }"
            filterable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.value"
            clearable
            placeholder="请输入用户ID、昵称、手机号"
            style="width: 300px"
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
          <div class="name">学员列表</div>
        </div>
        <el-button type="primary" @click="dialogVisible = true">开通专业</el-button>
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
          prop="username"
          label="用户昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="profession_id"
          label="专业方向"
          align="center"
        />
        <el-table-column
          prop="indate"
          label="有效期"
          align="center"
        />
        <el-table-column
          prop="teacher"
          label="开课老师"
          align="center"
        />
        <el-table-column
          prop="date"
          label="开课时间"
          align="center"
        />
        <el-table-column
          prop="mark"
          label="备注"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="250"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="info" size="mini" @click="handleRead(row)">
              查看
            </el-button>
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
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
    <!-- Dialog -->
    <el-dialog
      title="开通专业"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="formData"
        label-width="80px"
      >
        <el-form-item
          v-for="(item, index) in formData.account"
          :key="'A' + index"
          :label="item.label"
        >
          <el-input
            v-model="item.value"
            style="width: 400px"
            placeholder="请输入手机号码"
          />
          <i
            v-if="index === 0"
            class="el-icon-circle-plus-outline icon"
            @click="handleAccount(index, item)"
          />
          <i
            v-else
            class="el-icon-remove-outline icon"
            @click="handleAccount(index, item)"
          />
        </el-form-item>
        <el-form-item
          v-for="(item, index) in formData.direction"
          :key="'D' + index"
          :label="item.label"
        >
          <el-cascader
            v-model="item.value"
            :options="[]"
            :props="{ value: 'label' }"
            filterable
            placeholder="请选择专业方向"
            style="width: 400px"
          />
          <i
            v-if="index === 0"
            class="el-icon-circle-plus-outline icon"
            @click="handleDirection(index, item)"
          />
          <i
            v-else
            class="el-icon-remove-outline icon"
            @click="handleDirection(index, item)"
          />
        </el-form-item>
        <el-form-item label="开通时间">
          <el-date-picker
            v-model="formData.date"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="有效期">
          <el-input
            v-model="formData.indate"
            placeholder="请输入内容"
            style="width: 220px"
          >
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.mark"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { student_list } from '@/api/user'
export default {
  name: 'Student',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        direction: '',
        value: '',
        page: 1,
        limit: 10
      },
      list: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      formData: {
        account: [{
          value: '',
          label: '学员账号'
        }],
        direction: [{
          value: '',
          label: '专业方向'
        }],
        date: '',
        indate: '',
        mark: ''
      }
    }
  },
  created() {
    this.toData()
  },
  methods: {
    async toData() {
      this.loading = true
      const response = await student_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    handleQuery() {},
    // 增加删除学员账号
    handleAccount(index, item) {
      if (index === 0) {
        this.formData.account.push({
          value: '',
          label: ''
        })
      } else {
        const idx = this.formData.account.indexOf(item)
        if (idx !== -1) {
          this.formData.account.splice(idx, 1)
        }
      }
    },
    // 增加删除专业方向
    handleDirection(index, item) {
      if (index === 0) {
        this.formData.direction.push({
          value: '',
          label: ''
        })
      } else {
        const idx = this.formData.direction.indexOf(item)
        if (idx !== -1) {
          this.formData.direction.splice(idx, 1)
        }
      }
    },
    // 查看
    handleRead(row) {},
    // 编辑
    handleUpdate(row) {},
    // 删除
    handleDelete(row) {}
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 20px;
  margin-left: 20px
}
</style>
