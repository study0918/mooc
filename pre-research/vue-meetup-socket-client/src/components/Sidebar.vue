<template>
  <SidebarContainer>
    <SidebarUser v-for="user in props.users" :user="user" :key="user.id" />
  </SidebarContainer>
</template>

<script>
import { defineComponent } from "vue";
import SidebarUser from "./SidebarUser.vue";
import SidebarContainer from "./SidebarContainer.vue";

export default defineComponent({
  props: ["users"],
  components: { SidebarContainer, SidebarUser },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
