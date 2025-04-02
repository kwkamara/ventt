<template>

  <!-- name | Description -->
  <template v-for="prop_name in ['name', 'description']">
    <div v-if="prop_names.has(prop_name)" class="w-full h-4rem px-2">
      <label class="block pb-1 text-xs text-purple-600 capitalize" :for="`${prop_name}-ip`">{{ prop_name }}</label>
      <InputText :id="`${prop_name}-ip`" autocomplete="off" class="text-xs" v-model="useState('item').value[prop_name]" fluid/>
    </div>
  </template>
  <!-- /name | Description -->


  <!-- props -->
  <div class="grid m-0">

    <div v-for="prop in props.filter(p => (p.extra && !p.hidden))" class="col-6 lg:col-4">

      <label class="block pb-1 text-xs text-purple-600 capitalize" :for="`${prop.name}-ip`">
        {{ prop.header || prop.name }}
      </label>

      <InputNumber v-if="prop.decimal" :id="`${prop.name}-ip`" v-model="useState('item').value[prop.name]"
                   :min-fraction-digits="2" class="text-sm" fluid use-grouping/>

      <Select v-else-if="prop.enum" :id="`${prop.name}-ip`" v-model="useState('item').value[prop.name]"
              :options="prop.enum" :placeholder="`${prop.header || prop.name}`" fluid/>

      <DatePicker v-else-if="prop.date" :id="`${prop.name}-ip`" v-model="useState('item').value[prop.name]" fluid/>

      <Select v-else-if="prop.select" v-model="useState('item').value[prop.name]" :optionLabel="prop.label"
              :options="getCategoryByName(prop.select).items" :placeholder="`${prop.header || prop.name}`"
              fluid option-value="documentId"/>

      <InputText v-else :id="`${prop.name}-ip`" v-model="useState('item').value[prop.name]" class="text-sm" fluid/>

    </div>

  </div>
  <!-- /props -->


  <!-- submit -->
  <div class="h-4rem pr-2 flex align-items-center justify-content-end">
    <Button class="bg-purple-700 border-none" icon="pi pi-check" label="Submit"
            @click="useState('item').value=null; $emit('update')"/>
  </div>
  <!-- /submit -->

</template>


<script lang="js">
export default defineComponent({
  emits: ['update'],

  name: "ItemForm",

  computed: {

    category() {
      return useState('category').value;
    },

    props() {
      return useState('category').value.props;
    },

    prop_names() {
      return new Set(this.props.map(prop => prop.name));
    },

  },

  methods: {

    getCategoryByName(category_name) {
      return useState('categories').value.find(cat => cat.name === category_name);
    }

  }
})
</script>