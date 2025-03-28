<template>
  <header class="col-12 h-5rem px-3 md:px-8 flex align-items-center justify-content-between bg-bluegray-50"
          aria-label="Main Navigation">

    <!-- Logo -->
    <div aria-label="Ventt Brand"
         class="h-full w-1 flex align-items-center gap-1 font-bold uppercase title hover:text-purple-600 cursor-pointer"
         @click="useState('product').value=null; useState('ui').value=null">

      <NuxtImg src="/logo-ventt.svg" alt="ventt logo" width="50" height="50"/>
      <span class="uppercase title hidden lg:block align-self-end pb-2">Vent</span>
    </div>
    <!-- Logo -->


    <!-- Navigation Actions -->
    <div class="w-11 md:w-full flex align-items-center justify-content-end gap-3 md:gap-3">

            <Button aria-label="Login" label="login" icon="pi pi-user text-xs" outlined rounded
                    severity="secondary" size="small" @click=""/>

      <!-- Product Search -->
<!--      <Button aria-label="Search Products" icon="pi pi-search text-xs" outlined rounded-->
<!--              severity="secondary" size="small" @click="$refs.productsPopover.toggle($event)"/>-->
<!--      <Popover ref="productsPopover">-->
<!--        <div class="w-22rem md:w-26rem">-->
<!--          <DataTable v-model:filters="filters.dt1" :globalFilterFields="['name', 'description', 'sku']" :rows="5"-->
<!--                     :show-headers="false" :value="useState('products').value" data-key="documentId" paginator row-hover>-->

<!--            <template #header>-->
<!--              <div class="pl-2">-->
<!--                <IconField>-->
<!--                  <InputIcon aria-label="Clear Search" class="hover:text-orange-500"-->
<!--                             @click="filters.dt1['global'].value=null; useState('selectedItems').value=[]">-->
<!--                    <i class="pi pi-search" aria-hidden="true"/>-->
<!--                  </InputIcon>-->

<!--                  <InputText id="search-ip" v-model="filters.dt1['global'].value" aria-label="Search products"-->
<!--                      autocomplete="off" class="text-sm" fluid placeholder="Search products"/>-->
<!--                </IconField>-->
<!--              </div>-->
<!--            </template>-->

<!--            <Column field="name">-->
<!--              <template #body="{data}">-->
<!--                <div class="pl-2 flex justify-content-between align-items-center text-sm">-->

<!--                  {{ data.name }}-->

<!--                  <div class="flex align-items-center gap-3">-->
<!--                    <Button aria-label="Add to Cart" class="border-none" icon="pi pi-plus text-xs"-->
<!--                        outlined raised rounded severity="success" @click="addToCart(data, 1)"/>-->

<!--                    <template v-if="data.cart">-->
<!--                      <Button-->
<!--                          severity="warn"-->
<!--                          class="border-none"-->
<!--                          raised-->
<!--                          rounded-->
<!--                          outlined-->
<!--                          icon="pi pi-minus text-xs"-->
<!--                          aria-label="Remove One from Cart"-->
<!--                          @click="removeFromCart(data, 1)"-->
<!--                      />-->
<!--                      <Button-->
<!--                          severity="danger"-->
<!--                          class="border-none"-->
<!--                          raised-->
<!--                          rounded-->
<!--                          outlined-->
<!--                          icon="pi pi-times text-xs"-->
<!--                          aria-label="Remove All from Cart"-->
<!--                          @click="removeFromCart(data, data.cart)"-->
<!--                      />-->
<!--                    </template>-->

<!--                  </div>-->

<!--                </div>-->
<!--              </template>-->
<!--            </Column>-->

<!--          </DataTable>-->
<!--        </div>-->
<!--      </Popover>-->
      <!-- /Product Search -->

      <!-- User Profile -->
