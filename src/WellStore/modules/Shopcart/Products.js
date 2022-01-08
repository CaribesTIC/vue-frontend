import shop from "@/services/shop.js";

export const namespaced = true;

export const state = () => ({
  products: [],
  selectedProduct: {},
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setSelectedProduct(state, payload) {
    state.selectedProduct = payload.product;
  },
  editProduct(state, data) {
    const index = state.products.findIndex(
      (product) => product.id === state.selectedProduct.id
    );
    const product = Object.assign({}, state.products[index], data);
    Vue.set(state.products, index, product);
  },
  decrementProductInventory(state, product) {
    product.inventory--;
  },
  incrementProductInventory(state, item) {
    const product = state.products.find((product) => product.id === item.id);
    product.inventory += item.quantity;
  },
};

export const actions = {
  getProducts({ commit }) {
    return new Promise((resolve) => {
      shop.getProducts((products) => {          
        commit("setProducts", products);
        resolve();
      });
    });
  },
};

export const getters = {
  productsOnStock(state) {
    return state.products.filter((product) => {
      return product.inventory > 0;
    });
  },
  selectedProduct(state) {
    return state.selectedProduct;
  },
  nearlySoldOut(state) {
    return (id) => {
      return (
        state.products.find((product) => product.id === id).inventory < 2
      );
    };
  },
};
