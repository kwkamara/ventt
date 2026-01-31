<template>
  <div class="col-12 w-full h-4rem p-0 flex align-items-center justify-content-between border-bottom-1 border-gray-200">

    <!-- logo -->
    <div v-if="sidebar" class="w-3 md:w-2 lg:w-1 h-full p-3 bg-white flex align-items-center justify-content-center border-right-1 border-gray-200">
      <img src="/logo-ventt.svg" class="w-3rem"/>
    </div>
    <!-- /logo -->


    <!-- right bar -->
    <div :class="`${sidebar ? 'w-9 lg:w-11' : 'w-full'} px-2 lg:pr-5 lg:pl-3 flex justify-content-between align-items-center`">

      <Button class="text-gray-800 bg-transparent" icon="pi pi-bars" text @click="useState('sidebar').value=!sidebar"/>

      <div class="flex align-items-center justify-content-end gap-3">
        <Button class="text-gray-800 bg-transparent" icon="pi pi-envelope" text/>

        <Button class="text-red-500 bg-transparent" icon="pi pi-sign-out" text/>
      </div>

    </div>
    <!-- /right bar -->

  </div>
</template>


<script setup lang="js">
useState('sidebar', () => true);
</script>


<script lang="js">
export default defineComponent({

  name: "Appbar",

  computed: {
    sidebar() {
      return useState('sidebar').value;
    }
  }

})
</script>