<template>
  <!-- details grid -->
  <div class="grid m-0">

    <!-- Key props -->
    <div v-for="prop in props.filter( p => p.key && item[p.name] )"
         :key="prop"
         :class="(prop.name === 'description' ? 'col-12 ' : 'col-6 md:col-4 ') + ' p-3 md:p-4'">

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
         :key="prop"
         class="col-6 p-3 md:p-4">

      <!-- rating -->
      <div v-if="prop.name === 'rating'" class="flex align-items-center">
        <span v-for="rate in Number(item.rating)" class="material-icons text-xl text-yellow-600">star</span>
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
    <div v-for="(props, cat_name) in categories"
         :key="cat_name"
         class="col-12 bg-gray-50 pl-3 pr-4 pt-3 md:px-4 border-top-1 border-bottom-1 border-gray-300">


      <!-- header -->
      <div class="pt-2 pb-4 flex justify-content-between align-items-start">
        <!-- category name -->
        <h2 class="m-0 pb-4 font-light sans-serif uppercase text-xl">
          {{ cat_name }}
        </h2>

        <!-- edit toggle -->
        <VButton icon="edit" :fill="edit" @click="edit=!edit"/>
      </div>
      <!-- /header -->


      <!-- sub_items -->
      <div v-for="(sub_item, key) in item[cat_name]"
           :key="key"
           class="grid m-0 text-sm hover:text-purple-800">

        <!-- rel item ID -->
        <div class="col-12 md:col-2 pl-0 pr-0 flex justify-content-between md:justify-content-start">
          <!-- sub item ID -->
          <div>
            <h3 class="m-0 sans-serif uppercase">{{ key }}</h3>
            <label class="uppercase text-xs text-gray-500">item id</label>
          </div>
          <!-- /sub item ID -->

          <!-- close -->
          <div class="md:hidden text-right">
            <Icon icon="close" @click="delete(item[cat_name][key])"/>
          </div>
          <!-- /close -->
        </div>
        <!-- /rel item ID -->


        <!-- rel item props -->
        <template v-for="(prop, ix) in props" :key="ix">
          <div v-if="prop.name !== 'description' && !prop.no_edit"
               class="col-4 md:col-3 pl-0 pb-3 lg:px-4 lg:text-right">

            <!-- edit -->
            <template v-if="edit">
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

            <!-- value -->
            <div v-else class="text-lg">
              {{ ['price', 'total'].includes(prop.name) ? formatDecimal(sub_item[prop.name]) : sub_item[prop.name] }}
            </div>
            <!-- /value -->

            <!-- label -->
            <span class="uppercase text-xs text-gray-500">
              {{ prop.name }}
            </span>
            <!-- /label -->

            <Divider v-if="!edit"/>

          </div>
        </template>
        <!-- rel item props -->


        <!-- md:close -->
        <div class="hidden md:block col-12 md:col-1 text-right">
          <Icon icon="close" @click="delete(item[cat_name][key])"/>
        </div>
        <!-- /md:close -->

      </div>
      <!-- /sub_items -->

    </div>
    <!-- /categories -->

  </div>
  <!-- /details grid -->
</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name : "detailsGrid",
  props: ['item', 'props', 'categories'],
  data() {
    return {
      edit: null
    }
  }
})
</script>