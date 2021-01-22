<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">广告列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加广告</el-button>
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
          label="广告名称"
          align="center"
        />
        <el-table-column
          label="缩略图"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.image_url" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="name"
          label="适用范围"
          align="center"
        />
        <el-table-column
          prop="status"
          label="是否启用"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.status === 0 ? '禁用' : '启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
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
    <el-dialog
      :title="text"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
      >
        <el-form-item label="广告图名称">
          <el-input
            v-model="form.title"
            style="width: 380px"
            placeholder="广告图名称"
          />
        </el-form-item>
        <el-form-item label="广告图素材">
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
            <el-image v-if="form.image_url" :src="form.image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item
          label="试用范围"
        >
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="form.sort"
            style="width: 380px"
            placeholder="排序"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { profession_list } from '@/api/profession'
import { banner_list, banner_create, banner_update, banner_delete } from '@/api/banner'
import { url, headers } from '@/api/uplaod'
export default {
  name: 'Ad',
  components: {
    Pagination
  },
  data() {
    return {
      url,
      headers,
      listQuery: {
        page: 1,
        per_page: 10
      },
      loading: false,
      list: [],
      total: 0,
      text: '',
      textMap: ['创建', '编辑'],
      dialogVisible: false,
      form: {
        id: '',
        title: '',
        profession_id: '',
        profession_list: [],
        image_url: '',
        status: '',
        sort: ''
      },
      profession: []
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
      const response = await banner_list(this.listQuery)
      const { total, data } = response.data
      this.total = total
      this.list = data
      this.loading = false
    },
    // Get profession list
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    // Handle create button
    handleCreate() {
      this.text = this.textMap[0]
      this.dialogVisible = true
    },
    // Create info
    async create() {
      this.form.profession_id = this.form.profession_list[2]
      const response = await banner_create(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle update button
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.text = this.textMap[1]
      this.dialogVisible = true
    },
    // Update info
    async update() {
      this.form.profession_id = this.form.profession_list[2]
      const response = await banner_update(this.form)
      this.$message.success(response.status)
      this.dialogVisible = false
      this.toData()
    },
    // Handle Save button
    handleSave() {
      this.text === this.textMap[0] ? this.create() : this.update()
    },
    async handleDelete(row) {
      const response = await banner_delete({ id: row.id })
      this.$message.success(response.status)
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
    // Cover upload
    successUpload(res) {
      const { host_url } = res.data
      this.form.image_url = host_url
    }
  }
}
</script>

<style>
.title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 20px;
}
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
