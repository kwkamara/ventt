<template>
  <section class="h-full w-full relative"
           aria-labelledby="product category banner"
           data-aos="fade-up"
           @click="viewShop();">

    <!-- Product Image -->
    <img :alt="`Ventt Ecommerce Platform - ${name}`"
         :src="image" aria-hidden="true"
         class="w-full h-full absolute border-round-xl"
         loading="lazy"/>


    <div @click="viewShop()"
         class="w-full h-full p-3 lg:p-4 absolute text-white bg-black-alpha-30 border-round-xl hover:bg-black-alpha-10">
      <!-- Discount and Name -->
      <div class="w-full text-right">
        <h2 aria-label="discount-title" class="m-0 text-xl md:text-4xl">{{ discount }}</h2>
        <span class="m-0 md:text-lg title capitalize md:font-light">{{ name }}</span>
      </div>
      <!-- Discount and Name -->


      <!-- CTA -->
      <div class="lg:mt-3 text-right">
        <Button :aria-label="`Shop Now for ${name}`"
                class="hidden bg-purple-800 border-none hover:bg-purple-500 hover:text-white"
                size="small">
          <span>Shop Now</span>
          <span class="material-icons">chevron_right</span>
        </Button>
      </div>
      <!-- CTA -->
    </div>


  </section>
</template>



<script lang="js">
export default defineComponent({

  name : "productDisplay",
  props: ['image', 'name', 'category', 'discount', 'type'],

  methods: {

    //load shop UI.
    viewShop() {
      //update UI.
      useState('shop').value = {
        category: this.category || "women",
        type    : this.type || 'official'
      };


      //navigate.
      const localePath = useLocalePath();
      navigateTo(localePath('/Shop'));
    },


  }

})
</script>