<template>
  <div class="app-container">
    <el-card>
      <div class="title">请填写班主任相关信息</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="讲师名称" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="班主任名称"
          />
        </el-form-item>
        <el-form-item label="班主任头像" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUpload"
          >
            <el-image v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item label="手机号" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="微信号" prop="title">
          <el-input
            v-model="form.name"
            style="width: 380px"
            placeholder="请输入微信号"
          />
        </el-form-item>
        <el-form-item label="微信二维码" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUpload"
          >
            <el-image v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <div>建议尺寸200*200px;不超过2M; 图片格式支持png,jpg</div>
        </el-form-item>
        <el-form-item
          label="分管专业"
          prop="title"
        >
          <el-cascader
            v-model="form.profession"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub', multiple: true }"
          />
        </el-form-item>
        <el-form-item label="状态" prop="title">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址" prop="title">
          <el-input
            v-model="form.name"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="请输入微信号"
          />
        </el-form-item>
        <el-form-item label="个性签名" prop="title">
          <el-input
            v-model="form.name"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="请输入微信号"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreate">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { profession_list } from '@/api/profession'
export default {
  name: 'CreateDirector',
  data() {
    return {
      loading: false,
      form: {},
      rules: {},
      profession: []
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    // 获取专业数据
    async toProfession() {
      const profession = await profession_list({ level: 3 })
      this.profession = profession.data
    },
    handleUpload() {},
    handleCreate() {}
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
