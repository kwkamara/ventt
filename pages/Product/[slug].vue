<template>
  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none overflow-hidden">
    <Navbar/>

    <Categories/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!-- product -->
  <section v-if="product" class="grid m-0 px-3 lg:px-5 text-gray-700 select-none overflow-hidden">

    <!-- image col -->
    <div class="col-12 md:col-6 lg:px-6 lg:py-5 lg:flex">
      <!-- image -->
      <img :src="'/'+product.images[image_ix].url"
           class="w-full lg:w-8 border-1 border-purple-100 border-round-xl"
           :alt="product.name"/>

      <!-- thumbnails -->
      <div class="px-3 flex lg:flex-column justify-content-between">
        <img v-for="(image, ix) in product.images"
             @click="image_ix = ix"
             :src="'/'+image.url"
             class="w-full border-1 border-purple-100 border-round-xl hover:shadow-3 hover:border-2"
             :alt="product.name"/>
      </div>
      <!-- /thumbnails -->

    </div>
    <!-- /image col -->

    <!-- info col -->
    <div class="col-12 md:col-6 pt-3 lg:px-6 lg:pb-3">

      <!-- product name | like -->
      <div class="pt-3 flex justify-content-between">
        <div>
          <h2 class="m-0 text-4xl font-light">{{ product.name }}</h2>
          <!-- rating -->
          <div class="text-yellow-600 flex align-items-center">
            <span v-for="(rating, ix) in product.rating" class="material-icons text-2xl">star</span>
          </div>
        </div>

        <VButton icon="favorite_outline"/>
      </div>
      <!-- /product name | like -->


      <!-- price -->
      <div class="py-3 font-bold text-4xl">
        {{ formatDecimal(product.price) }}
      </div>
      <!-- /price -->


      <!-- description -->
      <div>{{ product.description }}</div>


      <!-- cart -->
      <div class="pt-3">

        <h2 class="m-0 pb-3 font-light">Quantity</h2>

        <div class="flex align-items-center justify-content-between gap-3 pb-5">

          <div class="flex align-items-center gap-4">
            <VButton icon="remove" @click="quantity > 1 ? quantity-- : null"/>
            <span class="w-3rem inline-block text-center text-3xl font-bold">{{ quantity }}</span>
            <VButton icon="add" @click="quantity++"/>
          </div>

          <div class="m-0 text-2xl font-bold">
            {{ formatDecimal(product.price * quantity) }}
          </div>
        </div>

        <Divider/>

        <div class="text-right">
          <VButtonCube icon="add_shopping_cart" text="Add to Cart" fill="true"/>
        </div>
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
