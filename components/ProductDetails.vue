<template>
  <div class="col-12 p-0">

    <!-- Breadcrumb -->
    <div class="w-full h-4rem px-4 lg:pl-7 lg:pr-8 bg-gray-200 text-gray-800 flex align-items-center justify-content-between">

      <div class="flex align-items-center gap-2">
        <Button label="home" icon="pi pi-shop" text
                class="hover:text-purple-300 text-gray-800 bg-transparent"
                @click="useState('product').value=null"/>

        <i class="pi pi-chevron-right text-xs"/>
        <span>{{ product.name }}</span></div>


      <Button :aria-label="product.wishlist ? 'Remove from wishlist' : 'Add to wishlist'"
              :class="`${product.wishlist ? 'text-white' : 'bg-white-alpha-70 text-purple-600'} text-lg border-none`"
              :severity="product.wishlist ? 'help' : 'secondary'"
              icon="pi pi-heart" raised rounded
              @click="product.wishlist ? removeFromWishList() : addToWishList();"/>

    </div>
    <!-- /Breadcrumb -->


    <!-- Product -->
    <div class="grid m-0 lg:p-8 gap-5 bg-white text-gray-800">

      <!-- images | related products -->
      <div class="col-12 lg:col-4 p-0">

        <!-- main image -->
        <div class="h-20rem w-full">
          <img :alt="product.name" :src="productImage.url"
                   class="w-full h-full"/>
        </div>
        <!-- main image -->


        <!-- images -->
        <div class="h-7rem px-3 flex align-items-center justify-content-between gap-1 shadow-1">

          <img v-for="image in product.images" :alt="product.name"
               :src="image.url" class="h-5rem border-round hover:shadow-3"
               loading="lazy" @click="viewImage(image)"/>

        </div>
        <!-- /images -->


        <!-- Rel Products -->
        <div class="grid m-0">
          <div class="col-12 pt-5 flex align-items-center">Related Products</div>

          <div v-for="relProduct in relProducts.slice(0, 2)" class="col-12 lg:col-6 px-2">
            <Product :product="relProduct"/>
          </div>

        </div>
        <!-- /Rel Products -->

      </div>
      <!-- /images | related products -->


      <!-- Product Details -->
      <div class="col-12 lg:col-6 px-3 py-0">

        <!-- header -->
        <div class="h-3rem flex align-items-start justify-content-between text-lg font-bold capitalize">
          <!-- name | rating -->
          <div>
            <!-- name -->
            <div>{{ product.name }}</div>

            <!-- rating -->
            <div class="pt-2 flex gap-1">
              <i v-for="(rating, ix) in product.rating" :key="ix" class="pi pi-star-fill text-yellow-500 text-xs" aria-hidden="true"/>
            </div>
          </div>
          <!-- name | rating -->

          <!-- Price -->
          <div>
            <div>{{ formatDecimal(product.price || 0) }}</div>
            <div class="h-2rem flex align-items-center justify-content-end text-xs font-light text-gray-500">price</div>
          </div>
        </div>
        <!-- header -->


        <!-- Product Description -->
        <div class="py-3 flex align-items-center text-sm border-bottom-1 border-gray-200">
          <div>
            <div class="py-3 flex align-items-center">
              {{ product.description }}
            </div>

            <div class="capitalize py-2">
              <div>{{ product.weight || null }}</div>
              <div class="text-xs text-gray-500">weight</div>
            </div>

            <div class="capitalize py-2">
              <div>{{ product.dimensions || null }}</div>
              <div class="text-xs text-gray-500">dimensions</div>
            </div>

          </div>
        </div>
        <!-- /Product Description -->


        <!-- Cart Data -->
        <div class="h-6rem py-3 flex align-items-start justify-content-between border-top-1 border-gray-100">

          <!-- Quantity Input -->
          <div class="w-4">
            <InputText id="cart-value" v-model.number="cart.value"
                       fluid class="bg-gray-50" aria-label="Quantity"
            />
            <label class="text-xs" for="cart-value">Quantity</label>
          </div>

          <!-- Cart Controls -->
          <div class="w-8 pl-2 flex gap-3 justify-content-end align-items-center">
            <Button aria-label="Add to cart" class="border-1 border-gray-100 text-xs" icon="pi pi-shopping-cart"
                    label="Add" outlined rounded severity="success" size="small"
                    @click="addToCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>

            <Button v-if="product.cart" aria-label="Remove from cart" class="border-1 border-gray-100 text-xs"
                    icon="pi pi-shopping-cart" label="Remove" outlined rounded severity="warn" size="small"
                    @click="removeFromCart(product, cart.value); notify(`${cart.value} product(s) added to cart.`)"/>
          </div>
          <!-- Cart Controls -->

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


        <!-- Reviews -->
        <div class="w-full pt-5">

          <!-- reviews header -->
          <div class="py-2 border-bottom-1 border-gray-200">
            Reviews
          </div>

          <!-- review -->
          <div v-for="review in product.reviews" class="py-3 border-bottom-1 border-gray-100">

            <!-- review details -->
            <div class="text-sm">{{ review.review }}</div>

            <!-- rating | user -->
            <div class="flex align-items-center justify-content-between text-xs">

              <!-- rating -->
              <div class="pt-1 flex align-items-center gap-1">
                <i v-for="(rating, ix) in review.rating" :key="ix" class="pi pi-star-fill text-yellow-500 text-xs" aria-hidden="true"/>
              </div>

              <!-- user -->
              <div>{{ review.user }}</div>
            </div>
            <!-- rating | user -->

          </div>
          <!-- /review -->

        </div>
        <!-- Reviews -->

      </div>
      <!-- /Product Details -->

    </div>
    <!-- Product -->

  </div>
</template>


<script setup lang="js">
const {addToCart}      = useAddToCart();
const {removeFromCart} = useRemoveFromCart();
const {formatDecimal}  = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name: "ProductDetails",

  data() {
    return {
      ui: {
        mode: 'details'
      },

      cart: {
        value: 1
      }
    }
  },

  computed: {
    product() {
      return useState('product').value;
    },

    relProducts() {
      return useState('products').value.filter(pd => pd.documentId !== this.product.documentId);
    },

    //get main product.
    productImage() {
      const image = this.product.images.find(img => img.active);
      if (image) return image;
      else return this.product.images[0];
    }

  },

  methods: {

    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },

    //view image.
    viewImage(image) {
      //reset images.
      useState('product').value.images.forEach(img => img.active = null);
      image.active = true;
    },

    addToWishList() {
      this.product.wishlist = new Date().getTime();
      this.notify('item added to wish list.');
    },

    removeFromWishList() {
      delete this.product.wishlist;
      this.notify('item removed from wish list.');
    },
  },

  beforeMount() {
    useState('product').value.images[0].active = true;
  }
})
</script>
