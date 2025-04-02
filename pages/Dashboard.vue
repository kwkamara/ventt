<template>
  <div class="grid m-0 flex-column">

    <Appbar/>

    <Content/>

  </div>
</template>


<script setup lang="js">
useState('categories', () => []);
useState('category', () => null);
useState('props', () => []);
</script>


<script lang="js">
export default defineComponent({
  name: "Dashboard"
});
</script>
