<template>
  <section class="h-full w-full flex align-items-center justify-content-center shadow-1 relative"
           aria-labelledby="product category banner" @click="viewShop">

    <!-- Product Image -->
    <NuxtImg :alt="`Ventt Ecommerce Platform - ${name}`" :src="image" aria-hidden="true"
             class="w-full h-full absolute object-cover" format="webp"
             loading="lazy"/>


    <!-- discount | name | shop now -->
    <div class="h-full w-full pt-2 pl-2 md:pr-3 flex align-items-start justify-content-end bg-black-alpha-20 hover:bg-black-alpha-60 absolute">

      <div class="pt-1 pr-2 md:text-right text-white text-sm flex flex-column justify-content-between">

        <!-- Discount and Name -->
        <div>
          <h2 aria-label="discount-title" class="md:text-4xl m-0">{{ discount }}</h2>
          <h3 class="md:text-lg m-0 capitalize">{{ name }}</h3>
        </div>
        <!-- Discount and Name -->


        <!-- Shop Now Button -->
        <div class="mt-3">
          <Button :aria-label="`Shop Now for ${name}`" class="bg-purple-800 border-none"
                  label="Shop Now" size="small"/>
        </div>
        <!-- /Shop Now Button -->

      </div>

    </div>
    <!-- /discount | name | shop now -->

  </section>
</template>


<script lang="js">
export default defineComponent({

  name : "productDisplay",
  props: ['image', 'name', 'filters', 'discount', 'size'],

  methods: {

    //load shop UI.
    viewShop() {
      useState('filters').value = this.filters;
      useState('ui').value      = 'shop'
    }

  }

})
</script>