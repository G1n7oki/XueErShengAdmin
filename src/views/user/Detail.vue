<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <user-tab-bar :id="id" :current="3" />
        <el-button type="primary">批量导出</el-button>
      </div>
      <!-- /卡片头 -->
      <!-- 表单 -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
        />
        <el-table-column
          prop="type"
          label="商品类型"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.type]">{{ row.type | formatType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="学习状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="tag[row.status]">{{ row.status | formatStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          label="学习时长"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.duration + 'h' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="process"
          label="学习进度"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.process + '%' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="start"
          label="开始学习时间"
          align="center"
        />
        <el-table-column
          prop="end"
          label="结束学习时间"
          align="center"
        />
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="toData"
      />
    </el-card>
  </div>
</template>

<script>
import UserTabBar from '@/views/user/TabBar'
import Pagination from '@/components/Pagination'

export default {
  name: 'Detail',
  components: {
    Pagination,
    UserTabBar
  },
  filters: {
    formatType(type) {
      switch (type) {
        case 0:
          return '课程'
        case 1:
          return '题库'
        default:
          return ''
      }
    },
    formatStatus(type) {
      switch (type) {
        case 0:
          return '未开始'
        case 1:
          return '学习中'
        case 2:
          return '已学完'
        default:
          return ''
      }
    }
  },
  data() {
    return {
      loading: true,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      // 标签
      tag: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  created() {
    this.id = this.$route.query.id

    this.toData()
  },
  methods: {
    toData() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.flex-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;

  .flex {
    display: flex;

    .row {
      color: #101010;
      font-size: 16px;
      margin-right: 64px;
      cursor: pointer;

      &.active {
        color: #38A28A;
      }

      &:hover {
        color: #38A28A;
      }
    }
  }
}
</style>
