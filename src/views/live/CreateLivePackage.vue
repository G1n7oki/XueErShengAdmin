<template>
  <div class="app-container">
    <el-card>
      <div class="title">添加直播课</div>
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-width="100px"
        class="form"
      >
        <el-form-item label="直播课包标题">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 1 }"
            name="image"
            :show-file-list="false"
            :on-success="handleUpload"
          >
            <img v-if="cover" :src="cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="现价">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入姓名"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="原价">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="可不填"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="所属科目">
          <el-cascader
            v-model="form.profession_list"
            :options="profession"
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            filterable
          />
        </el-form-item>
        <el-form-item label="课程有效期">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入姓名"
            style="width: 220px"
          >
            <template slot="append">天</template>
          </el-input>
          <span style="color: #bbb">（有效期从学员购买之日起开始计算）</span>
        </el-form-item>
        <el-form-item label="课程介绍">
          <tinymce v-model="form.content" :height="200" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { url, headers } from '@/api/uplaod'
import { profession_list } from '@/api/profession'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'CreateLivePackage',
  components: {
    Tinymce
  },
  data() {
    return {
      url,
      headers,
      form: {},
      loading: false,
      cover: '',
      profession: []
    }
  },
  created() {
    this.toProfession()
  },
  methods: {
    // 获取专业数据
    async toProfession() {
      const response = await profession_list({ level: 4 })
      this.profession = response.data
    },
    handleSave() {},
    handleUpload() {}
  }
}
</script>

<style>
.title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 20px;
}
.form {
  width: 80%;
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
