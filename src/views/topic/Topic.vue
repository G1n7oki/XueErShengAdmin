<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="题目内容" />
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
          <div class="name">题目列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加题目</el-button>
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
          prop="content"
          label="题目内容"
          align="center"
        />
        <el-table-column
          prop="parse"
          label="解析"
          align="center"
        />
        <el-table-column
          prop="content_type"
          label="类别"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ typeMap[row.content_type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="对应科目"
          align="center"
        />
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
          width="250"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑题目
            </el-button>
            <el-button type="primary" size="mini" @click="handleOption(row)">
              编辑选项
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
      :title="topic.title"
      :visible.sync="topic.dialog"
    >
      <el-form
        :model="topic.form"
        label-width="80px"
      >
        <el-form-item label="题目内容">
          <el-input v-model="topic.form.content" />
        </el-form-item>
        <el-form-item label="解析">
          <el-input v-model="topic.form.parse" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="topic.form.question_type">
            <el-option label="单选" :value="1" />
            <el-option label="多选" :value="2" />
            <el-option label="判断" :value="3" />
            <el-option label="主观" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-cascader
            v-model="topic.form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="topic.form.sort" />
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="topic.form.year" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">确定</el-button>
          <el-button @click="topic.dialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
    <!-- Dialog -->
    <el-dialog
      title="编辑选项"
      :visible.sync="options.dialog"
    >
      <el-form
        v-loading="options.loading"
        label-width="80px"
      >
        <el-row
          v-for="(item, index) in options.item"
          :key="index"
        >
          <el-col :span="8">
            <el-form-item label="选项名称">
              <el-input v-model="item.abcd_order" placeholder="A/B/C/D" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选项内容">
              <el-input v-model="item.content" placeholder="选项内容" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="设为答案">
              <el-checkbox v-model="item.is_answer" :true-label="1" :false-label="0" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDeleteOption(item)" />
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="handleSaveOption">保存</el-button>
          <el-button @click="handleNewOption">新增选项</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { profession_list } from '@/api/profession'
import {
  topic_list,
  topic_option_detail,
  update_topic_option,
  delete_topic_option,
  delete_topic,
  create_topic,
  update_topic
} from '@/api/topic'
export default {
  name: 'Topic',
  components: {
    Pagination
  },
  data() {
    return {
      id: '',
      listQuery: {
        page: 1,
        per_page: 10,
        search: ''
      },
      loading: false,
      list: [],
      profession: [],
      total: 0,
      topic: {
        title: '',
        titleMap: ['创建题目', '编辑题目'],
        dialog: false,
        form: {
          parse: '',
          question_type: '',
          profession_id: '',
          profession_list: [],
          year: ''
        }
      },
      options: {
        item: [{
          id: '',
          name: '',
          content: '',
          is_answer: '',
          sort: ''
        }],
        dialog: false,
        loading: false
      },
      typeMap: ['', '单选', '多选', '判断', '主观']
    }
  },
  created() {
    this.toProfession()
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await topic_list(this.listQuery)
      const { total, data } = response.data
      this.total = total
      this.list = data
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 4 })
      this.profession = profession.data
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    handleCreate() {
      this.topic.title = this.topic.titleMap[0]
      this.topic.dialog = true
    },
    async create() {
      this.topic.form.profession_id = this.topic.form.profession_list[3]
      const response = await create_topic(this.topic.form)
      this.$message.success(response.status)
    },
    // Handle update button
    handleUpdate(row) {
      this.topic.title = this.topic.titleMap[1]
      this.topic.form = Object.assign({}, row)
      this.topic.dialog = true
    },
    // update info
    async update() {
      this.topic.form.profession_id = this.topic.form.profession_list[3]
      const response = await update_topic(this.topic.form)
      this.$message.success(response.status)
    },
    // Handle save button
    handleSave() {
      this.topic.title === this.topic.titleMap[0] ? this.create() : this.update()
      this.topic.dialog = false
      this.toData()
    },
    // Handle option button
    async handleOption(row) {
      this.options.dialog = true
      this.options.loading = true
      const response = await topic_option_detail({ question_id: row.id })
      this.id = row.id
      this.options.item = response.data.option
      this.options.loading = false
    },
    // Handle new option button
    handleNewOption() {
      this.options.item.push({
        id: '',
        abcd_order: '',
        content: '',
        is_answer: ''
      })
    },
    // Save options
    async handleSaveOption() {
      const formData = {
        question_id: this.id,
        option: this.options.item
      }
      const response = await update_topic_option({
        json: JSON.stringify(formData)
      })
      this.$message.success(response.status)
      this.options.dialog = false
      this.toData()
    },
    // Handle delete button
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await delete_topic({
          id: row.id
        })
        this.$message.success(response.status)
        this.toData()
      }).catch(() => {})
    },
    // Delete topic option
    handleDeleteOption(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await delete_topic_option({
          question_id: this.id,
          id: row.id
        })
        this.$message.success(response.status)
        this.options.loading = true
        const options = await topic_option_detail({ question_id: this.id })
        this.options.item = options.data.option
        this.options.loading = false
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
