<template>
  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none bg-gray-700 overflow-hidden border-bottom-1 border-purple-100">
    <Navbar/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!--  login grid -->
  <section class="grid m-0">

    <!-- left col -->
    <div class="col-12 md:col-6 hidden md:block bg-center bg-cover"
         style="background: url('/hero-img-3.webp'); min-height: 50vh"></div>
    <!-- /left col -->


    <!-- right col -->
    <div class="col-12 md:col-6 py-5 lg:py-7 flex align-items-center justify-content-center select-none">

      <!-- login box -->
      <div class="w-9 lg:w-5">
        <form autocomplete="off">
          <!-- email -->
          <div class="pb-3">
            <InputText id="email-ip"
                       class="h-3rem w-full block border-none border-bottom-1 border-gray-400 bg-white"
                       fluid :placeholder="$t('enter_email')"
                       autoComplete="new-password"
                       type="text" unstyled/>
            <label for="email-ip" class="text-xs text-gray-600">
              {{ $t('email') }}
            </label>
          </div>
          <!-- /email -->


          <!-- password -->
          <div v-if="['register','login'].includes(mode)">
            <InputText id="password-ip"
                       :feedback="false"
                       class="h-3rem w-full block border-none border-bottom-1 border-gray-400" fluid
                       :placeholder="$t('password')"
                       type="password" unstyled/>

            <div class="pb-3 flex justify-content-between">

              <label for="password-ip" class="block pt-1 text-xs text-gray-600">
                {{ $t('password') }}
              </label>

              <!-- reset password -->
              <div v-if="mode==='login'" class="text-right">
              <span class="text-gray-700 hover:text-purple-700 text-xs cursor-pointer"
                    @click="mode='reset password'">
                {{  $t('forgot_password') }}
              </span>
              </div>
              <!-- reset password -->
            </div>

          </div>
          <!-- /password -->


          <!-- confirm password -->
          <div v-if="mode==='register'" class="pb-6 flex flex-column gap-1">
            <InputText id="password-confirm-ip"
                       :feedback="false"
                       class="h-3rem w-full block border-none border-bottom-1 border-gray-400" fluid
                       :placeholder="$t('password')"
                       type="password" unstyled/>
            <label for="password-confirm-ip" class="block text-xs text-gray-600">
              {{$t('confirm_password')}}
            </label>
          </div>
          <!-- /confirm password -->


          <!-- submit -->
          <div class="pb-3">
            <VButtonCube :text="$t(mode)"
                         class="w-full"
                         :icon="mode==='login' ? 'lock' : 'account_circle'" fill="1"/>
          </div>
          <!-- /submit -->

          <div class="pt-3 pb-1 uppercase text-gray-600 text-center">
          {{ $t('or') }}
          </div>

          <!-- login | register -->
          <div class="h-4rem flex justify-content-end align-items-center gap-4">
            <VButtonCube v-if="mode!=='register'"
                         class="w-full"
                         :text="$t('register')"
                         icon="person_add"
                         @click="mode='register'"/>

            <VButtonCube v-if="mode!=='login'"
                         :text="$t('login')"
                         class="w-full"
                         icon="account_circle"
                         @click="mode='login'"/>
          </div>
          <!-- /login | register -->
        </form>

      </div>
      <!-- /login box -->

    </div>
    <!-- /right col -->

  </section>
  <!--  /login grid -->


  <!--  footer -->
  <VFooter class="select-none"/>
</template>


<script lang="js">
export default defineComponent({
  name: "Login",

  data() {
    return {
      username: null,
      password: null,
      submit  : null,

      mode: 'login'
    }
  },

  mounted() {
    this.mode = 'login';
  }
})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .title {
  font-family: 'Playfair Display', serif;
}
</style>