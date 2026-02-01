<template>
  <Button class="w-3rem h-3rem border-1 border-purple-100 text-purple-600 hover:shadow-3 hover:bg-purple-700 hover:text-white"
          outlined rounded>
    <span class="material-icons">{{ icon }}</span>
  </Button>
</template>


<script lang="js">
export default defineComponent({
  name : "VButton",
  props: ['icon']
})
</script>