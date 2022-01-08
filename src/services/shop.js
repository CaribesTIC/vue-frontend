import * as API from "@/services/API";

let _products = [];

export default {
  async getProducts(cb) {
    if (_products.length === 0) {
      //const sToken = store.getters.token;

      //const params = { token: sToken.access_token };
      
      let response = await API.apiClient.get("/products");

      //let response = await axios.get("http://127.0.0.1:8000/api/products", {
        //params: params,
      //});
      _products = response.data;
      cb(_products);
    }
  }
};
