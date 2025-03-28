<template>

  <div class="col-12 p-0">
    <div class="grid m-0">

      <!-- filter -->
      <div class="col-12 flex-order-1 lg:flex-order-0 md:col-4 lg:py-3 lg:px-8 text-white bg-white-alpha-20">

        <div class="grid m-0">
          <div class="col-12 p-0">

            <!-- price -->
            <div class="h-7rem p-4 md:px-1 flex align-items-center justify-content-between gap-2">

              <div class="w-full text-xs">
                <InputNumber id="min-price-ip" fluid class="mb-2" v-model="min_price" @value-change="setFilter()"/>
                <label for="min-price-ip">Min. Price</label>
              </div>

              <div class="w-full text-xs text-right">
                <InputNumber id="max-price-ip" fluid class="mb-2" v-model="max_price" @value-change="setFilter()"/>
                <label for="max-price-ip">Max. Price</label>
              </div>

            </div>
            <!-- /price -->


            <!-- categories -->
            <div class="py-5 p-4 lg:pl-2 flex justify-content-between align-items-center bg-black-alpha-20 text-xs">

              <!-- men | women | kids -->
              <div class="md:px-3 flex flex-column gap-4">
                <div v-for="cat in ['men', 'women', 'kids', 'girls', 'boys']" class="w-full flex align-items-end gap-2">
                  <Checkbox class="m-0" v-model="useState('filters').value[cat]" binary/>
                  <span class="capitalize">{{ cat }}</span>
                </div>
              </div>
              <!-- /men | women | kids -->


              <!-- official | casual | accessories -->
              <div class="lg:px-4 flex flex-column align-items-end gap-4">
                <div v-for="cat in ['official', 'casual', 'accessories', 'shoes', 'hats']" class="w-full flex align-items-end justify-content-end gap-2">
                  <span class="capitalize">{{ cat }}</span>
                  <Checkbox class="m-0" v-model="useState('filters').value[cat]" binary/>
                </div>
              </div>
              <!-- /official | casual | accessories -->

            </div>
            <!-- /categories -->


            <!-- submit -->
            <div class="h-6rem pl-4 flex align-items-center bg-black-alpha-10">

              <Button class="bg-purple-700 text-white border-none text-xs border-none" icon="pi pi-minus" label="Clear" raised
                      @click="useState('filters').value = {}"/>

            </div>
            <!-- /submit -->


            <!-- product display -->
            <div class="h-15rem md:h-10rem lg:h-15rem w-full">
              <ProductDisplay :filters="{'men': true, 'accessories':true}" discount="10% Off"
                              image="/men-accessories-1-438.webp" name="Mens' Accessories"/>
            </div>
            <!-- /product display -->

          </div>
        </div>

      </div>
      <!-- /filter -->

      <!-- products -->
      <div class="col-12 flex-order-0 lg:flex-order-1 md:col-8 lg:p-5 lg:px-8 bg-white-alpha-30">

        <!-- product grid -->
        <div class="grid m-0">


          <!-- products -->
          <div v-for="product in products.slice( pagination.start, pagination.end )" class="col-6 lg:col-4">
            <Product :product="product" class="fadein animation-duration-1000"/>
          </div>
          <!-- /products -->


          <!-- pagination -->
          <div v-if="products.length > 9" class="col-12 h-5rem flex align-items-center justify-content-between text-white">
            <Button outlined icon="pi pi-chevron-left text-lg"
                    :disabled="!pagination.start"
                    class="bg-transparent border-none text-white hover:text-purple-600 justify-content-start"
                    @click="pagination.start -= 9; pagination.end -= 9"/>

            <div class="w-full text-center">{{ products.length }} products</div>

            <Button outlined icon="pi pi-chevron-right text-lg"
                    :disabled="pagination.end >= products.length"
                    class="bg-transparent border-none text-white hover:text-purple-600 justify-content-end"
                    @click="pagination.start += 9; pagination.end += 9"/>
          </div>
          <!-- /pagination -->


        </div>
        <!-- /product grid -->

      </div>
      <!-- /products -->

    </div>
  </div>

</template>


<script lang="js">
export default defineComponent({

  name: "shop",

  data() {

    return {
      products : [],
      max_price: 20000,
      min_price: 0,

      pagination: {
        start: 0,
        end  : 9
      }
    }

  },

  computed: {
    filters() {
      return useState('filters').value;
    }
  },

  watch: {
    filters: {
      handler(newValue, oldValue) {
        this.setFilter();
      }, deep: true
    }
  },

  methods: {

    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },


    //update filters.
    setFilter(clear) {

      //clear filters.
      if (clear) {
        this.min_price            = 0;
        this.max_price            = 2000000;
        useState('filters').value = {};
      }


      //filters.
      const primary_filters  = ['men', 'women', 'kids']
          .filter(filter => useState('filters').value[filter]);
      const optional_filters = ['girls', 'boys', 'official', 'casual', 'accessories', 'shoes', 'hats']
          .filter(filter => useState('filters').value[filter]);


      //no filters set.
      if (!primary_filters.length && !optional_filters.length) this.products = useState('products').value;


      //filters active.
      else {
        this.products = [];
        useState('products').value.forEach(product => {

          //valid tracker.
          let is_valid = true;


          //primary filter.
          if (primary_filters.length) {
            primary_filters.forEach(filter => {
              if (!product.categories[filter]) is_valid = false;
            });
          }//primary filters.


          //optional_filters.
          if (optional_filters.length && is_valid) {
            optional_filters.forEach(filter => {
              if (!product.categories[filter]) is_valid = false;
            });
          }//optional_filters.


          //valid product.
          if (is_valid) this.products.push(product);

        });
      }


      //price filter.
      this.products = this.products.filter(product => product.price >= this.min_price && product.price <= this.max_price);

    },

  },

  mounted() {
    //update products.
    this.setFilter();
  }
})
</script>