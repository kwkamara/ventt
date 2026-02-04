<template>

  <!-- name | Description -->
  <div v-for="prop_name in ['name', 'description']" class="px-4">
    <InputText :id="prop_name + '-ip'"
               autocomplete="off"
               class="text-xs bg-transparent h-3rem border-none border-bottom-1 border-gray-300"
               v-model="item[prop_name]"
               fluid/>

    <label class="block pb-1 text-xs text-purple-600 capitalize"
           :for="prop_name + '-ip'">{{ prop_name }}
    </label>
  </div>
  <!-- /name | Description -->


  <!-- props -->
  <div class="grid m-0 pt-4 ">

    <div v-for="prop in category.props.filter(p => !p.no_edit && !['name', 'description'].includes(p.name))"
         class="col-6 px-4">

      <InputNumber v-if="prop.decimal"
                   :id="prop.name + '-ip'"
                   v-model="item[prop.name]"
                   :min-fraction-digits="2"
                   class="pl-0 text-sm border-none border-bottom-1 border-gray-400"
                   fluid use-grouping/>

      <Select v-else-if="prop.enum"
              class="bg-transparent border-none border-bottom-1 border-gray-400"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :options="prop.enum"
              :placeholder="prop.header || prop.name"
              fluid/>

      <DatePicker v-else-if="prop.date"
                  :id="prop.name + '-ip'"
                  v-model="item[prop.name]"
                  fluid/>

      <Select v-else-if="prop.select"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :optionLabel="prop.label"
              :options="getCategoryByName(prop.select).data"
              :placeholder="prop.header || prop.name"
              class="bg-transparent border-none border-bottom-1 border-gray-400"
              fluid
              option-value="documentId"/>

      <InputText v-else
                 :id="prop.name + '-ip'"
                 class="pl-0 border-none border-bottom-1 border-gray-400"
                 v-model="item[prop.name]"
                 fluid/>

      <label class="mt-1 pb-1 block text-xs text-purple-600 capitalize"
             :for="prop.name + '-ip'">
        {{ prop.header || prop.name }}
      </label>
    </div>

  </div>
  <!-- /props -->


  <!-- submit -->
  <div class="p-4 flex align-items-center justify-content-end">
    <Button class="bg-purple-700 border-none"
            icon="pi pi-check"
            label="Submit"
            @click="updateItem()"/>
  </div>
  <!-- /submit -->

</template>


<script lang="js">
export default defineComponent({
  name : "ItemForm",
  props: ['item', 'category', 'categories'],
  emits: ['update'],

  methods: {
    getCategoryByName(category_name) {
      if (!this.categories) return [];
      return this.categories.find(cat => cat.name === category_name);
    },

    //item update.
    updateItem() {
      //emit.
      this.$emit('update', this.item);

      //notify popup.
      this.$toast.add({severity: "info", summary: "item updated", life: 1000});
    }


  },

})
</script>