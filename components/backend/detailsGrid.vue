<template>
  <!-- details grid -->
  <div class="grid m-0 pt-2">

    <!-- Key props -->
    <div v-for="prop in props.filter( p => p.key && item[p.name] )"
         :key="prop" :class="(prop.name === 'description' ? 'col-12 ' : 'col-6') + ' p-3 md:p-4'">

      <!-- prop value -->
      <div>
        <!-- date display -->
        <template v-if="prop.date">
          {{ new Date(item[prop.name]).toLocaleDateString('en-GB') }}
        </template>
        <!-- /date display -->

        <!-- decimal | text -->
        <template v-else>
          {{ prop.prefix }}
          {{ prop.decimal ? formatDecimal(item[prop.name]) : (item[prop.name].en || item[prop.name]) }}
        </template>
        <!-- /decimal | text -->
      </div>
      <!-- /prop value -->

      <!-- label -->
      <span class="mt-1 text-xs uppercase text-gray-500">
        {{ prop.header || prop.name }}
        {{ prop.suffix }}
      </span>
      <!-- /label -->

    </div>
    <!-- /Key props -->


    <!-- other props -->
    <div v-for="prop in props.filter(p => !p.no_info && !p.key && item[p.name])"
         :key="prop" class="col-6 p-3 md:p-4">

      <!-- rating -->
      <div v-if="prop.name === 'rating'" class="flex align-items-center">
        <span v-for="(rate, ix) in Number(item.rating)" :key="ix"
              class="material-icons-outlined text-xl text-yellow-600">star</span>
      </div>
      <!-- /rating -->

      <!-- decimal | text -->
      <div v-else>
        {{ prop.prefix }}
        {{ prop.decimal ? formatDecimal(item[prop.name]) : item[prop.name] }}
      </div>
      <!-- /decimal | text -->

      <!-- label -->
      <span class="mt-1 text-xs uppercase text-gray-500">
        {{ prop.header || prop.name }}
        {{ prop.suffix }}
      </span>
      <!-- /label -->

    </div>
    <!-- /other props -->


    <!-- categories -->
    <div v-for="(props, cat_name_) in categories"
         :key="cat_name_" class="col-12 bg-gray-50 pl-3 pr-4 pt-3 md:px-4 border-top-1 border-bottom-1 border-gray-300">


      <!-- header -->
      <div class="pt-2 pb-4 flex justify-content-between align-items-center">
        <!-- category name -->
        <h2 class="m-0 font-light sans-serif uppercase text-xl">
          {{ cat_name_ }}
        </h2>


        <!-- controls -->
        <div class="flex justify-content-end align-items-center">
          <!-- add toggle -->
          <VButton icon="add" fill="1" @click="cat_name=cat_name_; $refs.searchPopover.toggle($event)"/>

          <Divider layout="vertical" class="h-2rem"/>
          <!-- edit toggle -->
          <VButton icon="edit" :fill="edit" @click="edit=!edit; edit? null: $emit('update', 1)"/>
        </div>
        <!-- /controls -->
      </div>
      <!-- /header -->


      <!-- sub_items -->
      <div v-for="(sub_item, key) in item[cat_name_]"
           :key="key" class="grid m-0 text-sm hover:text-purple-800">

        <!-- sub item ID -->
        <div class="col-12 md:col-2 lg:col-4 pl-0 pr-0 flex justify-content-between md:justify-content-start">
          <!-- sub item ID -->
          <div>
            <h3 class="m-0 sans-serif uppercase">{{ key }}</h3>
            <label class="uppercase text-xs text-gray-500">item id</label>
          </div>
          <!-- /sub item ID -->

          <!-- close -->
          <div class="md:hidden text-right">
            <Icon icon="close" @click="deleteItem(key, cat_name_)"/>
          </div>
          <!-- /close -->
        </div>
        <!-- /sub item ID -->


        <!-- rel item props -->
        <template v-for="(prop, ix) in props" :key="ix">
          <div v-if="prop.name !== 'description'"
               class="col-4 md:col-3 lg:col-2 pl-0 pb-3 lg:pl-3 lg:text-right">

            <!-- edit mode -->
            <template v-if="edit && !prop.no_edit">
              <InputNumber v-if="prop.number"
                           :id="prop.name + '-ip'"
                           v-model="sub_item[prop.name]"
                           :min-fraction-digits="0"
                           input-class="w-full pl-0 h-3rem bg-white border-none border-bottom-1 border-gray-300"
                           fluid use-grouping/>
              <InputNumber v-else-if="prop.decimal"
                           :id="prop.name + '-ip'"
                           v-model="sub_item[prop.name]"
                           :min-fraction-digits="2"
                           input-class="w-full pl-0 h-3rem bg-white border-none border-bottom-1 border-gray-300"
                           fluid use-grouping/>
            </template>
            <!-- /edit mode -->

            <!-- value -->
            <div v-else class="text-lg">
              {{ ['price', 'total'].includes(prop.name) ? formatDecimal(sub_item[prop.name]) : sub_item[prop.name] }}
            </div>
            <!-- /value -->

            <!-- label -->
            <span class="block uppercase text-xs text-gray-500 lg:text-right">
              {{ prop.name }}
            </span>
            <!-- /label -->

            <Divider v-if="!edit"/>

          </div>
        </template>
        <!-- rel item props -->


        <!-- md:close -->
        <div class="hidden md:block col-12 md:col-1 lg:col-2 text-right">
          <Icon icon="close" @click="deleteItem(key, cat_name_)"/>
        </div>
        <!-- /md:close -->

      </div>
      <!-- /sub_items -->

    </div>
    <!-- /categories -->
  </div>
  <!-- /details grid -->


  <!-- product searchPopover -->
  <Popover ref="searchPopover">
    <div class="grid m-0 w-16rem lg:w-26rem select-none overflow-hidden">

      <!-- search -->
      <div class="col-12">
        <InputText v-model="search"
                   autofocus
                   class="w-full h-4rem bg-transparent border-none border-bottom-1 border-gray-400"
                   fluid placeholder="Search Products" unstyled/>
      </div>
      <!-- search -->


      <!-- sub items -->
      <div v-for="item in getSubItemList()"
           :key="item.documentId"
           class="col-12 px-3 py-2 hover:text-purple-800"
           @click="addSubItem(item)">
        <div class="font-bold"> {{ item.name.en || item.name }}</div>
        <div class="uppercase text-xs"> {{ item.sku || item.id }}</div>
      </div>
      <!-- /sub items -->

    </div>
  </Popover>
  <!-- /product searchPopover -->
