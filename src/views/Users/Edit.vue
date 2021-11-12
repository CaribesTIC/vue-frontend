<script setup>
  import { onMounted, reactive, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from 'vuex';
  import PageHeader from "@/components/PageHeader";
  import UserService from "@/services/UserService";

  const router = useRouter()
  const store = useStore();
  const props = defineProps({ id: Number })
  const form = reactive({ name: "", email: "" })

  onMounted(async () => {
    if (props.id != store.state.user.user.id) 
      await store.dispatch("user/getUser", props.id)
  })


  form.name = computed({
    get: () => store.state.user.user.name,
    //set: value => store.commit('updateMessage', value)
  })

  form.email = computed({
    get: () => store.state.user.user.email,
    //set: value => store.commit('updateMessage', value)
  })

</script>

<template>
  <div>
    <page-header> Editar usuario </page-header>
    <div class="flex space-x-2">

      <button class="btn btn-primary btn-xs" @click="router.push({ path: '/users' })">Ver todos</button>
    </div>
    <div class="panel mt-6 p-4">      
      <div class="table-data__wrapper">
        <table class="table-data">
          <thead>
            <tr class="">
              <th class="w-2/5">Dato</th>
              <th class="w-3/5">Valor</th>
            </tr>
          </thead>      
          <tbody>
            <tr class="">
              <th class="">Nombre</th>
              <td class="">{{ form.name }}</td>
            </tr>
            <tr class="">
              <th class="">Correo</th>
              <td class="">{{ form.email }}</td>
            </tr>
            <!--tr class="">
              <th class="">Role</th>
              <td class="">"{{ form.role }}</td>              
            </tr-->        
          </tbody>
        </table>
      </div>
     </div>
  </div>
</template>

