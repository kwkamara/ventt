<template>
  <div class="col-12 p-0 flex text-gray-800 surface-50">

    <!-- menu -->
    <div v-if="sidebar" @click="useState('item').value=null;"
         class="w-3 md:w-2 lg:w-1 py-5 px-2 h-full bg-white border-right-1 border-gray-200 flex flex-column align-items-center gap-5">

      <Button v-for="cat in menu" @click="viewCategory(cat)"
              :class="`${ category_name===cat.name ? 'bg-purple-700 text-white' : 'text-purple-700 bg-white' } w-5rem h-4rem border-none shadow-1 hover:text-white hover:bg-purple-800 hover:shadow-6 cursor-pointer flex align-items-center justify-content-center`">
        <div class="text-center">
          <i :class="cat.icon"/>
          <div class="text-xs capitalize pt-1">{{ cat.name }}</div>
        </div>
      </Button>

    </div>
    <!-- menu -->


    <!-- content -->
    <div :class="`${sidebar ? 'w-9 lg:w-11' : 'w-full'} grid m-0 lg:p-5 select-none`">

      <!-- left col -->
      <div class="col-12 lg:col-8 pt-5 px-3 lg:pt-0 lg:pl-0 flex flex-column gap-3">

        <!-- summary -->
        <div class="flex flex-column md:flex-row gap-3 text-sm">

          <HeaderPanel title="status" :data="category.status"/>

          <HeaderPanel title="state" :data="category.state"/>

        </div>
        <!-- /summary -->

        <!-- chart | table | item -->
        <div class="w-full lg:h-fit overflow-hidden bg-white border-1 border-gray-200 border-round-top overflow-hidden">

          <!-- header -->
          <div class="h-3rem pl-2 flex align-items-center justify-content-between border-bottom-1 border-gray-200 bg-purple-700">

            <!-- item table toggle -->
            <Button :label="category_name" class="text-white text-sm font-light capitalize bg-transparent hover:text-yellow-600" text @click="useState('item').value=null"/>


            <div class="flex gap-4 pr-3">
              <template v-if="!item">
                <!-- set dates -->
                <Button class="text-white bg-transparent hover:text-yellow-600" icon="pi pi-calendar text-lg" text @click="$refs.datePickerPop.toggle($event)"/>
                <Popover ref="datePickerPop">
                  <div class="w-20rem p-4 flex flex-column gap-3 text-purple-600">

                    <!-- start date -->
                    <div>
                      <div class="text-xs pb-1">start</div>
                      <DatePicker v-model="startDate" date-format="dd-mm-yy" fluid show-time/>
                    </div>

                    <!-- end date -->
                    <div>
                      <div class="text-xs pb-1">end</div>
                      <DatePicker v-model="endDate" date-format="dd-mm-yy" fluid show-time/>
                    </div>

                    <!-- submit -->
                    <div class="h-4rem flex align-items-center">
                      <Button icon="pi pi-check" label="submit" class="w-full" @click="$refs.datePickerPop.hide()"/>
                    </div>

                  </div>
                </Popover>

                <!-- chart | table toggle -->
                <Button class="text-white bg-transparent hover:text-yellow-600" icon="pi pi-chart-line text-lg" text @click="displayChart=!displayChart"/>

                <!-- new -->
                <Button class="text-white bg-transparent hover:text-yellow-600" icon="pi pi-plus text-lg" text @click="newItemInit"/>
              </template>

              <template v-else>

              </template>
            </div>

          </div>
          <!-- /header -->

          <!-- chart | table | item -->
          <div>
            <!-- chart -->
            <div v-if="displayChart" class="px-4 py-4 lg:pt-5 fadein animation-duration-400">
              <Chart type="bar" :data="chartData" :options="chartOptions" class="lg:h-18rem"/>
            </div>
            <!-- /chart -->

            <!-- items -->
            <DataTable v-else-if="!item" :rows="8" :show-headers="false" :value="category.items"
                       data-key="documentId" paginator row-hover table-class="text-xs animation-duration-500 fadein">

              <Column :field="key_props[0]">
                <template #body="{data}">

                  <div class="w-full h-2rem pl-2 flex align-items-center justify-content-between">

                    <div class="w-full flex align-items-center gap-3 w-full">
                      <div v-for="column in key_columns" :class="`w-4 lg:w-2 ${ column.decimal ? 'decimal': ''}`">
                        {{ column.decimal ? formatDecimal(data[column.name]) : data[column.name] }}
                      </div>
                    </div>

                    <!-- edit -->
                    <div class="w-1 pr-3 text-right">
                      <Button class="bg-transparent text-gray-300 hover:text-yellow-600 lg:justify-content-end"
                              icon="pi pi-pencil" text @click="viewItem(data)"/>
                    </div>

                  </div>

                </template>
              </Column>

            </DataTable>
            <!-- /items -->

            <!-- item -->
            <div v-else class="p-4 flex flex-column gap-4 text-sm animation-duration-500 fadein">
              <ItemForm @update="updateItem()"/>
            </div>
            <!-- /item -->
          </div>
          <!-- /chart | table | item -->

        </div>
        <!-- /chart | table | item -->

      </div>
      <!-- /left col -->


      <!-- right col -->
      <div class="col-12 lg:col-4 lg:pt-0 px-3 flex flex-column">

        <!-- props_r1 | props_r2 | RecentPanel -->
        <div v-if="!item" class="flex flex-column gap-3 fadein animation-duration-400">

          <!-- props_r1 -->
          <div class="w-full text-white flex gap-3">
            <DataBoxSingle v-for="(value, prop, ix) in category.props_r1" :key="ix"
                           :right="ix===1" :subtitle="prop" :title="formatDecimal(value)"/>
          </div>
          <!-- /props_r1 -->

          <!-- props_r2 | RecentPanel -->
          <div class="h-full w-full text-white flex flex-column gap-3">
            <DataBoxTwin v-if="category.props_r2" :data="category.props_r2"/>

            <RecentPanel :items="category.items.slice(0,4)"
                         :props="category.props.filter(prop => prop.key).slice(0,3)"
                         :title="`recent ${category_name}`"/>
          </div>
          <!-- /props_r2 | RecentPanel -->

        </div>
        <!-- props_r1 | props_r2 | RecentPanel -->


        <!-- item gallery | properties | files -->
        <div class="fadein animation-duration-400" v-if="item">

          <!-- header -->
          <div class="h-3rem flex align-items-center cursor-pointer justify-content-between border-bottom-1 border-gray-200 text-white text-sm capitalize border-round-top overflow-hidden">
            <Button :class="`h-full w-full pl-4 border-noround-right border-noround-bottom font-light text-sm ${right_col==='gallery'? 'bg-purple-700 text-white':'bg-gray-200 text-gray-600'}`"
                    :disabled="!item.documentId" label="Gallery" text @click="right_col='gallery'"/>

            <Button :class="`h-full w-full pl-4 border-noround font-light text-sm ${right_col==='properties'? 'bg-purple-700 text-white':'bg-gray-300 text-gray-600'}`"
                    label="Properties" text @click="right_col='properties'"/>

            <Button :class="`h-full w-full pl-4 border-noround-left border-noround-bottom font-light text-sm ${right_col==='files'? 'bg-purple-700 text-white':'bg-gray-200 text-gray-600'}`"
                    :disabled="!item.documentId" label="Files" text @click="right_col='files'"/>
          </div>
          <!-- /header -->


          <!-- gallery -->
          <template v-if="right_col==='gallery'">
            <div v-for="ix in [0,1,2]" class="h-8rem p-3 my-1 bg-white border-1 border-gray-200 border-round hover:shadow-1 flex justify-content-between align-items-end fadein animation-duration-400">
              <img :src="item.images[ix] ? item.images[ix].url : '/missing.webp'"
                   class="w-4 h-full border-round shadow-1" :alt="item.name"/>

              <div class="text-xs w-4 flex align-items-center">
                <Button v-if="item.images[ix]" class="text-gray-500 hover:text-red-500 bg-transparent" icon="pi pi-trash" text @click="$refs.delImagePopover.toggle($event)"/>
                <FileUpload v-else :disabled="!item.documentId" choose-icon="pi pi-image" choose-label="update" class="h-2rem text-xs w-8rem" :max-file-size="1000000" accept=".jpg, .webp"
                            mode="basic"/>
              </div>
            </div>
          </template>
          <!-- /gallery -->


          <!-- properties -->
          <div v-else-if="right_col==='properties'" class="border-1 border-gray-200 bg-white fadein animation-duration-400">

            <div class="h-4rem pl-4 flex align-items-center">{{ item.name || 'New Item' }}</div>

            <!-- categories -->
            <div v-if="category_name==='products'"
                 class="py-5 p-4 lg:pl-2 lg:pr-2 flex justify-content-between align-items-center text-xs">

              <!-- men | women | kids -->
              <div class="md:px-3 flex flex-column gap-5">
                <div v-for="cat in ['men', 'women', 'kids', 'girls', 'boys']" class="w-full flex align-items-end gap-2">
                  <Checkbox v-model="useState('item').value.categories[cat]" binary class="m-0"/>
                  <span class="capitalize">{{ cat }}</span>
                </div>
              </div>
              <!-- /men | women | kids -->


              <!-- official | casual | accessories -->
              <div class="lg:px-4 flex flex-column align-items-end gap-5">
                <div v-for="cat in ['official', 'casual', 'accessories', 'shoes', 'hats']" class="w-full flex align-items-end justify-content-end gap-2">
                  <span class="capitalize">{{ cat }}</span>
                  <Checkbox class="m-0" v-model="useState('item').value.categories[cat]" binary/>
                </div>
              </div>
              <!-- /official | casual | accessories -->

            </div>
            <!-- /categories -->

            <!-- statuses -->
            <div class="fadein animation-duration-400">

              <!-- status | priority -->
              <div class="py-5 p-4 lg:pl-2 lg:pr-2 flex justify-content-between align-items-center bg-white border-top-1 border-gray-200 text-xs">

                <!-- status -->
                <div class="md:px-3 flex flex-column gap-5">
                  <div v-for="(val, prop) in category.status" class="w-full flex align-items-center gap-2">
                    <RadioButton v-model="useState('item').value.status" :value="prop" class="m-0" name="status"/>
                    <span class="capitalize">{{ prop }}</span>
                  </div>
                </div>
                <!-- /status -->

                <!-- priority -->
                <div class="lg:px-4 flex flex-column align-items-end gap-5">
                  <div v-for="(val, prop) in category.state"
                       class="w-full flex align-items-center justify-content-end gap-2">
                    <span class="capitalize">{{ prop }}</span>
                    <RadioButton class="m-0" v-model="useState('item').value.state" name="state" :value="prop"/>
                  </div>
                </div>
                <!-- /priority -->

              </div>
              <!-- status | priority -->

            </div>
            <!-- /statuses -->

          </div>
          <!-- /properties -->


          <!-- files -->
          <template v-if="right_col==='files'">

            <!-- new file -->
            <div class="p-4 flex flex-column align-items-start gap-3 bg-black-alpha-10">

              <FileUpload :disabled="!item.documentId"
                          accept=".doc, .docx., .pdf, .txt, .png, .jpg, .webp" choose-icon="pi pi-file" choose-label="File"
                          class="h-2rem text-xs w-8rem bg-purple-700 text-white border-none" max-file-size="1000000" mode="basic"/>

              <div class="flex flex-column gap-3 w-full">
                <div>
                  <label for="filename-ip" class="text-xs">file details</label>
                  <InputText id="filename-ip" class="pt-1" fluid/>
                </div>
                <Button class="bg-purple-700 text-white text-sm border-none" label="upload"/>
              </div>

            </div>
            <!-- /new file -->


            <div v-for="ix in [0,1,2]"
                 class="h-3rem pl-4 pr-2 my-2 bg-white capitalize border-1 border-gray-200 border-round hover:shadow-1 flex justify-content-between align-items-center fadein animation-duration-400">

              <div class="flex align-items-center gap-3">
                <i class="pi pi-paperclip text-lg"/>
                <span class="text-sm">Attachment name</span>
              </div>


              <div class="text-xs w-4 flex align-items-center justify-content-end gap-4">
                <Button class="text-gray-500 hover:text-yellow-600 bg-transparent" icon="pi pi-info-circle" text
                        @click="$refs.attachmentInfoPopover.toggle($event)"/>

                <Button class="text-gray-500 hover:text-red-500 bg-transparent" icon="pi pi-trash" text
                        @click="$refs.delImagePopover.toggle($event)"/>
              </div>

            </div>

          </template>
          <!-- /files -->


          <!-- delete image -->
          <Popover ref="delImagePopover">
            <div class="w-10rem p-3 flex">
              <Button class="w-full text-sm" icon="pi pi-trash" label="Confirm" severity="danger"
                      @click="$refs.delImagePopover.hide()"/>
            </div>
          </Popover>
          <!-- /delete image -->

          <!-- attachment info -->
          <Popover ref="attachmentInfoPopover">
            <div class="w-30rem p-3 flex">
              File / image details here...
            </div>
          </Popover>
          <!-- /attachment info -->

        </div>
        <!-- /item gallery | properties | files -->

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
export default defineComponent({
  name: "Content",

  data() {
    return {
      menu        : [
        {
          name : "orders",
          icon : "pi pi-arrow-circle-right",
          total: 0,

          props: [
            {name: "description"},

            //extra.
            {extra: 1, header: "order number", key: 1, name: "order_no"},
            {decimal: 1, extra: 1, header: "amount", key: 1, name: "amount"},

            //enums.
            {enum: ['delivered', 'shipped', 'processing', 'cancelled', 'approved', 'returned'], header: "status", key: 1, name: "status"},
            {enum: ['Cash', 'PayPal', 'Credit', 'Bank Transfer'], extra: 1, header: "payment mode", name: "payment"},
            {select: "customers", label: "name", extra: 1, header: "customer", name: "customer"},
          ],

          //status | state.
          status: {approved: 0, processing: 0, cancelled: 0},
          state : {shipped: 0, delivered: 0, returned: 0},

          //right.
          props_r1: {aov: 0, "items per order": 0},
          props_r2: {"error rate": 0, "return rate": 0},

          //items.
          items: [
            {
              amount    : 315.75,
              categories: {},
              customer  : "c-001",
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
              amount    : 189.50,
              categories: {},
              customer  : "c-002",
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

        {
          name : "products",
          icon : "pi pi-th-large",
          total: 0,

          props: [
            //key props.
            {key: 1, name: "name", header: "name"},
            {name: "description", header: "description"},

            //extra.
            {key: 1, extra: 1, name: "price", decimal: 1, header: "price"},
            {key: 1, extra: 1, name: "cost", decimal: 1, header: "cost"},
            {key: 1, extra: 1, name: "amount", hidden: 1},

            {extra: 1, name: "weight", header: "weight"},
            {extra: 1, name: "dimensions", header: "dimensions"},
            {extra: 1, name: "discount", select: "discounts", label: "code"},
          ],

          //status | state.
          status: {approved: 0, processing: 0, suspended: 0},
          state : {"in stock": 0, "low stock": 0, "out of stock": 0},

          //analysis.
          props_r1: {"avg price": 269.23, "avg cost": 9},
          // props_r2: {"best seller": 0, "return rate": 0},

          //items.
          items: [
            {
              amount     : 0,
              categories : {men: true, casual: true},
              description: "A soft, breathable white hoodie made from premium cotton. Perfect for casual outings.",
              dimensions : "31x25x3.5 inches",
              documentId : "p-001",
              images     : [
                {url: "men-white-hoodie-1-a-454.webp"},
                {url: "men-white-hoodie-1-b-454.webp"},
                {url: "men-white-hoodie-1-c-454.webp"}
              ],
              name       : "White Hoodie",
              cost       : 2000,
              price      : 3499,
              rating     : 4,
              reviews    : [
                {review: "Super comfortable fabric, worth every penny.", user: "user_707", rating: 5},
                {review: "Fits true to size but slightly expensive.", user: "user_808", rating: 4},
                {review: "Great for spring, but not thick enough for winter.", user: "user_909", rating: 3},
                {review: "Love the minimalistic design!", user: "user_112", rating: 5}
              ],
              sku        : "w-hoodie-001",
              state      : "out of stock",
              status     : "approved",
              weight     : "0.65 kg"
            },

            {
              categories : {men: true, casual: true},
              description: "A heavyweight dark blue hoodie with a relaxed fit. Ideal for cooler weather.",
              dimensions : "33x27x4.5 inches",
              documentId : "p-002",
              images     : [
                {url: "men-hoodie-2-a-454.webp"},
                {url: "men-hoodie-2-b-454.webp"},
                {url: "men-hoodie-2-c-454.webp"}
              ],
              name       : "Dark Blue Hoodie",
              cost       : 1500,
              price      : 2799,
              amount     : 0,
              status     : "approved",
              state      : "low stock",
              rating     : 4,
              reviews    : [
                {review: "Extremely warm and stylish, perfect for winter.", user: "user_123", rating: 5},
                {review: "Pockets are deep and practical, but a bit heavy.", user: "user_456", rating: 4},
                {review: "Color fades slightly after a few washes.", user: "user_789", rating: 3},
                {review: "Best hoodie I've owned!", user: "user_221", rating: 5}
              ],
              sku        : "blue-hoodie-001",
              weight     : "0.85 kg"
            },

            {
              categories : {men: true, casual: true},
              description: "Classic black cotton t-shirt with a slim fit. Versatile for layering or solo wear.",
              dimensions : "29x21x2.5 inches",
              documentId : "p-003",
              images     : [
                {url: "men-tshirt-1-a-454.webp"},
                {url: "men-tshirt-1-b-454.webp"},
                {url: "men-tshirt-1-c-454.webp"}
              ],
              name       : "White T-Shirt",
              cost       : 800,
              price      : 1299,
              amount     : 0,
              status     : "approved",
              state      : "out of stock",
              rating     : 4,
              reviews    : [
                {review: "Soft and durable, great for daily wear.", user: "user_101", rating: 5},
                {review: "True to size, but wrinkles easily.", user: "user_102", rating: 4},
                {review: "Neckline stretches over time after multiple washes.", user: "user_103", rating: 3},
                {review: "Simple and elegant, goes with everything.", user: "user_115", rating: 5}
              ],
              sku        : "w-t-shirt-001",
              weight     : "0.35 kg"
            },

            {
              categories : {men: true, casual: true},
              description: "A stylish puffer jacket with insulation for cold weather. Lightweight yet warm.",
              dimensions : "34x28x6 inches",
              documentId : "p-004",
              images     : [
                {url: "men-casual-1-a-454.webp"},
                {url: "men-casual-1-b-454.webp"},
                {url: "men-casual-1-c-454.webp"}
              ],
              name       : "Puffer Jacket",
              cost       : 3000,
              price      : 5499,
              amount     : 0,
              status     : "processing",
              state      : "low stock",
              rating     : 4,
              reviews    : [
                {review: "Extremely warm and stylish, perfect for winter trips.", user: "user_201", rating: 5},
                {review: "A bit pricey but worth the investment.", user: "user_202", rating: 4},
                {review: "Zipper could be more durable.", user: "user_203", rating: 3},
                {review: "Lightweight yet keeps me warm in freezing temps.", user: "user_204", rating: 5}
              ],
              sku        : "m-jacket-01",
              weight     : "1.2 kg"
            },

            {
              categories : {men: true, official: true},
              color      : "Navy Blue",
              description: "A sleek and warm coat designed for the modern man. Features a tailored fit and premium wool blend.",
              dimensions : "42x31x7 inches",
              documentId : "p-005",
              image      : "men-coat-1.webp",
              images     : [
                {url: "men-coat-1-a-454.webp"},
                {url: "men-coat-1-b-454.webp"},
                {url: "men-coat-1-c-454.webp"}
              ],
              name       : "Official Coat",
              cost       : 6000,
              price      : 8999,
              amount     : 0,
              status     : "cancelled",
              state      : "out of stock",
              rating     : 4,
              reviews    : [
                {review: "Excellent coat, very warm and stylish!", user: "user_101", rating: 5},
                {review: "Looks great but sleeves are a bit long.", user: "user_202", rating: 3},
                {review: "Perfect for winter, highly recommend.", user: "user_303", rating: 4},
                {review: "Premium feel, worth the price.", user: "user_404", rating: 5}
              ],
              sku        : "men-coat-001",
              weight     : "1.4 kg"
            },

            {
              categories : {men: true, official: true},
              description: "A premium suit for formal occasions, tailored to perfection with reinforced stitching.",
              dimensions : "44x33x5 inches",
              documentId : "p-006",
              images     : [
                {url: "men-suits-1-454.webp"},
                {url: "men-suits-2-454.webp"},
                {url: "men-suits-3-454.webp"}
              ],
              name       : "Blue Suit",
              cost       : 8000,
              price      : 12499,
              amount     : 0,
              status     : "processing",
              state      : "in stock",
              rating     : 5,
              reviews    : [
                {review: "Amazing fit and quality!", user: "user_404", rating: 5},
                {review: "A bit tight around the shoulders.", user: "user_505", rating: 3},
                {review: "Perfect for weddings and formal events.", user: "user_606", rating: 5},
                {review: "Tailoring is impeccable.", user: "user_707", rating: 5}
              ],
              sku        : "m-suit-01",
              weight     : "1.6 kg"
            },
          ]
        },

        {
          name    : "intakes",
          icon    : "pi pi-arrow-circle-left",
          quantity: 0,
          total   : 18750.80,

          props: [
            //intake details.
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
          items: [
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
          ]
        },

        {
          icon: "pi pi-users",

          items: [
            {
              categories : {},
              description: null,
              documentId : "C-001",
              files      : [],
              images     : [],
              last_active: "2023-06-14",
              name       : "Sarah K.",
              orders     : 12,
              state      : "wholesaler",
              status     : "active",
            },
            {
              categories : {},
              description: null,
              documentId : "C-002",
              files      : [],
              images     : [],
              last_active: "2023-06-15",
              name       : "Tech Solutions Ltd",
              orders     : 47,
              state      : "retailer",
              status     : "active",
            }
          ],

          name: "customers",

          props: [
            {name: "description", header: "details"},
            {extra: 1, key: 1, name: "name"},
            {extra: 1, key: 1, name: "orders", number: 1, hidden: 1},
            {extra: 1, key: 1, name: "status", hidden: 1},
            // {enum: ['active', 'suspended', 'banned'], extra: 1, key: 1, name: "status", select: 1},
          ],

          //status | state.
          status: {active: 0, banned: 0, inactive: 0},
          state : {retailer: 0, wholesaler: 0, institution: 0},

          //analysis.
          props_r1: {ltv: 0, frequency: 0},
          props_r2: {local: 0, foreign: 0},
        },

        {
          name    : "suppliers",
          icon    : "pi pi-users",
          quantity: 0,
          total   : 18750.80,

          props: [
            {name: "description", header: "details"},
            {key: 1, name: "name"},
            {key: 1, name: "rating", rating: 1},
          ],

          //status | state.
          status: {active: 12, review: 3, blacklisted: 5},
          state : {artisans: 9, distributors: 6, manufacturers: 4},

          props_r1: {"avg rating": 4.6, "lead time": 3.8},
          props_r2: {"on time rate": 94.7, "defect rate": 1.2},

          items: [
            {
              categories: {},
              documentId: "S-001",
              files     : [],
              images    : [],
              name      : "Nairobi Fiber",
              rating    : 4,
              status    : "active",
              state     : "distributors",
            },

            {
              categories : {},
              documentId : "S-002",
              files      : [],
              images     : [],
              name       : "Top Cloth",
              description: null,
              rating     : 5,
              status     : "review",
              state      : "distributors",
            },

            {
              categories : {},
              documentId : "S-004",
              files      : [],
              images     : [],
              name       : "Zippers",
              description: null,
              rating     : 5,
              status     : "review",
              state      : "distributors",
            },

          ]
        },

        {
          name    : "discounts",
          icon    : "pi pi-dollar",
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
          ]
        },

        {name: "report", icon: "pi pi-file"},
      ],
      chartOptions: {
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
      months      : ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

      //dates.
      startDate: new Date().toDateString(),
      endDate  : new Date().toDateString(),

      //chart | table.
      displayChart: true,
      right_col   : "gallery",

      //active.
      attachment: null
    }
  },

  computed: {

    item() {
      return useState('item').value;
    },

    sidebar() {
      return useState('sidebar').value;
    },

    category_name() {
      return useState('category').value.name;
    },

    category() {
      return useState('category').value;
    },

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

    props() {
      const cat_props = this.category.props.map(prop => prop.name);

      //update props.
      useState('props').value = cat_props;

      return cat_props;
    },

    key_props() {
      const key_props = this.category.props.filter(prop => prop.key);
      return key_props.map(prop => prop.name);
    },

    key_columns() {
      return this.category.props.filter(prop => prop.key);
    }
  },

  methods: {

    getCategoryByName(cat_name) {
      return this.menu.find(cat => cat.name === cat_name);
    },


    //CATEGORY.
    //view category.
    viewCategory(cat) {

      useState('category').value = cat;

      //ANALYSIS.
      //orders.
      if (cat.name === 'orders') this.analyseOrders();
      else if (cat.name === 'products') this.analyseProducts();
      else if (cat.name === 'intakes') this.analyseIntakes();
    },


    //ITEM.
    async loadItems() {
    },

    viewItem(item) {
      useState('item').value = item;
      this.right_col         = 'properties';
    },

    newItemInit() {
      //UI reset.
      this.displayChart = false;
      this.right_col    = "properties";

      useState('item').value = {categories: {}, images: []};
    },

    submitItem() {
    },

    async createItem() {
    },

    async updateItem() {
      if (this.category_name === 'orders') this.analyseOrders();
      else if (this.category_name === 'products') this.analyseProducts();
      else if (this.category_name === 'intakes') this.analyseIntakes();
    },

    async deleteItem() {
    },


    //ATTACHMENT.
    uploadAttachment() {
    },

    deleteAttachment() {
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


    //discounts.
    analyseDiscounts() {

    },


    //customers.
    analyseCustomers() {

    },

    //suppliers.
    analyseSuppliers() {

    }
  },

  beforeMount() {
    this.viewCategory(this.menu[0]);
    useState('categories').value = this.menu;
  }
})
</script>