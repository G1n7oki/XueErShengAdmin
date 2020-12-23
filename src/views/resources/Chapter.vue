<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.name" placeholder="视频名称" />
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
  name: 'Chapter',
  data() {
    return {
      listQuery: {}
    }
  },
  methods: {
    handleQuery() {}
  }
}
</script>

<style scoped>

</style>
