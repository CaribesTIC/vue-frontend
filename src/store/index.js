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
  }
});

