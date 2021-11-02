import shop from "../../services/shop.js";
import cart from "./Cart.js";
import products from "./Products.js";

export default {
  namespaced: true,
  strict: true,
  modules: {
    cart,
    products
  },  
  state: () => ({
    checkoutError: false
  }),
  mutations: {
    setCheckoutError(state, error) {
      state.checkoutError = error;
    }
  },
  actions: {
    checkout({ commit, state }) {
      shop.buyProducts(
        state.cart.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutError", false);
        },
        () => {
          commit("setCheckoutError", true);
        }
      );
    }
  },
  getters: {}
};

