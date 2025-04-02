<template>
  <div class="h-fit w-full border-round border-1 border-gray-200 text-gray-800 text-xs">

    <div class="h-3rem m-0 p-3 pl-4 text-sm bg-purple-700 text-white flex align-items-center border-round-top capitalize">
      {{ title }}
    </div>

    <div v-if="props" class="bg-white">
      <div v-for="(item, ix) in items"
           :class="`h-4rem px-4 lg: flex align-items-center gap-3 ${ix===3 ? '' : 'border-bottom-1 border-gray-200'} hover:bg-gray-50`">

        <template v-for="(prop, ix) in props">
          <div :class="`w-full ${ ix === (props.length-1) || prop.decimal || prop.number ? 'text-right' : '' } ${ prop.decimal || prop.number ? 'decimal':''}`">
            {{ prop.decimal ? formatDecimal(item[prop.name]) : item[prop.name] }}
          </div>
        </template>

      </div>
    </div>

  </div>
</template>



<script setup lang="js">
const {formatDecimal} = useFormatDecimal();
</script>


<script lang="js">
export default defineComponent({
  name : "RecentPanel",
  props: ['title', 'items', 'props'],

  computed: {

  }
})
</script>
