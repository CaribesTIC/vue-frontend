<template>
      <Header />
      <!--Header1 /-->
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">


      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Sidebar from "./Sidebar.vue";
import Header from "@/components/Header.vue";
import Header1 from "./Header.vue";

export default defineComponent({
  components: {
    Header,
    Header1,
    Sidebar,
  },
});
</script>
