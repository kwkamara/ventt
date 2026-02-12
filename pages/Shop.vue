<template>

  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none bg-gray-700 overflow-hidden">
    <Navbar/>

    <Categories @update="updateFilters"/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!-- Shop -->
  <client-only>
    <section class="grid m-0 lg:pl-7 md:pr-6 pb-5">

      <!-- filter section -->
      <div class="col-12 lg:col-4 pt-3 md:pl-0">

        <!-- search | price filter -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl">

          <!-- search | price reset -->
          <div class="pb-2 text-purple-700 flex justify-content-between gap-3">
            <InputText v-model="search"
                       id="search-ip"
                       :placeholder="$t('search')"
                       class="w-6 px-3 border-1 border-purple-100 border-round-3xl bg-white shadow-1"
                       fluid/>
            <VButton icon="restart_alt"
                     @click="min_price=0; max_price=50000; search=null"/>
          </div>
          <!-- /search | price reset -->


          <!-- min | max price -->
          <div class="py-2 flex justify-content-between gap-3 align-items-center text-gray-700 text-xs">
            <!-- min price -->
            <div>
              <InputNumber id="min-price-ip" v-model="min_price"
                           input-class="py-3 pl-0 border-none border-bottom-1 border-purple-200 bg-white"
                           fluid unstyled/>
              <label for="min-price-ip" class="block pt-1">{{ $t('min_price') }}</label>
            </div>

            <!-- max price -->
            <div class="text-right">
              <InputNumber id="max-price-ip"
                           v-model="max_price"
                           input-class="py-3 pr-0 border-none border-bottom-1 border-purple-200 bg-white text-right"
                           fluid unstyled/>
              <label for="max-price-ip" class="block pt-1">{{ $t('max_price') }}</label>
            </div>
          </div>
          <!-- /min | max price -->

        </div>
        <!-- /search | price filter -->


        <!-- categories -->
        <div class="py-4 px-3 mt-3 shadow-1 border-round-xl border-1 border-purple-100 text-xs">

          <!-- categories -->
          <div class="grid m-0">

            <div v-for="(value, category) in categories"
                 :key="category"
                 class="col-4">
              <Checkbox class="m-0"
                        :id="category + '-ip'"
                        v-model="categories[category]"
                        :binary="true"/>
              <span class="pl-1 capitalize">{{ $t(category) }}</span>
            </div>

          </div>
          <!-- /categories -->

          <Divider/>


          <!-- types -->
          <div class="grid m-0">
            <div v-for="type in Object.keys(types)" :key="type" class="col-4 pb-5">
              <Checkbox class="m-0" v-model="types[type]" binary/>
              <span class="pl-1 capitalize">{{ $t(type) }}</span>
            </div>
          </div>
          <!-- /types -->


          <!-- clear -->
          <div class="pl-2">
            <VButtonCube :text="$t('clear')" fill="1" icon="remove" @click="resetFilter"/>
          </div>

        </div>
        <!-- /categories -->


        <!-- product display -->
        <div class="pt-3 h-15rem md:h-10rem lg:h-15rem w-full">
          <ProductDisplay discount="10% Off"
                          class="shadow-2"
                          image="/men-accessories-1.webp"
                          :name="$t('men_accessories')"/>
        </div>
        <!-- /product display -->
      </div>
      <!-- /filter section -->


      <!-- products -->
      <div class="col-12 lg:col-8 md:pr-1">

        <!-- product grid -->
        <div class="grid m-0 pb-5">

          <Product v-for="product in products.slice( pagination.start, pagination.end )"
                   :product="product"
                   class="fadein animation-duration-1000"/>          <!-- /products -->


          <!-- pagination -->
          <div v-if="products.length > 9" class="col-12 pt-5 flex align-items-center justify-content-between">
            <VButton :disabled="!pagination.start"
                     icon="chevron_left"
                     @click="pagination.start -= 9; pagination.end -= 9"/>

            <VButton :disabled="pagination.end >= products.length"
                     icon="chevron_right"
                     @click="pagination.start += 9; pagination.end += 9"/>
          </div>
          <!-- /pagination -->


          <!-- no products -->
          <div v-if="!products.length" class="col-12 pt-5 lg:pt-7 text-center text-orange-600">
            <span class="material-icons-outlined text-5xl">error_outline</span>
            <h2 class="m-0 text-3xl font-light sans-serif">
              {{ $t('no_products') }}
            </h2>
          </div>
          <!-- /no products -->

        </div>
        <!-- /product grid -->

      </div>
      <!-- /products -->

    </section>
  </client-only>
  <!-- /Shop -->


  <!--  footer -->
  <VFooter class="select-none"/>
</template>


<script lang="js">
export default defineComponent({
  name: "Shop",

  data() {

    return {
      max_price: 20000,
      min_price: 0,

      search: null,

      pagination: {
        start: 0,
        end  : 9
      },

      categories: {
        men  : false,
        women: false,
        kids : false,
      },

      types: {
        casual        : false,
        official      : false,
        hats          : false,
        shoes         : false,
        accessories   : false,
        "new arrivals": false,
      }

    }

  },

  computed: {
    products() {
      //products init.
      let products = useState('products').value;
      if (!products) navigateTo('/');


      //price filter.
      products = products.filter(pd => (pd.price > this.min_price) && (pd.price < this.max_price));


      //search filter.
      if (this.search) {
        const locale = this.$i18n.locale;
        products     = products.filter(product => product.name[locale].toLowerCase().includes(this.search.toLowerCase()))
      }


      //active categories.
      const active_categories = Object.keys(this.categories).filter(key => this.categories[key]);
      const active_types      = Object.keys(this.types).filter(key => this.types[key]);


      //active_categories filter.
      if (active_categories.length) {
        //active products init.
        let active_products = [];

        active_categories.forEach(category => {
          products.forEach(product => {
            const product_categories = Object.keys(product.categories);
            if (product_categories.includes(category) && !active_products.includes(product)) {
              active_products.push(product);
            }
          });
        });


        //update.
        products = active_products;
      }


      //active_types filter.
      if (active_types.length) {
        //active products init.
        let active_products = [];

        active_types.forEach(type => {
          products.forEach(product => {
            const product_types = Object.keys(product.categories);
            if (product_types.includes(type) && !active_products.includes(product)) {
              active_products.push(product);
            }
          });
        });

        //return.
        return active_products;
      }


      //return.
      return products;
    }
  },

  methods: {

    //update filters
    updateFilters() {
      //reset filter.
      this.resetFilter();

      //update global filters.
      useState('shop').value.category ? this.categories[useState('shop').value.category] = true : null;
      useState('shop').value.type ? this.types[useState('shop').value.type] = true : null;
    },

    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },


    //reset filter
    resetFilter() {
      Object.keys(this.categories).forEach(key => this.categories[key] = false);
      Object.keys(this.types).forEach(key => this.types[key] = false);
    }
  },

  mounted() {
    if (useState('shop').value) {
      useState('shop').value.category ? this.categories[useState('shop').value.category] = true : null;
      useState('shop').value.type ? this.types[useState('shop').value.type] = true : null;
    }
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