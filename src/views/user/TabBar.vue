<template>
  <div class="flex">
    <div
      v-for="item in tabBar.list"
      :key="item.id"
      :class="{'active': item.id === current}"
      class="row"
      @click="handleTabItem(item.id)"
    >{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    uid: { // 用户id
      type: Number,
      default: 0
    },
    current: { // 切换卡索引
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tabBar: { // 切换卡
        list: [{
          id: 1,
          name: '个人信息'
        }, {
          id: 2,
          name: '开课信息'
        }],
        current: 1
      }
    }
  },
  methods: {
    // 点击选项卡
    handleTabItem(id) {
      switch (id) {
        case 1: this.$router.push({ path: '/user/info', query: { id: this.uid }})
          break
        case 2: this.$router.push({ path: '/user/lesson', query: { id: this.uid }})
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
