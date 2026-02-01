<template>
  <NuxtPage/>
</template>


<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .title {
  font-family: 'Playfair Display', serif;
}

.decimal {
  font-family: 'Inter', sans-serif;
}


.p-popover-content {
  padding: 0 !important;
}

.material-icons,
.material-icons-outlined,
.material-icons-sharp,
.material-icons-round {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
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

.text-gold {
  color: rgb(204, 162, 36) !important;
}

.bg-gold {
  background-color: rgb(204, 162, 36) !important;
}
</style>