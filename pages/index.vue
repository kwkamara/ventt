<template>

  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none overflow-hidden bg-white">
    <Navbar/>

    <Categories/>

    <Hero/>
  </section>
  <!-- /Nav | Categories | Hero -->

  <client-only>
    <!-- New Arrivals -->
    <section class="grid m-0 pb-7 md:px-7 select-none overflow-hidden bg-white">

      <!-- title -->
      <div class="col-12 pb-0 pl-2">
        <h2 class="font-light">New Arrivals</h2>
      </div>
      <!-- /title -->


      <!-- arrivals product list -->
      <div class="col-12 lg:col-8 p-0">
        <div class="grid m-0">
          <Product v-for="pd in newProducts" :product="pd"/>
        </div>
      </div>
      <!-- /arrivals product list -->


      <!-- offers display -->
      <div class="col-12 lg:col-4 lg:pt-1 md:flex lg:flex-column align-items-start gap-3 bg-white">
        <ProductDisplay category="men"
                        class="h-16rem"
                        discount="10% Off"
                        image="/men-accessories-1-438.webp"
                        name="Mens' Accessories"
                        type="accessories"/>

        <ProductDisplay category="women"
                        class="pt-4 md:pt-0 xl:pt-2 h-16rem"
                        discount="10% Off"
                        image="/women-1-664.webp"
                        name="Women Casual"
                        type="casual"/>
      </div>
      <!-- /offers display -->

    </section>
    <!-- /New Arrivals -->


    <!--  section 2 -->
    <section class="grid m-0 md:p-4 lg:px-7 py-4 select-none overflow-hidden bg-purple-900">
      <div class="col-12 px-0 ">
        <div class="grid m-0">

          <div class="col-12 md:col-6 h-16rem lg:h-26rem">
            <ProductDisplay category="women"
                            discount="15% Off"
                            image="/women-1-664.webp"
                            name="Women's Style"
                            type="casual"/>
          </div>

          <div class="col-12 md:col-6">

            <div class="lg:h-12rem w-full flex gap-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay category="women"
                                discount="10% Off"
                                image="/women-suits-1-324.webp"
                                name="women's suits"
                                type="official"/>
              </div>

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay category="women"
                                discount="10% Off"
                                image="/women-hats-1-324.webp"
                                name="women's hats"
                                type="hats"/>
              </div>

            </div>

            <div class="h-8rem lg:h-12rem w-full mt-3">
              <ProductDisplay category="women"
                              discount="5% Off"
                              image="/women-blouses-1-664.webp"
                              name="women's blouses"
                              type="casual"/>
            </div>

          </div>

        </div>
      </div>
    </section>
    <!--  /section 2 -->


    <!--  kids section -->
    <section class="grid m-0 px-3 lg:px-7 lg:py-5 py-2 select-none">

      <div class="col-12 md:col-6 px-0">
        <div class="w-full px-2 flex gap-3">
          <div class="w-6 h-8rem lg:h-12rem">
            <ProductDisplay category="kids"
                            discount="10% Off"
                            image="/kids-casual-1-324.webp"
                            name="kids | casual" type="casual"/>
          </div>
          <div class="w-6 h-8rem lg:h-12rem">
            <ProductDisplay category="kids"
                            discount="20% Off"
                            image="/kids-casual-3-324.webp"
                            name="girls" type="casual"/>
          </div>
        </div>

        <div class="w-full px-2 flex gap-3 mt-3">
          <ProductDisplay class="w-6 h-8rem lg:h-12rem"
                          discount="10% Off"
                          category="kids"
                          type="casual"
                          image="/babies-1-324.webp"
                          name="babies"/>


          <ProductDisplay class="w-6 h-8rem lg:h-12rem"
                          image="/kids-pyjamas-1-324.webp"
                          category="kids"
                          type="casual"
                          discount="10% Off" name="pyjamas"/>
        </div>
      </div>

      <div class="col-12 md:col-6 px-2 h-15rem lg:h-26rem">
        <ProductDisplay category="kids"
                        discount="15% Off"
                        image="/kids-casual-4-664.webp"
                        name="kids fashion"
                        type="casual"/>
      </div>

    </section>
    <!--  /kids section -->
  </client-only>

  <!--  footer -->
  <VFooter class="select-none"/>


</template>


<script setup lang="js">
//categories init.
useState('categories', () => ['men', 'women', 'kids']);

//cart struct.
useState('cart', () => ({}));

//wishlist struct.
useState('wishlist', () => ({}));

//product.
useState('product', () => null);

</script>


<script lang="js">
export default defineComponent({

  name: "index",

  data() {
    return {}
  },

  computed: {
    products() {
      return useState('products').value;
    },
    newProducts() {
      return this.products.filter(pd => pd.new);
    }
  },

  methods: {
    formatDecimal(value) {
      if (value) return value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      return value;
    },
  },

  mounted() {
    //rating.
    useState('products').value.forEach(pd => {
      if (pd.reviews.length) {
        let rating_total = 0;
        pd.reviews.forEach(review => rating_total += review.rating);
        pd.rating = Math.floor(rating_total / pd.reviews.length);
      }

      //no reviews
      else pd.rating = 3;
    });

    //price filters init.
    useState('prices').value = {min: 0, max: 2000000};

    //shop reset.
    useState('shop').value = null;
  }

})
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .title {
  font-family: 'Playfair Display', serif;
}
</style>