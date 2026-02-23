<template>

  <div class="col-6 md:col-4 lg:pt-0" @click="viewItem" data-aos="fade-up">

    <div class="border-1 border-purple-100 hover:border-purple-400 border-round-2xl overflow-hidden hover:shadow-4 bg-purple-900 transition-all transition-duration-200 cursor-pointer">

      <div class="h-10rem md:h-12rem bg-purple-800 relative">

        <!-- wishlist | cart -->
        <div class="w-full p-3 absolute z-4 flex justify-content-between align-items-start">
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
      <div class="p-3 bg-purple-900 text-white">

        <!-- name | rating -->
        <div class="flex flex-column gap-1">
          <div class="capitalize text-sm md:text-base font-medium line-height-3 text-overflow-ellipsis white-space-nowrap overflow-hidden">
            {{ product.name[locale] }}
          </div>

          <!-- rating -->
          <div class="flex align-items-center gap-1">
            <div class="text-yellow-400 flex align-items-center">
              <span v-for="(rating, ix) in product.rating"
                    :key="ix"
                    class="material-icons-outlined text-xs md:text-sm">
                star
              </span>
            </div>
            <span class="text-2xs text-purple-200" v-if="product.rating_count">
              ({{ product.rating_count }})
            </span>
          </div>
        </div>
        <!-- /name | rating -->

        <!-- price -->
        <div class="pt-3 flex align-items-center justify-content-between">
          <div class="text-base md:text-lg font-semibold">
            {{ formatDecimal(product.price) }}
          </div>


        </div>

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

//locale.
const {locale} = useI18n();
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
      return useState('cart').value || [];
    },
    wishlist() {
      return useState('wishlist').value || [];
    },
  },

  methods: {

    //notify popup.
    notify(state) {
      //message setup.
      let info = "";
      if (state === 'cart') info = this.cart[this.product.documentId] ? this.$t('item_added_to_cart') : this.$t('item_removed_from_cart');
      else info = this.wishlist[this.product.documentId] ? this.$t('item_added_to_wishlist') : this.$t('item_removed_from_wishlist');

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

      const localePath = useLocalePath();
      const locale = this.$i18n.locale;
      navigateTo(localePath('/Product/' + encodeURIComponent(this.product.name[locale]) ));
    }

  }
})
</script>