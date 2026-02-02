<template>

  <nav aria-label="Product Categories"
       class="col-12 p-0 xl:px-8 h-4rem bg-purple-600 animation-duration-1000 fadein text-white text-sm select-none flex align-items-center justify-content-center lg:justify-content-start capitalize shadow-3">

    <!-- Category Navigation -->
    <div v-for="(cat_name, ix) in categories"
         :key="ix"
         :aria-label="`Show ${cat_name} categories`"

         :class="`w-6rem lg:w-8rem h-full bg-purple-800 border-left-1 border-purple-700 uppercase text-lg font-light hover:bg-purple-800 hover:text-yellow-800 flex align-items-center justify-content-center ` +
         ( (shop && shop.category === cat_name) || (category === cat_name) ? 'bg-purple-800 text-yellow-800 ' : '' ) +
          (ix === 2 ? 'border-right-1' : null)"

         role="button" tabindex="0"
         @click="viewCategoryMenu(cat_name, $event)">
      <i class="pi pi-chevron-down" aria-hidden="true"/> {{ cat_name }}
    </div>
    <!-- Category Navigation -->


    <!-- Categories Popover -->
    <Popover ref="categoriesPopup"
             class="bg-purple-800 border-none shadow-2"
             close-on-escape unstyled>

      <div aria-labelledby="categories-popover-title"
           class="grid m-0 w-full select-none"
           role="menu">

        <!-- official -->
        <div class="col-12 md:col-4 lg:w-16rem h-10rem lg:h-17rem p-0 overflow-hidden hover:shadow-3 text-white text-xs relative">
          <ProductType :image="`${category}-official-1-288.webp`"
                       type="official"
                       @click="viewShop('official');"/>
        </div>
        <!-- /official -->


        <!-- Casual | Accessories -->
        <div class="col-12 md:col-4 lg:w-14rem h-10rem lg:h-17rem p-0 px-1 flex flex-column gap-1">
          <!-- Casual -->
          <ProductType :image="`${category}-casual-2-256.webp`"
                       type="casual"
                       @click="viewShop('casual');"/>

          <!-- Accessories -->
          <ProductType :image="`${category}-accessories-1-288.webp`"
                       type="accessories"
                       @click="viewShop('accessories');"/>
        </div>
        <!-- /Casual and Accessories -->


        <!-- Hats | Shoes -->
        <div class="col-12 md:col-4 lg:w-14rem h-10rem lg:h-17rem p-0 flex flex-column gap-1">
          <!-- Hats -->
          <ProductType :image="`${category}-hats-2-256.webp`"
                       type="hats"
                       @click="viewShop('hats');"/>

          <!-- Shoes -->
          <ProductType :image="`${category}-shoes-1-288.webp`"
                       type="shoes"
                       @click="viewShop('shoes');"/>
        </div>
        <!-- /Hats | Shoes -->

      </div>

    </Popover>
    <!-- Categories Popover -->

  </nav>

</template>


<script lang="js">
export default defineComponent({
  name: "Categories",

  data() {
    return {
      category: null,
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
    }
  },
})
</script>
