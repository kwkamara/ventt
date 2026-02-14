<template>

  <section id="dashboard" class="grid m-0 bg-gray-100 text-gray-700 sans-serif">
    <DNav/>
    <Content/>
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
    categories: {
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

    //metrics_1.
    metrics_1: {
      aov       : 0,
      conversion: 0
    },

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
    icon  : "grid_view",
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

    //metrics_1.
    metrics_1: {
      "avg price": 0,
      "avg cost" : 0
    },

    //items.
    data: []
  },


  {
    name    : "intakes",
    icon    : "box_add",
    quantity: 0,
    total   : 18750.80,

    //struct.
    props: [
      {name: "description", header: "details"},
      {extra: 1, header: "supplier", label: "name", name: "suppliers", select: "suppliers"},
      {key: 1, extra: 1, name: "po_number", header: "purchase number"},
    ],

    //status | state.
    status: {approved: 0, pending: 0, cancelled: 0},
    state : {shipped: 0, delivered: 0, returned: 0},

    //analysis.
    props_r1: {"avg cost": 0, "error rate": 0},
    // props_r2: {"top supplier": "Vendor-X", backorders: 7},

    //items.
    data  : [
      {
        categories: {},
        cost      : 2450.75,
        documentId: "In-001",
        files     : [],
        images    : [],
        po_number : "PO-3021",

        products: {
          "p-001": {
            cost    : 300,
            details : null,
            price   : 600,
            quantity: 100,
            total   : 0
          },
          "p-002": {
            cost    : 450,
            details : null,
            price   : 600,
            quantity: 200,
            total   : 0
          },
        },

        status  : "pending",
        state   : "shipped",
        supplier: null
      },
      {
        categories: {},
        cost      : 1899.99,
        documentId: "In-002",
        files     : [],
        images    : [],

        products: {
          "p-003": {
            cost    : 245,
            details : null,
            price   : 600,
            quantity: 100,
            total   : 0
          },
          "p-004": {
            cost    : 700,
            details : null,
            price   : 900,
            quantity: 200,
            total   : 0
          },
        },

        po_number: "PO-3020",
        status   : "approved",
        state    : "delivered",
        supplier : null
      }
    ],
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

    //metrics 1.
    metrics_1: {
      "avg rating": 4.6,
      "lead time" : 3.8
    },

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
    name    : "discounts",
    icon    : "money_off",
    quantity: 23,
    total   : 4500.25,

    props: [
      {name: "description"},

      {key: 1, extra: 1, name: "code"},
      {key: 1, extra: 1, name: "value", header: "value (%)"},

      {date: 1, extra: 1, header: "start date", name: "start"},
      {date: 1, extra: 1, header: "end date", name: "end"},
    ],

    //status | state.
    status: {active: 18, expired: 5, review: 7},
    state : {percentage: 15, fixed: 8, bundles: 3},

    //analysis.
    props_r1: {"avg discount": 19.5, savings: 4500.25},
    props_r2: {"most used": "SUMMER25", redemption: 68.4},

    //items.
    items: [
      {
        documentId: "d-001", code: "SUMMER25",
        status    : "active", type: "Percentage", value: "25%", uses: 142, start: "2025-04-01", images: [], categories: {}, files: []
      },
      {documentId: "d-002", code: "FREESHIP", status: "suspended", type: "Fixed", value: "Free Shipping", uses: 89, start: "2025-04-07", images: [], categories: {}, files: []},
      {documentId: "d-003", code: "WINTER25", status: "expired", type: "Percentage", value: "10%", uses: 89, start: "2025-04-14", images: [], categories: {}, files: []},
      {documentId: "d-004", code: "FREESHIP", status: "expired", type: "Fixed", value: "Free Shipping", uses: 89, start: "2025-04-21", images: [], categories: {}, files: []},
    ],

    //parent category.
    parent: "products"
  },


  {
    name  : "report",
    icon  : "pi pi-file",
    parent: "products"
  },
])
</script>


<script lang="js">
export default defineComponent({
  name: "DNav"
});
</script>


<style scoped>

</style>