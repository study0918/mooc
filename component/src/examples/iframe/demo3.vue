<template>
  <div>
    <el-button
      @click="btn(index)"
      :class="{ active: activeName2 == index }"
      v-for="(item, index) in list"
      :key="index"
    >
      {{ item.label }}
    </el-button>
    <iframe-tab :assid="assid" :tokin="tokin"></iframe-tab>
  </div>
</template>
<style lang="scss" scoped>
.block {
  margin: 10px 0;
}
.active {
  background: red;
}
</style>
<script>
import iframeTab from "./iframe.vue";
export default {
  name: "show",
  data() {
    return {
      activeName2: 0,
      list: [
        { label: "用户管理", name: "first", id: 1 },
        { label: "配置管理", name: "second", id: 2 },
        { label: "角色管理", name: "third", id: 3 },
        { label: "定时任务补偿", name: "fourth", id: 4 }
      ],
      assid: "1",
      tokin: ""
    };
  },
  components: {
    iframeTab
  },

  created() {
    this.phonea();
  },
  methods: {
    phonea() {
      let phone = 678907890;
      this.tokin = phone;
    },

    btn(index) {
      this.assid = index + 1;
      this.activeName2 = index;
    }
  }
};
</script>
