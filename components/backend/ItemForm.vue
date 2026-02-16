<template>

  <div class="grid m-0">

    <!-- name | Description -->
    <div v-for="prop in category.props.filter(p => p.key && !p.no_edit)"
         :class="'col-12 px-4 pt-4 pb-5 text-gray-700 ' + (prop.name === 'description' ? '': 'lg:col-4')">

      <Select v-if="prop.select"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :optionLabel="prop.label"
              :options="getCategoryByName(prop.select).data"
              :placeholder="prop.header || prop.name"
              input-class="h-2rem pl-0 bg-white border-none border-bottom-1 border-gray-300 text-sm" fluid
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
                  input-class="h-2rem pl-0 text-sm text-gray-700 hover:text-purple-700 cursor-pointer border-none border-bottom-1 border-gray-300"/>

      <InputText v-else-if="category.name === 'products' && prop.name ==='name'"
                 :id="prop.name + '-ip'"
                 v-model="item.name.en"
                 autocomplete="off"
                 class="w-full h-2rem pl-0 bg-transparent border-none border-bottom-1 border-gray-300" fluid unstyled/>

      <InputText v-else
                 :id="prop.name + '-ip'"
                 v-model="item[prop.name]"
                 autocomplete="off"
                 class="w-full h-2rem pl-0 pb-1 bg-transparent border-none border-bottom-1 border-gray-300" fluid unstyled/>

      <label class="mt-1 text-xs uppercase text-gray-500" :for="prop.name + '-ip'">
        {{ prop.name }}
      </label>
    </div>
    <!-- /name | Description -->


    <!-- other props -->
    <div v-for="prop in category.props.filter(p => !p.no_edit && !p.key)"
         class="col-6 lg:col-4 p-4 pb-5">

      <InputNumber v-if="prop.decimal"
                   :id="prop.name + '-ip'"
                   v-model="item[prop.name]"
                   :min-fraction-digits="2"
                   input-class="w-full h-2rem pl-0 bg-white text-sm border-none border-bottom-1 border-gray-300"
                   fluid use-grouping/>

      <Select v-else-if="prop.enum"
              input-class="h-2rem pl-0 bg-white border-none border-bottom-1 border-gray-400 text-sm capitalize"
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
                  input-class="h-2rem pl-0 text-sm text-gray-700 hover:text-purple-700 cursor-pointer border-none border-bottom-1 border-gray-300"/>

      <Select v-else-if="prop.select"
              :id="prop.name + '-ip'"
              v-model="item[prop.name]"
              :optionLabel="prop.label"
              :options="getCategoryByName(prop.select).data"
              :placeholder="prop.header || prop.name"
              input-class="h-2rem pl-0 bg-white border-none border-bottom-1 border-gray-300 text-sm" fluid
              :option-label="prop.rel || 'name'"
              option-value="id"/>

      <InputText v-else
                 :id="prop.name + '-ip'"
                 v-model="item[prop.name]"
                 :type="prop.number ? 'number' : 'text'"
                 class="w-full h-2rem pl-0 bg-white text-base border-none border-bottom-1 border-gray-300"
                 fluid unstyled/>


      <label class="mt-1 pb-1 block text-xs uppercase" :for="prop.name + '-ip'">
        {{ prop.header || prop.name }} {{ prop.suffix }}
      </label>
    </div>
    <!-- /props -->


    <!-- submit -->
    <div class="col-12 p-4 flex align-items-center justify-content-end">
      <VButtonCube :text="item.documentId? 'Update' : 'Submit' "
                   icon="check_circle_outline"
                   class="w-full"
                   fill="1"
                   @click="updateItem()"/>
    </div>
    <!-- /submit -->

  </div>
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