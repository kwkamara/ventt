<template>
  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none bg-gray-700 overflow-hidden">
    <Navbar/>

    <Categories/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!-- cart -->
  <section  v-if="cart" class="grid m-0 py-5 lg:py-7 lg:px-5 select-none">

    <!-- cart summary -->
    <div class="col-12 lg:col-7 py-3 px-4">
      <div class="p-4 border-1 border-purple-200 shadow-1 border-round-xl">

        <!-- header -->
        <div class="pb-2">
          <h2 class="m-0 font-light">{{$t('my_cart')}}</h2>
          <span class="uppercase text-xs">{{ Object.keys(cart).length }} {{$t('products')}}</span>
        </div>
        <!-- /header -->


        <!-- products -->
        <div v-for="product in cart"
             @click="viewItem(product)"
             :key="product.documentId"
             class="py-4 md:flex justify-content-between align-items-center border-purple-50 hover:border-none border-top-1 hover:text-yellow-800">

          <!-- name | sku -->
          <div class="w-full pb-3 lg:p-0">
            <div class="pb-1 font-bold text-lg">{{ product.name[locale] }}</div>
            <div class="text-xs uppercase">{{ product.sku }}</div>
          </div>
          <!-- /name | sku -->

          <!-- quantity -->
          <div class="flex align-items-center gap-3 md:gap-4">
            <VButton icon="remove" :disabled="product.cart===1" @click.stop="product.cart > 1 ? product.cart-- : null"/>
            <span class="w-3rem inline-block text-center text-3xl font-bold">{{ product.cart || 1 }}</span>
            <VButton fill="1" icon="add" @click.stop="product.cart ? product.cart++ : product.cart = 2"/>
            <VButton icon="delete" @click.stop="removeFromCart(product)"/>
          </div>
          <!-- /quantity -->

          <!-- total -->
          <div class="w-full pt-3 lg:p-0 md:text-right text-lg">
            {{ formatDecimal(product.price * product.cart) }}
          </div>
          <!-- /total -->
        </div>
        <!-- /products -->


        <!-- Total -->
        <div v-if="cartTotal" class="pb-2 pt-4 border-top-1 border-gray-200 text-right">
          <div class="m-0 font-bold text-2xl">{{ formatDecimal(cartTotal) }}</div>
          <span class="m-0 font-light text-xs text-gray0700 uppercase">{{$t('cart_total')}}</span>
        </div>
        <!-- /Total -->

      </div>
    </div>
    <!-- /cart summary -->


    <!-- order summary -->
    <div class="col-12 lg:col-5 py-3 px-4">

      <div class="p-4 border-1 border-purple-200 shadow-1 border-round-xl">

        <!-- header -->
        <div class="pb-2">
          <h2 class="m-0 font-light">{{$t('order_summary')}}</h2>
        </div>
        <!-- /header -->

        <!-- Subtotal -->
        <div class="py-3 flex justify-content-between align-items-center border-purple-50">
          <div>{{ $t('subtotal') }}</div>
          <div>{{ formatDecimal(cartTotal) }}</div>
        </div>
        <!-- /Subtotal -->


        <!-- Shipping -->
        <div class="py-3 flex justify-content-between align-items-center border-purple-50">
          <div>{{ $t('shipping') }} (2%)</div>
          <div>{{ formatDecimal(cartTotal * 0.02) }}</div>
        </div>
        <!-- /Shipping -->


        <!-- Tax -->
        <div class="py-3 flex justify-content-between align-items-center border-purple-50">
          <div>{{ $t('tax') }} (16%)</div>
          <div>{{ formatDecimal(cartTotal * 0.16) }}</div>
        </div>
        <!-- /Shipping -->

        <Divider/>

        <!-- Total -->
        <div class="py-3 flex justify-content-between align-items-center border-purple-50">
          <div>{{ $t('total') }}</div>
          <div>{{ formatDecimal(cartTotal + (cartTotal * 0.16) + (cartTotal * 0.02)) }}</div>
        </div>
        <!-- /Total -->


        <!-- Coupon -->
        <div class="py-3 border-purple-50">
          <div>{{ $t('coupon') }}</div>
          <div class="flex align-items-center justify-content-between gap-4">
            <InputText fluid placeholder="Enter code" unstyled
                       class="h-4rem pl-0 border-none border-noround border-bottom-1 border-purple-200 w-full bg-white"/>
            <VButtonCube icon="check" :text="$t('apply')" fill="1" class="w-7 shadow-1"/>
          </div>
        </div>
        <!-- /Coupon -->


        <!-- checkout -->
        <div v-if="cartTotal" class="pb-2 pt-4 border-top-1 border-gray-200 flex justify-content-between gap-3 lg:gap-5">
          <VButtonCubeBlue text="Paypal" icon="shopping_cart_checkout" fill="true" class="w-full h-3rem"/>
          <VButtonCubeGreen text="MPESA" icon="shopping_cart_checkout" fill="true" class="w-full h-3rem"/>
        </div>
        <!-- /Totals | checkout -->

      </div>

    </div>
    <!-- /order summary -->
  </section>
  <!-- /cart -->


  <!--  footer -->
  <VFooter class="select-none"/>
</template>


<script setup lang="js">
const {formatDecimal}  = useFormatDecimal();
const {removeFromCart} = useRemoveFromCart();

//locale.
const {locale} = useI18n();
</script>


<script lang="js">
export default defineComponent({

  name: "Cart",

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
  },

  methods: {
    //view product.
    viewItem(product) {
      //active product.
      useState('product').value = product;

      const localePath = useLocalePath();
      const locale = this.$i18n.locale;
      navigateTo(localePath('/Product/' + encodeURIComponent(product.name[locale])));
    }
  },

  beforeMount(){
    if(!this.cart){
      const localePath = useLocalePath();
      navigateTo(localePath('/shop'));
    }
  }

})
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .title {
  font-family: 'Playfair Display', serif;
}
</style>