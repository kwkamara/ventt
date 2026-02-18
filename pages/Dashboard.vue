<template>

  <section id="dashboard" class="grid m-0 bg-gray-100 text-gray-700 sans-serif">
    <client-only>
      <DNav/>
      <Content/>
    </client-only>
  </section>

</template>


<script setup lang="js">
useState('admin', () => [
  //ORDERS.
  {
    name       : "orders",
    description: "Client global orders",
    icon       : "shopping_cart",
    total      : 0,
    annual     : [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],


    //linked categories props.
    linked_categories: {
      "products": [
        {
          name   : "price",
          decimal: 1
        },
        {
          name  : "quantity",
          number: 1
        },
        {
          name   : "total",
          decimal: 1,
          no_edit: 1
        },
        {
          name: "description",
          text: 1
        },
      ]
    },


    //struct.
    props: [
      //key props.
      {
        name   : "id",
        prefix : "#",
        key    : 1,
        header : "order number", //timestamp.
        no_edit: 1,
      },

      {
        name: "date",
        key : 1,
        date: 1
      },

      {
        name   : "documentId",
        no_edit: 1,
        no_tbl : 1,
        no_info: 1,
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },

      {
        name   : "quantity",
        key    : 1,
        no_edit: 1,
        decimal: 1
      },

      {
        name   : "total",
        key    : 1,
        no_edit: 1,
        decimal: 1
      },

      //other props.
      {
        name: "status",
        enum: ['delivered', 'shipped', 'processing', 'cancelled', 'approved', 'returned'],
      },

      {
        name  : "payment",
        enum  : ['Cash', 'PayPal', 'Credit', 'M-PESA'],
        header: "payment mode"
      },

      {
        name  : "customer",
        key   : 1,
        select: "customers",
        rel   : "name",
        prefix: "cust-"
      },
    ],

    //metrics.
    metrics: [
      {
        name : "approved",
        value: 0,
        icon : "beenhere"
      },
      {
        name : "processing",
        value: 0,
        icon : "info"
      },
      {
        name : "cancelled",
        value: 0,
        icon : "block"
      },
    ],

    //status.
    status: [
      {
        name : "shipped",
        value: 0,
        icon : "local_shipping"
      },
      {
        name : "delivered",
        value: 0,
        icon : "check_box"
      },
      {
        name : "returned",
        value: 0,
        icon : "assignment_return"
      },
    ],


    //data.
    data: [
      {
        id        : "001",
        total     : 0,
        customer  : "001",
        date      : new Date('Wed Feb 04 2026 00:00:00 GMT+0300 (East Africa Time)'),
        documentId: "ord-001",
        files     : [],
        images    : [],
        order_no  : "ORD-001",
        products  : {
          "p-001": {
            sku        : "sku-001",
            quantity   : 20,
            price      : 200,
            description: "To be delivered to abc street.",
            total      : 100
          },
          "p-002": {
            sku        : "sku-002",
            quantity   : 20,
            price      : 800,
            description: "To be delivered to xyz street.",
            total      : 0
          },
        },
        status    : "approved",
        state     : "delivered",
      },
      {
        id        : "002",
        total     : 0,
        customer  : "002",
        date      : new Date('Mon Jun 08 2025 00:00:00 GMT+0300 (East Africa Time)'),
        documentId: "ord-002",
        files     : [],
        images    : [],
        order_no  : "ORD-002",
        products  : {
          "p-002": {
            sku        : "sku-003",
            quantity   : 10,
            price      : 400,
            description: "-",
            total      : 0
          }
        },
        status    : "processing",
        state     : "shipped",
      }
    ]
  },


  //PRODUCTS.
  {
    name  : "products",
    icon  : "inventory_2",
    total : 0,
    annual: [100, 325, 300, 620, 540, 325, 702, 620, 540, 325, 702, 620],

    //struct.
    props: [
      //key props.
      {
        name: "name",
        key : 1,
      },

      {
        name: "sku",
        key : 1,
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },


      {
        name   : "price",
        decimal: 1,
      },


      {
        name   : "cost",
        key    : 1,
        decimal: 1
      },


      {
        name   : "amount",
        hidden : 1,
        no_edit: 1
      },

      {
        name   : "weight",
        no_tbl : 1,
        suffix : "(grams)",
        decimal: 1
      },

      {
        name  : "dimensions",
        no_tbl: 1,
        suffix: "(cm)"
      },

      {
        name   : "discount",
        no_tbl : 1,
        decimal: 1,
        suffix : "(%)"
      },
    ],

    //metrics
    metrics: [
      {
        name : "in stock",
        value: 0,
        icon : "beenhere"
      },
      {
        name : "low stock",
        value: 0,
        icon : "report"
      },
      {
        name : "out of stock",
        value: 0,
        icon : "report_problem"
      },
    ],

    //status
    status: [
      {
        name : "approved",
        value: 0,
        icon : "check"
      },
      {
        name : "processing",
        value: 0,
        icon : "report"
      },
      {
        name : "suspended",
        value: 0,
        icon : "lock"
      },
    ],

    //items.
    data: useState('products').value
  },


  //INTAKES.
  {
    name  : "intakes",
    icon  : "output",
    total : 0,
    annual: [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

    //struct.
    props: [
      //key props.
      {
        name   : "id",
        prefix : "#",
        key    : 1,
        header : "intake number", //timestamp.
        no_edit: 1,
      },

      {
        name: "date",
        key : 1,
        date: 1
      },

      {
        name   : "documentId",
        no_edit: 1,
        no_tbl : 1,
        no_info: 1,
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },

      {
        name   : "total",
        key    : 1,
        no_edit: 1,
        decimal: 1
      },

      //other props.
      {
        name: "status",
        enum: ['delivered', 'processing', 'approved', 'returned'],
      },

      {
        name  : "payment",
        enum  : ['Cash', 'PayPal', 'Credit', 'M-PESA'],
        header: "payment mode"
      },

      {
        name  : "supplier",
        key   : 1,
        select: "suppliers",
        rel   : "name",
        prefix: "sup-"
      },
    ],

    //linked categories props.
    linked_categories: {
      "products": [
        {
          name   : "price",
          decimal: 1
        },
        {
          name  : "quantity",
          number: 1
        },
        {
          name   : "total",
          decimal: 1,
          no_edit: 1
        },
        {
          name: "description",
          text: 1
        },
      ]
    },

    //metrics.
    metrics: [
      {
        name : "processing",
        value: 0,
        icon : "info"
      },
      {
        name : "approved",
        value: 0,
        icon : "beenhere"
      },
      {
        name : "cancelled",
        value: 0,
        icon : "block"
      },
    ],

    //items.
    data   : [],
    parent : "products",
    related: []
  },


  //RETURNS.
  {
    name  : "returns",
    icon  : "assignment_return",
    total : 0,
    annual: [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],


    //struct.
    props: [
      //key props.
      {
        name   : "id",
        prefix : "#",
        key    : 1,
        header : "intake number", //timestamp.
        no_edit: 1,
      },

      {
        name: "date",
        key : 1,
        date: 1
      },

      {
        name   : "documentId",
        no_edit: 1,
        no_tbl : 1,
        no_info: 1,
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },

      {
        name   : "total",
        key    : 1,
        no_edit: 1,
        decimal: 1
      },

      //other props.
      {
        name: "status",
        enum: ['delivered', 'processing', 'approved', 'returned'],
      },

      {
        name  : "payment",
        enum  : ['Cash', 'PayPal', 'Credit', 'M-PESA'],
        header: "payment mode"
      },

      {
        name  : "supplier",
        key   : 1,
        select: "suppliers",
        rel   : "name",
        prefix: "sup-"
      },
    ],


    //linked categories props.
    linked_categories: {
      "products": [
        {
          name   : "price",
          decimal: 1
        },
        {
          name  : "quantity",
          number: 1
        },
        {
          name   : "total",
          decimal: 1,
          no_edit: 1
        },
        {
          name: "description",
          text: 1
        },
      ]
    },


    //metrics.
    metrics: [
      {
        name : "processing",
        value: 0,
        icon : "info"
      },
      {
        name : "approved",
        value: 0,
        icon : "beenhere"
      },
      {
        name : "cancelled",
        value: 0,
        icon : "block"
      },
    ],


    //items.
    data  : [],
    parent: "products"
  },


  //CUSTOMERS.
  {
    name  : "customers",
    icon  : "group",
    total : 0,
    annual: [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

    //struct.
    props: [
      {
        name: "name",
        key : 1
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },

      {
        name   : "orders",
        decimal: 1,
        no_edit: 1
      },

      {
        name: "status",
        key : 1,
        enum: ["active", "banned", "review"]
      },
    ],

    //metrics.
    metrics: [
      {
        name : "active",
        value: 0,
        icon : "check"
      },
      {
        name : "review",
        value: 0,
        icon : "info"
      },
      {
        name : "banned",
        value: 0,
        icon : "block"
      },
    ],

    //status.
    status: [
      {
        name : "retailers",
        value: 0,
        icon : "group"
      },
      {
        name : "wholesalers",
        value: 0,
        icon : "home_work"
      },
      {
        name : "institution",
        value: 0,
        icon : "corporate_fare"
      },
    ],

    //analysis.
    metrics_1: {local: 0, foreign: 0},

    //data.
    data: [
      {
        name       : "Kevin Kamara",
        id         : "001",
        description: "https://linkedin.com/in/kwkamara",
        status     : "active"
      }
    ]
  },


  //SUPPLIERS
  {
    name    : "suppliers",
    icon    : "group_add",
    quantity: 0,
    total   : 0,
    annual  : [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 620],

    //struct.
    props: [
      {
        name: "name",
        key : 1
      },

      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },

      {
        name  : "rating",
        rating: 1,
        no_tbl: 1,
        number: 1
      },
    ],

    //metrics.
    metrics: [
      {
        name : "active",
        value: 0,
        icon : "check"
      },
      {
        name : "review",
        value: 0,
        icon : "info"
      },
      {
        name : "banned",
        value: 0,
        icon : "block"
      },
    ],

    //status.
    status: [
      {
        name : "artisans",
        value: 0,
        icon : "group"
      },
      {
        name : "distributors",
        value: 0,
        icon : "warehouse"
      },
      {
        name : "manufacturers",
        value: 0,
        icon : "factory"
      },
    ],

    //items.
    data: [
      {
        name       : "Nairobi Fiber",
        description: "",
        categories : {},
        documentId : "S-001",
        files      : [],
        images     : [],
        rating     : 5,
        status     : "active",
        state      : "distributors",
      },

      {
        name       : "Top Cloth",
        description: "",
        categories : {},
        documentId : "S-002",
        files      : [],
        images     : [],
        rating     : 3,
        status     : "review",
        state      : "distributors",
      },

      {
        name       : "Zippers",
        description: "",
        categories : {},
        documentId : "S-004",
        files      : [],
        images     : [],
        rating     : 2,
        status     : "review",
        state      : "distributors",
      },
    ]
  },


  {
    name  : "discounts",
    icon  : "money_off",
    total : 0,
    annual: [100, 600, 702, 200, 540, 325, 400, 620, 200, 325, 702, 620],


    //struct.
    props: [
      {
        name: "start",
        date: 1,
        key : 1
      },

      {
        name: "end",
        date: 1,
        key : 1
      },


      {
        name  : "description",
        key   : 1,
        no_tbl: 1
      },


      {
        name: "type",
        enum: ['fixed', 'percentage'],
      },

      {
        name: "code",
      },

      {
        name   : "amount",
        decimal: 1
      },

      {
        name: "status",
        enum: ['active', 'expired', 'review']
      }
    ],

    //metrics.
    metrics: [
      {
        name : "active",
        value: 0,
        icon : "info"
      },
      {
        name : "expired",
        value: 0,
        icon : "beenhere"
      },
      {
        name : "review",
        value: 0,
        icon : "block"
      },
    ],

    //linked categories props.
    linked_categories: {
      "products": [
        {
          name   : "price",
          decimal: 1
        },
      ]
    },

    //items.
    data: [],

    //parent category.
    parent: "products"
  },


  {
    name  : "report",
    icon  : "pi pi-file",
    parent: "product"
  },
])
</script>


<script lang="js">
export default defineComponent({
  name: "DNav",

  methods: {},

  beforeMount() {

  }

});
</script>

