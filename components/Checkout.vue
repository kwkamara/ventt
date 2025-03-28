<template>
  <div class="col-12 p-0 bg-white">


    <div class="grid m-0">

      <div class="col-12 lg:col-6 p-5 md:p-8 text-sm">

        <!-- header -->
        <div class="h-5rem flex align-items-center text-xl font-bold">
          <span class="pr-4">My Cart </span>
          <span class="text-gray-300 pl-4 border-left-1 border-gray-300">Checkout</span>
        </div>


        <!-- cart products -->
        <div v-for="product in useState('products').value.filter(pd => pd.cart)"
             class="h-4rem border-bottom-1 border-gray-200 flex align-items-center gap-3 text-gray-800">

          <div class="w-full">
            <div class="py-2">{{ product.name }}</div>

            <div class="w-full flex align-items-center">
              <div class="w-5 text-xs text-gray-600">{{ formatDecimal(product.sku) }}</div>
              <div class="w-3 text-right">{{ formatDecimal(product.price) }}</div>
              <div class="w-1 text-right">{{ product.cart.toLocaleString() }}</div>
              <div class="w-3 text-right">{{ formatDecimal(product.cart * product.price) }}</div>
            </div>
          </div>


        </div>
        <!-- /cart products -->


        <!-- total -->
        <div class="h-4rem border-bottom-1 border-gray-100 flex align-items-center font-bold">
          <div class="w-8">Total</div>
          <div class="w-1 text-right">{{ cartData.quantity.toLocaleString() }}</div>
          <div class="w-3 text-right">{{ formatDecimal(cartData.total) }}</div>
        </div>
        <!-- /cart products -->

      </div>


      <!-- payment mode -->
      <div class="col-12 lg:col-6 p-5 lg:p-8 bg-gray-100 text-purple-600 text-center lg:text-left">

        <!-- header -->
        <div class="h-5rem lg:h-6rem flex align-items-center justify-content-center lg:justify-content-start text-xl font-bold">
          <div class="text-xl mb-2">Payment Mode</div>
        </div>

        <Button :class="`text-white border-noround w-8rem border-none ${payment_mode==='mpesa' ? 'bg-green-600' : 'bg-gray-400'}`"
                icon="pi pi-phone" label="MPESA" size="large" @click="payment_mode='mpesa'"/>

        <Button :class="`text-white border-noround w-8rem border-none ${payment_mode==='paypal' ? 'bg-blue-700' : 'bg-gray-400'}`"
                icon="pi pi-paypal" label="PayPal" size="large" @click="payment_mode='paypal'"/>


        <!-- payment form -->
        <div>

          <!-- mpesa payment info -->
          <div v-if="payment_mode==='mpesa'" class="h-8rem flex align-items-center justify-content-center lg:justify-content-start">
            <div>
              <label for="phone-ip" class="text-xs block mb-1 text-left text-gray-600">phone number</label>
              <InputNumber :use-grouping="false" id="phone-ip" v-model.number="phone" class="w-full lg:w-16rem" placeholder="700123456"/>
            </div>
          </div>

          <!-- payment info -->
          <div v-else-if="payment_mode==='paypal'" class="h-8rem flex align-items-center justify-content-center lg:justify-content-start">
            Submit to generate PayPal order.
          </div>

          <!-- submit -->
          <div class="py-4">
            <Button label="Submit" icon="pi pi-check" class="bg-purple-600 text-white border-none w-16rem"/>
          </div>
        </div>
        <!-- payment form -->

      </div>
      <!-- /payment mode -->

    </div>
  </div>
</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name: "Checkout",

  data() {
    return {
      payment_mode: 'paypal',
      phone       : null,
      email       : null
    }
  },

  computed: {
    cartData() {
      let data = {
        quantity: 0,
        total   : 0
      };

      const cartItems = useState('products').value.filter(product => product.cart);
      cartItems.forEach(product => {
        data.quantity += product.cart;
        data.total += product.cart * product.price;
      });

      return data;
    },
  }
})
</script>