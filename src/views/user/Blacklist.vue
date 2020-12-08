<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">用户筛选</div>
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="listQuery.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="注册来源">
          <el-select v-model="listQuery.source">
            <el-option label="小程序" value="1" />
            <el-option label="安卓" value="2" />
            <el-option label="IOS" value="3" />
            <el-option label="PC" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="listQuery.value"
            clearable
            placeholder="请输入用户ID、昵称、手机号"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /Filter -->
  </div>
</template>

<script>
export default {
  name: 'Blacklist',
  data() {
    return {
      listQuery: {}
    }
  },
  methods: {
    // 筛选
    handleQuery() {}
  }
}
</script>

<style scoped>

</style>
