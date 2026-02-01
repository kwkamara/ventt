<template>

  <div class="col-12 md:col-4 lg:col-4">
    <div class="border-1 border-purple-50 border-round-xl overflow-hidden hover:shadow-3">

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


  <!--  <article class="h-9rem lg:h-12rem flex align-items-end shadow-1 border-round overflow-hidden relative hover:shadow-7 border-yellow-600"-->
  <!--           @click="useState('product').value = product; useState('ui').value=null; scrollToTop()"-->
  <!--           aria-labelledby="product-title">-->


  <!--    &lt;!&ndash; Product Image &ndash;&gt;-->
  <!--    <img :alt="`Ventt Ecommerce Platform - ${product.name}`"-->
  <!--         :src="`/${product.images[0].url}`" class="w-full h-full absolute border-round"-->
  <!--         loading="lazy" width="212"/>-->


  <!--    &lt;!&ndash; product Name and Price &ndash;&gt;-->
  <!--    <div class="w-full absolute">-->

  <!--      &lt;!&ndash; product Name and Price &ndash;&gt;-->
  <!--      <div class="hover:bg-yellow-600 hover:text-white bg-white-alpha-90">-->

  <!--        <h2 aria-label="product-title" class="m-0 px-3 pt-2 capitalize text-sm font-light white-space-nowrap">-->
  <!--          {{ product.name }}-->
  <!--        </h2>-->

  <!--        &lt;!&ndash; Rating | Price &ndash;&gt;-->
  <!--        <div class="h-2rem px-3 pb-3 pt-1 flex justify-content-between align-items-center">-->

  <!--          &lt;!&ndash; rating &ndash;&gt;-->
  <!--          <div class="text-yellow-500 flex align-items-center gap-1">-->
  <!--            <i v-for="(rating, ix) in product.rating" :key="ix"-->
  <!--               :class="`pi ${product.reviews.length ? 'pi-star-fill' : 'pi-star' } text-xs`" aria-hidden="true"/>-->
  <!--          </div>-->

  <!--          &lt;!&ndash; Price &ndash;&gt;-->
  <!--          <div aria-label="Product price" class="flex align-items-center">-->
  <!--            {{ formatDecimal(product.price) }}-->
  <!--          </div>-->

  <!--        </div>-->
  <!--        &lt;!&ndash; /Rating | Price &ndash;&gt;-->

  <!--      </div>-->
  <!--      &lt;!&ndash; /product Name and Price &ndash;&gt;-->

  <!--    </div>-->
  <!--    &lt;!&ndash; /product Name and Price &ndash;&gt;-->


  <!--    &lt;!&ndash; Cart Popover &ndash;&gt;-->
  <!--    <Popover ref="cartPopover">-->
  <!--      <div class="w-20rem lg:w-22rem px-3">-->
  <!--        &lt;!&ndash; Product Details &ndash;&gt;-->
  <!--        <div class="flex align-items-center">-->
  <!--          <div class="h-4rem flex align-items-center">{{ product.name }}</div>-->
  <!--        </div>-->

  <!--        &lt;!&ndash; Cart Data &ndash;&gt;-->
  <!--        <div class="h-6rem pt-3 pb-2 flex align-items-start justify-content-between border-top-1 border-gray-100">-->
  <!--          &lt;!&ndash; Quantity Input &ndash;&gt;-->
  <!--          <div class="w-4">-->
  <!--            <InputText-->
  <!--                id="cart-value"-->
  <!--                v-model.number="cart.value"-->
  <!--                fluid-->
  <!--                aria-label="Quantity"-->
  <!--            />-->
  <!--            <label class="text-xs" for="cart-value">Quantity</label>-->
  <!--          </div>-->

  <!--          &lt;!&ndash; Cart Controls &ndash;&gt;-->
  <!--          <div class="w-8 pl-2 flex gap-3 justify-content-end align-items-center">-->
  <!--            <Button aria-label="Add to cart" class="border-1 border-gray-100 text-xs"-->
  <!--                    icon="pi pi-shopping-cart" label="Add" outlined rounded severity="success" size="small"-->
  <!--                    @click="addToCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>-->

  <!--            <Button v-if="product.cart" aria-label="Remove from cart" class="border-1 border-gray-100 text-xs"-->
  <!--                    icon="pi pi-shopping-cart text-xs" label="Remove" outlined rounded severity="warn"-->
  <!--                    @click="removeFromCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--        &lt;!&ndash; Cart Totals &ndash;&gt;-->
  <!--        <div v-if="product.cart" class="h-4rem border-top-1 border-gray-100 flex justify-content-between align-items-center">-->
  <!--          <div>-->
  <!--            <div class="text-lg font-bold">{{ product.cart.toLocaleString() }}</div>-->
  <!--            <div class="text-xs">Quantity</div>-->
  <!--          </div>-->

  <!--          <div>-->
  <!--            <div class="text-lg font-bold">{{ formatDecimal(product.cart * product.price) }}</div>-->
  <!--            <div class="text-xs text-right">Total</div>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--      </div>-->
  <!--    </Popover>-->
  <!--    &lt;!&ndash; Cart Popover &ndash;&gt;-->

  <!--  </article>-->
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

  }
})
</script>