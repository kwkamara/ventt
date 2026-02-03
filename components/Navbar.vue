<template>

  <header class="col-12 h-5rem px-3 md:px-8 bg-white flex align-items-center animation-duration-1000 fadein"
          aria-label="Main Navigation">

    <!-- Logo -->
    <div aria-label="Ventt Brand"
         class="h-full w-4 flex align-items-center gap-2 font-bold uppercase title hover:text-purple-600 cursor-pointer">

      <NuxtLink to="/" class="flex gap-2 align-items-center no-underline">
        <img alt="ventt logo" height="50" src="/logo-ventt.svg" width="50"/>

        <h1 class="m-0 title hidden lg:block align-self-end capitalize font-light text-purple-700" style="letter-spacing:0.1em">
          Ventt
        </h1>
      </NuxtLink>
    </div>
    <!-- Logo -->


    <!-- menu -->
    <div class="w-8 flex align-items-center justify-content-end gap-3 md:gap-1">
      <!-- Login -->
      <VButton icon="person"/>
      <Divider layout="vertical" class="h-2rem hidden md:block"/>

      <!-- wishlist -->
      <VButton icon="favorite_border" :disabled="!Object.keys(wishlist).length"
               @click="$refs.wishListPopover.toggle($event)"/>
      <Divider layout="vertical" class="h-2rem hidden md:block"/>

      <!-- shopping cart -->
      <VButton icon="shopping_cart"
               :disabled="!Object.keys(cart).length"
               @click="$refs.shoppingCartPopover.toggle($event)"/>
    </div>
    <!-- /menu -->

  </header>


  <!-- shoppingCartPopover -->
  <Popover ref="shoppingCartPopover">
    <div class="grid m-0 lg:w-18rem select-none">

      <!-- Header -->
      <div class="col-12 p-3 text-right">
        <div class="m-0 font-light text-2xl">{{ formatDecimal(cartTotal) }}</div>
        <span class="m-0 font-light text-xs uppercase">cart total</span>
      </div>
      <!-- /Header -->

      <!-- products -->
      <div v-for="product in cart"
           @click="viewItem(product)"
           :key="product.documentId"
           :class="'col-12 p-3 flex justify-content-between border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 '">
        <span class="w-full">{{ product.name }}</span>
        <span>({{ product.cart || 1 }})</span>
        <span class="w-full text-right">{{ formatDecimal(product.price) }}</span>
      </div>
      <!-- /products -->

      <!-- Totals | checkout -->
      <div v-if="cartTotal" class="col-12 px-3 pb-4 pt-4 border-top-1 border-gray-200 flex justify-content-between">
        <NuxtLink to="/cart">
          <VButtonCube text="cart" icon="shopping_cart"/>
        </NuxtLink>

        <VButtonCube text="checkout" icon="shopping_cart_checkout" fill="true"/>
      </div>
      <!-- /Totals | checkout -->

    </div>
  </Popover>
  <!-- /shoppingCartPopover -->


  <!-- wishListPopover -->
  <Popover ref="wishListPopover">
    <div class="grid m-0 lg:w-18rem select-none">

      <!-- Header -->
      <div class="col-12 p-3 text-right">
        <span class="m-0 font-light text-xs uppercase">my</span>
        <div class="m-0 font-light text-2xl">Wishlist</div>
      </div>
      <!-- /Header -->

      <!-- products -->
      <div v-for="product in wishlist"
           @click="viewItem(product)"
           :key="product.documentId"
           :class="'col-12 p-3 flex justify-content-between border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 '">
        <span class="w-full">{{ product.name }}</span>
        <span class="w-full text-right">{{ formatDecimal(product.price) }}</span>
      </div>
      <!-- /products -->

    </div>
  </Popover>
  <!-- /wishListPopover -->

</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name: "Navbar",

  data() {
    return {}
  },

  computed: {
    cart() {
      return useState('cart').value;
    },
    cartTotal() {
      const product_keys = Object.keys(this.cart);
      if (!product_keys.length) return 0;

      let total = 0;
      product_keys.forEach(key => total += this.cart[key].price * (this.cart[key].cart));
      return total;
    },
    wishlist() {
      return useState('wishlist').value;
    }
  },

  methods: {
    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },

    //view product.
    viewItem(product) {
      useState('product').value = product;
      navigateTo(`/Product/${encodeURIComponent(product.name)}`);
    }
  }
})
</script>