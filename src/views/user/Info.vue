<template>
  <div class="app-container user-info">
    <el-card>
      <!-- 卡片头 -->
      <div class="flex-wrap">
        <div class="flex">
          <div
            v-for="item in tabbar.list"
            :key="item.id"
            :class="{'active': item.id === tabbar.current}"
            class="row"
          >{{ item.name }}</div>
        </div>
        <el-button type="primary">重置密码</el-button>
      </div>
      <!-- /卡片头 -->
      <!-- 个人信息  -->
      <el-form
        v-if="tabbar.current === 1"
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
            style="width: 220px"
            :props="{ value: 'label' }"
            @change="demo"
          />
        </el-form-item>
      </el-form>
      <!-- /个人信息  -->
    </el-card>
  </div>
</template>

<script>
import { nation } from '@/utils/nation.js'
import { area } from '@/utils/area.js'
export default {
  name: 'Info',
  data() {
    return {
      tabbar: { // 切换卡
        list: [{
          id: 1,
          name: '个人信息'
        }, {
          id: 2,
          name: '开课信息'
        }, {
          id: 3,
          name: '学习详情'
        }],
        current: 1
      },
      nation: [],
      userinfo: { // 个人信息
        name: '', // 姓名
        id: '', // 身份证
        birthday: '', // 生日
        sex: '', // 性别
        nation: '汉族', // 民族
        political: '', // 政治面貌
        registered: '', // 户口类型
        location: '' // 户口所在地
      },
      area: []
    }
  },
  created() {
    this.nation = nation.data
    this.area = area
  },
  methods: {
    demo() {
      console.log(this.userinfo.location)
    }
  }
}
</script>

<style lang="scss">
.user-info {
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
}
</style>
