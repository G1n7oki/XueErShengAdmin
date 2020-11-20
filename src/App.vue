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

<style>
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
</style>
