<template>
  <div class="w-full h-full overflow-hidden hover:shadow-3 relative text-white">

    <!-- image -->
    <img :alt="`Ventt Ecommerce Platform - ${category} ${type}`"
         :src="image"
         aria-hidden="true"
         class="w-full h-full absolute"/>

    <!-- type -->
    <div class="h-full w-full p-2 xl:p-3 bg-black-alpha-50 hover:bg-black-alpha-10 absolute">
      <h2 class="m-0 text-xl font-light capitalize text-right">{{ type }}</h2>
    </div>

  </div>
</template>



<script lang="js">
export default defineComponent({

  name: "ProductType",

  props: ['category', 'type', 'image'],

  data(){
    return {

    }
  }
})
</script>