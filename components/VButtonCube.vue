<template>
  <Button
      :class="(fill ? 'bg-purple-800 text-white border-none ' : 'bg-white text-purple-800 border-1 border-purple-100 hover:bg-purple-700 hover:text-white ') + 'hover:shadow-3' ">
    <span class="material-icons-outlined">{{ icon }}</span>
    <span class="white-space-nowrap capitalize">{{ text }}</span>
  </Button>
</template>



<script lang="js">
export default defineComponent({
  name : "VButtonCube",
  props: ['icon', 'text', 'fill']
})
</script>