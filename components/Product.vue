<template>
  <article class="h-15rem lg:h-14rem flex align-items-end shadow-1 border-round overflow-hidden relative hover:border-500"
           @click="useState('product').value = product"
           aria-labelledby="product-title">


    <!-- Product Image -->
    <img :alt="`Ventt Ecommerce Platform - ${product.name}`"
             width="454" class="w-full h-full absolute border-round"
             loading="lazy" :src="product.images[0].url" aria-hidden="true"/>


    <!-- Wishlist | Shopping Cart Buttons -->
    <div class="w-full absolute">

      <!-- Wishlist Button -->
      <div class="w-full p-3 flex align-items-center justify-content-between">
        <!-- Wishlist Button -->
        <!--        <Button :aria-label="product.wishlist ? 'Remove from wishlist' : 'Add to wishlist'"-->
        <!--                :class="`${product.wishlist ? 'text-white' : 'bg-white-alpha-70 text-purple-600'} text-lg border-none`"-->
        <!--                :severity="product.wishlist ? 'help' : 'secondary'"-->
        <!--                icon="pi pi-heart" raised rounded-->
        <!--                @click="product.wishlist ? removeFromWishList() : addToWishList();"/>-->

        <!-- Shopping Cart Button -->
        <!--        <Button :aria-label="product.cart ? 'Remove from cart' : 'Add to cart'"-->
        <!--            :class="`${product.cart ? 'text-white bg-purple-600' : 'bg-white-alpha-60 text-purple-600'} text-lg border-none`"-->
        <!--            icon="pi pi-shopping-cart" raised rounded-->
        <!--            @click="$refs.cartPopover.toggle($event)"/>-->
      </div>
      <!-- Shopping Cart Button -->


      <!-- product Name and Price -->
      <div class="hover:bg-yellow-600 hover:text-white bg-white">

        <!-- Product name -->
        <div class="h-3rem py-3 pl-3  w-full flex align-items-center justify-content-between border-bottom-1 border-gray-100">

          <h2 aria-label="product-title" class="capitalize text-sm font-light">{{ product.name }}</h2>

          <!--          <Button :aria-label="product.cart ? 'Remove from cart' : 'Add to cart'"-->
          <!--                  :class="`${product.cart ? 'text-white bg-purple-600' : 'bg-white-alpha-60 text-purple-600'} text-lg border-none bg-transparent`"-->
          <!--                  icon="pi pi-shopping-cart" rounded-->
          <!--                  @click="$refs.cartPopover.toggle($event)"/>-->
        </div>

        <!-- Rating | Price -->
        <div class="h-3rem w-full p-3 flex justify-content-between align-items-center">

          <!-- Rating -->
          <div class="flex gap-1 text-yellow-500">
            <i v-for="(rating, ix) in product.rating" :key="ix"
               :class="`pi ${product.reviews.length ? 'pi-star-fill' : 'pi-star' } text-xs`" aria-hidden="true"/>
          </div>

          <!-- Price -->
          <div aria-label="Product price">
            {{ formatDecimal(product.price) }}
          </div>

        </div>
        <!-- /Rating | Price -->

      </div>
      <!-- /product Name and Price -->

    </div>
    <!-- Wishlist | Shopping Cart Buttons -->


    <!-- Cart Popover -->
    <Popover ref="cartPopover">
      <div class="w-20rem lg:w-22rem px-3">
        <!-- Product Details -->
        <div class="flex align-items-center">
          <div class="h-4rem flex align-items-center">{{ product.name }}</div>
        </div>

        <!-- Cart Data -->
        <div class="h-6rem pt-3 pb-2 flex align-items-start justify-content-between border-top-1 border-gray-100">
          <!-- Quantity Input -->
          <div class="w-4">
            <InputText
                id="cart-value"
                v-model.number="cart.value"
                fluid
                aria-label="Quantity"
            />
            <label class="text-xs" for="cart-value">Quantity</label>
          </div>

          <!-- Cart Controls -->
          <div class="w-8 pl-2 flex gap-3 justify-content-end align-items-center">
            <Button aria-label="Add to cart" class="border-1 border-gray-100 text-xs"
                    icon="pi pi-shopping-cart" label="Add" outlined rounded severity="success" size="small"
                    @click="addToCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>

            <Button v-if="product.cart" aria-label="Remove from cart" class="border-1 border-gray-100 text-xs"
                    icon="pi pi-shopping-cart text-xs" label="Remove" outlined rounded severity="warn"
                    @click="removeFromCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>
          </div>
        </div>

        <!-- Cart Totals -->
        <div v-if="product.cart" class="h-4rem border-top-1 border-gray-100 flex justify-content-between align-items-center">
          <div>
            <div class="text-lg font-bold">{{ product.cart.toLocaleString() }}</div>
            <div class="text-xs">Quantity</div>
          </div>

          <div>
            <div class="text-lg font-bold">{{ formatDecimal(product.cart * product.price) }}</div>
            <div class="text-xs text-right">Total</div>
          </div>
        </div>

      </div>
    </Popover>
    <!-- Cart Popover -->

  </article>
</template>


<script setup lang="js">
import {useAddToCart} from "~/composables/addToCart.js";
import {useRemoveFromCart} from "~/composables/removeFromCart.js";

const {formatDecimal} = useFormatDecimal();

//shopping cart.
const {addToCart}      = useAddToCart();
const {removeFromCart} = useRemoveFromCart();
</script>


<script lang="js">
export default defineComponent({
  name : "Product",
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