<template>
  <div class="bg-gray-200">
    <div
      v-if="$store.state.flashMessage.success && show"
      class="mb-0 flex items-center justify-between bg-green-500 rounded max-w-full my-1 m-10"
    >
      <div class="flex items-center">
        <FlashMessagesIcon name="success" />
        <div class="py-4 text-white text-base font-medium">
          {{ $store.state.flashMessage.success }}
        </div>
      </div>
      <button type="button" class="group mr-2 p-2" @click="close">
        <FlashMessagesIcon name="close-x" />
      </button>
    </div>

    <div
      v-else-if="$store.state.flashMessage.error && show"
      class="mb-8 flex items-center justify-between bg-red-500 rounded max-w-full my-1 m-10"
    >
      <div class="flex items-center">
        <FlashMessagesIcon name="error" />
        <div class="py-4 text-white text-base font-medium">
          {{ $store.state.flashMessage.error}}
        </div>
      </div>
      <button type="button" class="group mr-2 p-2" @click="close">
        <FlashMessagesIcon name="close-x" />
      </button>
    </div>
  </div>
</template>

<script>
import FlashMessagesIcon from "@/components/FlashMessagesIcon";

export default {
  components: { FlashMessagesIcon },
  data() {
    return {
      show: true
    };
  },
  computed: {
    flashMessage () {
      return this.$store.state.flashMessage
    }
  },
  methods: {
    close(){
      this.show = false;
      this.$store.commit('FLASH_MESSAGE_RESET'); 
      this.show = true;
    }
  }
};
</script>
