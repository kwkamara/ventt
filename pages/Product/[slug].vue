<template>
  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none overflow-hidden">
    <Navbar/>

    <Categories/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!-- product -->
  <section v-if="product" class="grid m-0 px-3 lg:px-5 py-5 text-gray-700 select-none overflow-hidden animation-duration-1000 fadein">

    <!-- image col -->
    <div class="col-12 md:col-6 lg:px-6 lg:py-5 lg:flex">

      <div class="grid m-0">

        <!-- image | icons -->
        <div class="col-12 lg:col-9 h-14rem lg:h-18rem p-0 relative overflow-hidden border-round-xl border-1 border-purple-100">
          <!-- image -->
          <img :alt="product.name"
               :src="'/'+product.images[image_ix].url"
               class="top-0 w-full h-full absolute"/>

          <!-- wishlist -->
          <VButton :fill="wishlist[product.documentId]"
                   class="left-0 ml-3 mt-3"
                   @click.stop="wishlist[product.documentId] ? removeFromWishList(product) : addToWishList(product); notify('wishlist');"
                   icon="favorite_border"/>
        </div>
        <!-- image | icons -->


        <!-- thumbnails -->
        <div class="col-12 lg:col-3 h-6rem lg:pt-0 flex align-items-center lg:flex-column gap-2 lg:gap-3">
          <div class="grid m-0">
            <div v-for="(image, ix) in product.images" class="col-4 lg:col-12 lg:px-0 lg:py-1">
              <img
                  :alt="product.name"
                  :class="'w-full border-round-xl hover:shadow-3 hover:border-2 ' + (image_ix === ix ? 'shadow-3 border-3 border-purple-300' : 'border-1 border-purple-100')"
                  :src="'/'+image.url"
                  @click="image_ix = ix"/>
            </div>
          </div>
        </div>
        <!-- /thumbnails -->


        <!-- icons -->
        <div class="col-12 pt-3 lg:pt-0 pl-0 flex gap-3 align-items-start justify-content-center lg:justify-content-start">
          <template v-for="(icon, ix) in ['shield', 'local_shipping', 'payments']" :key="ix">
            <VButton :icon="icon"/>
            <Divider v-if="ix<2" layout="vertical" unstyled class="border-left-1 h-2rem border-gray-200"/>
          </template>
        </div>
        <!-- /icons -->

      </div>

    </div>
    <!-- /image col -->

    <!-- info col -->
    <div class="col-12 md:col-6 pt-3 lg:px-6 lg:pb-3">

      <!-- product name | like -->
      <div class="pt-2 pb-3 flex justify-content-between">

        <!-- product name | rating -->
        <div>
          <h2 class="m-0 text-4xl font-light capitalize">{{ product.name }}</h2>
          <!-- rating -->
          <div class="text-yellow-600 flex align-items-center">
            <span v-for="(rating, ix) in product.rating" class="material-icons text-2xl">star</span>
          </div>
        </div>
        <!-- /product name | rating -->


        <!-- price -->
        <div class="text-right">
          <div class="text-4xl">{{ formatDecimal(product.price) }}</div>
          <span class="uppercase text-sm">unit price</span>
        </div>
        <!-- /price -->

      </div>
      <!-- /product name | like -->

      <Divider/>

      <!-- description -->
      <div>
        <div class="pb-4 uppercase text-xs text-gray-600 flex gap-2 text-spaced">
          <div>{{ product.sku }}</div>
          <Divider class="h-1rem" layout="vertical"/>
          <div>{{ product.dimensions }}</div>
          <Divider class="h-1rem" layout="vertical"/>
          <div>{{ product.weight }}</div>
        </div>

        <p class="m-0">{{ product.description }}</p>
      </div>


      <!-- cart -->
      <div class="pt-3">

        <div class="pt-4 pb-2 font-light text-lg uppercase">Quantity</div>

        <div class="flex align-items-center justify-content-between gap-3 pb-5">

          <div class="flex align-items-center gap-4">
            <VButton icon="remove" :disabled="product.cart===1" @click="product.cart > 1 ? product.cart-- : null"/>
            <span class="w-3rem inline-block text-center text-3xl font-bold">{{ product.cart || 1 }}</span>
            <VButton fill="1" icon="add" @click="product.cart ? product.cart++ : product.cart = 2"/>
          </div>

        </div>

        <Divider/>

        <!-- total | cart controls -->
        <div class="flex justify-content-between align-items-center">
          <!-- total -->
          <div>
            <div class="text-4xl">{{ formatDecimal(product.price * quantity) }}</div>
            <span class="uppercase text-sm">Total</span>
          </div>

          <!-- controls -->
          <div class="text-right">
            <VButtonCube v-if="cart[product.documentId]"
                         class="w-full"
                         icon="remove_shopping_cart"
                         text="Remove from cart"
                         @click="removeFromCart(product); notify('cart')"/>

            <VButtonCube v-else
                         class="w-full"
                         fill="true"
                         icon="add_shopping_cart"
                         text="Add to cart"
                         @click="addToCart(product); notify('cart')"/>
          </div>
          <!-- /controls -->

        </div>
        <!-- /total | cart controls -->

      </div>
      <!-- cart -->


    </div>
    <!-- /info col -->

  </section>
  <!-- /product -->



  <section class="grid m-0 px-3 lg:px-7 py-5 lg:pb-7 text-sm bg-gray-100 shadow-1">

    <div class="col-12">
      <h2 class="m-0 font-light text-3xl">Reviews</h2>
    </div>

    <div v-for="review in product.reviews" class="col-12 lg:col-6 py-2 border-top-1 border-gray-200">
      <div>{{review.user}}</div>
      <div class="pb-3 text-yellow-600 flex align-items-center">
        <span v-for="(rating, ix) in product.rating" class="material-icons text-xl">star</span>
      </div>

      <p class="m-0">{{review.review}}</p>
    </div>

  </section>

  <!--  footer -->
  <VFooter class="select-none"/>
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
</script>


<script lang="js">
export default defineComponent({
  name: "[slug]",

  data() {
    return {
      quantity: 1,
      image_ix: 0
    }
  },

  computed: {
    product() {
      return useState('product').value;
    },

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
      if (state === 'cart') info = this.cart[this.product.documentId] ? 'item added to cart' : 'item removed from cart';
      else info = this.wishlist[this.product.documentId] ? 'item added to wishlist' : 'item removed from wishlist';

      //show popup.
      this.$toast.add({severity: "info", summary: info, life: 1500});
    },

  },

  mounted() {
    if (!useState('product').value) navigateTo('/');
  }
})
</script>
