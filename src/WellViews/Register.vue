<template>
  <div class="p-5 m-auto w-full sm:w-4/12">
    <h2 class="mb-4 text-xl text-center">Regístrerse</h2>
    <RegisterForm class="p-5 bg-white border rounded shadow" />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";

export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  },
};
</script>
