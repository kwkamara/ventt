<template>
  <NuxtPage/>

  <!-- Toast -->
  <Toast position="top-right" unstyled>
    <template #container="{ message }">
      <div class="w-full h-full p-3 border-none flex align-items-center gap-2 bg-purple-700 text-white sans-serif border-round-2xl">
        <span class="material-icons-outlined">check_circle</span>
        <span class="capitalize">{{ message.summary }}</span>
      </div>
    </template>
  </Toast>

</template>


<style>
body {
  margin: 0;
  padding: 0;
}

.decimal {
  font-family: 'Inter', sans-serif;
}


.p-popover-content {
  padding: 0 !important;
}


.fade-enter-active {
  transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1)
}

.fade-leave-active {
  transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1)
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.text-spaced {
  letter-spacing: 0.1em
}

.sans-serif {
  font-family: 'Roboto Regular', sans-serif;
}

.text-gold {
  color: rgb(204, 162, 36) !important;
}

.bg-gold {
  background-color: rgb(204, 162, 36) !important;
}

/* input text */
input:focus,
input:not(:placeholder-shown) {
  background-color: transparent;
  outline: none;
}

.p-inputtext {
  background: transparent !important;
}

/* When input has value (Material theme) */
.p-inputtext.p-filled {
  background: transparent !important;
}



@media screen and (min-width: 992px) {
  .lg\:w-36rem {
    width: 36rem !important;
  }
}
</style>