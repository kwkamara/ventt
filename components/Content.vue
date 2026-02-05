<template>
  <div class="col-12 p-0 flex text-gray-700">

    <!-- menu -->
    <div v-if="is_sidebar"
         @click="useState('item').value=null;"
         class="w-3 md:w-2 lg:w-1 py-5 px-2 bg-white border-right-1 border-gray-200 flex flex-column align-items-center gap-5">

      <Button v-for="cat in menu.filter(m => !m.parent)"
              @click="viewCategory(cat)"
              :class="( category_name === cat.name ? 'bg-purple-700 text-white' : 'text-purple-700 bg-white') +
              ' w-5rem h-4rem border-none shadow-1 hover:text-white hover:bg-purple-800 hover:shadow-3 flex align-items-center justify-content-center'">
        <div class="text-center">
          <span class="material-icons-outlined">{{ cat.icon }}</span>
          <div class="text-xs capitalize">{{ cat.name }}</div>
        </div>
      </Button>

    </div>
    <!-- menu -->


    <!-- content -->
    <div :class="(is_sidebar ? 'w-9 lg:w-11' : 'w-full') + ' grid m-0 px-2 lg:px-5 py-4 select-none'">

      <!-- left col -->
      <div class="col-12 lg:col-7 md:pl-0 flex flex-column gap-3">

        <!-- title bar -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl">

          <!-- category name | category total | dates -->
          <div class="pb-4 md:flex justify-content-between">
            <!-- category name | category total -->
            <div class="lg:w-6 text-2xl capitalize">
              <div>{{ category.name }}</div>
              <span>{{ category.data.length }}</span>
            </div>
            <!-- category name | category total -->

            <Divider layout="vertical" unstyled class="hidden md:block h-3rem pr-3 border-left-1 border-gray-200"/>

            <!-- dates -->
            <div class="flex gap-3 justify-content-end text-sm text-gray-700">
              <!-- start -->
              <div>
                <DatePicker id="start-date"
                            date-format="dd/mm/yy"
                            v-model="startDate"
                            class="lg:w-10rem md:pl-3 mb-1 border-1 border-gray-300 border-round-3xl" fluid/>
                <label for="start-date">start</label>
              </div>
              <!-- /start -->

              <!-- end -->
              <div class="text-right">
                <DatePicker id="end-date"
                            date-format="dd/mm/yy"
                            v-model="endDate"
                            class="lg:w-10rem pl-3 mb-1 border-1 border-gray-300 border-round-3xl" fluid/>
                <label for="end-date">end</label>
              </div>
              <!-- /end -->
            </div>
            <!-- /dates -->
          </div>
          <!-- /category name | category total | dates -->


          <!-- report | manage -->
          <Divider unstyled class="pt-3 border-top-1 border-gray-200"/>
          <div class="lg:pt-2 flex justify-content-between align-items-center justify-content-end gap-3">
            <VButtonCube text="report" icon="article" class="w-8rem border-round-3xl"/>
            <VButtonCube text="manage"
                         icon="settings"
                         class="w-8rem border-round-3xl"
                         @click="manage ? manage = null : manage='items'"/>
          </div>
          <!-- /report | manage -->

        </div>
        <!-- /title bar -->


        <!-- metrics -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between">
          <div v-for="metric in category.metrics" class="w-4">
            <h2 class="m-0 font-light">{{ metric.value }}</h2>

            <div class="capitalize flex align-items-center gap-1 text-sm">
              <Icon :icon="metric.icon" class=""/>
              <span class="">{{ metric.name }}</span>
            </div>

          </div>
        </div>
        <!-- /metrics -->


        <!-- status -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between">
          <div v-for="status in category.status" class="w-4">
            <h2 class="m-0 font-light">{{ status.value }}</h2>

            <div class="capitalize flex align-items-center gap-1 text-sm">
              <Icon :icon="status.icon" class=""/>
              <span class="">{{ status.name }}</span>
            </div>

          </div>
        </div>
        <!-- /status -->


      </div>
      <!-- /left col -->


      <!-- right col -->
      <div class="col-12 lg:col-5 flex flex-column gap-3">

        <!-- chart -->
        <div v-if="!manage"
             class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between">
          <ClientOnly>
            <Chart type="bar"
                   :data="chartData"
                   :options="chartOptions"
                   class="lg:h-12rem w-full"/>
          </ClientOnly>
        </div>
        <!-- /chart -->


        <!-- recent -->
        <div v-if="!manage && category.data" class="pt-3 shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden">

          <!-- header -->
          <div class="px-3 md:px-4 pb-3 flex gap-2 align-items-center justify-content-between border-bottom-1 border-gray-300">

            <div class="flex gap-1 align-items-center">
              <span class="material-icons-outlined">access_time</span>
              <h3 class="m-0 font-light">Recent {{ category.name }}</h3>
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
                  {{ prop.prefix }}
                  {{ prop.decimal ? formatDecimal(data[prop.name]) : data[prop.name] }}
                  {{ prop.suffix }}
                </div>
              </template>
            </Column>
            <!-- columns -->

          </DataTable>

        </div>
        <!-- /recent -->


        <!-- manage -->
        <div v-if="manage" class="pt-3 shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden">

          <!-- search -->
          <template v-if="manage==='items'">
            <div class="pb-4 pt-2 px-3 md:px-4 flex justify-content-between align-items-center gap-2">
              <InputText v-model="filters['global'].value"
                         class="h-3rem text-gray-700 border-1 border-gray-200 border-round-3xl"
                         placeholder="Search"/>
              <VButtonCube text="new" icon="add" fill="1" @click="manage='edit'"/>
            </div>

            <Divider unstyled class="border-bottom-1 border-gray-300"/>
          </template>
          <!-- /search -->


          <!-- items -->
          <DataTable v-if="manage==='items' && !item"
                     v-model:filters="filters"
                     :globalFilterFields="['name', 'id', 'description', 'customer']"
                     filterDisplay="row"
                     :rows="5"
                     :show-headers="false"
                     :value="category.data"
                     data-key="documentId" paginator row-hover
                     table-class="text-xs animation-duration-500 fadein">

            <!-- columns -->
            <Column v-for="(prop, ix) in tbl_columns" :field="prop.name">
              <template #body="{data}">
                <div class="py-2 pl-3 white-space-nowrap" @click="manage='info'; item=data">
                  {{ prop.prefix }}
                  {{ prop.decimal ? formatDecimal(data[prop.name]) : data[prop.name] }}
                  {{ prop.suffix }}
                </div>
              </template>
            </Column>
            <!-- /columns -->

            <!-- edit -->
            <Column claass="4rem">
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
          <div v-if="manage !=='items'" class="p-3 pt-0 pb-2 flex justify-content-between align-items-center">

            <!-- category name | item id -->
            <div class="m-0 lg:pl-2 font-light text-xl capitalize flex gap-1 align-items-center">
              <span>{{ category.name }} </span>
              <Icon icon="chevron_right"/>
              <span>{{ item ? (item.name || item.id) : 'New Item' }}</span>
            </div>
            <!-- /category name | item id -->

            <!-- controls -->
            <div class="flex align-items-center gap-3">

              <template v-if="item">
                <VButton v-if="manage!=='edit'" icon="edit" @click="manage='edit';"/>
                <VButton v-if="manage!=='info'" icon="info" @click="manage='info';"/>
                <Divider unstyled layout="vertical" class="h-2rem border-left-1 border-gray-200"/>
              </template>

              <VButton icon="close" @click="manage='items'; item=null"/>
            </div>
            <!-- /controls -->

          </div>
          <!-- header -->


          <Divider v-if="manage!=='items'"/>


          <!-- details grid -->
          <div class="grid m-0 px-3 pb-2" v-if="manage==='info' && item">

            <!-- Key props -->
            <div v-for="prop in category.props.filter(p => p.key && item[p.name])" class="col-12 py-3">
              <div>{{ prop.prefix }} {{ item[prop.name] }} {{ prop.suffix }}</div>
              <span class="mt-1 text-xs capitalize text-gray-500">{{ prop.header || prop.name }}</span>
            </div>
            <!-- /Key props -->

            <!-- other props -->
            <div v-for="prop in category.props.filter(p => !p.no_info && !p.key && item[p.name])" class="col-6 py-3">
              <!-- rating -->
              <div v-if="prop.name === 'rating'" class="flex align-items-center">
                <span v-for="rate in Number(item.rating)" class="material-icons text-xl text-yellow-600">star</span>
              </div>

              <div v-else>
                {{ prop.prefix }}
                {{ item[prop.name] }}
                {{ prop.suffix }}
              </div>
              <span class="mt-1 text-xs capitalize">{{ prop.name }}</span>
            </div>
            <!-- /other props -->

          </div>
          <!-- /details grid -->


          <!-- edit -->
          <div v-if="manage==='edit'" class="pt-3">
            <!-- form -->
            <ItemForm :item="item || {}"
                      @update="pushItem($event)"
                      :categories="menu"
                      :category="category"/>
            <!-- /form -->
          </div>
          <!-- /edit -->

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
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      },

      //manage.
      manage: false,

      //menu.
      menu: [

        //ORDERS.
        {
          name       : "orders",
          description: "Client global orders",
          icon       : "shopping_cart",
          total      : 0,

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
              name   : "documentId",
              no_edit: 1,
              no_tbl : 1,
              no_info: 1,
            },

            {
              name  : "description",
              no_tbl: 1,
              key   : 1
            },

            {
              name   : "amount",
              key    : 1,
              decimal: 1
            },

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
              date      : "2023-06-15",
              documentId: "ord-001",
              files     : [],
              images    : [],
              order_no  : "ORD-001",
              products  : {
                "p-001": {
                  quantity: 20,
                  price   : 600,
                  details : null,
                  total   : 0
                }
              },
              status    : "approved",
              state     : "delivered",
            },
            {
              id        : "002",
              amount    : 189.50,
              customer  : "002",
              date      : "2023-06-14",
              documentId: "ord-002",
              files     : [],
              images    : [],
              order_no  : "ORD-002",
              products  : {
                "p-002": {
                  quantity: 10,
                  price   : 600,
                  details : null,
                  total   : 0
                }
              },
              status    : "processing",
              state     : "shipped",
            }
          ]
        },


        //PRODUCTS.
        {
          name : "products",
          icon : "grid_view",
          total: 0,

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
              no_tbl: 1
            },

            {
              name   : "discount",
              no_tbl : 1,
              decimal: 1,
              suffix : "%"
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
          name : "customers",
          icon : "group",
          total: 0,

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


      //chart data.
      chartOptions: {
        animation          : {
          duration: 1000,
          easing  : 'easeOutQuart'
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
        plugins            : {
          legend: false,
        },
      },

      months: ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

      //dates.
      startDate: null,
      endDate  : null,

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


    //chart data.
    chartData() {
      return {
        labels  : this.months,
        datasets: [
          {
            // barThickness   : 50,
            label          : "Orders",
            data           : [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],
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
            // borderColor    : ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            // borderWidth    : 1,
            borderRadius: 20
          }
        ]
      }
    },


    //category key columns.
    key_columns() {
      if (!this.category) return [];
      return this.category.props.filter(prop => prop.key);
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
    //CATEGORY.
    //view category.
    viewCategory(category) {
      //set active.
      this.category = category;

      //manage reset.
      this.manage = null;

      //load products.
      if (category.name === 'products') this.loadProducts();

      //analyse metrics.
      //metrics init.
      this.category.metrics
          .forEach(metric => metric.value = this.category.data
              .filter(item => item.status === metric.name).length);
    },

    //get category.
    getCategoryByName(cat_name) {
      return this.menu.find(cat => cat.name === cat_name);
    },


    // ITEM
    viewItem(item) {
      this.item = item;
      this.manage = "info";
    },

    editItem(item) {
      this.item = item;
      this.manage = "edit";
    },

    pushItem(item) {
      //new item.
      if (!item.id) {

        //item ID init.
        item.id = new Date().getTime();
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
    },

    loadProducts() {
      if (this.category.name === 'products') {
        this.category.data = useState('products').value;
      }
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
      cat.state = {
        shipped: 0, delivered: 0, returned: 0
      };

      //total.
      cat.total = 0;

      //items.
      let items = 0;
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
      cat.props_r2['error rate'] = cat.status.cancelled ? (cat.status.cancelled / item_count).toFixed(2) : 0;
    },

    //products.
    analyseProducts() {
      //active category.
      let cat = useState('category').value;

      //data reset.
      cat.status = {
        approved: 0, processing: 0, cancelled: 0
      };
      cat.state = {
        "low stock": 0, "out of stock": 0, "in stock": 0
      };

      //total.
      cat.total = 0;
      cat.cost = 0;
      cat.price = 0;

      //items.
      let items = 0;
      const item_count = cat.items.length;
      const intakes = this.getCategoryByName('intakes').items;
      const orders = this.getCategoryByName('orders').items;

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
      cat.state = {
        shipped: 0, delivered: 0, returned: 0
      };

      //total.
      cat.total = 0;

      //items.
      let items = 0;
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

