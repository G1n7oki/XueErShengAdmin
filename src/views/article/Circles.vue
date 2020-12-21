<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="listQuery.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.search" placeholder="发布人昵称搜索" />
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
          <div class="name">圈子列表</div>
        </div>
      </div>
      <!-- /Table header -->
      <!-- Table -->
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
          label="序号"
          align="center"
        />
        <el-table-column
          prop="username"
          label="发布人昵称"
          align="center"
        />
        <el-table-column
          prop="login_tel"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="content"
          label="发布内容"
          align="center"
        />
        <el-table-column
          prop="admire"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="comment_num"
          label="评论数"
          align="center"
        />
        <el-table-column
          prop="created_at"
          label="发布时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleRead(row)">
              查看内容
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /Table -->
      <!-- Page -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="toData"
      />
      <!-- /Page -->
      <!-- Dialog -->
      <el-dialog
        title="查看内容"
        :visible.sync="dialogVisible"
      >
        <div class="rich-text-title">
          最新！2020年江西省高校毕业生“三支一扶”计划招募考试笔试时间确定！
        </div>
        <div class="rich-text-content" v-html="nodes" />
      </el-dialog>
      <!-- /Dialog -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { circle_list } from '@/api/article'
export default {
  name: 'Circles',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        date: [],
        search: '',
        page: 1,
        per_page: 10
      },
      total: 0,
      loading: false,
      list: [],
      dialogVisible: false,
      nodes: '<div style="text-align: center"><div style="text-align: center">同时，我省还公布了艺术、体育类各批次文化录取控制线和专业合格线、资格线。艺术学理论类（含艺术史论、艺术管理等本学科门类所设专业）、戏剧与影视学类（含戏剧学、电影学、戏剧影视文学、广播电视编导、戏剧影视导演、戏剧影视美术设计、录音艺术、播音与主持艺术、动画、影视摄影与制作、影视技术、戏剧教育等本学科门类所设专业，表演除外）以及认可和使用戏剧影视文学（广播电视编导）、播音与主持艺术专业省统考成绩进行录取的本科专业: 393 分。</div><img style="margin-top: 67px;" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" alt=""></div>'
    }
  },
  created() {
    this.toData()
  },
  methods: {
    async toData() {
      this.loading = true
      const response = await circle_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    handleRead() {
      this.dialogVisible = true
    },
    handleQuery() {
      console.log(this.listQuery.date)
      this.listQuery.page = 1
      this.toData()
    }
  }
}
</script>

<style scoped>
.rich-text-title {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 66px;
}
</style>
