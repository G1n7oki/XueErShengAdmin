<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.search" clearable placeholder="学校名称" />
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
          <div class="name">院校列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加院校</el-button>
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
          prop="name"
          label="学校名称"
          align="center"
        />
        <el-table-column
          prop="image"
          label="学校Logo"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.image" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          align="center"
        />
        <el-table-column
          prop="profession_count"
          label="可报专业数"
          align="center"
        >
          <template slot-scope="{row}">
            <el-link type="primary" @click="to('/cooperation/level', row)">{{ row.sort }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.status === 0 ? '禁用' : '启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="primary" size="mini" @click="to('/cooperation/manage',row)">
              地区管理
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
        :model="form"
        label-width="80px"
      >
        <el-form-item label="学校名称">
          <el-input v-model="form.name" placeholder="请输入学校名称" />
        </el-form-item>
        <el-form-item label="学校Logo">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 9 }"
            name="image"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <el-image v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="所属省份">
          <el-input v-model="form.province" placeholder="请输入所属省份" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="请输入排序" />
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
import { consciously_list, consciously_create, consciously_update } from '@/api/cooperation'
import Pagination from '@/components/Pagination'
export default {
  name: 'Cooperation',
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
      titleMap: ['创建院校', '编辑院校'],
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        status: '',
        image: '',
        sort: '',
        province: ''
      }
    }
  },
  created() {
    this.toData()
  },
  methods: {
    // Get list
    async toData() {
      this.loading = true
      const response = await consciously_list(this.listQuery)
      const { data, total } = response.data
      this.total = total
      this.list = data
      this.loading = false
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
      const response = await consciously_create(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle update button
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.title = this.titleMap[1]
      this.dialogVisible = true
    },
    async update() {
      const response = await consciously_update(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Limit upload type
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImage) {
        this.$message.error('只能上传图片格式的文件!')
      }
      return isImage
    },
    successUpload(res) {
      const { host_url } = res.data
      this.form.image = host_url
    },
    handleSave() {
      this.title === this.titleMap[0] ? this.create() : this.update()
    },
    to(path, row) {
      this.$router.push({ path, query: { id: row.id }})
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
