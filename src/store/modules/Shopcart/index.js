import shop from "@/services/shop.js";
import * as cart from "./Cart.js";
import * as products from "./Products.js";

export const namespaced = true;

export const modules = {
  cart,
  products
};  

export const state = () => ({
  checkoutError: false
});

export const mutations = {
  setCheckoutError(state, error) {
    state.checkoutError = error;
  }
};

export const actions = {
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
};

export const getters = {};

