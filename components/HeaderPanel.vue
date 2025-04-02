<template>
  <!-- panel -->
  <div class="h-8rem w-full p-0 bg-white border-1 border-gray-200">

    <!-- header -->
    <div class="m-0 p-3 pl-4 bg-purple-700 text-white flex align-items-center border-round-top capitalize">
      {{ title }}
    </div>
    <!-- /header -->

    <!-- content -->
    <div v-if="data" class="py-3 px-4 flex justify-content-between capitalize text-purple-900">
      <div v-for="(value, prop) in data">
        <div class="font-bold pb-1 decimal">{{ formatDecimal(value) }}</div>
        <div class="text-xs text-center">{{ prop }}</div>
      </div>
    </div>
    <!-- /content -->

  </div>
  <!-- /panel -->
</template>


<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name : "HeaderPanel",
  props: ['category', 'summary', 'title', 'data']
})
</script>