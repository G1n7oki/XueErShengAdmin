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
    }

  }
</style>
