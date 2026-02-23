<template>

  <section class="col-12 p-0 md:px-7 h-4rem bg-purple-600 animation-duration-1000 fadein text-white text-sm select-none capitalize shadow-3">


    <div class="grid m-0 h-full">

      <!-- Category Navigation -->
      <div class="col-9 lg:col-4 h-full p-0 bg-purple-800 flex align-items-center justify-content-between lg:justify-content-start">
        <div v-for="(cat_name, ix) in categories"
             :key="cat_name"
             :aria-label="`Show ${cat_name} categories`"
             :class="categoryTabClass(cat_name, ix)"
             role="button"
             tabindex="0"
             @click="openCategoriesPopup(cat_name, $event)">
          {{ $t(cat_name) }}
          <span class="material-icons-outlined text-xs ml-1"
                :class="{'rotate-180 transition-transform transition-duration-200': isActiveCategory(cat_name)}">
            keyboard_arrow_down
          </span>
        </div>
      </div>
      <!-- /Category Navigation -->

      <!-- Product Search -->
      <div class="col-3 lg:col-8 pr-4 md:pr-0 text-right">
        <VButton fill="1"
                 icon="search"
                 @click="$refs.searchPopover.toggle($event)"/>
      </div>
      <!-- /Product Search -->

    </div>


    <!-- product searchPopover -->
    <Popover ref="searchPopover">
      <div class="grid m-0 w-20rem lg:w-26rem select-none overflow-hidden">

        <!-- search -->
        <div class="col-12">
          <InputText v-model="search"
                     class="w-full h-4rem bg-transparent border-none border-bottom-1 border-gray-400"
                     autofocus fluid
                     :placeholder="$t('search_products')"
                     unstyled/>
        </div>
        <!-- search -->

        <!-- products -->
        <div v-for="product in products"
             @click="viewItem(product)"
             :key="product.documentId"
             class="col-12 p-3 border-purple-50 hover:shadow-3 hover:bg-purple-700 hover:text-white hover:border-none border-top-1 flex justify-content-between gap-2">

          <!-- image -->
          <img v-if="product.images?.length"
               :alt="product.name[locale] || product.name?.en"
               :src="'/' + product.images[0].url"
               class="w-4rem border-round"/>

          <!-- name | price | categories -->
          <div class="w-full">
            <!-- name | price -->
            <div class="flex justify-content-between">
              <div class="w-full">{{ product.name[locale] || product.name?.en || product.name }}</div>
              <div class="w-full text-right">{{ formatDecimal(product.price) }}</div>
            </div>
            <!-- /name | price -->

            <!-- categories -->
            <div class="pt-2 flex gap-1 text-xs">
              <template v-for="(key, category) in product.categories" :key="key">
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
    <!-- /product searchPopover -->


    <!-- Categories Popover -->
    <Popover ref="categoriesPopup"
             class="border-none shadow-3 border-round-xl overflow-hidden"
             close-on-escape unstyled>

      <div aria-labelledby="categories-popover-title"
           class="grid m-0 w-18rem md:w-30rem lg:w-36rem select-none"
           role="menu">

        <!-- official -->
        <div class="col-12 md:col-4 p-0 h-16rem md:h-14rem lg:h-15rem overflow-hidden hover:shadow-3 text-white text-xs relative">
          <ProductType :image="`${category}-official.webp`"
                       type="official"
                       class="border-bottom-1 md:border-right-1 md:border-bottom-none border-gray-500"
                       @click="viewShop('official');"/>
        </div>
        <!-- /official -->


        <!-- Casual | Accessories -->
        <div class="col-6 md:col-4 h-10rem md:h-14rem lg:h-15rem p-0 flex flex-column overflow-hidden">
          <!-- Casual -->
          <ProductType :image="`${category}-casual-1.webp`"
                       type="casual"
                       class="border-gray-500 border-right-1"
                       @click="viewShop('casual');"/>

          <!-- Accessories -->
          <ProductType :image="`${category}-accessories-1.webp`"
                       type="accessories"
                       class="border-gray-500 border-top-1 border-right-1"
                       @click="viewShop('accessories');"/>
        </div>
        <!-- /Casual and Accessories -->


        <!-- Hats | Shoes -->
        <div class="col-6 md:col-4 h-10rem md:h-14rem lg:h-15rem p-0 flex flex-column overflow-hidden">
          <!-- Hats -->
          <ProductType :image="`${category}-hats-1.webp`"
                       type="hats"
                       @click="viewShop('hats');"/>

          <!-- Shoes -->
          <ProductType :image="`${category}-shoes-1.webp`"
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
const {locale}        = useI18n();
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

      const locale = this.$i18n.locale;

      return useState('products').value
          .filter(product => (product.name[locale] || product.name?.en || '')
              .toLowerCase().includes(this.search))
    }
  },

  methods: {

    //show category menu popup.
    openCategoriesPopup(cat_name, $event) {
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
      const localePath = useLocalePath();
      navigateTo(localePath('/shop'));
    },

    //view product.
    viewItem(product) {
      useState('product').value = product;

      //navigate.
      const localePath = useLocalePath();
      const locale     = this.$i18n.locale;
      navigateTo(localePath('/Product/' + encodeURIComponent(product.name[locale])));
    },


    //category active helper.
    isActiveCategory(cat_name) {
      return (this.shop?.category === cat_name) || (this.category === cat_name);
    },


    //category tab classes.
    categoryTabClass(cat_name, ix) {
      //active category.
      const active = this.isActiveCategory(cat_name);

      let category_class = 'w-full px-3 md:px-4 h-full border-left-1 border-purple-700 uppercase md:text-sm font-normal flex align-items-center justify-content-center gap-1 cursor-pointer transition-colors transition-duration-200 hover:bg-purple-700 hover:text-yellow-500 ';
      if (active) category_class += 'bg-purple-900 text-yellow-400 shadow-2 border-round-top ';
      if (ix === 2) category_class += 'border-right-1 ';

      //return.
      return category_class;
    }


  },
})
</script>
