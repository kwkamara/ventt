<template>
  <section class="grid m-0">
    <div class="col-12 px-2 py-5 lg:px-7 bg-gray-900 text-gray-300">

      <div class="grid m-0 w-full mb-5 align-items-start">

        <div class="col-6 md:col-3">

          <div class="h-3rem m-0 pb-3 flex align-items-center title uppercase">
            <img src="/logo-ventt.svg" alt="ventt logo" width="60" height="60"/>
          </div>

          <div class="flex flex flex-column gap-2 text-xs">
            <div class="title uppercase text-lg">
              Ventt | <span class="uppercase">Ecommerce</span>
            </div>
            <div>The Premium Ecommerce Solution</div>
          </div>
        </div>


        <div class="col-6 md:col-3">
          <h3 class="h-3rem flex align-items-center m-0">
            Technologies
          </h3>

          <div class="flex flex flex-column gap-2 text-xs">
            <div>Nuxt JS</div>
            <div>Node JS</div>
            <div>HTML5 | CSS3</div>
          </div>
        </div>


        <div class="col-6 md:col-3">
          <h3 class="h-3rem flex align-items-center m-0">
            Product Range
          </h3>

          <div class="flex flex flex-column gap-2 text-xs">
            <div>Men's Wear</div>
            <div>Women's Wear</div>
            <div>Kid's Wear</div>
          </div>
        </div>


        <div class="col-6 md:col-3">
          <h3 class="h-3rem flex align-items-center m-0">
            Terms & Conditions
          </h3>

          <div class="flex flex flex-column gap-2 text-xs">
            <div>Data Privacy</div>
            <div>Payment Terms</div>
            <div>FAQ</div>
          </div>
        </div>

      </div>


      <!-- Copyright bar -->
      <div class="w-full h-5rem flex align-items-center justify-content-between border-top-1 border-gray-800">

        <!-- payments -->
        <div class="text-xs md:text-lg text-gray-400 flex align-items-center gap-1 flex-1">
          <span>Paypal</span>
          <Divider layout="vertical" class="h-1rem"/>
          <span class="white-space-nowrap">M-PESA</span>
        </div>


        <!-- copyright -->
        <div class="text-xs md:text-sm font-light flex-1 text-center uppercase">&copy; 2025. Ventt</div>

        <!-- developer -->
        <div class="flex-1 text-right text-xs">
          Developed By:<br>
          <NuxtLink to="https://linkedin.com/in/kwkamara" target="_blank"
                    class="text-gray-300 no-underline hover:text-purple-400 text-sm">
            Kevin <span class="font-bold">Kamara</span>
          </NuxtLink>
        </div>

      </div>
      <!-- /Copyright bar -->

    </div>
  </section>
</template>


<script lang="js">
export default defineComponent({
  name: "VFooter",

  data() {
    return {}
  }
})
</script>