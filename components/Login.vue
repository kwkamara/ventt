<template>
  <div class="col-12 p-0 bg-white">

    <div class="grid m-0">

      <!-- left col -->
      <div class="col-12 md:col-8 lg:col-6 pr-0 flex align-items-center justify-content-center">

        <!-- header -->
        <div class="h-5rem flex align-items-center text-xl font-bold capitalize">
          <span class="pr-4"> {{mode}} </span>
          <span class="text-gray-300 pl-4 border-left-1 border-gray-300">Secure</span>
        </div>
        <!-- /header -->

      </div>
      <!-- /left col -->


      <!-- right col -->
      <div class="col-12 md:col-4 lg:col-6 px-5 py-8 lg:pl-6 bg-gray-50 border-left-1 border-gray-200">

        <!-- login box -->
        <div class="lg:w-15rem">

          <!-- login container -->
          <div class="flex flex-column gap-5 capitalize">

            <!-- email -->
            <div class="flex flex-column gap-1">
              <label for="email-ip" class="text-xs">email</label>
              <InputText id="email-ip" type="email" fluid/>
            </div>
            <!-- /email -->

            <!-- password -->
            <div v-if="['register','login'].includes(mode)" class="flex flex-column gap-1">
              <label for="password-ip" class="text-xs">password</label>
              <Password id="password-ip" :feedback="false" fluid/>

              <!-- reset password -->
              <div v-if="mode==='login'" class="text-right">
                <Button label="forgot password?" text class="text-xs capitalize text-gray-600 bg-transparent hover:text-purple-600 pr-0"
                        @click="mode='reset password'"/>
              </div>
              <!-- reset password -->

            </div>
            <!-- password -->

            <!-- confirm password -->
            <div v-if="mode==='register'" class="flex flex-column gap-1">
              <label for="password-ip" class="text-xs">confirm password</label>
              <Password id="password-ip" type="email" fluid/>
            </div>
            <!-- /confirm password -->

            <!-- submit -->
            <div>
              <Button :label="mode" class="w-full border-none bg-purple-700 capitalize"/>
            </div>
            <!-- /submit -->

            <!-- google login -->
            <div v-if="mode==='login'">
              <Button class="w-full border-none bg-white-alpha-40 text-orange-500 shadow-1" icon="pi pi-google" label="google login"/>
            </div>
            <!-- google login -->

          </div>
          <!-- /login container -->


          <!-- login | register -->
          <div class="h-4rem flex justify-content-between align-items-center">
            <Button v-if="mode!=='register'" label="register" text class="text-xs capitalize pl-0 bg-transparent text-gray-600 hover:text-purple-600"  @click="mode='register'"/>
            <Button v-if="mode!=='login'" label="login" text class="text-xs capitalize pl-0 bg-transparent text-gray-600 hover:text-purple-600" @click="mode='login'"/>
          </div>
          <!-- /login | register -->

        </div>
        <!-- /login box -->

      </div>
      <!-- /right col -->

    </div>


  </div>
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


