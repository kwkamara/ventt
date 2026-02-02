<template>

  <header class="col-12 h-5rem px-3 md:px-8 bg-white flex align-items-center animation-duration-1000 fadein"
          aria-label="Main Navigation">

    <!-- Logo -->
    <div aria-label="Ventt Brand"
         class="h-full w-4 flex align-items-center gap-2 font-bold uppercase title hover:text-purple-600 cursor-pointer">

      <NuxtLink to="/" class="flex gap-2 align-items-center no-underline">
        <img alt="ventt logo" height="50" src="/logo-ventt.svg" width="50"/>

        <h1 class="m-0 title hidden lg:block align-self-end capitalize font-light text-purple-700" style="letter-spacing:0.1em">
          Ventt
        </h1>
      </NuxtLink>
    </div>
    <!-- Logo -->


    <!-- menu -->
    <div class="w-8 flex align-items-center justify-content-end gap-3 md:gap-1">

      <div class="flex align-items-center gap-3 md:gap-1">
        <!-- Login -->
        <Button aria-label="Login" rounded
                class="bg-transparent border-none hover:shadow-1 text-purple-700"
                size="small" @click="">
          <span class="material-icons-outlined font-light text-4xl">account_circle</span>
        </Button>
        <!-- /Login -->

        <Divider layout="vertical" class="h-2rem hidden md:block"/>

        <!-- likes -->
        <Button aria-label="Login" rounded
                class="bg-transparent border-none hover:shadow-1 text-purple-700"
                size="small" @click="">
          <span class="material-icons-outlined" style="font-size:30px">favorite_border</span>
        </Button>
        <!-- /likes -->

        <Divider layout="vertical" class="h-2rem hidden md:block"/>

        <!-- shopping cart -->
        <Button aria-label="Login" rounded
                class="bg-transparent border-none hover:shadow-1 text-purple-700"
                size="small"
                @click="$refs.shoppingCartPopover.toggle($event)">
          <span class="material-icons-outlined">shopping_cart</span>
          <span>0.00</span>
        </Button>
        <!-- /shopping cart -->

      </div>

    </div>

  </header>


  <!-- shoppingCartPopover -->
  <Popover ref="shoppingCartPopover">
    <div class="grid m-0 lg:w-18rem">

      <!-- Header -->
      <div class="col-12 py-2">
        <h2 class="m-0 font-light">My Shopping Cart</h2>
      </div>
      <!-- /Header -->


      <!-- products -->
      <div v-for="product in cart"
           :key="product.id" class="col-12 py-2">

      </div>
      <!-- /products -->


      <!-- Totals | checkout -->
      <div class="col-12 py-2">

      </div>
      <!-- /Totals | checkout -->

    </div>
  </Popover>
  <!-- /shoppingCartPopover -->

  <!-- wishListPopover -->
  <Popover ref="wishListPopover">
    <div class="w-full md:w-26rem">
      <DataTable v-model:filters="filters.dt2" :globalFilterFields="['name', 'description', 'sku']"
                 :rows="5" :paginator="wishlist.length > 5"
                 :show-headers="false" row-hover data-key="documentId"
                 :value="useState('products').value.filter(pd => pd.wishlist)">

        <template #header>
          <div class="pl-2">
            <IconField>
              <InputIcon aria-label="Clear Search" class="hover:text-orange-500" @click="filters.dt2['global'].value=null;">
                <i class="pi pi-search" aria-hidden="true"/>
              </InputIcon>

              <InputText id="search-ip" v-model="filters.dt2['global'].value" aria-label="Search wishlist"
                         autocomplete="off" class="text-sm" fluid placeholder="Search wishlist"/>
            </IconField>
          </div>
        </template>


        <Column field="name">
          <template #body="{data}">
            <div class="pl-2 flex justify-content-between align-items-center text-sm">
              {{ data.name }}
              <div class="flex align-items-center gap-3">
                <Button aria-label="Remove from Wishlist" class="border-1 border-gray-100 text-xs" icon="pi pi-times text-xs"
                        outlined size="small" rounded label="clear" severity="danger" @click="delete data.wishlist"/>
              </div>
            </div>
          </template>
        </Column>

      </DataTable>
    </div>
  </Popover>
  <!-- /wishListPopover -->

</template>


<script setup lang="js">
import {useAddToCart} from "~/composables/addToCart.js";
import {useRemoveFromCart} from "~/composables/removeFromCart.js";

const {formatDecimal} = useFormatDecimal();
const {addToCart} = useAddToCart();
const {removeFromCart} = useRemoveFromCart();
</script>


<script lang="js">
import {FilterMatchMode} from "@primevue/core/api";

export default defineComponent({
  name: "Navbar",

  data() {
    return {
      //table
      filters: {
        dt1: {
          global: {
            value    : null,
            matchMode: FilterMatchMode.CONTAINS
          },
        },
        dt2: {
          global: {
            value    : null,
            matchMode: FilterMatchMode.CONTAINS
          },
        },
      },
      items  : [
        {
          label: "Categories",
          icon : "pi-th-large",
          items: [
            [
              {
                label: 'Women',
                items: [
                  {label: 'Casual Tops'},
                  {label: 'Official Blouses'},
                  {label: 'Casual Dresses'},
                  {label: 'Official Suits'},
                  {label: 'Jeans'},
                  {label: 'Skirts'},
                  {label: 'Jackets'},
                  {label: 'Shoes'},
                  {label: 'Accessories'}
                ]
              }
            ],
            [
              {
                label: 'Men',
                items: [
                  {label: 'Casual Shirts'},
                  {label: 'Official Shirts'},
                  {label: 'T-Shirts'},
                  {label: 'Suits'},
                  {label: 'Jeans'},
                  {label: 'Trousers'},
                  {label: 'Jackets'},
                  {label: 'Shoes'},
                  {label: 'Accessories'}
                ]
              }
            ],
            [
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
              }
            ],
            [
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
          ]
        }
      ]
    }
  },

  computed: {
    cart() {
      return useState('cart').value;
    },
    wishlist() {
      return useState('products').value.filter(pd => pd.wishlist);
    }
  },

  methods: {
    //notify popup.
    notify(summary, severity = 'info') {
      this.$toast.add({severity: severity, summary: summary, life: 1000});
    },
  }
})
</script>