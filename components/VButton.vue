<template>
  <Button :class="'w-3rem h-3rem hover:shadow-3 hover:bg-purple-700 align-items-center ' +
    (fill ? 'bg-purple-800 text-white border-none hover:border-yellow-600' : 'bg-white-alpha-10 border-1 border-purple-200 text-purple-600 hover:text-white ')"
          outlined rounded>
    <span class="material-icons-outlined">{{ icon }}</span>
  </Button>
</template>


<script lang="js">
export default defineComponent({
  name : "VButton",
  props: ['icon', 'fill'],
});
</script>