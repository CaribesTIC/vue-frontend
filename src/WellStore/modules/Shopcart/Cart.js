export const namespaced = true;

export const state = () => ({
  cart: []
});

export const mutations = {
  incrementProductQuantity(state, item) {
    item.quantity++;
  },
  addProductToCart(state, product) {
    state.cart.push({
      id: product.id,
      quantity: 1
    });
  },
  removeProductFromCart(state, index) {
    state.cart.splice(index, 1);
  },
  emptyCart(state) {
    state.cart = [];
  }
};

export const actions = {
  addProductToCart(context, { product }) {
    if (product.inventory === 0) 
      return;
    const item = context.state.cart.find(item => item.id === product.id);
    if (item) {
      context.commit("incrementProductQuantity", item);
    } else {
      context.commit("addProductToCart", product);
    }
    context.commit("shopcart/products/decrementProductInventory", product, { root: true });
  },
  removeProductFromCart(context, index) {
    const item = context.state.cart[index];
    context.commit("removeProductFromCart", index);
    context.commit("shopcart/products/incrementProductInventory", item, { root: true });
  }
};

export const getters = {
  productsOnCart(state, getters, rootState) {
    return state.cart.map(item => {
      const product = rootState.shopcart.products.products.find(
        product => product.id === item.id
      );
      return {
        title: product.title,
        price: product.price,
        photo: product.photo,
        quantity: item.quantity
      };
    });
  },
  cartTotal(state, getters) {
    return getters.productsOnCart.reduce(
      (total, current) => total + current.price * current.quantity, 0
    );
  }
};

