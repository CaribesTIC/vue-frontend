<template>
  <div class="p-5 m-auto w-full sm:w-4/12">
    <h2 class="mb-4 text-xl text-center">Inicio de Sesión</h2>
    <LoginForm class="p-5 bg-white border rounded shadow" />
    <p class="mt-2 text-center text-gray-500">
      <router-link
        to="/register"
        class="text-gray-500 transition hover:text-gray-600"
        >Regístrese para obtener una cuenta</router-link
      >
    </p>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>
