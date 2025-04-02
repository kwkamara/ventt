<template>
  <div class="h-8rem w-full px-4 bg-purple-700 flex align-items-center justify-content-between border-round capitalize">

    <div v-for="(value, key, ix) in data"
         :key="ix" :class="`${ ix === 1 ? 'text-right' : '' }`">

      <div :class="`pb-1 font-bold text-lg ${ (typeof value === 'number') ? 'decimal':''}`">{{ value }}</div>
      <div class="text-xs">{{ key }}</div>

    </div>

  </div>
</template>


<script lang="js">
export default defineComponent({
  name : "DataBoxTwin",
  props: ['title_l', 'subtitle_l', 'title_r', 'subtitle_r', 'data']
})
</script>