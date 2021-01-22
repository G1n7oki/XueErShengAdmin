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
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="问题标题" />
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
          <div class="name">提问列表</div>
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
          type="index"
          align="center"
        />
        <el-table-column
          prop="title"
          label="问题标题"
          align="center"
        />
        <el-table-column
          prop="username"
          label="提问人"
          align="center"
        />
        <el-table-column
          prop="crumbs"
          label="所属专业"
          align="center"
        />
        <el-table-column
          prop="addtime"
          label="提问时间"
          align="center"
        />
        <el-table-column
          prop="admire"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="answer_num"
          label="评论数"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="220"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="info" size="mini" @click="handleRead(row)">
              查看
            </el-button>
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              回复
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
      title="查看"
      :visible.sync="dialog.check"
    >
      <el-row class="check-item">
        <el-col :span="24">问题来源：{{ detail.crumbs }}</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">问题标题：{{ detail.title }}</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">
          问题内容：{{ detail.content }}
        </el-col>
      </el-row>
      <div class="image-warp">
        <el-image
          v-for="item in detail.img"
          :key="item.id"
          fit="cover"
          :src="detail.host + item.img"
          class="image-item"
        />
      </div>
      <el-row class="check-item">
        <el-col :span="24">提问人：{{ detail.username }}</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">提问时间：{{ detail.addtime }}</el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="回复"
      :visible.sync="dialog.reply"
    >
      <el-form
        :model="form"
        label-width="90px"
      >
        <el-form-item label="回复内容：">
          <el-input v-model="form.content" type="textarea" :rows="6" resize="none" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSend">发送</el-button>
          <el-button @click="dialog.reply = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { profession_list } from '@/api/profession'
import { question_list, question_detail, question_reply, question_delete } from '@/api/issue'
export default {
  name: 'Question',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        per_page: 10,
        search: '',
        profession: ''
      },
      profession: [],
      id: '',
      loading: false,
      list: [],
      total: 0,
      dialog: {
        check: false,
        reply: false
      },
      form: {
        id: '',
        content: ''
      },
      detail: {
        crumbs: '',
        title: '',
        content: '',
        img: [],
        username: '',
        addtime: '',
        host: ''
      }
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
      const response = await question_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // Query list
    handleQuery() {
      this.listQuery.profession = this.id.length > 0 ? this.id[2] : ''
      this.listQuery.page = 1
      this.toData()
    },
    // Handle read button
    async handleRead(row) {
      this.loading = true
      const response = await question_detail({ id: row.id })
      this.detail = response.data
      this.dialog.check = true
      this.loading = false
    },
    // Handle update button
    handleUpdate(row) {
      this.dialog.reply = true
      this.form.id = row.id
    },
    // Hadnle send button
    async handleSend() {
      const response = await question_reply(this.form)
      this.dialog.reply = false
      this.$message.success(response.status)
    },
    // Delete info
    async handleDelete(row) {
      const response = await question_delete({ id: row.id })
      this.$message.success(response.status)
      this.toData()
    }
  }
}
</script>

<style scoped>
.check-item {
  margin-bottom: 32px;
}
.image-warp {
  display: flex;
}
.image-item {
  width: 120px;
  height: 120px;
  margin-right: 28px;
  margin-bottom: 32px;
}
</style>
