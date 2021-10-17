<template>
  <main>
    <div class="message-container" ref="containerEl">
      <ChatMessage
        v-for="message in props.messages"
        :message="message"
        :key="message.id"
      />
      <div class="message-container--bottom" />
    </div>
    <form novalidate @submit="sendMessage">
      <input v-model="state.message" ref="inputEl" />
    </form>
  </main>
</template>

<script>
import { defineComponent, reactive, ref, watchEffect } from "vue";
import ChatMessage from "./ChatMessage.vue";

export default defineComponent({
  props: ["messages", "loggeIn"],
  components: { ChatMessage },
  setup(props, { emit }) {
    const containerEl = ref(null);
    const inputEl = ref(null);

    const state = reactive({
      message: "",
      messages: [],
    });

    watchEffect(() => {
      if (
        !props.messages.length ||
        containerEl === null ||
        containerEl.value === null
      ) {
        return;
      }
      const el = containerEl.value.getElementsByClassName(
        "message-container--bottom"
      )[0];
      if (el) {
        el.style.marginBottom = "72px";
        el.scrollIntoView({ behavior: "smooth" });
        el.style.marginBottom = "1px";
      }
    });

    watchEffect(() => {
      if (inputEl.value) {
        inputEl.value.focus();
      }
    });

    function sendMessage(e) {
      e.preventDefault();
      emit("message", state.message);
      state.message = "";
    }

    return {
      containerEl,
      inputEl,
      props,
      sendMessage,
      state,
    };
  },
});
</script>

<style scoped lang="postcss">
.message-container {
  @apply p-5 flex-1 h-screen overflow-y-scroll;
}
.message-container--bottom {
  margin-bottom: 1px;
}

main {
  @apply h-full w-full flex flex-col;
}

form {
  @apply p-3 w-full flex;
}

input {
  @apply flex-1 bg-gray-700 h-12 px-5 rounded border-0 outline-none rounded-lg;
}
</style>
