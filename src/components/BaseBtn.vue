<template>
  <button
    :type="type"
    v-on="$listeners"
    class="text-white py-1 px-4 rounded disabled:opacity-25 transition bg-blue-500 hover:bg-blue-700"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "BaseBtn",
  props: {
    type: {
      type: String,
      default: "submit",
    },
    text: {
      type: String,
      default: "Submit",
    },
  },
};
</script>
