import { createStore, createLogger} from 'vuex'

import * as auth from "@/store/modules/Auth";
import * as user from "@/store/modules/User";
import * as message from "@/store/modules/Message";
import * as shopcart from "@/store/modules/Shopcart/";
//import * as role from "@/store/modules/Role";

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: {
    auth,
    user,
    message,
    shopcart//,
    //role
  },
  state: {
    flashMessage: {
      success: null,
      error: null
    }
  },
  mutations: {
    FLASH_MESSAGE_RESET(state) {
      state.flashMessage.success = null;
      state.flashMessage.error = null;
    },
    SET_FLASH_MESSAGE_SUCCESS(state, payload) {
      state.flashMessage.success = payload.msg;
    },
    SET_FLASH_MESSAGE_ERROR(state, payload) {
      state.flashMessage.error = payload.msg;
    }
  }
});

