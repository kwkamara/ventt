<template>
  <div class="col-12 p-0 flex text-gray-700">

    <!-- menu -->
    <div v-if="is_sidebar"
         @click="useState('item').value=null;"
         class="w-3 md:w-2 lg:w-1 py-5 px-2 h-full bg-white border-right-1 border-gray-200 flex flex-column align-items-center gap-5">

      <Button v-for="cat in menu.filter(m => !m.parent)"
              @click="viewCategory(cat)"
              :class="( category_name === cat.name ? 'bg-purple-700 text-white' : 'text-purple-700 bg-white') +
              ' w-5rem h-4rem border-none shadow-1 hover:text-white hover:bg-purple-800 hover:shadow-3 flex align-items-center justify-content-center'">
        <div class="text-center">
          <span class="material-icons-outlined">{{ cat.icon }}</span>
          <div class="text-xs capitalize pt-1">{{ cat.name }}</div>
        </div>
      </Button>

    </div>
    <!-- menu -->


    <!-- content -->
    <div :class="(is_sidebar ? 'w-9 lg:w-11' : 'w-full') + ' grid m-0 lg:px-5 pt-4 select-none'">

      <!-- left col -->
      <div class="col-12 lg:col-7 md:pl-0 flex flex-column gap-3">

        <!-- title bar -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl">

          <!-- category name | category total | dates -->
          <div class="pb-4 flex justify-content-between">
            <!-- category name | category total -->
            <div class="lg:w-6 text-2xl capitalize">
              <div class="m-0">{{ category.name }}</div>
              <span class="m-0">{{ formatDecimal(category.total) }}</span>
            </div>
            <!-- category name | category total -->

            <Divider layout="vertical" unstyled class="h-3rem pr-3 border-left-1 border-gray-200"/>

            <!-- dates -->
            <div class="flex gap-3 justify-content-end text-sm text-gray-700">
              <!-- start -->
              <div>
                <DatePicker id="start-date"
                            date-format="dd/mm/yy"
                            v-model="startDate"
                            class="lg:w-10rem pl-3 mb-1 border-1 border-gray-300 border-round-3xl" fluid/>
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
          <div v-for="(amount, metric) in category.metrics">
            <h2 class="m-0 font-light">{{ formatDecimal(amount) }}</h2>
            <span class="text-sm">{{ metric }}</span>
          </div>
        </div>
        <!-- /metrics -->


        <!-- status -->
        <div class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between">
          <div v-for="(amount, metric) in category.status">
            <h2 class="m-0 font-light">{{ formatDecimal(amount) }}</h2>
            <span class="text-sm">{{ metric }}</span>
          </div>
        </div>
        <!-- /status -->


        <!-- chart | table | item -->
        <div v-if="false" class="w-full lg:h-fit overflow-hidden bg-white border-1 border-gray-200 border-round-top overflow-hidden">

          <!-- header -->
          <div class="h-3rem pl-2 flex align-items-center justify-content-between border-bottom-1 border-gray-200 bg-purple-700">

            <!-- item table toggle -->
            <Button :label="category_name"
                    class="text-white text-sm font-light capitalize bg-transparent hover:text-yellow-600"
                    text
                    @click="useState('item').value=null"/>


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
      <div class="col-12 lg:col-5 flex flex-column gap-3">

        <!-- chart -->
        <div v-if="!manage"
             class="p-4 shadow-1 border-1 border-purple-100 border-round-xl flex justify-content-between">
          <Chart type="bar"
                 :data="chartData"
                 :options="chartOptions"
                 class="lg:h-12rem w-full"/>
        </div>
        <!-- /chart -->


        <!-- recent -->
        <div v-if="!manage" class="p-4 pt-3 shadow-1 border-1 border-purple-100 border-round-xl">

          <div class="pb-3 flex gap-2 align-items-center justify-content-between border-bottom-1 border-gray-300">
            <div class="flex gap-1 align-items-center">
              <span class="material-icons-outlined">access_time</span>
              <h3 class="m-0 font-light">Recent {{ category.name }}</h3>
            </div>

            <VButton icon="settings" @click="manage='items'"/>
          </div>

          <div v-for="item in category.data" :key="item.documentId"
               class="py-4 text-sm flex justify-content-between border-bottom-1 border-gray-200 hover:text-purple-700">
            <span v-for="prop in key_props">
              {{ prop.prefix }} {{ prop.decimal ? formatDecimal(item[prop.name]) : item[prop.name] }}
            </span>
          </div>

        </div>
        <!-- /recent -->


        <!-- manage -->
        <div v-if="manage" class="pt-3 shadow-1 border-1 border-purple-100 border-round-xl overflow-hidden">

          <!-- search -->
          <template v-if="manage==='items'">
            <div class="pb-4 pt-2 px-4 flex justify-content-between align-items-center">
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
                     :rows="8"
                     :show-headers="false"
                     :value="category.data"
                     data-key="documentId" paginator row-hover
                     table-class="text-xs animation-duration-500 fadein">

            <Column :field="key_props[0].field">
              <template #body="{data}">

                <div class="pl-2 flex align-items-center justify-content-between"
                     @click="viewItem(data)">

                  <!-- item data -->
                  <div class="w-full flex align-items-center gap-3 w-full">
                    <div v-for="column in tbl_columns"
                         :class="`w-4 lg:w-2 ${ column.decimal ? 'decimal': ''}`">
                      {{ column.prefix }} {{ column.decimal ? formatDecimal(data[column.name]) : data[column.name] }}
                    </div>
                  </div>
                  <!-- /item data -->

                  <!-- edit -->
                  <Button class="bg-transparent text-gray-400 hover:text-yellow-600 lg:justify-content-end"
                          text @click.stop="editItem(data)">
                    <span class="material-icons-outlined">edit</span>
                  </Button>
                </div>

              </template>
            </Column>
          </DataTable>
          <!-- /items -->


          <!-- header -->
          <div v-if="manage !=='items'"
               class="p-3 pt-0 pb-2 flex justify-content-between align-items-center">

            <!-- category name | item id -->
            <div class="m-0 font-light text-xl capitalize flex gap-2">
              <span>{{ category.name }} </span>
              <Icon icon="chevron_right"/>
              <!--              <Divider unstyled layout="vertical" class="h-2rem border-left-1 border-gray-200"/>-->
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
          <div class="grid m-0 px-3" v-if="manage==='info' && item">
            <!-- Key props -->
            <div v-for="prop in category.props.filter(p => p.key && item[p.name])" class="col-12 py-3">
              <div>{{ item[prop.name] }}</div>
              <span class="mt-1 text-xs">{{ prop.header || prop.name }}</span>
            </div>
            <!-- /name | Description -->

            <!-- props -->
            <div v-for="prop in category.props.filter(p => !p.no_info && !p.key && item[p.name])" class="col-12 py-3">
              <div>{{ item[prop.name] }}</div>
              <span class="mt-1 text-xs">{{ prop.name }}</span>
            </div>

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


        <!-- chart | table | item -->
        <div v-if="false" class="w-full lg:h-fit overflow-hidden bg-white border-1 border-gray-200 border-round-top overflow-hidden">

          <!-- header -->
          <div class="h-3rem pl-2 flex align-items-center justify-content-between border-bottom-1 border-gray-200 bg-purple-700">

            <!-- item table toggle -->
            <Button :label="category_name"
                    class="text-white text-sm font-light capitalize bg-transparent hover:text-yellow-600"
                    text
                    @click="useState('item').value=null"/>


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
            <div v-else class="p-4 pt-6 flex flex-column gap-4 text-sm animation-duration-500 fadein">
              <ItemForm @update="updateItem()"/>
            </div>
            <!-- /item -->
          </div>
          <!-- /chart | table | item -->

        </div>
        <!-- /chart | table | item -->

      </div>
      <!-- /right col -->


      <!-- right col -->
      <div v-if="false" class="col-12 lg:col-4 lg:pt-0 px-3 flex flex-column">

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

            //enums.
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
              select: "customers",
              rel   : "name"
            },
          ],

          //metrics.
          metrics: {
            approved  : 0,
            processing: 0,
            cancelled : 0
          },

          //status.
          status: {
            shipped  : 0,
            delivered: 0,
            returned : 0
          },

          //metrics_1.
          metrics_1: {
            aov              : 0,
            "items per order": 0
          },

          //metrics_2.
          metrics_2: {
            "error rate" : 0,
            "return rate": 0
          },

          //data.
          data: [
            {
              id        : "001",
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
              id        : "002",
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
          icon : "grid_view",
          total: 0,

          //struct.
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
          props_r1: {"avg price": 0, "avg cost": 0},
          // props_r2: {"best seller": 0, "return rate": 0},

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

        {
          name: "customers",

          icon: "group",

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

          props: [
            {name: "name", key: 1},
            {name: "description", key: 1},
            {name: "orders", decimal: 1, no_edit: 1},
            {name: "status", enum: ["active", "banned", "review"]},
          ],

          //status | state.
          status: {active: 0, banned: 0, inactive: 0},
          state : {retailer: 0, wholesaler: 0, institution: 0},

          //analysis.
          metrics_1: {ltv: 0, frequency: 0},
          metrics_2: {local: 0, foreign: 0},

          data: [
            {name: "Kevin", id: "001"}
          ]
        },

        {
          name    : "suppliers",
          icon    : "group_add",
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


    is_sidebar() {
      return useState('sidebar').value;
    },

    category_name() {
      return this.category ? this.category.name : '-';
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
      //validate
      if (!this.category) return [];

      const cat_props = this.category.props.map(prop => prop.name);

      //update props.
      useState('props').value = cat_props;

      return cat_props;
    },


    key_columns() {
      //validate
      if (!this.category) return [];

      return this.category.props.filter(prop => prop.key);
    },


    tbl_columns() {
      //validate
      if (!this.category) return [];

      return this.category.props.filter(prop => !prop.no_tbl);
    },

    products() {
      return useState('products').value;
    }
  },

  methods: {

    //push item.
    pushItem(item) {
      //new item.
      if (!item.id) {

        //item ID init.
        item.id = new Date().getTime();

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

    //get category.
    getCategoryByName(cat_name) {
      return this.menu.find(cat => cat.name === cat_name);
    },


    //CATEGORY.
    //view category.
    viewCategory(category) {
      this.category = category;
      return;

      //ANALYSIS.
      //orders.
      if (cat.name === 'orders') this.analyseOrders();
      else if (cat.name === 'products') this.analyseProducts();
      else if (cat.name === 'intakes') this.analyseIntakes();
    },


    //ITEM.
    async loadItems() {
    },


    //load item UI.
    viewItem(item) {
      this.item = item;
      this.manage = "info";
    },

    //load item UI.
    editItem(item) {
      this.item = item;
      this.manage = "edit";
    },

    newItemInit() {
      //UI reset.
      this.displayChart = false;
      this.right_col = "properties";

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
    //load first category.
    this.viewCategory(this.menu[0]);
  }
})
</script>

