<template>

  <div class="col-6 md:col-4 lg:col-4 lg:pt-0" @click="viewItem()" data-aos="fade-up">

    <div class="border-3 border-purple-50 hover:border-3 hover:border-purple-300 border-round-xl overflow-hidden hover:shadow-3">

      <div class="h-9rem md:h-12rem bg-gray-100 relative">

        <!-- wishlist | cart -->
        <div class="w-full p-3 absolute z-4 flex justify-content-between align-items-center">
          <!-- wishlist -->
          <VButton v-if="wishlist" :fill="wishlist[product.documentId]"
                   @click.stop="wishlist[product.documentId] ? removeFromWishList(product) : addToWishList(product); notify('wishlist');"
                   icon="favorite_border"/>

          <!-- shopping cart -->
          <VButton v-if="cart"
                   :fill="cart[product.documentId]"
                   icon="shopping_cart"
                   @click.stop="cart[product.documentId] ? removeFromCart(product) : addToCart(product); notify('cart');"/>
        </div>
        <!-- wishlist | cart -->


        <!-- image -->
        <img :alt="`Ventt Ecommerce Platform - ${product.name}`"
             :src="`/${product.images[0].url}`"
             class="w-full h-full absolute"
             loading="lazy" width="212"/>
      </div>


      <!-- footer -->
      <div class="p-3 md:flex justify-content-between bg-purple-800 text-white">

        <!-- name | rating -->
        <div>
          <div class="pb-1 capitalize white-space-nowrap">{{ product.name }}</div>
          <!-- rating -->
          <div class="text-yellow-500 flex align-items-center">
            <span v-for="(rating, ix) in product.rating" class="material-icons text-sm">star</span>
          </div>
        </div>
        <!-- /name | rating -->

        <!-- price -->
        <div class="pt-3 md:pt-0">{{ formatDecimal(product.price) }}</div>

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

//wishlist.
const {addToWishList} = useAddToWishList();
const {removeFromWishList} = useRemoveFromWishList();

//wishlist
let wishlist = useState('wishlist').value;
</script>


<script lang="js">
export default defineComponent({
  name: "Product",

  props: ['product'],

  data() {
    return {}
  },

  computed: {
    cart() {
      return useState('cart').value;
    },
    wishlist() {
      return useState('wishlist').value;
    },
  },

  methods: {

    //notify popup.
    notify(state) {
      //message setup.
      let info = "";
      if (state === 'cart') info = this.cart[this.product.documentId] ? 'Item added to cart' : 'Item removed from cart';
      else info = this.wishlist[this.product.documentId] ? 'Item added to wishlist' : 'item removed from wishlist';

      //show popup.
      this.$toast.add({
        severity: "info",
        summary : info,
        life    : 1500
      });
    },

    //view item.
    viewItem() {
      useState('product').value = this.product;
      navigateTo(`/Product/${encodeURIComponent(this.product.name)}`);
    }

  }
})
</script>