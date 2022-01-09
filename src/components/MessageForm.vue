<template>
  <form @submit.prevent="postMessage">
    <BaseInput
      type="message"
      label="Message"
      name="message"
      v-model="body"
      class="mb-4"
    />
    <div class="flex justify-end mb-2">
      <BaseBtn type="submit" text="Message" />
    </div>
    <FlashMessage :error="error" />
  </form>
</template>

<script>
import { getError } from "@/utils/helpers.js";
import BaseBtn from "@/components/BaseBtn.vue";
import BaseInput from "@/components/BaseInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";

export default {
  name: "MessageForm",
  components: {
    BaseBtn,
    BaseInput,
    FlashMessage,
  },
  data() {
    return {
      body: null,
      error: null,
    };
  },
  methods: {
    async postMessage() {
      try {
        const payload = {
          body: this.body,
        };
        this.error = null;
        await this.$store.dispatch("message/postMessage", payload);
        this.body = null;
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
};
</script>
