<script>  
  import TabList from "./TabList.vue";
  import TabCart from "./TabCart.vue";
  import TabOther from "./TabOther.vue";
  
  export default {
    components: {
      'tab-list': TabList,
      'tab-cart': TabCart,
      'tab-other': TabOther
    }
  };
</script>

<script setup>
  import { ref, computed } from "vue";
  
  const currentTab = ref("List");
  const tabs = ref(["List", "Cart", "Other"]);    
  const currentTabComponent = computed(
    () => "tab-" + currentTab.value.toLowerCase()
  );  
</script>

<template>
  <div
    class="tabsSection"
  >
    <div id="dynamic-component-demo" class="m-5 w-full">

      <div class="mx-10">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
          class=""
        >
	  {{ tab }}
	</button>
      </div>

      <transition name="fade" mode="out-in">
        <keep-alive>
          <component v-bind:is="currentTabComponent" class="bg-white"></component>
        </keep-alive>
      </transition>

    </div>
  </div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to{
    opacity:0;
  }

  h2 { @apply m-3 text-xl; }

  .tabsSection { 
    @apply 
      relative
      flex
      justify-center
      max-w-full
      max-h-full
      bg-gray-100;
  }

  .tab-button {
    @apply
      w-full
      py-2
      px-3
      border
      border-solid
      border-gray-300
      border-b-0
      rounded-t-sm
      bg-gray-100
      cursor-pointer
      sm:w-40;    
  }

  .tab-button:hover { @apply bg-gray-300; }

  .tab-button.active {
    @apply
      bg-gray-400
      text-gray-100
      border-gray-500;
  }

  .demo-tab {
    @apply
      p-1
      border
      border-solid
      border-gray-300;
  }

</style>

