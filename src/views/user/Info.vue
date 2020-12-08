<template>
  <div class="app-container">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <user-tab-bar :current="1" :id="id" />
        <el-button type="primary">重置密码</el-button>
      </div>
      <!-- /卡片头 -->
      <!-- 个人信息  -->
      <el-form
        ref="userinfo"
        :model="userinfo"
        label-width="100px"
        class="userinfo"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="userinfo.name"
            clearable
            placeholder="请输入姓名"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="userinfo.id"
            clearable
            placeholder="请输入身份证"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userinfo.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userinfo.sex" style="width: 220px">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="userinfo.nation" style="width: 220px">
            <el-option
              v-for="item in nation"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="userinfo.political" style="width: 220px">
            <el-option label="群众" value="1" />
            <el-option label="团员" value="2" />
            <el-option label="党员" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="户口类型">
          <el-select v-model="userinfo.registered" style="width: 220px">
            <el-option label="农业户口" value="1" />
            <el-option label="非农业户口" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-cascader
            v-model="userinfo.location"
            :options="area"
            :props="{ value: 'label' }"
            filterable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="userinfo.marital" style="width: 220px">
            <el-option label="已婚" value="1" />
            <el-option label="未婚" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-input
            v-model="userinfo.post"
            clearable
            placeholder="请输入职业"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="收教材地址">
          <el-cascader
            v-model="userinfo.delivery"
            :options="area"
            :props="{ value: 'label' }"
            filterable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="userinfo.detail"
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadIdFront"
          >
            <img v-if="userinfo.front" :src="userinfo.front" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadIdReverse"
          >
            <img v-if="userinfo.reverse" :src="userinfo.reverse" class="avatar">
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
export default {
  name: 'Info',
  components: {
    UserTabBar
  },
  data() {
    return {
      nation: [],
      userinfo: { // 个人信息
        name: '', // 姓名
        id: '', // 身份证
        birthday: '', // 生日
        sex: '', // 性别
        nation: '', // 民族
        political: '', // 政治面貌
        registered: '', // 户口类型
        location: '', // 户口所在地
        marital: '', // 婚姻状况
        post: '', // 职业
        delivery: '', // 收教材地址
        detail: '', // 详细地址
        front: '', // 身份证正面
        reverse: '' // 身份证反面
      },
      area: [], // 省市区
      id: '' // 用户id
    }
  },
  created() {
    this.id = this.$route.query.id

    this.nation = nation.data
    this.area = area
  },
  // 图片上传需要后台服务器支持
  methods: {
    handleUploadIdFront(res, file) {
      this.userinfo.front = URL.createObjectURL(file.raw)
    },
    handleUploadIdReverse(res, file) {
      this.userinfo.reverse = URL.createObjectURL(file.raw)
    },
    // 点击保存
    handleSave() {
      this.$refs['userinfo'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
