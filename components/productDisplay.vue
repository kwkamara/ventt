<template>
  <section class="h-full w-full bg-yellow-600 border-round flex align-items-center justify-content-center border-round overflow-hidden shadow-1 relative" aria-labelledby="discount-title">

    <!-- Product Image -->
    <NuxtImg
        alt="Ventt Ecommerce Platform - {{ name }}"
        format="webp"
        class="w-full h-full absolute inset-0 object-cover"
        fit="cover"
        loading="lazy"
        :src="image"
        aria-hidden="true"
    />

    <!-- Discount and Product Details -->
    <div class="h-full w-full pt-2 pl-2 md:pr-3 flex align-items-start justify-content-end bg-black-alpha-20 hover:bg-black-alpha-60 absolute">

      <div class="pt-1 pr-2 md:text-right text-white text-sm flex flex-column justify-content-between">

        <!-- Discount and Name -->
        <div>
          <h2 aria-label="discount-title" class="md:text-4xl m-0">{{ discount }}</h2>
          <h3 class="md:text-lg m-0 capitalize">{{ name }}</h3>
        </div>

        <!-- Shop Now Button -->
        <div class="mt-3">
          <Button
              label="Shop Now"
              class="bg-purple-800 border-none"
              size="small"
              aria-label="Shop Now for {{ name }}"
          />
        </div>

      </div>

    </div>

  </section>
</template>


<script setup lang="js">
const { imageLink } = useImageLink();
</script>


<script lang="js">
export default defineComponent({
  name: "productDisplay",

  props: ['image', 'name', 'description', 'discount', 'size'],

  methods: {

    // imageLink(url){
    //   const img = useImage();
    //   return img(url);
    // }

  }

})
</script>