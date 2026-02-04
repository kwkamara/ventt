<template>
  <div class="col-12 h-4rem p-0 lg:pr-2 flex align-items-center justify-content-between border-bottom-1 border-gray-200 select-none">

    <!-- logo -->
    <div v-if="sidebar" class="w-3 md:w-2 lg:w-1 h-full p-3 flex align-items-center justify-content-center border-right-1 border-gray-200 hover:shadow-2 hover:bg-purple-50"
         @click="navigateTo('/')">
      <img src="/logo-ventt.svg" class="w-2rem" alt="ventt logo"/>
    </div>
    <!-- /logo -->


    <!-- right menu -->
    <div :class="(sidebar ? 'w-9 lg:w-11' : 'w-full') + ' px-3 md:px-5 flex justify-content-between align-items-center'">

      <!-- toggle | profile -->
      <div class="flex align-items-center gap-5">
        <!-- toggle menu -->
        <span class="block h-full material-icons-outlined cursor-pointer text-purple-700"
              @click="useState('sidebar').value=!sidebar">
        menu
      </span>

        <Icon icon="person"/>
      </div>
      <!-- /toggle | profile -->


      <!-- messages | sign out -->
      <div class="flex align-items-center justify-content-end gap-1 lg:gap-3">
        <!-- notifications -->
        <Icon icon="notifications"/>
        <Divider layout="vertical"/>

        <!-- messages -->
        <Icon icon="mail"/>
        <Divider layout="vertical"/>

        <!-- sign out -->
        <Icon icon="logout" class="text-red-700"/>
      </div>
      <!-- /messages | sign out -->

    </div>
    <!-- /right menu -->

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
  },

  methods: {
    logout() {
      navigateTo('/');
    }
  }

})
</script>