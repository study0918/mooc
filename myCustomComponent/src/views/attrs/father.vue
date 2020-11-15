<template>
  <child
    :name="name"
    :age="age"
    :infoObj="infoObj"
    @updateInfo="updateInfo"
    @delInfo="delInfo"
  />
</template>
<script>
// https://www.jianshu.com/p/460214351173
import Child from "./child.vue";

export default {
  name: "father",
  components: { Child },
  data() {
    return {
      name: "Lily",
      age: 22,
      infoObj: {
        from: "上海",
        job: "policeman",
        hobby: ["reading", "writing", "skating"]
      }
    };
  },
  methods: {
    updateInfo() {
      console.log("update info");
    },
    delInfo() {
      console.log("delete info");
    }
  }
};
</script>
