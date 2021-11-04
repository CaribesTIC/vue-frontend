<template>
  <div class="demo-tab mx-10">
    <h2>Carrito</h2>
    <hr />
    <div class="table-data__wrapper w-96 sm:w-full">
      <table class="table-data">
        <thead>
          <tr class="">
            <th>Producto(s)</th>
            <th>Producto(s)</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, $index) in cartItems" :key="item.id">
            <td><img :src="pathPhoto + item.photo" class="w-20" /></td>
            <td>{{ item.title }}</td>
            <td>{{ priceItems(item.price.toString()) }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button @click="removeItem($index)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot
          class="table-success"
          style="text-align:right;font-weight:normal;"
        >
          <tr>
            <th colspan="4">
              <p>Total:</p>
            </th>
            <td colspan="1">
              <p>
                <span id="total-general">{{ cartTotal || 0 }}</span>
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <hr />
    <div v-if="$store.state.checkoutError">
      <p>Error procesando los productos...</p>
    </div>
  </div>
</template>
<script>
import { currency } from "@/utils/currency.js";
export default {
  name: "AppShoppingCart",
  data() {
    return {
      pathPhoto: `http://localhost:8000/storage/products/`,
    };
  },
  methods: {
    removeItem(index) {
      this.$store.dispatch("shopcart/cart/removeProductFromCart", index);
    },
    checkout() {
      this.$store.dispatch("checkout");
    },
    priceItems(val) {
      return currency(val, " $");
    },
  },
  computed: {
    cartItems() {
      return this.$store.getters["shopcart/cart/productsOnCart"];
    },
    cartTotal() {
      return currency(this.$store.getters["shopcart/cart/cartTotal"], " $");
    },
  },
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>
