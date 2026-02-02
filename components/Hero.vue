<template>
  <div class="col-12 p-0 flex align-items-center shadow-2 relative overflow-hidden"
       style="height: 60vh">

    <!-- backgrounds -->
    <Transition name="fade">
      <img :key="hero_ix"
           :src="hero_images[hero_ix]"
           alt="Ventt ecommerce"
           class="absolute w-full top-0"/>
    </Transition>
    <!-- /backgrounds -->


    <!-- Content Overlay -->
    <div class="w-full h-full p-3 md:px-7 absolute flex align-items-center bg-black-alpha-50">

      <div class="p-4 text-white border-round">

        <!-- Message -->
        <div>
          <!-- title -->
          <h2 class="m-0 text-2xl lg:text-7xl font-light">Discover Your <span class="text-gold">Style</span></h2>

          <!-- subtitle -->
          <p class="m-0 lg:w-6 pb-2 text-left text-sm lg:text-lg font-light line-height-3">
            Elevate your wardrobe with our curated collection of luxury fashion pieces crafted for the modern connoisseur.
          </p>

          <!-- CTA -->
          <div class="pt-3 flex gap-3">
            <NuxtLink to="/shop">
              <Button class="bg-purple-800 text-white border-none">
                <span class="font-bold">Shop now</span>
                <span class="material-icons-outlined">chevron_right</span>
              </Button>
            </NuxtLink>

            <Button class="bg-gray-300 text-purple-800 border-none" outlined>
              <span>New Arrivals</span>
              <span class="material-icons-outlined">chevron_right</span>
            </Button>
          </div>
          <!-- CTA -->

        </div>
        <!-- /Message -->



      </div>

    </div>

  </div>
</template>


<script lang="js">
export default defineComponent({
  name: "Hero",

  data() {
    return {
      //hero section.
      hero_ix      : 0,
      hero_interval: null,
      hero_images  : [
        '/hero-img-1.webp',
        '/hero-img-2.webp',
        '/hero-img-3.webp',
        '/hero-img-4.webp',
        '/hero-img-5.webp',
        '/hero-img-6.webp',
        '/hero-img-7.webp',
      ],
    }
  },

  mounted() {
    // 4 secs per slide.
    this.hero_interval = setInterval(() => {
      if (this.hero_ix === (this.hero_images.length - 1)) this.hero_ix = 0;
      else this.hero_ix++;
    }, 3000);
  }
})
</script>

