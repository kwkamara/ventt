

<template>
  <Button
      :class="(fill ? 'bg-blue-800 text-white border-none ' : 'bg-white text-blue-800 border-1 border-blue-100 hover:bg-blue-700 hover:text-white ') + 'hover:shadow-3' ">
    <span class="material-icons-outlined">{{ icon }}</span>
    <span class="white-space-nowrap capitalize">{{ text }}</span>
  </Button>
</template>



<script lang="js">
export default defineComponent({
  name: "VButtonCubeBlue",
  props: ['icon', 'text', 'fill'],
})
</script>