<template>

  <section class="col-12 pt-4 md:py-5 px-3 md:px-7 bg-white flex align-items-center animation-duration-1000 fadein"
           aria-label="Main Navigation">

    <!-- Logo -->
    <div aria-label="Ventt Brand"
         class="h-full w-4 flex align-items-center gap-2 font-bold uppercase title hover:text-purple-600 cursor-pointer">

      <NuxtLink :to="$localePath('/')" class="md:flex gap-2 align-items-center no-underline">

        <img alt="ventt logo"
             height="50"
             src="/logo-ventt.svg"
             width="50"/>

        <Divider layout="vertical" class="h-3rem hidden md:block"/>

        <div>
          <h1 class="m-0 title align-self-end uppercase font-light text-purple-700"
              style="letter-spacing:0.1em">
            Ventt
          </h1>
          <span class="text-gray-700 text-xs font-light hidden lg:block">
            {{ $t('tagline') }}
          </span>
        </div>
      </NuxtLink>
    </div>
    <!-- Logo -->


    <!-- menu | locales -->
    <nav class="w-10 lg:w-8">

      <!-- menu -->
      <div class="flex align-items-center justify-content-end gap-4 md:gap-0">
        <!-- Login -->
        <NuxtLink :to="$localePath('/login')">
          <VButton icon="person"/>
        </NuxtLink>
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


      <!-- locales -->
      <div class="pt-4 flex justify-content-end align-items-center gap-0">
        <Locale/>
      </div>
      <!-- /locales -->

    </nav>
    <!-- /menu | locales -->

  </section>


  <!-- shoppingCartPopover -->
  <Popover ref="shoppingCartPopover">
    <div class="grid m-0 lg:w-18rem select-none">

      <!-- Header -->
      <div class="col-12 p-3 text-right">
        <div class="m-0 font-light text-2xl">{{ formatDecimal(cartTotal) }}</div>
        <span class="m-0 font-light text-xs uppercase">{{ $t('cart_total') }}</span>
      </div>
      <!-- /Header -->

      <!-- products -->
      <div v-for="product in cart"
           @click="viewItem(product)"
           :key="product.documentId"
           :class="'col-12 p-3 flex justify-content-between border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 '">
        <span class="w-full capitalize">{{ product.name[locale] }}</span>
        <span>({{ product.cart || 1 }})</span>
        <span class="w-full text-right">{{ formatDecimal(product.price) }}</span>
      </div>
      <!-- /products -->

      <!-- Cart -->
      <div v-if="cartTotal" class="col-12 px-3 pb-4 pt-4 border-top-1 border-gray-200 text-right">
        <NuxtLink :to="$localePath('/cart')">
          <VButtonCube :text="$t('cart')"
                       fill="1"
                       icon="shopping_cart"/>
        </NuxtLink>
      </div>
      <!-- /Cart -->

    </div>
  </Popover>
  <!-- /shoppingCartPopover -->


  <!-- wishListPopover -->
  <Popover ref="wishListPopover">
    <div class="grid m-0 lg:w-18rem select-none">

      <!-- Header -->
      <div class="col-12 p-3 text-right">
        <div class="m-0 font-light text-2xl">{{ $t('wishlist') }}</div>
      </div>
      <!-- /Header -->

      <!-- products -->
      <div v-for="product in wishlist"
           @click="viewItem(product)"
           :key="product.documentId"
           :class="'col-12 p-3 flex justify-content-between border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 '">
        <span class="w-full capitalize">{{ product.name[locale] }}</span>
        <span class="w-full text-right">{{ formatDecimal(product.price) }}</span>
      </div>
      <!-- /products -->

    </div>
  </Popover>
  <!-- /wishListPopover -->

</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();

//locale.
const {locale} = useI18n();
</script>


<script lang="js">
export default defineComponent({

  name: "Navbar",

  data() {
    return {}
  },

  computed: {
    //cart.
    cart() {
      return useState('cart').value || [];
    },

    //cart total.
    cartTotal() {
      const product_keys = Object.keys(this.cart);
      if (!product_keys.length) return 0;

      let total = 0;
      product_keys.forEach(key => total += this.cart[key].price * (this.cart[key].cart));
      return total;
    },

    //wishlist.
    wishlist() {
      return useState('wishlist').value || [];
    }
  },

  methods: {
    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },

    //view product.
    viewItem(product) {
      //active product
      useState('product').value = product;

      //navigate.
      const localePath = useLocalePath();
      const locale = this.$i18n.locale;
      navigateTo(localePath('/Product/' + encodeURIComponent(product.name[locale])));
    }
  }
})
</script>