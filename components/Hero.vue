<template>
  <div class="col-12 h-26rem lg:h-30rem p-0 flex align-items-center shadow-2 relative">

    <!-- Background Image -->
    <NuxtImg alt="Ventt Ecommerce Platform - Fashion Collection" aria-hidden="true"
             class="w-full h-full absolute" format="webp" src="/blouses-1521.webp"/>

    <!-- Content Overlay -->
    <div class="w-full md:w-7 px-3 lg:py-5 lg:pl-8 absolute flex align-items-center">

      <div class="px-4 lg:px-6 lg:pb-3 pt-5 bg-white-alpha-70 text-purple-800 hover:bg-purple-800 hover:text-white shadow-1 border-round">

<!--        &lt;!&ndash; Header &ndash;&gt;-->
<!--        <div class="h-5rem lg:h-5rem flex align-items-end justify-content-center">-->
<!--          <p class="text-sm lg:text-lg font-semibold line-height-3">Discover Your Style, Elevate Your Wardrobe</p>-->
<!--        </div>-->
<!--        &lt;!&ndash; /Header &ndash;&gt;-->


        <!-- Message -->
        <div class="flex align-items-center justify-content-center">
          <div class="text-center">
            <h1 class="mb-0 text-2xl lg:text-4xl font-bold">Your Ultimate Fashion Destination</h1>
            <p class="text-sm lg:text-lg font-semibold line-height-3 mt-1 font-light">Discover Your Style, Elevate Your Wardrobe</p>

            <h2 class="mt-5 text-yellow-400 text-xl lg:text-2xl">Enjoy Exclusive Discounts Up to 40% Off!</h2>
          </div>
        </div>
        <!-- /Message -->


        <!-- CTA -->
        <div class="h-6rem flex align-items-center md:align-items-start justify-content-center">
          <Button aria-label="Shop Now for Exclusive Discounts" class="bg-yellow-600 border-none" label="Shop Now"
                  @click="useState('ui').value='shop'"/>
        </div>
        <!-- /CTA -->

      </div>

    </div>

  </div>
</template>



<script lang="js">
export default defineComponent({
  name: "Hero"
})
</script>

