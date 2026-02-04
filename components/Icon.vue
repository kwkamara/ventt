<template>
  <span class="material-icons-outlined cursor-pointer text-purple-700 hover:text-yellow-800">
    {{ icon }}
  </span>
</template>


<script lang="ts">
export default defineComponent({
  name: "Icon",
  props: ['icon']
})
</script>