<!--      <Button icon="pi pi-user text-xs" outlined rounded severity="secondary"-->
<!--          size="small" aria-label="User Profile"/>-->



      <!-- Wishlist -->
      <Button :class="`px-3 border-none shadow-1 ${wishlist.length ? 'bg-purple-600 text-white' : 'text-gray-600'}`"
              :label="wishlist.length.toLocaleString()"
              :disabled="!wishlist.length"
              :outlined="!wishlist.length" aria-label="Wishlist"
              icon="pi pi-heart-fill text-xs" rounded size="small"
              @click="$refs.wishListPopover.toggle($event)"/>
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
      <!-- /Wishlist -->

      <!-- Shopping Cart -->
      <Button :disabled="!cartData.total" :label="String(formatDecimal(cartData.total))"
              aria-label="Shopping Cart" class="px-3 shadow-1 bg-purple-600 text-white border-none"
              icon="pi pi-shopping-cart text-xs" rounded size="small" @click="$refs.shoppingCartPopover.toggle($event)"/>
      <Popover ref="shoppingCartPopover">
        <div class="w-20rem md:w-26rem px-3">

          <div class="h-4rem flex align-items-center gap-2 border-bottom-1 border-gray-100">
            <i class="pi pi-shopping-cart" aria-hidden="true"/> My Shopping Cart
          </div>

          <div v-for="(product, ix) in useState('products').value.filter(pt => pt.cart)"
               :key="ix" class="h-6rem border-bottom-1 border-gray-100 hover:text-purple-600 flex align-items-center">

            <div class="w-full">

              <div class="w-full flex align-items-center justify-content-between gap-2">
                <div class="w-full flex justify-content-between align-items-center">
                  <div class="capitalize text-sm">{{ product.name }}</div>
                  <Badge :value="`${product.cart.toLocaleString()} pc(s)`" size="small" class="text-xs w-4rem"/>
                </div>

                <div class="text-right">{{ formatDecimal(product.cart * product.price) }}</div>
              </div>

              <div class="w-full py-2 flex align-items-center justify-content-end gap-3">
                <Button aria-label="Add One to Cart" class="border-1 border-gray-100 text-xs" icon="pi pi-plus text-xs"
                        label="add" outlined rounded severity="success" size="small"
                        @click="addToCart(product, 1);"/>
                <Button severity="warn" class="border-1 border-gray-100 text-xs" size="small"
                        label="remove" rounded outlined icon="pi pi-minus text-xs" aria-label="Remove One from Cart"
                        @click="removeFromCart(product, 1);"/>
                <Button severity="danger" class="border-1 border-gray-100 text-xs" rounded label="clear" size="small"
                        outlined icon="pi pi-times text-xs" aria-label="Remove All from Cart"
                        @click="removeFromCart(product, product.cart); "/>
              </div>

            </div>

          </div>

          <!-- Totals -->
          <div class="h-4rem flex align-items-center justify-content-between">
            <div>
              <div class="font-bold">{{ cartData.quantity.toLocaleString() }}</div>
              <div class="text-xs">Quantity</div>
            </div>
            <div>
              <div class="font-bold">{{ formatDecimal(cartData.total) }}</div>
              <div class="text-xs text-right">Total</div>
            </div>
          </div>
          <!-- /Totals -->

          <!-- Checkout -->
          <div v-if="cartData.total" class="h-5rem flex align-items-center border-top-1 border-gray-100">
            <Button aria-label="Proceed to Checkout" class="w-full bg-green-600" icon="pi pi-shopping-cart"
                label="Checkout" raised @click="useState('ui').value='checkout'; $refs.shoppingCartPopover.hide()"/>
          </div>
          <!-- /Checkout -->

        </div>
      </Popover>
      <!-- /Shopping Cart -->

    </div>

  </header>
</template>


<script setup lang="js">
import {useAddToCart} from "~/composables/addToCart.js";
import {useRemoveFromCart} from "~/composables/removeFromCart.js";

const {formatDecimal}  = useFormatDecimal();
const {addToCart}      = useAddToCart();
const {removeFromCart} = useRemoveFromCart();
</script>


<script lang="js">
import {FilterMatchMode} from "@primevue/core/api";

export default defineComponent({
  name: "topBar",

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
    cartData() {
      let data        = {
        quantity: 0,
        total   : 0
      };

      const cartItems = useState('products').value.filter(product => product.cart);
      cartItems.forEach(product => {
        data.quantity += product.cart;
        data.total += product.cart * product.price;
      });

      return data;
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