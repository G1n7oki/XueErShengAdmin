<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input
            v-model="listQuery.search"
            clearable
            placeholder="礼包名称"
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
          <div class="name">礼包列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加礼包</el-button>
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
          label="礼包名称"
          align="center"
        />
        <el-table-column
          prop="price"
          label="真实价格"
          align="center"
        />
        <el-table-column
          prop="virtual_price"
          label="虚标价"
          align="center"
        />
        <el-table-column
          prop="name"
          label="推广图"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.banner" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="报读类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.apply_type === 1 ? '自考' : '成考' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="validity"
          label="有效期"
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
    <!-- Dialog -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="礼包名称">
          <el-input v-model="form.title" placeholder="请输入代码" />
        </el-form-item>
        <el-form-item label="真实价格">
          <el-input v-model="form.price" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="虚标价">
          <el-input v-model="form.virtual_price" placeholder="请输入成绩" />
        </el-form-item>
        <el-form-item label="推广图">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 8 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <el-image v-if="form.banner" :src="form.banner" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="报读类型">
          <el-select v-model="form.apply_type" placeholder="请选择">
            <el-option label="自考" :value="1" />
            <el-option label="成考" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择课程">
          <el-select
            v-model="form.course_id"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="course in courseList"
              :key="course.id"
              :label="course.title"
              :value="course.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效期">
          <el-input v-model="form.validity" placeholder="单位: 天" />
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
import { url, headers } from '@/api/uplaod'
import { gift_list, gift_create, gift_update } from '@/api/consciously'
import { course_list } from '@/api/course'
import Pagination from '@/components/Pagination'
export default {
  name: 'Gift',
  components: {
    Pagination
  },
  data() {
    return {
      url,
      headers,
      listQuery: {
        page: 1,
        per_page: 10,
        search: ''
      },
      loading: false,
      list: [],
      total: 0,
      title: '',
      titleMap: ['创建礼包', '编辑礼包'],
      dialogVisible: false,
      form: {
        id: '',
        title: '',
        price: '',
        virtual_price: '',
        banner: '',
        apply_type: '',
        course_id: [],
        validity: ''
      },
      courseList: []
    }
  },
  created() {
    this.toCourseList()
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await gift_list(this.listQuery)
      const { data, total } = response.data
      this.list = data
      this.total = total
      this.loading = false
    },
    // Get course list
    async toCourseList() {
      const response = await course_list({ type: 'all' })
      this.courseList = response.data
    },
    // Query list
    handleQuery() {
      this.listQuery.page = 1
      this.toData()
    },
    // Handle create button
    handleCreate() {
      this.title = this.titleMap[0]
      this.dialogVisible = true
    },
    // Create info
    async create() {
      const response = await gift_create(this.form)
      this.$message.success(response.status)
      this.toData()
    },
    // Handle update button
    handleUpdate(row) {
      this.form = row
      this.title = this.titleMap[1]
      this.dialogVisible = true
      this.toData()
    },
    // Update info
    async update() {
      const response = await gift_update(this.form)
      this.$message.success(response.status)
    },
    // Handle Save button
    handleSave() {
      this.title = this.titleMap[0] ? this.create() : this.update()
    },
    // Limit upload type
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('只能上传图片格式的文件!')
      }
      return isImage
    },
    // Cover upload
    successUpload(res) {
      const { host_url } = res.data
      this.form.banner = host_url
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 104px;
  height: 104px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 104px;
  height: 104px;
  display: block;
}
</style>
