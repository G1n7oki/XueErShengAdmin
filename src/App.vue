<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  .app-main {
    background-color: #f0f2f5;
  }

  .filter-container {
    background-color: #fff;
    margin-bottom: 20px;
  }

  .filter-title {
    color: #1f2f3d;
    font-size: 16px;
    margin: 20px 0;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .left {
      display: flex;
      align-items: center;

      .name {
        font-size: 16px;
        color: #101010;
        margin-right: 30px;
      }

      .item {
        width: 108px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 16px;
        color: #333;
        border-radius: 10px;
        cursor: pointer;

        &.active {
          background-color: #1890FF;
          color: #fff;
        }
      }
    }

  }
  // element-ui 样式重置
  .el-form-item__label {
    font-weight: 500;
  }
</style>