</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name: "detailsGrid",

  props: ['item', 'props', 'categories'],
  emits: ['update'],

  data() {
    return {
      edit    : null,
      search  : null,
      cat_name: null,
      cache   : {
        categories: {}
      }
    }
  },

  methods: {
    //delete.
    deleteItem(key, cat_name) {

      //validate.
      if (!key || !cat_name || !this.item) return;

      //delete sub item.
      delete (this.item[cat_name][key]);

      //update.
      this.$emit('update', 1);
    },

    //get sub-item list
    getSubItemList() {
      //validate.
      if (!this.cat_name || !this.search) return [];

      //get sub item category.
      const category                       = this.cache.categories[this.cat_name] || useState('admin').value.find(c => c.name === this.cat_name);
      this.cache.categories[this.cat_name] = category;


      //sub item cat init.
      if (!this.item[this.cat_name]) this.item[this.cat_name] = {};


      //validate sub item category.
      if (category) {
        //prep search term.
        const search = this.search.toLowerCase();

        //filter items.
        if (this.cat_name === 'products') return category.data
            .filter(i => !this.item[this.cat_name][i.documentId] && i.name.en.toLowerCase().includes(search));
        else return category.data.filter(i => i.name.toLowerCase().includes(search));
      }

      //empty list.
      return [];
    },

    //add sub item.
    addSubItem(item) {
      //validate.
      if (!item || !this.cat_name) return;

      //prep subItem data.
      let subItemData = {};
      const props     = this.categories[this.cat_name];
      props.forEach(p => subItemData[p.name] = item[p.name]);

      //add sub item.
      this.item[this.cat_name][item.documentId] = subItemData;

      //update UI.
      this.edit   = true;
      this.search = null;
    },
  }
})
</script>