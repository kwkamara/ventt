<template>

  <!-- name | Description -->
  <div v-for="prop in category.props.filter(p => p.key)" class="px-4 pb-4 text-gray-700">

    <Select v-if="prop.select"
            :id="prop.name + '-ip'"
            v-model="item[prop.name]"
            :optionLabel="prop.label"
            :options="getCategoryByName(prop.select).data"
            :placeholder="prop.header || prop.name"
            input-class="pl-0 bg-white border-none border-bottom-1 border-gray-300" fluid
            :option-label="prop.rel || 'name'"
            option-value="id"/>

    <Textarea v-else-if="prop.name ==='description' && category.name === 'products'"
              :rows="3"
              v-model="item.description.en"
              class="w-full pl-0 bg-white border-none border-bottom-1 border-gray-300" unstyled fluid/>

    <Textarea v-else-if="prop.name ==='description'"
              :rows="3"
              v-model="item.description"
              class="w-full pl-0 bg-white border-none border-bottom-1 border-gray-300" unstyled fluid/>

    <DatePicker v-else-if="prop.date"
                :id="prop.name + '-ip'"
                v-model="item[prop.name]"
                :aria-label="item[prop.name]"
                date-format="dd/mm/yy" fluid
                input-class="pl-0 pb-0 text-sm text-gray-700 hover:text-purple-700 cursor-pointer border-none border-bottom-1 border-gray-300"/>

    <InputText v-else-if="category.name === 'products' && prop.name ==='name'"
               :id="prop.name + '-ip'"
               v-model="item.name.en"
               autocomplete="off"
               class="w-full pl-0 bg-transparent h-3rem border-none border-bottom-1 border-gray-300" fluid unstyled/>

    <InputText v-else
               :id="prop.name + '-ip'"
               v-model="item[prop.name]"
               autocomplete="off"
               class="w-full pl-0 bg-transparent h-3rem border-none border-bottom-1 border-gray-300" fluid unstyled/>

    <label class="mt-1 text-xs uppercase text-gray-500" :for="prop.name + '-ip'">
      {{ prop.name }}
    </label>
  </div>
  <!-- /name | Description -->


  <!-- other props -->
  <div class="grid m-0">

    <div v-for="prop in category.props.filter(p => !p.no_edit && !p.key)" class="col-6 px-4 pb-4">

      <InputNumber v-if="prop.decimal"
                   :id="prop.name + '-ip'"
                   v-model="item[prop.name]"
                   :min-fraction-digits="2"
                   input-class="w-full pl-0 bg-white text-sm h-3rem border-none border-bottom-1 border-gray-300"
                   fluid use-grouping/>

      <Select v-else-if="prop.enum"
              input-class="pl-0 bg-white border-none border-bottom-1 border-gray-400 text-sm"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :options="prop.enum"
              :placeholder="prop.header || prop.name"
              fluid/>

      <DatePicker v-else-if="prop.date"
                  :id="prop.name + '-ip'"
                  v-model="item[prop.name]"
                  :aria-label="item[prop.name]"
                  date-format="dd/mm/yy" fluid
                  input-class="pl-0 pb-0 text-sm text-gray-700 hover:text-purple-700 cursor-pointer border-none border-bottom-1 border-gray-300"/>

      <Select v-else-if="prop.select"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :optionLabel="prop.label"
              :options="getCategoryByName(prop.select).data"
              :placeholder="prop.header || prop.name"
              input-class="pl-0 bg-white border-none border-bottom-1 border-gray-300 text-sm" fluid
              :option-label="prop.rel || 'name'"
              option-value="id"/>

      <InputText v-else-if="prop.number"
                 type="number"
                 :id="prop.name + '-ip'"
                 class="w-full pl-0 bg-white text-base h-3rem border-none border-bottom-1 border-gray-300" unstyled
                 v-model="item[prop.name]"
                 fluid/>

      <InputText v-else
                 :id="prop.name + '-ip'"
                 class="w-full pl-0 bg-white text-base h-3rem border-none border-bottom-1 border-gray-300" unstyled
                 v-model="item[prop.name]"
                 fluid/>

      <label class="mt-1 pb-1 block text-xs capitalize" :for="prop.name + '-ip'">
        {{ prop.header || prop.name }} {{ prop.suffix }}
      </label>
    </div>

  </div>
  <!-- /props -->


  <!-- submit -->
  <div class="p-4 flex align-items-center justify-content-end">
    <VButtonCube :text="item.documentId? 'Update' : 'Submit' "
                 icon="check_circle_outline"
                 class="w-full"
                 fill="1"
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

      //notify popup.
      this.$toast.add({
        severity: "info",
        summary : this.item.documentId ? "item updated" : "item added",
        life    : 1000
      });

      //emit.
      this.$emit('update', this.item);
    }


  },

})
</script>