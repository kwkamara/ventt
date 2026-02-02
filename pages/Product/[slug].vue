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
        <div class="col-12 lg:col-9 lg:h-18rem p-0 relative overflow-hidden border-round-xl border-1 border-purple-100">
          <!-- image -->
          <img :alt="product.name"
               :src="'/'+product.images[image_ix].url"
               class="top-0 w-full h-full absolute"/>

          <VButton icon="favorite_outline" class="absolute mt-2 ml-3 left-0"/>
        </div>
        <!-- image | icons -->


        <!-- thumbnails -->
        <div class="col-12 lg:col-3 p-0 px-2 flex lg:flex-column gap-3">
          <img v-for="(image, ix) in product.images"
               :alt="product.name"
               :class="'w-full border-round-xl hover:shadow-3 hover:border-2 ' + (image_ix===ix ? 'shadow-3 border-2 border-purple-200' : 'border-1 border-purple-100')"
               :src="'/'+image.url"
               @click="image_ix = ix"/>
        </div>
        <!-- /thumbnails -->


        <!-- icons -->
        <div class="col-12 pt-3 flex gap-3 align-items-center">

          <template v-for="(icon, ix) in ['shield', 'local_shipping', 'payments']" :key="ix">
            <VButton :icon="icon"/>
            <Divider v-if="ix<2" class="h-2rem" layout="vertical"/>
          </template>

        </div>
        <!-- /icons -->

      </div>

    </div>
    <!-- /image col -->

    <!-- info col -->
    <div class="col-12 md:col-6 pt-3 lg:px-6 lg:pb-3">

      <!-- product name | like -->
      <div class="py-3 flex justify-content-between">
        <div>
          <h2 class="m-0 text-4xl font-light capitalize">{{ product.name }}</h2>
          <!-- rating -->
          <div class="text-yellow-600 flex align-items-center">
            <span v-for="(rating, ix) in product.rating" class="material-icons text-2xl">star</span>
          </div>
        </div>

        <!-- price -->
        <div class="text-right">
          <div class="text-4xl">{{ formatDecimal(product.price) }}</div>
          <span class="uppercase text-sm">unit price</span>
        </div>
        <!-- /price -->

      </div>
      <!-- /product name | like -->


      <!-- description -->
      <div>{{ product.description }}</div>


      <!-- cart -->
      <div class="pt-3">

        <div class="pt-4 pb-2 font-light text-lg uppercase">Quantity</div>

        <div class="flex align-items-center justify-content-between gap-3 pb-5">

          <div class="flex align-items-center gap-4">
            <VButton icon="remove" @click="quantity > 1 ? quantity-- : null"/>
            <span class="w-3rem inline-block text-center text-3xl font-bold">{{ quantity }}</span>
            <VButton icon="add" @click="quantity++"/>
          </div>

        </div>

        <Divider/>

        <!-- add to cart -->
        <div class="flex justify-content-between align-items-center">
          <div class="">
            <div class="text-4xl">{{ formatDecimal(product.price * quantity) }}</div>
            <span class="uppercase text-sm">Total</span>
          </div>

          <VButtonCube icon="add_shopping_cart" text="Add to Cart" fill="true"/>
        </div>
        <!-- add to cart -->

      </div>
      <!-- cart -->


    </div>
    <!-- /info col -->

  </section>
  <!-- /product -->


  <!--  footer -->
  <VFooter class="select-none"/>
</template>


<script setup lang="js">
import VButtonCube from "~/components/VButtonCube.vue";

const {formatDecimal} = useFormatDecimal()
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
    }
  },

  mounted() {
    if (!useState('product').value) navigateTo('/');
  }
})
</script>
