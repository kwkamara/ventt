<template>
  <div class="col-12 p-0 flex text-gray-700">

    <!-- menu -->
    <div v-if="is_sidebar"
         @click="useState('item').value=null;"
         class="w-3 md:w-2 lg:w-1 pt-4 px-2 bg-white border-right-1 border-gray-200 flex flex-column align-items-center gap-5">

      <Button v-for="cat in menu.filter(m => !m.parent)"
              :key="cat.name"
              @click="viewCategory(cat)"
              :class="( category_name === cat.name ? 'bg-purple-700 text-white' : 'text-purple-700 bg-white') +
              ' w-5rem h-4rem border-none border-round-xl shadow-1 hover:text-white hover:bg-purple-800 hover:shadow-3 flex align-items-center justify-content-center'">
        <div class="text-center">
          <span class="material-icons-outlined">{{ cat.icon }}</span>
          <div class="text-xs capitalize">{{ cat.name }}</div>
        </div>
      </Button>

    </div>
    <!-- menu -->


    <!-- content -->
    <div :class="(is_sidebar ? 'w-9 md:w-10 lg:w-11' : 'w-full') + ' grid m-0 px-2 lg:px-5 py-4 select-none'">

      <!-- profile | dates -->
      <div class="col-12 pl-1 pt-0 pb-3 md:flex justify-content-between align-items-center">

        <!-- profile -->
        <div class="flex align-items-center gap-2">
          <VButton icon="person"/>
          <span>Admin</span>
        </div>
        <!-- /profile -->

        <!-- dates -->
        <div class="pt-2 md:pt-0 flex gap-1 align-items-center md:justify-content-end">
          <Icon icon="calendar_month"/>

          <!-- start -->
          <DatePicker id="start-date"
                      aria-label="start date"
                      input-class="text-sm text-gray-700 w-7rem hover:text-purple-700 cursor-pointer"
                      date-format="dd/mm/yy"
                      v-model="startDate" fluid/>

          <Divider layout="vertical" unstyled class="h-1rem pr-3 border-left-1 border-purple-400"/>
          <!-- end -->
          <DatePicker id="end-date"
                      date-format="dd/mm/yy"
                      aria-label="end date"
                      input-class="w-6rem pr-0 text-sm text-gray-700 text-right hover:text-purple-700 cursor-pointer"
                      v-model="endDate" fluid/>
        </div>
        <!-- /dates -->

      </div>
      <!-- /profile | dates -->


      <!-- left col -->
      <div v-if="category" class="col-12 lg:col-5 md:pl-0 flex flex-column gap-3">

        <!-- summary panel -->
        <div class="pt-3 shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden bg-purple-500 text-white">

          <!-- category name | category total | dates -->
          <div class="pb-4 md:flex justify-content-between align-items-start">

            <!-- category name | category total -->
            <div class="lg:w-8 px-3 lg:pl-4 md:pt-2  text-2xl capitalize">
              <div class="flex gap-3 align-items-center">
                <VButtonCube :icon="category.icon" fill="1" class="h-4rem w-4rem border-round-xl shadow-1 border-1 border-purple-300"/>
                <div>
                  <div>{{ category.name }}</div>
                  <span>{{ category.data.length }}</span>
                </div>
              </div>
            </div>
            <!-- category name | category total -->

          </div>
          <!-- /category name | category total | dates -->


          <!-- report | manage -->
          <Divider unstyled class="border-top-1 border-purple-900"/>
          <div class="px-3 py-3 lg:px-4 flex justify-content-between align-items-center justify-content-end gap-3 bg-purple-600">
            <VButton icon="article" class="border-round-3xl text-white"/>

            <template v-if="category.categories">
              <VButton v-for="(cat_name, ix) in category.categories"
                       class="border-round-3xl text-white"
                       @click="category=getCategoryByName(cat_name)"
                       :icon="getCategoryByName(cat_name).icon"/>
            </template>


            <VButton icon="settings"
                     class="border-round-3xl text-white"
                     @click="manageToggle()"/>
          </div>
          <!-- /report | manage -->

        </div>
        <!-- /summary panel -->


        <!-- metrics -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between align-items-center gap-3 bg-white overflow-hidden">

          <template v-for="(metric, ix) in category.metrics" :key="ix">

            <div class="w-full">
              <div class="flex gap-1 align-items-center">
                <Icon :icon="metric.icon" class="text-6xl"/>
                <h2 class="m-0 font-light sans-serif">{{ metric.value }}</h2>
              </div>
              <div class="text-xs capitalize">{{ metric.name }}</div>
            </div>

            <Divider v-if="ix!==2" layout="vertical" class="h-2rem"/>
          </template>

        </div>
        <!-- /metrics -->


        <!-- status -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between align-items-center gap-3 bg-white overflow-hidden">
          <template v-for="(status, ix) in category.status">
            <div class="w-full">
              <div class="flex gap-1 align-items-center">
                <Icon :icon="status.icon" class="text-6xl"/>
                <h2 class="m-0 font-light sans-serif">{{ status.value }}</h2>
              </div>
              <div class="text-xs capitalize">{{ status.name }}</div>
            </div>

            <Divider v-if="ix!==2" layout="vertical" class="h-2rem"/>
          </template>
        </div>
        <!-- /status -->

      </div>
      <!-- /left col -->


      <!-- right col -->
      <div v-if="category" class="col-12 lg:col-7 flex flex-column gap-3">

        <!-- chart -->
        <client-only>
          <div v-if="!manage"
               class="px-3 py-4 lg:px-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between bg-white">
            <Chart type="bar"
                   :data="chartData"
                   :options="chartOptions"
                   class="lg:h-14rem w-full"/>
          </div>
        </client-only>
        <!-- /chart -->


        <!-- recent -->
        <div v-if="!manage && category.data" class="shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden bg-white">

          <!-- header -->
          <div class="px-3 md:px-4 py-3 flex gap-2 align-items-center justify-content-between border-bottom-1 border-gray-300 bg-gray-50">
            <div class="flex gap-1 align-items-center">
              <span class="material-icons-outlined">access_time</span>
              <h3 class="m-0 font-light sans-serif">Recent {{ category.name }}</h3>
            </div>

            <VButton icon="settings" @click="manage='items'"/>
          </div>
          <!-- /header -->

          <DataTable :show-headers="false"
                     :value="category.data.slice(0, 4)"
                     data-key="documentId" row-hover striped-rows
                     table-class="text-xs animation-duration-500 fadein">

            <!-- columns -->
            <Column v-for="prop in key_props.filter(p => p.name!== 'description')" :field="prop.name">
              <template #body="{data}">
                <div class="py-2 pl-2" @click="manage='info'; item=data">
                  <template v-if="prop.date">
                    {{ new Date(data[prop.name]).toLocaleDateString('en-GB') }}
                  </template>
                  <template v-else-if="category.name==='products' && ['name', 'description'].includes(prop.name)">
                    {{ data[prop.name]['en'] }}
                  </template>
                  <template v-else>
                    {{ prop.prefix }}
                    {{ prop.decimal ? formatDecimal(data[prop.name]) : data[prop.name] }}
                    {{ prop.suffix }}
                  </template>
                </div>
              </template>
            </Column>
            <!-- columns -->

          </DataTable>

        </div>
        <!-- /recent -->


        <!-- manage -->
        <div v-if="manage" class="shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden bg-white">

          <!-- search -->
          <template v-if="manage==='items'">
            <div class="p-3 md:px-4 flex justify-content-between align-items-center gap-2 bg-gray-50">
              <InputText v-model="filters['global'].value"
                         :placeholder="'Search ' + category.name"
                         class="w-10rem px-3 text-sm border-gray-300 border-1 border-gray-300 border-round-3xl"/>

              <VButtonCube text="new" icon="add" fill="1" @click="newItemInit"/>

            </div>
            <Divider unstyled class="border-bottom-1 border-gray-300"/>
          </template>
          <!-- /search -->


          <!-- items -->
          <DataTable v-if="manage==='items' && !item"
                     v-model:filters="filters"
                     :globalFilterFields="['name.en', 'id', 'description', 'customer', 'status', 'sku']"
                     :rows="5"
                     :show-headers="false"
                     :value="category.data"
                     data-key="documentId"
                     paginator row-hover
                     table-class="text-sm animation-duration-500 fadein">

            <!-- columns -->
            <Column v-for="(prop, key) in tbl_columns" :field="prop.name" :key="prop.name">
              <template #body="{data}">
                <div :class="(key === 0 ? 'pl-3' : '') + ' w-full py-2 white-space-nowrap'" @click="manage='info'; item=data">
                  <template v-if="prop.date">
                    {{ new Date(data[prop.name]).toLocaleDateString('en-GB') }}
                  </template>
                  <template v-else-if="category.name==='products' && ['name', 'description'].includes(prop.name)">
                    {{ data[prop.name]['en'] }}
                  </template>
                  <template v-else>
                    {{ prop.prefix }} {{ prop.decimal ? formatDecimal(data[prop.name]) : data[prop.name] }} {{ prop.suffix }}
                  </template>
                </div>
              </template>
            </Column>
            <!-- /columns -->

            <!-- edit -->
            <Column class="text-right pr-2">
              <template #body="{data}">
                <Button class="bg-transparent text-gray-400 hover:text-yellow-600 lg:justify-content-end"
                        text @click.stop="editItem(data)">
                  <span class="material-icons-outlined">edit</span>
                </Button>
              </template>
            </Column>

          </DataTable>
          <!-- /items -->


          <!-- header -->
          <div v-if="manage !=='items'" class="p-3 lg:pl-4 flex justify-content-between align-items-center bg-gray-50">

            <!-- category icon | name -->
            <div class="flex align-items-center">
              <div class="flex align-items-center">
                <Icon :icon="category.icon" class="text-gray-700"/>
                <span class="ml-1 uppercase text-gray-700">{{ category.name }} </span>
              </div>

              <Divider layout="vertical" class="h-2rem"/>

              <!-- item name -->
              <div class="pl-1">
                <span v-if="item">
                  {{ category.name === 'products' ? item.name['en'] : (item.name || item.id) }}
                </span>
                <span v-else>New Item</span>
              </div>
              <!-- item name -->
            </div>
            <!-- /category icon | name -->


            <!-- controls -->
            <div class="md:pr-2 flex align-items-center justify-items-end gap-3">

              <template v-if="item">
                <VButton v-if="manage!=='edit'" icon="edit" @click="manage='edit';"/>
                <Divider v-if="manage!=='edit' && manage!=='info'" unstyled layout="vertical" class="h-2rem border-left-1 border-gray-200"/>
                <VButton v-if="manage!=='info'" icon="info" @click="manage='info';"/>
                <Divider unstyled layout="vertical" class="h-2rem border-left-1 border-gray-200"/>
              </template>

              <VButton icon="close" @click="manage='items'; item=null"/>
            </div>
            <!-- /controls -->

          </div>
          <!-- header -->


          <Divider v-if="manage!=='items'" unstyled class="border-top-1 border-gray-300"/>


          <!-- details grid -->
          <div class="grid m-0 pt-2 pb-2" v-if="manage==='info' && item">

            <!-- Key props -->
            <div v-for="prop in category.props.filter(p => p.key && item[p.name])"
                 :class="(prop.name === 'description' ? '' : 'lg:col-4 ') + 'col-12 p-4'">

              <div>
                <template v-if="prop.date">
                  {{ new Date(item[prop.name]).toLocaleDateString('en-GB') }}
                </template>
                <template v-else-if="['name', 'description'].includes(prop.name)">
                  {{ item[prop.name]['en'] }}
                </template>
                <template v-else>
                  {{ prop.prefix }} {{ prop.decimal ? formatDecimal(item[prop.name]) : item[prop.name] }}
                </template>
              </div>

              <span class="mt-1 text-xs capitalize text-gray-500">
                {{ prop.header || prop.name }} {{ prop.suffix }}
              </span>
            </div>
            <!-- /Key props -->


            <!-- other props -->
            <div v-for="prop in category.props.filter(p => !p.no_info && !p.key && item[p.name])" class="col-6 p-4">
              <!-- rating -->
              <div v-if="prop.name === 'rating'" class="flex align-items-center">
                <span v-for="rate in Number(item.rating)" class="material-icons text-xl text-yellow-600">star</span>
              </div>

              <div v-else>
                {{ prop.prefix }}
                {{ prop.decimal ? formatDecimal(item[prop.name]) : item[prop.name] }}
              </div>
              <span class="mt-1 text-xs capitalize">
                {{ prop.name }} {{ prop.suffix }}
              </span>
            </div>
            <!-- /other props -->


            <!-- relative categories -->
            <template v-if="category.categories">

              <div class="col-12 bg-gray-100 px-3 border-top-1 border-gray-300" v-for="sub_category in category.categories">

                <!-- header -->
                <div class="pl-1 pr-2 flex justify-content-between align-items-center">
                  <!-- relative category title -->
                  <h2 class="m-0 sans-serif font-light capitalize">
                    {{ Object.keys(item[sub_category]).length }} {{ sub_category }}
                  </h2>

                  <!-- edit relative category -->
                  <div class="pt-2">
                    <VButton :fill="edit_relative"
                             :icon="edit_relative ? 'check' : 'edit'"
                             @click="edit_relative ? notify('updated'): null; edit_relative = !edit_relative"/>
                  </div>
                </div>
                <!-- /header -->


                <div v-for="(sub_item, key) in item[sub_category]" class="grid m-0 py-2 text-sm">
                  <div class="col-12">
                    <h3 class="m-0 sans-serif uppercase">{{ key }}</h3>
                  </div>

                  <template v-for="(value, prop) in sub_item">
                    <div v-if="value" :class="'col-12 px-2 py-3 ' + (prop==='description' ? '' : 'lg:col-4') + ' '">

                      <!-- edit sub-item -->
                      <template v-if="edit_relative">
                        <Textarea v-if="prop.name === 'description'"
                                  v-model="sub_item[prop]" :rows="3"
                                  class="w-full bg-white border-none border-bottom-1 border-gray-300 text-base" fluid unstyled/>
                        <InputText v-else :id="'rel-'+prop"
                                   v-model="sub_item[prop]"
                                   :type="['price'].includes(prop) ? 'number' : 'text'"
                                   class="w-10 pl-0 border-none border-bottom-1 border-gray-300 text-base"
                                   fluid input-class="py-3 pl-0" unstyled/>
                        <label class="capitalize block" :for="'rel-' + prop">{{ prop }}</label>
                      </template>

                      <!-- sub-item info -->
                      <template v-else>
                        <div class="text-lg">{{ prop === 'price' ? formatDecimal(value) : value }}</div>
                        <span class="uppercase text-xs">{{ prop }}</span>
                      </template>
                    </div>
                  </template>
                </div>

              </div>

            </template>
            <!-- /relative categories -->

          </div>
          <!-- /details grid -->


          <!-- edit -->
          <ItemForm v-if="manage==='edit'" :categories="menu" :category="category"
                    :item="item || {}" @update="pushItem($event)"/>


          <!-- media -->
          <div v-if="item && ['media', 'files'].includes(manage)" class="grid m-0 p-3 md:px-3">

            <!-- upload -->
            <div class="col-12 px-2 pb-3 flex justify-content-between align-items-start pb-0 gap-2">
              <div>
                <FileUpload v-model="media"
                            choose-icon="pi pi-folder"
                            choose-label="select file"
                            class="bg-purple-700 border-none" mode="basic"/>
              </div>
              <VButtonCube :disabled="!media" :text="'upload ' + manage" icon="check" class="border-round-3xl"/>
            </div>
            <!-- /upload -->

            <Divider class="mx-2 mt-1 mb-5"/>

            <!-- item images -->
            <div v-if="item.images && manage==='media'" class="grid m-0">
              <div v-for="(img, ix) in item.images" class="col-12 md:col-4 pt-0 relative">

                <VButton class="absolute right-0 mx-3 mt-2 shadow-1 hover:shadow-3"
                         :fill="delete_media[ix+1]"
                         @click="delete_media[ix+1] ? delete(delete_media[ix+1]) : delete_media[ix+1]=1"
                         icon="delete"/>

                <img :alt="item.description || item.name"
                     :src="'/' + img.url"
                     class="w-full border-round border-1 border-purple-100 shadow-1"/>
              </div>
            </div>
            <!-- item images -->

          </div>
          <!-- media -->


          <!-- footer -->
          <div v-if="item && item.documentId" class="p-3 md:px-4 flex justify-content-end gap-3 align-items-center bg-gray-50">

            <div class="flex justify-content-start align-items-center gap-3">
              <!-- gallery -->
              <VButton v-if="manage!=='media'" icon="photo" @click="manage='media'"/>
              <Divider v-if="(manage!=='media' && manage!=='files')"
                       class="h-2rem border-left-1 border-gray-200" layout="vertical" unstyled/>
              <!-- files -->
              <VButton v-if="manage!=='files'" icon="folder" @click="manage='files'"/>
            </div>

            <!-- update media -->
            <VButtonCube v-if="['media', 'files'].includes(manage)"
                         text="update" icon="check_circle" fill="1" @click="updateMedia()"/>
          </div>
          <!-- /footer -->


        </div>
        <!-- /manage -->

      </div>
      <!-- /right col -->

    </div>
    <!-- /content -->

  </div>
