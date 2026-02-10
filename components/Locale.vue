<template>
  <template v-for="(locale_, ix) in locales">

    <span @click="setLocale(locale_.code); useState('locale').value = locale_.code;"
          aria-label="button"
          :class="'capitalize cursor-pointer ' + (locale_.code === locale ? 'font-bold' : 'font-light text-gray-500 ')">
      {{ locale_.code }}
    </span>

    <Divider v-if="ix !== (locales.length-1)" layout="vertical" class="h-1rem"/>
  </template>
</template>


<script lang="js" setup>
const {locales, locale, setLocale} = useI18n();
</script>


<script lang="js">
export default defineComponent({
  name: "Locale",

  methods: {

  }
})
</script>