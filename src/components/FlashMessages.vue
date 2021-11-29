<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import FlashMessagesIcon from "@/components/FlashMessagesIcon";

const store = useStore();  
const show = ref(true);

const flashMessage = computed(
  () => store.state.flashMessage
);

const close = () => {
  show.value = false;
  store.commit('FLASH_MESSAGE_RESET'); 
  show.value = true;
};

onMounted(() => {
  if (flashMessage.value) {
    setTimeout(() => {
      close();
    }, 9000);
  }
});
</script>

<template>
  <div class="bg-gray-200">
    <div
      v-if="$store.state.flashMessage.success && show"
      class="flex items-center justify-between bg-green-500 rounded max-w-full m-1"
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
      class="flex items-center justify-between bg-green-500 rounded max-w-full m-1"
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


