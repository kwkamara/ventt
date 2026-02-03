<template>
  <Button
      :class="(fill ? 'bg-green-800 text-white border-none ' : 'bg-white text-green-800 border-1 border-green-100 hover:bg-green-700 hover:text-white ') + 'hover:shadow-3' ">
    <span class="material-icons-outlined">{{ icon }}</span>
    <span class="white-space-nowrap capitalize text-xs md:text-base">{{ text }}</span>
  </Button>
</template>


<script lang="js">
export default defineComponent({
  name : "VButtonCubeGreen",
  props: ['icon', 'text', 'fill'],
})
</script>