<template>
  <section class="h-full w-full relative"
           aria-labelledby="product category banner"
           data-aos="fade-up"
           @click="viewShop(); scrollToTop()">

    <!-- Product Image -->
    <img :alt="`Ventt Ecommerce Platform - ${name}`"
         :src="image" aria-hidden="true"
         class="w-full h-full absolute border-round-xl"
         loading="lazy"/>


    <div class="w-full h-full p-2 lg:p-4 absolute text-white bg-black-alpha-30 border-round-xl hover:bg-black-alpha-10">
      <!-- Discount and Name -->
      <div class="w-full text-right">
        <h2 aria-label="discount-title" class="m-0 text-xl md:text-4xl">{{ discount }}</h2>
        <span class="m-0 md:text-lg title capitalize md:font-light">{{ name }}</span>
      </div>
      <!-- Discount and Name -->


      <!-- CTA -->
      <div class="lg:mt-3 text-right">
        <NuxtLink to="/shop">
          <Button :aria-label="`Shop Now for ${name}`"
                  class="bg-purple-800 border-none hover:bg-purple-500 hover:text-white"
                  size="small">
            <span>Shop Now</span>
            <span class="material-icons">chevron_right</span>
          </Button>
        </NuxtLink>
      </div>
      <!-- CTA -->
    </div>


  </section>
</template>


<script setup lang="js">
const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
};
</script>


<script lang="js">
export default defineComponent({

  name : "productDisplay",
  props: ['image', 'name', 'filters', 'discount', 'size'],

  methods: {

    //load shop UI.
    viewShop() {
      useState('filters').value = this.filters;
      useState('ui').value = 'shop'
    }

  }

})
</script>