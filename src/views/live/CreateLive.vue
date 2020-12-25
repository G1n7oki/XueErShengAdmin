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
        <el-form-item label="直播课标题">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="讲师">
          <el-select v-model="form.type" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.start"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.end"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="直播状态">
          <el-select v-model="form.type" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-select v-model="form.type" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="stream_name">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="app_name">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="回顾ID">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="讲义文件ID">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="讲义文件">
          <el-input
            v-model="form.realname"
            clearable
            placeholder="请输入标题"
            style="width: 220px"
          />
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
export default {
  name: 'CreateLive',
  data() {
    return {
      loading: false,
      form: {}
    }
  },
  methods: {
    handleSave() {}
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  color: #101010;
  margin-bottom: 20px;
}
.form {
  width: 80%;
}
</style>
