<template>
  <!-- rating -->
  <div class="flex align-items-center">
    <span v-for="rate in rate" class="material-icons-outlined text-xl text-yellow-600">star</span>
  </div>
</template>



<script lang="js">
export default defineComponent({
  name: "Rating",
  props: ['rate']
})
</script>