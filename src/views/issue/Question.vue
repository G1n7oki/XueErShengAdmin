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
          <el-input v-model="listQuery.search" placeholder="文章标题" />
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
          prop="title"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="问题标题"
          align="center"
        />
        <el-table-column
          prop="title"
          label="提问人"
          align="center"
        />
        <el-table-column
          prop="title"
          label="所属科目"
          align="center"
        />
        <el-table-column
          prop="title"
          label="提问时间"
          align="center"
        />
        <el-table-column
          prop="title"
          label="点赞数"
          align="center"
        />
        <el-table-column
          prop="title"
          label="评论数"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="info" size="mini" @click="handleUpdate(row)">
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
        <el-col :span="24">问题来源：自学考试 > 本科 > 金融学(新)02301K > 03709马克思主义</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">问题标题：您好，马克思 | 认为“马克思主义”是洗脑，这本身是一种被洗脑的表现</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">
          问题内容：这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
          这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
          这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容。
        </el-col>
      </el-row>
      <div class="image-warp">
        <el-image fit="cover" class="image-item" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976083067,297093700&fm=26&gp=0.jpg" />
        <el-image fit="cover" class="image-item" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976083067,297093700&fm=26&gp=0.jpg" />
        <el-image fit="cover" class="image-item" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976083067,297093700&fm=26&gp=0.jpg" />
        <el-image fit="cover" class="image-item" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976083067,297093700&fm=26&gp=0.jpg" />
      </div>
      <el-row class="check-item">
        <el-col :span="24">提问人：张三</el-col>
      </el-row>
      <el-row class="check-item">
        <el-col :span="24">提问时间：2020-08-11  13:12:00</el-col>
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
          <el-input type="textarea" :rows="6" resize="none" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发送</el-button>
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
export default {
  name: 'Question',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      profession: [],
      id: '',
      loading: false,
      list: [],
      total: 0,
      dialog: {
        check: false,
        reply: true
      },
      form: {}
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    toData() {},
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    handleQuery() {}
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
