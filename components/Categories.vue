<template>
  <nav aria-label="Product Categories"
       class="col-12 p-0 xl:px-8 h-4rem bg-purple-600 text-white text-sm flex align-items-center justify-content-center capitalize">

    <!-- Category Navigation -->
    <div v-for="(cat_name, ix) in ['men', 'women', 'kids']" :key="ix"
         :aria-label="`Show ${cat_name} categories`"
         class="w-3 xl:w-1 h-full border-left-1 border-purple-700 flex align-items-center justify-content-center gap-2 hover:bg-purple-800"
         role="button" tabindex="0"
         @click="category_name = cat_name; $refs.categoriesPopup.hide(); $nextTick(() => { this.$refs.categoriesPopup.show($event); });">
      <i class="pi pi-chevron-down" aria-hidden="true"/> {{ cat_name }}
    </div>
    <!-- Category Navigation -->


    <!-- Categories Popover -->
    <Popover ref="categoriesPopup">
      <div aria-labelledby="categories-popover-title" class="flex gap-3 p-2 xl:p-3" role="menu">

        <!-- Official -->
        <div class="w-6rem xl:w-18rem h-11rem xl:h-17rem overflow-hidden flex align-items-start justify-content-end border-round hover:shadow-3 text-white relative"
             @click="viewShop({official: true});">
          <img :alt="`Ventt Ecommerce Platform - ${category_name} Official`" :src="`${category_name}-official-1-288.webp`"
               aria-hidden="true" class="w-full h-full absolute inset-0 object-cover border-round" loading="lazy"/>

          <div class="h-full w-full p-2 xl:p-3 hover:bg-black-alpha-50 hover:text-white flex align-items-end lg:align-items-start justify-content-end absolute">
            <Badge class="m-0 bg-purple-600 text-xs" value="Official" size="small" aria-label="Official Products"/>
          </div>
        </div>
        <!-- /Official -->


        <!-- Casual and Accessories -->
        <div class="w-6rem xl:w-16rem flex flex-column gap-3 text-white">

          <!-- kids | casual -->
          <div class="w-full h-5rem xl:h-8rem overflow-hidden border-round hover:shadow-3 relative"
               @click="viewShop({casual: true}); $refs.categoriesPopup.hide();">

            <img :alt="`Ventt Ecommerce Platform - ${category_name} Casual`"
                 :src="`${category_name}-casual-2-256.webp`" aria-hidden="true" class="w-full h-full absolute inset-0 object-cover border-round"/>

            <div class="h-full w-full p-2 xl:p-3 hover:bg-black-alpha-50 flex align-items-end lg:align-items-start justify-content-end absolute">
              <Badge class="m-0 bg-purple-600 text-xs" value="Casual" size="small" aria-label="Casual Products"/>
            </div>

          </div>
          <!-- /kids | casual -->


          <!-- Accessories -->
          <div class="w-full h-5rem xl:h-8rem overflow-hidden border-round hover:shadow-3 relative"
               @click="viewShop({accessories: true}); $refs.categoriesPopup.hide();">

            <img :alt="`Ventt Ecommerce Platform - ${category_name} Accessories`" width="256"
                 :src="`${category_name}-accessories-1-288.webp`" aria-hidden="true"
                 class="w-full h-full absolute inset-0 object-cover border-round"/>

            <div class="h-full w-full p-2 xl:p-3 hover:bg-black-alpha-50 flex align-items-end lg:align-items-start justify-content-end absolute">
              <Badge class="m-0 bg-purple-600 text-xs" value="Accessories" size="small" aria-label="Accessories Products"/>
            </div>

          </div>
          <!-- Accessories -->

        </div>
        <!-- /Casual and Accessories -->


        <!-- Hats and Shoes -->
        <div class="w-6rem xl:w-16rem flex flex-column gap-3">

          <!-- Hats Category -->
          <div class="w-full h-5rem xl:h-8rem overflow-hidden border-round hover:shadow-3 relative text-white"
               @click="viewShop({hats: true}); $refs.categoriesPopup.hide();">
            <img :alt="`Ventt Ecommerce Platform - ${category_name} Hats`" :src="`${category_name}-hats-2-256.webp`"
                 aria-hidden="true" class="w-full h-full absolute inset-0 object-cover border-round"/>
            <div class="h-full w-full p-2 xl:p-3 hover:bg-black-alpha-50 flex align-items-end lg:align-items-start justify-content-end absolute">
              <Badge class="m-0 bg-purple-600 text-xs" value="Hats" size="small" aria-label="Hats Products"/>
            </div>
          </div>


          <!-- Shoes Category -->
          <div class="w-full h-5rem xl:h-8rem overflow-hidden border-round hover:shadow-3 relative text-white"
               @click="viewShop({shoes: true}); $refs.categoriesPopup.hide();">
            <img :alt="`Ventt Ecommerce Platform - ${category_name} Shoes`"
                 :src="`${category_name}-shoes-1-288.webp`" aria-hidden="true"
                 class="w-full h-full absolute inset-0 object-cover border-round"/>
            <div class="h-full w-full p-2 xl:p-3 hover:bg-black-alpha-50 flex align-items-end lg:align-items-start justify-content-end absolute">
              <Badge class="m-0 bg-purple-600 text-xs" value="Shoes" size="small" aria-label="Shoes Products"/>
            </div>
          </div>
        </div>
        <!-- /Hats and Shoes -->

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

      category_name: 'men',

      categories: [
        {
          name       : "summer wear",
          documentId : "123",
          description: "Lightweight and breathable clothing designed for warm weather. Includes items like t-shirts, shorts, sundresses, and sandals."
        },
        {
          name       : "winter wear",
          documentId : "456",
          description: "Insulated and layered clothing to keep you warm during cold weather. Includes items like coats, sweaters, scarves, and boots."
        },
        {
          name       : "casual wear",
          documentId : "789",
          description: "Comfortable and relaxed clothing suitable for everyday wear. Includes items like jeans, t-shirts, hoodies, and sneakers."
        },
        {
          name       : "official wear",
          documentId : "1234",
          description: "Formal attire designed for professional or formal occasions. Includes items like suits, dress shirts, ties, and formal shoes."
        }
      ],

      menu: {
        items: [
          {
            label: 'Women',
            items: [
              {label: 'Official', image: "/women-1.webp"},
              {label: 'Casual', image: "/women-suits-1.webp"},
              {label: 'Shoes', image: "/women-hats-1.webp"},
            ]
          },
          {
            label: 'Men',
            items: [
              {label: 'Official', image: "/men-suits-1.webp"},
              {label: 'Casual', image: "/men-casual-1.webp"},
              {label: 'Shoes', image: "/men-2.webp"},
            ]
          },
          {
            label: 'Kids',
            items: [
              {label: 'Casual Tops'},
              {label: 'Dresses'},
              {label: 'T-Shirts'},
              {label: 'Jeans'},
              {label: 'Shorts'},
              {label: 'Jackets'},
              {label: 'Shoes'},
              {label: 'Accessories'}
            ]
          },
          {
            label: 'Pyjamas',
            items: [
              {label: 'Women\'s Pyjamas'},
              {label: 'Men\'s Pyjamas'},
              {label: 'Kids\' Pyjamas'},
              {label: 'Nightgowns'},
              {label: 'Robes'}
            ]
          }
        ]
      }

    }
  },


  methods: {
    //load shop UI.
    viewShop(filters) {
      //current category name.
      filters[this.category_name] = true;

      //change UI.
      useState('filters').value = filters;
      useState('ui').value      = 'shop';
      this.$refs.categoriesPopup.hide();
    }
  },

  computed: {
    headerCategories() {
      return this.categories.slice(0, 8)
    }
  }
})
</script>
