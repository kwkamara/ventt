<template>
  <NuxtPage/>
</template>


<style>
@font-face {
  font-family: 'Raleway';
  font-weight: 300;
  font-style: normal;
  src: url('~/fonts/Raleway.woff2') format('woff2'),
  url('~/fonts/Raleway.woff') format('woff');
}

@font-face {
  font-family: 'Playfair9';
  font-weight: 300;
  font-style: normal;
  src: url('~/fonts/Playfair_9pt-Regular.woff2') format('woff2'),
  url('~/fonts/Playfair_9pt-Regular.woff') format('woff');
}

@font-face {
  font-family: 'Garamond';
  font-weight: 300;
  font-style: normal;
  src: url('~/fonts/CormorantGaramond.woff2') format('woff2'),
  url('~/fonts/CormorantGaramond.woff') format('woff');
}

@font-face {
  font-family: 'MuseoModerno';
  font-weight: 300;
  font-style: normal;
  src: url('~/fonts/MuseoModerno-VariableFont_wght.woff2') format('woff2'),
  url('~/fonts/MuseoModerno-VariableFont_wght.woff') format('woff');
}


body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}

.title {
  font-family: 'Garamond', serif;
}

.decimal {
  font-family: 'MuseoModerno', serif;
}

.p-megamenu-item-content {
  background: transparent !important;
}

.p-popover-content {
  padding: 0 !important;
}
</style>