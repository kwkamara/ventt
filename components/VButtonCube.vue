<template>
  <Button
      :class="(fill ? 'bg-purple-800 text-white hover:bg-purple-700 ' : 'bg-transparent text-purple-800 hover:text-yellow-600 ')
      + 'border-none align-items-center '">
    <span v-if="icon && !icon_right" class="material-icons-outlined">{{ icon }}</span>
    <span v-if="text" class="white-space-nowrap capitalize">{{ text }}</span>
    <span v-if="icon && icon_right" class="material-icons-outlined">{{ icon }}</span>
  </Button>
</template>


<script lang="js">
export default defineComponent({
  name : "VButtonCube",
  props: ['icon', 'text', 'fill', 'icon_right'],
})
</script>