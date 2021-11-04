import { shallowMount } from '@vue/test-utils'
import Tabs from '@/views/Shopcart/Tabs.vue'
import TabList from '@/views/Shopcart/TabList.vue'
import TabCart from '@/views/Shopcart/TabCart.vue'
import store from "@/store/index.js";

describe('Tabs.vue', () => {
  it('renders tabs', () => {
    const wrapper = shallowMount(Tabs)

    expect(wrapper.text()).toMatch("ListCart")
  })
})

describe('TabList.vue', () => {
  it('renders tab-list', () => {

    const wrapper = shallowMount(TabList, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.text()).toMatch("Listado de productos")
  })
})

describe('TabCart.vue', () => {
  it('renders tab-cart', () => {

    const wrapper = shallowMount(TabCart, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.text()).toMatch("Carrito")
  })
})
