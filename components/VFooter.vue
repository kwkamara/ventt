<template>
  <section class="grid m-0 bg-purple-800 text-gray-300">
    <div class="col-12 px-3 py-6 lg:pt-7 lg:px-6">

      <!-- footer box -->
      <div class="grid m-0 py-2 w-full">

        <!-- Mailing list -->
        <div class="col-12 pt-0 pb-6 xl:pb-6 text-center md:text-left">
          <h3 class="m-0 pb-1 text-purple-100 text-sm text-spaced uppercase text-center md:text-left">
            {{ $t('mailing_title') }}
          </h3>

          <p class="m-0 text-sm text-purple-200">
            {{ $t('mailing_subtitle') }}
          </p>

          <div class="pt-3 md:pr-4 md:w-5 lg:flex gap-3">
            <InputText unstyled fluid
                       autocomplete="off"
                       id="subscribe-email-ip"
                       :placeholder="$t('enter_email')"
                       class="h-3rem w-full pl-3 bg-purple-900 border-round-xl border-1 border-purple-700 text-purple-50 shadow-2 focus:outline-none focus:border-purple-400"/>

            <VButtonCube :text="$t('subscribe')"
                         class="lg:w-5  mt-3 lg:m-0 bg-gold shadow-1"
                         fill="1"
                         icon="send"
                         icon_right="1"/>
          </div>

        </div>
        <!-- /Mailing list -->


        <div class="col-12 md:col-3 pb-4 md:pb-0">

          <div class="h-3rem m-0 pb-3 flex align-items-center title uppercase">
            <img src="/logo-ventt.svg" alt="ventt logo" width="60" height="60"/>
          </div>

          <div class="pt-2 text-xs">
            <h2 class="m-0 title uppercase text-xl font-light text-spaced">
              Ventt | <span class="uppercase">{{ $t('ecommerce') }}</span>
            </h2>
            <div class="text-sm opacity-90">
              {{ $t('tagline') }}
            </div>

          </div>
        </div>


        <div class="col-6 md:col-3">
          <h3 class="m-0 pb-3 flex align-items-center font-light text-purple-100 text-sm text-spaced uppercase">
            {{ $t('product_range') }}
          </h3>
          <div class="text-sm capitalize">
            <div v-for="category in [$t('collection_men'), $t('collection_women'), $t('collection_kids')]"
                 class="pb-3 flex align-items-center gap-2 cursor-pointer text-purple-200 hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="material-icons-outlined text-xs opacity-70">arrow_right</span>
              <span>{{ $t(category) }}</span>
            </div>
          </div>
        </div>


        <div class="col-6 md:col-3 text-right md:text-left">
          <h3 class="m-0 pb-3 font-light text-right md:text-left text-purple-100 text-sm text-spaced uppercase">
            {{ $t('help') }}
          </h3>
          <div class="text-sm">
            <div class="pb-3 cursor-pointer text-purple-200 hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('faq') }}
            </div>
            <div class="pb-3 cursor-pointer text-purple-200 hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('shipping_link') }}
            </div>
            <div class="pb-3 cursor-pointer text-purple-200 hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('contact_us') }}
            </div>
          </div>
        </div>


        <!-- Customer links -->
        <div class="col-6 md:col-3">

          <h3 class="m-0 pb-3 font-light text-purple-100 text-sm text-spaced uppercase">
            {{ $t('footer_customer') }}
          </h3>

          <div class="text-sm text-purple-200">
            <div class="pb-3 cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="mr-1 material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('footer_customer_my_account') }}
            </div>
            <div class="pb-3 cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="mr-1 material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('footer_customer_order_tracking') }}
            </div>
            <div class="pb-3 cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              <span class="mr-1 material-icons-outlined text-xs opacity-70">arrow_right</span>
              {{ $t('footer_customer_returns_portal') }}
            </div>
          </div>
        </div>


        <!-- Company links -->
        <div class="col-6 md:col-3 pt-4 md:pt-0 hidden">
          <h3 class="m-0 pb-3 font-light text-purple-100 text-sm text-spaced uppercase text-right md:text-left">
            {{ $t('footer_company') }}
          </h3>
          <div class="flex flex-column gap-3 text-sm text-purple-200">
            <span class="cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              {{ $t('footer_company_about') }}
            </span>
            <span class="cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              {{ $t('footer_company_blog') }}
            </span>
            <span class="cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              {{ $t('footer_company_careers') }}
            </span>
            <span class="cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              {{ $t('privacy_policy') }}
            </span>
            <span class="cursor-pointer hover:text-yellow-400 transition-colors transition-duration-150">
              {{ $t('terms_of_service') }}
            </span>
          </div>
        </div>




      </div>
      <!-- /footer box -->


      <div class="md:pl-2 md:pr-3 flex justify-content-between align-items-center">
        <!-- social -->
        <div class="py-3 flex gap-3">
          <Button v-for="social in ['linkedin', 'facebook', 'twitter']"
                  :icon="'pi pi-' + social"
                  class="bg-purple-900 border-none shadow-2 text-gray-300 hover:bg-purple-700 hover:text-yellow-300 transition-colors transition-duration-150 rounded-full w-2.5rem h-2.5rem"/>
        </div>
        <!-- social -->

        <!-- locales -->
        <div class="pt-4 flex align-items-center gap-1 text-white">
          <Locale dark="1"/>
        </div>
        <!-- /locales -->
      </div>


      <!-- Copyright bar -->
      <div class="w-full pt-3 lg:pt-4 md:pr-3 md:pl-2 md:flex align-items-center justify-content-between border-top-1 border-purple-900">

        <!-- payments -->
        <div class="py-2 md:p-0 flex-1 flex align-items-center justify-content-center lg:justify-content-start gap-3 text-xs text-center text-purple-200">
          <span class="px-2 py-1 border-round-lg bg-purple-900 border-1 border-purple-700">
            {{ $t('payment_paypal') }}
          </span>
          <Divider layout="vertical" class="mx-3 h-1rem border-1 border-purple-900 text-gray-800" unstyled/>
          <span class="px-2 py-1 border-round-lg bg-purple-900 border-1 border-purple-700">
            {{ $t('payment_mpesa') }}
          </span>
          <Divider layout="vertical" class="mx-3 h-1rem border-1 border-purple-900 text-gray-800" unstyled/>
          <NuxtLink to="/dashboard" class="no-underline text-purple-200 hover:text-yellow-400 capitalize transition-colors transition-duration-150">
            {{ $t('dashboard') }}
          </NuxtLink>
        </div>
        <!-- /payments -->

        <!-- copyright -->
        <div class="py-2 md:p-0 text-xs md:text-sm font-light flex justify-content-right gap-1 align-items-center uppercase text-purple-300">
          <span>&copy; 2026. Ventt</span>

          <Divider layout="vertical" class="mx-3 h-1rem border-1 border-purple-900 text-gray-800" unstyled/>

          <NuxtLink to="https://linkedin.com/in/kwkamara"
                    target="_blank"
                    class="text-purple-200 no-underline hover:text-yellow-400 text-sm transition-colors transition-duration-150">
            Kevin <span class="font-bold">Kamara</span>
          </NuxtLink>
        </div>

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