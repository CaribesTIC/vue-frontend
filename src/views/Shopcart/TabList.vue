<script setup>
  import { onMounted, computed } from "vue"
  import { useStore } from "vuex"

  const store = useStore()
  const pathPhoto = `http://localhost:8000/storage/products/`;

  onMounted( async () => {
   try {
     await store.dispatch("shopcart/products/getProducts"); 
    } catch (error) {
      console.error(error);
    }    
  })

  const scSelectedProduct = computed(() => store.state.shopcart.products.selectedProduct)
  const scProductsOnStock = computed(() => store.getters['shopcart/products/productsOnStock'])
  const scNearlySoldOut   = computed(() => store.getters['shopcart/products/nearlySoldOut'])

  const addToCart = (val) => store.dispatch({ type: "shopcart/cart/addProductToCart", product: val })
  const selectProduct = (val) => store.commit({ type: "shopcart/products/setSelectedProduct", product: val })
</script>

<template>
  <div class="demo-tab mx-10">
    <!--{{scSelectedProduct}}-->
    <h2>Listado de productos</h2><hr />
    <div class="flex flex-wrap sm:m-4">
      <div
        :class="{ 'sold-out': scNearlySoldOut(product.id) }"
        @click="selectProduct(product)"
        v-for="product in scProductsOnStock"
        :key="product.id"
      >
        <div class="demo-tab m-4 w-60">
          <img :src="pathPhoto + product.photo" class="img-fluid" />
          <p class="text-gray-500 font-bold">{{ product.title }}</p><br />
          Price: {{ product.price }} $<br />
          <i class="text-sm">Remain: {{ product.inventory }} units</i><br />
          <button @click="addToCart(product)" class="btn btn-primary">
            Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sold-out {
    background-color: lightpink;
    border: 3px solid tomato;
    padding: 0.3rem;
    margin: 0.1rem;
  }
</style>
