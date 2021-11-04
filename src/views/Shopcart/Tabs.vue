<template>
  <div
    class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0 bg-gray-100"
  >
    <div id="dynamic-component-demo" class="mt-10 pl-0">
      <div class="">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
          class="w-40"
        >
          {{ tab }}
        </button>
      </div>
      <component v-bind:is="currentTabComponent" class="tab bg-white">
      </component>
    </div>
  </div>
</template>

<script>
import TabList from "./TabList.vue";
import TabCart from "./TabCart.vue";

export default {
  components: {
    TabList,
    TabCart,
  },
  data() {
    return {
      currentTab: "List",
      tabs: ["List", "Cart"],
    };
  },
  computed: {
    currentTabComponent() {
      return "tab-" + this.currentTab.toLowerCase();
    },
  },
};
</script>

<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
