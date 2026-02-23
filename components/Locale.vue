<template>
  <template v-for="(locale_, ix) in locales">

    <span @click="setLocale(locale_.code); useState('locale').value = locale_.code;" aria-label="button"
          :class="'capitalize cursor-pointer hover:text-yellow-700 ' + (locale_.code === locale ? 'font-bold' : 'font-light text-gray-400 ')">
      {{ locale_.code }}
    </span>

    <!-- divider -->
    <template v-if="ix !== (locales.length-1)" >
      <Divider v-if="dark" layout="vertical" class="h-1rem mx-3 border-1 border-purple-900" unstyled/>
      <Divider v-else layout="vertical" class="h-1rem"/>
    </template>
    <!-- /divider -->

  </template>
</template>


<script lang="js" setup>
const {locales, locale, setLocale} = useI18n();
</script>


<script lang="js">
export default defineComponent({
  name   : "Locale",
  props  : ['dark'],
  methods: {}
})
</script>