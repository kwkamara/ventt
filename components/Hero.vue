<template>
  <div class="col-12 h-30rem p-0 flex align-items-center shadow-2 relative">

    <!-- Background Image -->
    <NuxtImg
        alt="Ventt Ecommerce Platform - Fashion Collection"
        format="webp"
        class="w-full h-full absolute inset-0 object-cover"
        fit="cover" src="/blouses-1521.webp" aria-hidden="true"/>

    <!-- Content Overlay -->
    <div class="p-5 w-full md:w-5 lg:pl-8 absolute flex align-items-center">

      <div class="px-4 xl:px-6 xl:py-4 bg-white-alpha-30 text-purple-800 hover:bg-purple-800 hover:text-white shadow-1 border-round">

        <!-- Header -->
        <div class="h-5rem flex align-items-end">
          <p class="text-lg font-semibold">Discover Your Style, Elevate Your Wardrobe</p>
        </div>
        <!-- /Header -->

        <!-- Message -->
        <div class="flex align-items-center">
          <div>
            <h1 class="mb-0 text-4xl font-bold">Your Ultimate Fashion Destination</h1>
            <h2 class="mt-2 text-yellow-600 text-2xl">Enjoy Exclusive Discounts Up to 40% Off!</h2>
          </div>
        </div>
        <!-- /Message -->

        <!-- CTA -->
        <div class="h-5rem flex align-items-center md:align-items-end">
          <Button
              label="Shop Now"
              class="bg-purple-700 border-none"
              aria-label="Shop Now for Exclusive Discounts"
          />
        </div>

      </div>

    </div>

  </div>
</template>



<script lang="js">
export default defineComponent({
  name: "Hero"
})
</script>

