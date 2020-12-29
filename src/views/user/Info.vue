<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <user-tab-bar :uid="id" :current="1" />
        <el-button type="primary">重置密码</el-button>
      </div>
      <!-- /卡片头 -->
      <!-- 个人信息  -->
      <el-form
        ref="userinfo"
        v-loading="loading"
        :model="info"
        label-width="100px"
        class="userinfo"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="info.realname"
            clearable
            placeholder="请输入姓名"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="info.idno"
            clearable
            placeholder="请输入身份证"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="info.sex" style="width: 220px">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="info.nation" style="width: 220px">
            <el-option
              v-for="item in nation"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="info.politics" style="width: 220px">
            <el-option label="群众" value="群众" />
            <el-option label="团员" value="团员" />
            <el-option label="党员" value="党员" />
          </el-select>
        </el-form-item>
        <el-form-item label="户口类型">
          <el-select v-model="info.koseki" style="width: 220px">
            <el-option label="农业户口" value="农业户口" />
            <el-option label="非农业户口" value="非农业户口" />
          </el-select>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-cascader
            v-model="info.koseki_address"
            :options="area"
            :props="{ value: 'label' }"
            filterable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="info.marriage" style="width: 220px">
            <el-option label="已婚" value="已婚" />
            <el-option label="未婚" value="未婚" />
          </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-input
            v-model="info.job"
            clearable
            placeholder="请输入职业"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="收教材地址">
          <el-cascader
            v-model="info.textbook"
            :options="area"
            :props="{ value: 'label' }"
            filterable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="info.detail"
            :rows="2"
            type="textarea"
            clearable
            resize="none"
            placeholder="请输入详细地址"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="身份证正面">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 1 }"
            name="image"
            :show-file-list="false"
            :on-success="handleUploadIdFront"
          >
            <img v-if="front" :src="front" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :headers="headers"
            :data="{ type: 1 }"
            name="image"
            :show-file-list="false"
            :on-success="handleUploadIdReverse"
          >
            <img v-if="rverso" :src="rverso" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!-- /个人信息  -->
    </el-card>
  </div>
</template>

<script>
import UserTabBar from '@/views/user/TabBar'
import { nation } from '@/utils/nation.js'
import { area } from '@/utils/area.js'
import { userinfo } from '@/api/user'
import { url, headers } from '@/api/uplaod'
export default {
  name: 'Info',
  components: {
    UserTabBar
  },
  data() {
    return {
      loading: false,
      url,
      headers,
      nation: [],
      info: {
        realname: '', // 姓名
        idno: '', // 身份证
        sex: '', // 性别
        nation: '', // 民族
        politics: '', // 政治面貌
        koseki: '', // 户口类型
        koseki_address: '', // 户口所在地
        marriage: '', // 婚姻状况
        job: '', // 职业
        textbook: '', // 收教材地址
        address: '', // 详细地址
        idno_front: '', // 身份证正面
        idno_verso: '' // 身份证反面
      },
      area: [], // 省市区
      id: '', // 用户id
      front: '',
      rverso: ''
    }
  },
  created() {
    this.id = +this.$route.query.id
    this.nation = nation.data
    this.area = area
    this.toData()
  },
  methods: {
    // Get user info
    async toData() {
      this.loading = true
      const response = await userinfo({ id: this.id })
      this.info = response.data
      this.loading = false
    },
    // Handle save
    handleSave() {
      console.log(this.info)
    },
    handleUploadIdFront(res) {
      this.front = res.data.host_url
      this.info.idno_front = res.data.url
    },
    handleUploadIdReverse(res) {
      this.rverso = res.data.host_url
      this.info.idno_verso = res.data.url
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
