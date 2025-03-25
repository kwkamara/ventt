<template>
  <div class="col-12 h-8rem md:h-10rem px-3 md:px-8 flex align-items-center justify-content-center shadow-2 relative">

    <NuxtImg alt="Ventt Ecommerce Platform" class="w-full h-full absolute inset-0 object-cover border-round"
             fit="cover" loading="lazy" src="/winter-1-1520.webp"/>

    <div class="flex absolute px-3">
      <InputText type="email" size="large" id="email-ip" class="border-noround-right text-sm"
                 placeholder="enter your email" v-model="email" fluid/>
      <Button label="Subscribe" size="large" class="px-5 text-sm border-noround-left bg-purple-700 border-none"/>
    </div>

  </div>
</template>


<script lang="js">
export default defineComponent({

  name: "Subscribe",

  data() {

    return {
      email: null
    }

  }
})
</script>