</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
import {FilterMatchMode} from '@primevue/core/api';

export default defineComponent({
  name: "Content",

  data() {
    return {
      //table filters.
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      },

      //manage.
      manage       : null,
      media        : null,
      delete_media : {},
      edit_relative: false,

      //menu.
      menu: [

        //ORDERS.
        {
          name       : "orders",
          description: "Client global orders",
          icon       : "shopping_cart",
          total      : 0,
          annual     : [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

          categories: ['products'],

          //struct.
          props: [
            //key props.
            {
              name   : "id",
              prefix : "#",
              key    : 1,
              header : "order number", //timestamp.
              no_edit: 1,
            },

            {
              name: "date",
              key : 1,
              date: 1
            },

            {
              name   : "documentId",
              no_edit: 1,
              no_tbl : 1,
              no_info: 1,
            },

            {
              name  : "description",
              key   : 1,
              no_tbl: 1
            },

            {
              name   : "amount",
              key    : 1,
              decimal: 1
            },

            //other props.
            {
              name: "status",
              enum: ['delivered', 'shipped', 'processing', 'cancelled', 'approved', 'returned'],
            },

            {
              name  : "payment",
              enum  : ['Cash', 'PayPal', 'Credit', 'M-PESA'],
              header: "payment mode"
            },

            {
              name  : "customer",
              key   : 1,
              select: "customers",
              rel   : "name",
              prefix: "cust-"
            },
          ],

          //metrics.
          metrics: [
            {
              name : "approved",
              value: 0,
              icon : "beenhere"
            },
            {
              name : "processing",
              value: 0,
              icon : "info"
            },
            {
              name : "cancelled",
              value: 0,
              icon : "block"
            },
          ],

          //status.
          status: [
            {
              name : "shipped",
              value: 0,
              icon : "local_shipping"
            },
            {
              name : "delivered",
              value: 0,
              icon : "check_box"
            },
            {
              name : "returned",
              value: 0,
              icon : "assignment_return"
            },
          ],

          //metrics_1.
          metrics_1: {
            aov       : 0,
            conversion: 0
          },

          //data.
          data: [
            {
              id        : "001",
              amount    : 315.75,
              customer  : "001",
              date      : new Date('Wed Feb 04 2026 00:00:00 GMT+0300 (East Africa Time)'),
              documentId: "ord-001",
              files     : [],
              images    : [],
              order_no  : "ORD-001",
              products  : {
                "p-001": {
                  quantity   : 20,
                  price      : 600,
                  description: "To be delivered to abc street.",
                  total      : 0
                }
              },
              status    : "approved",
              state     : "delivered",
            },
            {
              id        : "002",
              amount    : 189.50,
              customer  : "002",
              date      : new Date('Mon Jun 08 2025 00:00:00 GMT+0300 (East Africa Time)'),
              documentId: "ord-002",
              files     : [],
              images    : [],
              order_no  : "ORD-002",
              products  : {
                "p-002": {
                  quantity   : 10,
                  price      : 400,
                  description: null,
                  total      : 0
                }
              },
              status    : "processing",
              state     : "shipped",
            }
          ]
        },


        //PRODUCTS.
        {
          name  : "products",
          icon  : "grid_view",
          total : 0,
          annual: [100, 325, 300, 620, 540, 325, 702, 620, 540, 325, 702, 620],

          //struct.
          props: [
            //key props.
            {
              name: "name",
              key : 1,
            },

            {
              name: "sku",
              key : 1,
            },

            {
              name  : "description",
              key   : 1,
              no_tbl: 1
            },


            {
              name   : "price",
              decimal: 1,
            },


            {
              name   : "cost",
              key    : 1,
              decimal: 1
            },


            {
              name   : "amount",
              hidden : 1,
              no_edit: 1
            },

            {
              name   : "weight",
              no_tbl : 1,
              suffix : "(grams)",
              decimal: 1
            },

            {
              name  : "dimensions",
              no_tbl: 1,
              suffix: "(cm)"
            },

            {
              name   : "discount",
              no_tbl : 1,
              decimal: 1,
              suffix : "(%)"
            },
          ],

          //metrics
          metrics: [
            {
              name : "in stock",
              value: 0,
              icon : "beenhere"
            },
            {
              name : "low stock",
              value: 0,
              icon : "report"
            },
            {
              name : "out of stock",
              value: 0,
              icon : "report_problem"
            },
          ],

          //status
          status: [
            {
              name : "approved",
              value: 0,
              icon : "check"
            },
            {
              name : "processing",
              value: 0,
              icon : "report"
            },
            {
              name : "suspended",
              value: 0,
              icon : "lock"
            },
          ],

          //metrics_1.
          metrics_1: {
            "avg price": 0,
            "avg cost" : 0
          },

          //items.
          data: []
        },


        {
          name    : "intakes",
          icon    : "box_add",
          quantity: 0,
          total   : 18750.80,

          //struct.
          props: [
            {name: "description", header: "details"},
            {extra: 1, header: "supplier", label: "name", name: "suppliers", select: "suppliers"},
            {key: 1, extra: 1, name: "po_number", header: "purchase number"},
          ],

          //status | state.
          status: {approved: 0, pending: 0, cancelled: 0},
          state : {shipped: 0, delivered: 0, returned: 0},

          //analysis.
          props_r1: {"avg cost": 0, "error rate": 0},
          // props_r2: {"top supplier": "Vendor-X", backorders: 7},

          //items.
          data  : [
            {
              categories: {},
              cost      : 2450.75,
              documentId: "In-001",
              files     : [],
              images    : [],
              po_number : "PO-3021",

              products: {
                "p-001": {
                  cost    : 300,
                  details : null,
                  price   : 600,
                  quantity: 100,
                  total   : 0
                },
                "p-002": {
                  cost    : 450,
                  details : null,
                  price   : 600,
                  quantity: 200,
                  total   : 0
                },
              },

              status  : "pending",
              state   : "shipped",
              supplier: null
            },
            {
              categories: {},
              cost      : 1899.99,
              documentId: "In-002",
              files     : [],
              images    : [],

              products: {
                "p-003": {
                  cost    : 245,
                  details : null,
                  price   : 600,
                  quantity: 100,
                  total   : 0
                },
                "p-004": {
                  cost    : 700,
                  details : null,
                  price   : 900,
                  quantity: 200,
                  total   : 0
                },
              },

              po_number: "PO-3020",
              status   : "approved",
              state    : "delivered",
              supplier : null
            }
          ],
          parent: "products"
        },


        //CUSTOMERS.
        {
          name  : "customers",
          icon  : "group",
          total : 0,
          annual: [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

          //struct.
          props: [
            {
              name: "name",
              key : 1
            },

            {
              name  : "description",
              key   : 1,
              no_tbl: 1
            },

            {
              name   : "orders",
              decimal: 1,
              no_edit: 1
            },

            {
              name: "status",
              key : 1,
              enum: ["active", "banned", "review"]
            },
          ],

          //metrics.
          metrics: [
            {
              name : "active",
              value: 0,
              icon : "check"
            },
            {
              name : "review",
              value: 0,
              icon : "info"
            },
            {
              name : "banned",
              value: 0,
              icon : "block"
            },
          ],

          //status.
          status: [
            {
              name : "retailers",
              value: 0,
              icon : "group"
            },
            {
              name : "wholesalers",
              value: 0,
              icon : "home_work"
            },
            {
              name : "institution",
              value: 0,
              icon : "corporate_fare"
            },
          ],

          //analysis.
          metrics_1: {local: 0, foreign: 0},

          //data.
          data: [
            {
              name       : "Kevin Kamara",
              id         : "001",
              description: "https://linkedin.com/in/kwkamara",
              status     : "active"
            }
          ]
        },


        //SUPPLIERS
        {
          name    : "suppliers",
          icon    : "group_add",
          quantity: 0,
          total   : 0,
          annual  : [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

          //struct.
          props: [
            {
              name: "name",
              key : 1
            },

            {
              name  : "description",
              key   : 1,
              no_tbl: 1
            },

            {
              name  : "rating",
              rating: 1,
              no_tbl: 1,
              number: 1
            },
          ],

          //metrics.
          metrics: [
            {
              name : "active",
              value: 0,
              icon : "check"
            },
            {
              name : "review",
              value: 0,
              icon : "info"
            },
            {
              name : "banned",
              value: 0,
              icon : "block"
            },
          ],

          //status.
          status: [
            {
              name : "artisans",
              value: 0,
              icon : "group"
            },
            {
              name : "distributors",
              value: 0,
              icon : "warehouse"
            },
            {
              name : "manufacturers",
              value: 0,
              icon : "factory"
            },
          ],

          //metrics 1.
          metrics_1: {
            "avg rating": 4.6,
            "lead time" : 3.8
          },

          //items.
          data: [
            {
              name       : "Nairobi Fiber",
              description: "",
              categories : {},
              documentId : "S-001",
              files      : [],
              images     : [],
              rating     : 5,
              status     : "active",
              state      : "distributors",
            },

            {
              name       : "Top Cloth",
              description: "",
              categories : {},
              documentId : "S-002",
              files      : [],
              images     : [],
              rating     : 3,
              status     : "review",
              state      : "distributors",
            },

            {
              name       : "Zippers",
              description: "",
              categories : {},
              documentId : "S-004",
              files      : [],
              images     : [],
              rating     : 2,
              status     : "review",
              state      : "distributors",
            },
          ]
        },


        {
          name    : "discounts",
          icon    : "money_off",
          quantity: 23,
          total   : 4500.25,

          props: [
            {name: "description"},

            {key: 1, extra: 1, name: "code"},
            {key: 1, extra: 1, name: "value", header: "value (%)"},

            {date: 1, extra: 1, header: "start date", name: "start"},
            {date: 1, extra: 1, header: "end date", name: "end"},
          ],

          //status | state.
          status: {active: 18, expired: 5, review: 7},
          state : {percentage: 15, fixed: 8, bundles: 3},

          //analysis.
          props_r1: {"avg discount": 19.5, savings: 4500.25},
          props_r2: {"most used": "SUMMER25", redemption: 68.4},

          //items.
          items: [
            {
              documentId: "d-001", code: "SUMMER25",
              status    : "active", type: "Percentage", value: "25%", uses: 142, start: "2025-04-01", images: [], categories: {}, files: []
            },
            {documentId: "d-002", code: "FREESHIP", status: "suspended", type: "Fixed", value: "Free Shipping", uses: 89, start: "2025-04-07", images: [], categories: {}, files: []},
            {documentId: "d-003", code: "WINTER25", status: "expired", type: "Percentage", value: "10%", uses: 89, start: "2025-04-14", images: [], categories: {}, files: []},
            {documentId: "d-004", code: "FREESHIP", status: "expired", type: "Fixed", value: "Free Shipping", uses: 89, start: "2025-04-21", images: [], categories: {}, files: []},
          ],

          //parent category.
          parent: "products"
        },


        {
          name  : "report",
          icon  : "pi pi-file",
          parent: "products"
        },
      ],


      //chart options.
      chartOptions: {
        animation          : {
          animateScale : true,
          animateRotate: true
        },
        responsive         : true,
        maintainAspectRatio: false,
        scales             : {
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            grid : {
              display: true,
            },
            ticks: {
              stepSize: 40
            },
          }
        },

      },

      //annual chart labels.
      months: ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

      //dates.
      startDate: new Date().toLocaleDateString('en-GB'),
      endDate  : new Date().toLocaleDateString('en-GB'),

      //chart | table.
      displayChart: true,
      right_col   : "gallery",

      //active.
      category  : null,
      item      : null,
      attachment: null
    }
  },

  computed: {
    //key props.
    key_props() {
      if (!this.category) return [];
      return this.category.props.filter(prop => prop.key);
    },


    //sidebar active.
    is_sidebar() {
      return useState('sidebar').value;
    },


    //category name.
    category_name() {
      return this.category ? this.category.name : '-';
    },


    //char data.
    chartData() {
      return {
        labels  : this.months,
        datasets: [
          {
            label          : this.category.name,
            data           : this.category.annual,
            backgroundColor: [
              'rgba(249, 115, 22, 0.6)',   // Vibrant Orange
              'rgba(6, 182, 212, 0.6)',     // Cyan
              'rgba(107, 114, 128, 0.6)',   // Cool Gray
              'rgba(139, 92, 246, 0.6)',    // Soft Purple
              'rgba(16, 185, 129, 0.6)',    // Emerald Green
              'rgba(244, 63, 94, 0.6)',     // Pink-Red
              'rgba(234, 179, 8, 0.6)',     // Gold
              'rgba(59, 130, 246, 0.6)',    // Blue
              'rgba(20, 184, 166, 0.6)',    // Teal
              'rgba(217, 70, 239, 0.6)',    // Fuchsia
              'rgba(5, 150, 105, 0.6)',     // Dark Green
              'rgba(220, 38, 38, 0.6)'      // Crimson
            ],
            borderRadius   : 20
          }
        ]
      }
    },


    //category table columns.
    tbl_columns() {
      if (!this.category) return [];
      return this.category.props.filter(prop => !prop.no_tbl);
    },


    //system products.
    products() {
      return useState('products').value;
    }
  },

  methods: {
    //notifications.
    notify(info) {
      //show popup.
      this.$toast.add({
        severity: "info",
        summary : info,
        life    : 1500
      });
    },


    //UI.
    manageToggle() {
      if (this.manage) {
        this.manage = null;
        this.item   = null;
      } else this.manage = 'items';
    },


    //CATEGORY.
    //view category.
    viewCategory(category) {
      //set active.
      this.category = category;

      this.manage = null;

      //load products.
      if (category.name === 'products') this.loadProducts();

      //process category.
      this.processCategory();

      //load init item.
      // this.manage = "media";
      // this.item = this.category.data[0];
    },

    //get category.
    getCategoryByName(cat_name) {
      return this.menu.find(cat => cat.name === cat_name);
    },


    //processCategory
    processCategory() {
      //analyse metrics.
      this.category.metrics.forEach(metric => metric.value = this.category.data.filter(item => item.status === metric.name).length);

      //analyse status.
      this.category.status.forEach(metric => metric.value = this.category.data.filter(item => item.status === metric.name).length);
    },


    // ITEM
    newItemInit() {

      if (this.category.name === 'products') {
        this.item = {
          name       : {en: null},
          description: {en: null},
        }
      }

      //edit mode.
      this.manage = 'edit'
    },

    viewItem(item) {
      this.item         = item;
      this.manage       = "info";
      this.delete_media = {};
    },

    editItem(item) {
      this.item   = item;
      this.manage = "edit";
    },

    pushItem(item) {
      //new item.
      if (!item.id) {

        //item ID init.
        item.id         = new Date().getTime();
        item.documentId = new Date().getTime();

        //add item.
        this.category.data.push(item);

        //set active.
        this.item = item;

        //switch UI.
        this.manage = 'info';

        //return.
        return;
      }

      //switch mode.
      this.manage = 'info';

      //process category.
      this.processCategory();
    },

    loadProducts() {
      if (this.category.name === 'products') {
        this.category.data = useState('products').value;
      }
    },

    //media update.
    updateMedia() {
      //update media object.
      this.delete_media = {};

      //notify popup.
      this.$toast.add({
        severity: "info",
        summary : "media updated",
        life    : 1000
      });
    },

    //ANALYSIS.
    //orders.
    analyseOrders() {
      //active category.
      let cat = useState('category').value;

      //data reset.
      cat.status = {
        approved: 0, processing: 0, cancelled: 0
      };
      cat.state  = {
        shipped: 0, delivered: 0, returned: 0
      };

      //total.
      cat.total = 0;

      //items.
      let items        = 0;
      const item_count = cat.items.length;

      //process items.
      cat.items.forEach(item => {
        //update status.
        cat.status[item.status]++;
        cat.state[item.state]++;

        //total.
        cat.total += item.amount;
        items += Object.entries(item.products).length;
      });

      //aov | items per order.
      if (item_count) cat.props_r1.aov = (cat.total / item_count).toFixed(2);
      if (items) cat.props_r1["items per order"] = (items / item_count).toFixed(2);

      //conversion rate | return rate.
      cat.props_r2['return rate'] = cat.state.returned ? (cat.state.returned / item_count).toFixed(2) : 0;
      cat.props_r2['error rate']  = cat.status.cancelled ? (cat.status.cancelled / item_count).toFixed(2) : 0;
    },

    //products.
    analyseProducts() {
      //active category.
      let cat = useState('category').value;

      //data reset.
      cat.status = {
        approved: 0, processing: 0, cancelled: 0
      };
      cat.state  = {
        "low stock": 0, "out of stock": 0, "in stock": 0
      };

      //total.
      cat.total = 0;
      cat.cost  = 0;
      cat.price = 0;

      //items.
      let items        = 0;
      const item_count = cat.items.length;
      const intakes    = this.getCategoryByName('intakes').items;
      const orders     = this.getCategoryByName('orders').items;

      //process items.
      cat.items.forEach(product => {

        //stock analysis.
        product.amount = 0;

        //intakes.
        const productIntakes = intakes.filter(intake => intake.products[product.documentId]);
        productIntakes.forEach(intake => product.amount += intake.products[product.documentId].quantity);

        //orders.
        const productOrders = orders.filter(order => order.products[product.documentId]);
        productOrders.forEach(order => product.amount -= order.products[product.documentId].quantity);

        //stock state.
        if (product.amount === 0) product.state = "out of stock";
        else if (product.amount < 20) product.state = "low stock";
        else product.state = "in stock";

        //total.
        cat.total += product.amount;
        cat.cost += product.cost;
        cat.price += product.price;

        //update status.
        cat.status[product.status]++;
        cat.state[product.state]++;

      });

      //aov | items per order.
      if (item_count) cat.props_r1['avg price'] = (cat.price / item_count).toFixed(2);
      if (item_count) cat.props_r1['avg cost'] = (cat.cost / item_count).toFixed(2);

      //conversion rate | return rate.
      //cat.props_r2['return rate']     = cat.state.returned ? (cat.state.returned / item_count).toFixed(2) : 0;
      //cat.props_r2['conversion rate'] = cat.status.approved ? (cat.status.approved / item_count).toFixed(2) : 0;
    },

    //intakes.
    analyseIntakes() {
      //active category.
      let cat = useState('category').value;

      //data reset.
      cat.status = {
        approved: 0, pending: 0, cancelled: 0
      };
      cat.state  = {
        shipped: 0, delivered: 0, returned: 0
      };

      //total.
      cat.total = 0;

      //items.
      let items        = 0;
      const item_count = cat.items.length;

      //process items.
      cat.items.forEach(item => {
        //update status.
        cat.status[item.status]++;
        cat.state[item.state]++;

        //total.
        cat.total += item.cost;
        items += Object.entries(item.products).length;
      });


      //avg cost | items per intake.
      if (item_count) cat.props_r1['avg cost'] = (cat.total / item_count).toFixed(2);
      cat.props_r1['error rate'] = cat.status.cancelled ? (cat.status.cancelled / item_count).toFixed(2) : 0;


      //conversion rate | return rate.
      // cat.props_r2['return rate'] = cat.state.returned ? (cat.state.returned / item_count).toFixed(2) : 0;
      // cat.props_r2['error rate']  = cat.status.cancelled ? (cat.status.cancelled / item_count).toFixed(2) : 0;
    },

  },

  beforeMount() {
    //load first category.
    this.viewCategory(this.menu[0]);
  }
})
</script>

