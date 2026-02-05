<template>
  <section class="grid m-0">
    <div class="col-12 px-2 py-5 lg:pt-7 lg:px-7 bg-gray-900 text-gray-400">

      <!-- footer box -->
      <div class="grid m-0 pb-2 w-full mb-5 align-items-start">

        <div class="col-12 md:col-3 pb-4 md:pb-0">
          <div class="h-3rem m-0 pb-3 flex align-items-center title uppercase">
            <img src="/logo-ventt.svg" alt="ventt logo" width="60" height="60"/>
          </div>
          <div class="flex flex flex-column gap-2 text-xs">
            <div class="title uppercase text-lg">
              Ventt | <span class="uppercase">Ecommerce</span>
            </div>
            <div>The Premium Ecommerce Solution</div>


            <!-- social -->
            <div class="pt-3 flex gap-2">
              <Button v-for="social in ['linkedin', 'facebook', 'twitter']"
                      :icon="'pi pi-' + social"
                      class="bg-gray-800 text-gray-400 border-none shadow-1"/>
            </div>
            <!-- social -->


          </div>
        </div>


        <div class="col-6 md:col-3">
          <h3 class="m-0 pb-3 flex align-items-center font-light">
            Product Range
          </h3>
          <div class="flex flex flex-column gap-3 text-sm capitalize">
            <div v-for="category in [ `men's`, `women's`, `kids'`]">
              {{ category }} Collection
            </div>
          </div>
        </div>


        <div class="col-6 md:col-3 text-right md:text-left">
          <h3 class="m-0 pb-3 font-light text-right md:text-left">
            Help
          </h3>
          <div class="flex flex flex-column gap-3 text-sm">
            <div>FAQ</div>
            <div>Shipping and Returns</div>
            <div>Contact us</div>
          </div>
        </div>


        <div class="col-12 md:col-3 pt-4 md:pt-2">
          <h3 class="m-0 pb-3 flex align-items-center font-light">
            Join Our Mailing List
          </h3>
          <p class="m-0 text-sm">Subscribe for exclusive offers and updates.</p>
          <div>
            <InputText unstyled fluid
                       autocomplete="off"
                       placeholder="Enter you email"
                       class="h-3rem w-full pl-0 bg-transparent shadow-1 border-none border-bottom-1 border-gray-700 text-gray-200"/>
            <div class="pt-3">
              <VButtonCube fill="1" icon="send" text="Subscribe"/>
            </div>
          </div>
        </div>

      </div>
      <!-- /footer box -->

      <!-- Copyright bar -->
      <div class="w-full pt-3 lg:pt-4 md:flex align-items-center justify-content-between border-top-1 border-gray-800">

        <!-- payments -->
        <div class="py-2 md:p-0 flex-1 flex justify-content-center lg:justify-content-start gap-3 text-xs text-center">
          <span>Paypal</span>
          <Divider layout="vertical" unstyled class="border-left-1 border-gray-500"/>
          <span>M-PESA</span>
          <Divider layout="vertical" unstyled class="border-left-1 border-gray-500"/>
          <NuxtLink to="/dashboard" class="no-underline text-gray-400">Dashboard</NuxtLink>
        </div>


        <!-- copyright -->
        <div class="py-2 md:p-0 text-xs md:text-sm font-light flex-1 flex gap-1 justify-content-center uppercase">
          <span>&copy; 2026. Ventt</span>
          <Divider layout="vertical"/>
          <NuxtLink to="https://linkedin.com/in/kwkamara"
                    target="_blank"
                    class="text-gray-300 no-underline hover:text-purple-400 text-sm">
            Kevin <span class="font-bold">Kamara</span>
          </NuxtLink>
        </div>

        <!-- Terms -->
        <div class="pt-2 md:p-0 flex-1 flex justify-content-center lg:justify-content-end gap-3 text-xs">
          <span>Privacy Policy</span>
          <Divider layout="vertical" unstyled class="border-left-1 border-gray-500"/>
          <span>Terms of Service</span>
        </div>
        <!-- Terms -->

      </div>
      <!-- /Copyright bar -->

    </div>
  </section>
</template>

<script setup lang="js">
//scroll.
const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
};
</script>

<script lang="js">
export default defineComponent({
  name: "VFooter",

  data() {
    return {}
  }
})
</script>