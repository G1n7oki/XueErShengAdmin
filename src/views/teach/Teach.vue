<template>
  <div class="app-container">
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
        <el-button type="primary" @click="handleCreate">添加二级学科</el-button>
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
            <div class="link" @click="toNext(row)">{{ row.count }}个</div>
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
      :title="title + '二级学科'"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        v-loading="formLoading"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="自学考试" :value="1" />
            <el-option label="成人高考" :value="2" />
            <el-option label="研究生" :value="3" />
            <el-option label="职业资格" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="数字越大约排前" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
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
import { classify_list, classify_create, classify_read, classify_update, classify_delete } from '@/api/teach'
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
        pid: '',
        name: '',
        sort: '',
        status: '',
        level: 2
      },
      profession: [],
      title: '',
      formLoading: false,
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        pid: [{ required: true, message: '请选择上级分类', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.toData()
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
    // 保存信息
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.title === '添加' ? this.create() : this.update()
        } else {
          return false
        }
      })
    },
    handleItem(pid) {
      this.tabBar.current = pid
      this.listQuery.pid = pid
      this.toData()
    },
    // 点击添加按钮
    handleCreate() {
      this.title = '添加'
      this.reset()
      this.initValidate()
      this.dialogVisible = true
    },
    // 创建信息
    async create() {
      this.formLoading = true
      await classify_create(this.form)
      this.$message.success('添加成功')
      this.listQuery.page = 1
      this.toData()
      this.formLoading = false
      this.dialogVisible = false
    },
    // 点击编辑按钮
    async handleUpdate(row) {
      this.reset()
      this.initValidate()
      this.loading = true
      this.title = '编辑'
      const response = await classify_read({ id: row.id })
      const { id, pid, name, sort, status } = response.data
      this.form = {
        id,
        pid,
        name,
        sort,
        status,
        level: 2
      }
      this.dialogVisible = true
      this.loading = false
    },
    // 更新信息
    async update() {
      this.formLoading = true
      await classify_update(this.form)
      this.$message.success('更新成功')
      this.toData()
      this.formLoading = false
      this.dialogVisible = false
    },
    // 删除信息
    async handleDelete(row) {
      if (row.count > 0) {
        this.$message.error('下属分类大于0时，不可删除')
        return false
      }
      await classify_delete({ id: row.id })
      this.$message.success('删除成功')
      this.toData()
    },
    // 初始化验证信息
    initValidate() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    // 重置表单
    reset() {
      this.form = {
        pid: '',
        name: '',
        sort: '',
        status: '',
        level: 2
      }
    },
    toNext(row) {
      this.$router.push({ path: '/teach/level3', query: { id: row.id, name: row.name }})
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
