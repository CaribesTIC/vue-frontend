import { reactive, computed } from 'vue'
import { useStore } from 'vuex';

export default () => {  
   
  const store = useStore();

  const form = reactive({ name: "", email: "", role_id: "" });

  const storeCommitSetUser = (field, value) => {
      const user = { ...form };
      user[field] = value;
      store.commit('user/SET_USER', user);
  };

  form.name = computed({
    get: () => store.state.user.user.name,
    set: value =>  storeCommitSetUser("name", value)   
  });

  form.email = computed({
    get: () => store.state.user.user.email,
    set: value => storeCommitSetUser("email", value)
  });
  
  form.role_id = computed({
    get: () => store.state.user.user.role_id,
    set: value => storeCommitSetUser("role_id", value)
  });

  return {
    form,
    loading: computed(() => store.state.user.loading),
    roles: computed(() => store.getters["user/roles"]),
    userGet: async id => {    
      if (id != store.state.user.user.id) 
        await store.dispatch("user/getUser", id)
    },
    helperTables: async () => {    
      if (store.state.user.helperTables) 
        await store.dispatch("user/helperTables")
    },
    userUpdate: async (userId, form) => {
      await store.dispatch("user/updateUser", { userId, form });
    }
  };
  
};

