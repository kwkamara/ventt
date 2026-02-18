<template>
  <div id="hero" class="col-12 p-0 flex align-items-center shadow-2 relative overflow-hidden">

    <!-- backgrounds -->
    <Transition name="fade">
      <img :key="hero_ix"
           :src="hero_images[hero_ix]"
           alt="Ventt ecommerce"
           class="absolute h-full md:h-auto md:w-full top-0 right-0"/>
    </Transition>
    <!-- /backgrounds -->


    <!-- Content Overlay -->
    <div class="w-full h-full p-3 md:px-7 absolute flex align-items-center bg-black-alpha-50">

      <div class="text-white">

        <!-- Message -->
        <div>

          <!-- title -->
          <h2 class="m-0 text-6xl lg:text-7xl font-light">
            {{ $t('hero_title_1') }}
            <span class="text-gold">{{ $t('hero_title_2') }}</span>
          </h2>

          <!-- subtitle -->
          <p class="m-0 lg:w-6 py-3 text-left lg:text-lg font-light line-height-3">
            {{ $t('hero_description') }}
          </p>

          <!-- CTA -->
          <div class="pt-3 flex align-items-center gap-3">

            <NuxtLink :to="$localePath('/shop')">
              <VButtonCube icon="chevron_right" icon_right="1" :text="$t('shop_now')" fill="1"/>
            </NuxtLink>

          </div>
          <!-- CTA -->

        </div>
        <!-- /Message -->

      </div>

    </div>
    <!-- /Content Overlay -->

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
        '/hero-img-0.webp',
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

  methods: {
    //load shop UI.
    viewShop(type) {

      //update UI.
      useState('shop').value = {
        category: "new",
        type    : null
      };

      //navigate.
      navigateTo('/Shop');
    },
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


<style scoped>
#hero {
  height: 60vh;
}

@media screen and (min-width: 768px) {
  #hero {
    height: 40vh;
  }
}

@media screen and (min-width: 1024px) {
  #hero {
    height: 60vh;
  }
}
</style>
