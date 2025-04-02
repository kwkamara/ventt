<template>

  <div :class="`h-8rem w-full px-4 bg-purple-700 flex align-items-center border-round capitalize ${ right ? 'justify-content-end text-right' : null}`">

    <div>
      <div class="pb-1 decimal font-bold text-lg">
        {{ title }}
      </div>

      <div class="text-xs">{{ subtitle }}</div>
    </div>

  </div>

</template>


<script lang="js">
export default defineComponent({
  name : "DataBoxSingle",
  props: ['title', 'subtitle', 'right']
})
</script>