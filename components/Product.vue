<template>

  <div class="col-12 md:col-4 lg:col-4" @click="viewItem()">
    <div class="border-3 border-purple-50 hover:border-3 hover:border-purple-300 border-round-xl overflow-hidden hover:shadow-3">

      <div class="h-12rem bg-gray-100 relative">
        <!-- header -->
        <div class="w-full p-3 absolute z-4 flex justify-content-between align-items-center">
          <!-- like -->
          <VButton icon="favorite_border"/>

          <!-- shopping cart -->
          <VButton icon="shopping_cart"/>
        </div>
        <!-- /header -->

        <!-- image -->
        <img :alt="`Ventt Ecommerce Platform - ${product.name}`"
             :src="`/${product.images[0].url}`"
             class="w-full h-full absolute"
             loading="lazy" width="212"/>
      </div>

      <!-- footer -->
      <div class="p-3 flex justify-content-between bg-purple-800 text-white">
        <!-- name | rating -->
        <div>
          <div class="pb-1 capitalize">{{ product.name }}</div>
          <!-- rating -->
          <div class="text-yellow-500 flex align-items-center">
            <span v-for="(rating, ix) in product.rating" class="material-icons text-sm">star</span>
          </div>
        </div>
        <!-- /name | rating -->

        <!-- price -->
        <div>{{ formatDecimal(product.price) }}</div>

      </div>
      <!-- /footer -->

    </div>
  </div>

</template>


<script setup lang="js">
//decimal.
const {formatDecimal} = useFormatDecimal();

//shopping cart.
const {addToCart} = useAddToCart();
const {removeFromCart} = useRemoveFromCart();

//scroll.
const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
};
</script>


<script lang="js">
export default defineComponent({
  name: "Product",

  props: ['product'],

  data() {
    return {
      cart: {
        value: 1
      }
    }
  },

  computed: {},

  methods: {

    //add item to wish list.
    addToWishList() {
      this.product.wishlist = new Date().getTime();
      this.notify('item added to wish list.');
    },

    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },

    viewItem() {
      navigateTo(`/Product/${encodeURIComponent(this.product.name)}`);
      useState('product').value = this.product;
    }

  }
})
</script>