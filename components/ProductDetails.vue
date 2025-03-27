<template>
  <div class="col-12 p-0">

    <!-- Breadcrumb -->
    <div class="w-full h-4rem px-3 lg:pl-7 lg:pr-8 bg-gray-200 text-gray-800 flex align-items-center justify-content-between">

      <div class="flex align-items-center gap-3">

        <Button class="hover:text-purple-300 text-gray-800 bg-transparent" icon="pi pi-shop" label="Shop" text size="small"
                @click="useState('product').value=null; useState('ui').value='shop'"/>

        <i class="pi pi-chevron-right text-xs"/>
        <span>{{ product.name }}</span>

      </div>

      <Button :aria-label="product.wishlist ? 'Remove from wishlist' : 'Add to wishlist'"
              :class="`${product.wishlist ? 'text-white bg-purple-600' : 'bg-white-alpha-70 text-purple-700'} text-lg border-none`"
              icon="pi pi-heart" rounded
              @click="product.wishlist ? removeFromWishList() : addToWishList();"/>

    </div>
    <!-- /Breadcrumb -->


    <!-- Product -->
    <div class="grid m-0 lg:p-8 gap-5 bg-white text-gray-800">

      <!-- images | related products -->
      <div class="col-12 lg:col-4 p-0">

        <!-- main image -->
        <div class="h-15rem lg:h-20rem w-full border-1 border-gray-200">
          <img :alt="product.name" :src="productImage.url"
               class="w-full h-full fadein animation-duration-1000"/>
        </div>
        <!-- main image -->


        <!-- images -->
        <div class="h-7rem px-2 lg:px-4 flex align-items-center justify-content-between gap-1 border-1 border-gray-200 bg-gray-100">

          <img v-for="image in product.images" :alt="product.name"
               :src="image.url" class="h-5rem border-round hover:shadow-3"
               loading="lazy" @click="viewImage(image)"/>

        </div>
        <!-- /images -->


        <!-- Rel Products -->
        <div class="hidden lg:flex grid m-0 px-3 lg:p-0">

          <div class="col-12 pt-5 flex align-items-center">Related Products</div>

          <div v-for="relProduct in relProducts.slice(0, 2)" class="col-6">
            <Product :product="relProduct"/>
          </div>

        </div>
        <!-- /Rel Products -->

      </div>
      <!-- /images | related products -->


      <!-- Product Details -->
      <div class="col-12 lg:col-6 px-4 py-0">

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
              <div class="text-xs text-gray-500 pt-1">weight</div>
            </div>

            <div class="capitalize py-2">
              <div>{{ product.dimensions || null }}</div>
              <div class="text-xs text-gray-500 pt-1">dimensions</div>
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
                    @click="addToCart(product, cart.value);"/>

            <Button v-if="product.cart" aria-label="Remove from cart" class="border-1 border-gray-100 text-xs"
                    icon="pi pi-shopping-cart" label="Remove" outlined rounded severity="warn" size="small"
                    @click="removeFromCart(product, cart.value);"/>
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
        <div class="w-full py-8">

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


        <!-- Rel Products -->
        <div class="lg:hidden grid m-0 pb-4">

          <div class="col-12 flex align-items-center">Related Products</div>

          <div v-for="relProduct in relProducts.slice(0, 2)" class="col-6">
            <Product :product="relProduct"/>
          </div>

        </div>
        <!-- /Rel Products -->
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
      //get current item categories.
      const categories = Object.keys(this.product.categories);

      //primary filter.
      const main_cat      = categories[0];
      const primary_items = useState('products').value
          .filter(pd => pd.categories[main_cat] && pd.documentId !== this.product.documentId);

      //secondary filter.
      const second_cat      = categories[1];
      const secondary_items = primary_items.filter(pd => pd.categories[second_cat]);
      if (secondary_items.length > 1) return secondary_items;


      //return primary items.
      secondary_items.push(...primary_items.filter(pd => !secondary_items.includes(pd)))
      return secondary_items;
    },

    //get main product.
    productImage() {
      return this.product.images.find(img => img.active) || this.product.images[0];
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
