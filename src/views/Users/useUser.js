import { reactive, computed } from 'vue'
import { useStore } from 'vuex';

export default () => {  
   
  const store = useStore();

  const form = reactive({ name: "", email: "" });

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

  return {
    form,
    loading: computed(() => store.state.user.loading),
    userGet: async id => {    
      if (id != store.state.user.user.id) 
        await store.dispatch("user/getUser", id)
    },
  };
  
};

