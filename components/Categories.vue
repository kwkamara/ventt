<template>

  <section class="col-12 p-0 md:px-7 h-4rem bg-purple-600 animation-duration-1000 fadein text-white text-sm select-none capitalize shadow-3">


    <div class="grid m-0 h-full">

      <!-- Category Navigation -->
      <div class="col-9 lg:col-4 h-full p-0 bg-purple-800 flex align-items-center justify-content-center lg:justify-content-start">
        <div v-for="(cat_name, ix) in categories"
             :key="ix"
             :aria-label="`Show ${cat_name} categories`"
             :class="`w-6rem lg:w-8rem h-full border-left-1 border-purple-700 uppercase md:text-lg font-light hover:bg-purple-800 hover:text-yellow-800 flex align-items-center justify-content-center ` +
         ( (shop && shop.category === cat_name) || (category === cat_name) ? 'bg-purple-800 text-yellow-800 ' : '' ) +
          (ix === 2 ? 'border-right-1' : null)"

             role="button" tabindex="0"
             @click="viewCategoryMenu(cat_name, $event)">
          {{ $t(cat_name) }}
          <span class="material-icons-outlined">keyboard_arrow_down</span>
        </div>
      </div>
      <!-- Category Navigation -->

      <!-- Search -->
      <div class="col-3 lg:col-8 pr-4 md:pr-0 text-right">
        <VButton fill="1"
                 icon="search"
                 @click="$refs.searchPopover.toggle($event)"/>
      </div>
      <!-- Search -->

    </div>


    <!-- searchPopover -->
    <Popover ref="searchPopover">
      <div class="grid m-0 w-20rem lg:w-26rem select-none overflow-hidden">

        <!-- search -->
        <div class="col-12">
          <InputText v-model="search"
                     class="w-full h-4rem bg-transparent border-none border-bottom-1 border-gray-400"
                     autofocus
                     fluid placeholder="Search Products"
                     unstyled/>
        </div>
        <!-- search -->

        <!-- products -->
        <div v-for="product in products"
             @click="viewItem(product)"
             :key="product.documentId"
             class="col-12 p-3 border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 flex justify-content-between gap-2">

          <!-- image -->
          <img :src="'/' + product.images[0].url"
               :alt="product.name"
               class="w-4rem border-round"/>

          <!-- name | price | categories -->
          <div class="w-full">
            <!-- name | price -->
            <div class="flex justify-content-between">
              <div class="w-full">{{ product.name }}</div>
              <div class="w-full text-right">{{ formatDecimal(product.price) }}</div>
            </div>
            <!-- /name | price -->

            <!-- categories -->
            <div class="pt-2 flex gap-1 text-xs">
              <template v-for="(key, category) in product.categories">
                <span class="uppercase">{{ category }}</span>
                <Divider layout="vertical" class="h-1rem"/>
              </template>
            </div>
            <!-- /categories -->
          </div>
          <!-- /name | price | categories -->

        </div>
        <!-- /products -->

      </div>
    </Popover>
    <!-- /searchPopover -->


    <!-- Categories Popover -->
    <Popover ref="categoriesPopup"
             class="border-none shadow-2"
             close-on-escape unstyled>

      <div aria-labelledby="categories-popover-title"
           class="grid m-0 w-18rem md:w-30rem lg:w-36rem select-none"
           role="menu">

        <!-- official -->
        <div class="col-12 md:col-4 p-0 h-16rem md:h-14rem lg:h-15rem overflow-hidden hover:shadow-3 text-white text-xs relative">
          <ProductType :image="`${category}-official-1-288.webp`"
                       type="official"
                       class="border-bottom-1 md:border-right-1 md:border-bottom-none border-gray-500"
                       @click="viewShop('official');"/>
        </div>
        <!-- /official -->


        <!-- Casual | Accessories -->
        <div class="col-6 md:col-4 h-10rem md:h-14rem lg:h-15rem p-0 flex flex-column overflow-hidden">
          <!-- Casual -->
          <ProductType :image="`${category}-casual-2-256.webp`"
                       type="casual"
                       class="border-gray-500 border-right-1"
                       @click="viewShop('casual');"/>

          <!-- Accessories -->
          <ProductType :image="`${category}-accessories-1-288.webp`"
                       type="accessories"
                       class="border-gray-500 border-top-1 border-right-1"
                       @click="viewShop('accessories');"/>
        </div>
        <!-- /Casual and Accessories -->


        <!-- Hats | Shoes -->
        <div class="col-6 md:col-4 h-10rem md:h-14rem lg:h-15rem p-0 flex flex-column overflow-hidden">
          <!-- Hats -->
          <ProductType :image="`${category}-hats-2-256.webp`"
                       type="hats"
                       @click="viewShop('hats');"/>

          <!-- Shoes -->
          <ProductType :image="`${category}-shoes-1-288.webp`"
                       type="shoes"
                       class="border-gray-500 border-top-1"
                       @click="viewShop('shoes');"/>
        </div>
        <!-- /Hats | Shoes -->

      </div>

    </Popover>
    <!-- Categories Popover -->

  </section>

</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name: "Categories",

  data() {
    return {
      category: null,
      search  : null
    }
  },

  computed: {
    //item categories.
    categories() {
      return useState('categories').value;
    },

    //item categories.
    shop() {
      return useState('shop').value;
    },

    //products.
    products() {
      if (!this.search) return [];

      return useState('products').value
          .filter(product => product.name.toLowerCase().includes(this.search))
    }
  },

  methods: {

    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },


    //view category menu
    viewCategoryMenu(cat_name, $event) {
      //validate.
      if (!cat_name) return;

      //update active category.
      this.category = cat_name;

      //show popup.
      this.$refs.categoriesPopup.hide();
      this.$nextTick(() => this.$refs.categoriesPopup.show($event));
    },


    //load shop UI.
    viewShop(type) {
      //validate.
      if (!type) return;

      //update UI.
      useState('shop').value = {
        category: this.category,
        type    : type
      };

      //close popup.
      this.$refs.categoriesPopup.hide();

      //emit.
      this.$emit('update', true);

      //navigate.
      navigateTo('/Shop');
    },

    //view product.
    viewItem(product) {
      useState('product').value = product;
      navigateTo(`/Product/${encodeURIComponent(product.name)}`);
    }
  },
})
</script>
