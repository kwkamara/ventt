<template>
  <div class="grid m-0 text-gray-700 select-none bg-gray-700">


    <TopBar/>


    <Categories/>


    <template v-if="!useState('product').value">

      <Hero/>

      <!-- services -->
      <div class="col-12 py-6 px-1 md:px-3 md:px-8 flex gap-3">

        <div class="grid m-0 w-full">

          <div v-for="service in services" class="col-6 lg:col-3 h-8rem p-2  text-white">

            <div class="h-full w-full relative">
              <NuxtImg :src="service.image" alt="Ventt Ecommerce Platform"
                       class="w-full h-full absolute inset-0 object-cover border-round" fit="cover" sizes="200px"/>

              <div class="h-full w-full absolute bg-black-alpha-80 hover:bg-black-alpha-10 flex align-items-center justify-content-center border-round">
                <div class="text-xl text-center">
                  <i :class="`${service.icon} text-2xl`"/>
                  <div class="mt-1 capitalize text-sm">{{ service.name }}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
      <!-- /services -->


      <!--  popular 1 -->
      <div class="col-12 px-1 md:px-8 pb-6 pt-0">
        <div class="grid m-0">

          <div v-for="product in popularProducts.slice(0, 4)" class="col-6 md:col-2">
            <Product :product="product"/>
          </div>

          <div class="col-12 md:col-4 h-15rem lg:h-19rem">
            <ProductDisplay image="/men-accessories-1-438.webp" discount="10% Off" name="Mens' Accessories"/>
          </div>

        </div>
      </div>
      <!--  popular 2 -->


      <!--  section 2 -->
      <div class="col-12 px-1 md:px-8 pb-6 pt-0">
        <div class="grid m-0">

          <div class="col-12 md:col-6 h-16rem lg:h-26rem">
            <ProductDisplay image="/women-1-664.webp" discount="15% Off" name="Women's Style"/>
          </div>

          <div class="col-12 md:col-6">

            <div class="lg:h-12rem w-full flex gap-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay image="/women-suits-1-324.webp" discount="10% Off" name="women's suits"/>
              </div>

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay image="/women-hats-1-324.webp" discount="10% Off" name="women's hats"/>
              </div>

            </div>

            <div class="h-8rem lg:h-12rem w-full mt-3">
              <ProductDisplay image="/women-blouses-1-664.webp" discount="5% Off" name="women's blouses"/>
            </div>

          </div>

        </div>
      </div>
      <!--  /section 2 -->


      <!--  section 3 -->
      <div class="col-12 px-1 md:px-8 pb-6 pt-0">

        <div class="grid m-0">

          <div class="col-12 md:col-6">

            <div class="w-full flex gap-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay image="/kids-casual-1-324.webp" discount="10% Off" name="boys"/>
              </div>

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay image="/kids-casual-3-324.webp" discount="20% Off" name="girls"/>
              </div>

            </div>

            <div class="w-full flex gap-3 mt-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay image="/babies-1-324.webp" discount="10% Off" name="toddlers"/>
              </div>

              <div class="w-6  h-8rem lg:h-12rem">
                <ProductDisplay image="/kids-pyjamas-1-324.webp" discount="10% Off" name="pyjamas"/>
              </div>

            </div>

          </div>

          <div class="col-12 md:col-6 h-18rem lg:h-26rem">
            <ProductDisplay image="/kids-casual-4-664.webp" discount="15% Off" name="kids fashion"/>
          </div>

        </div>

      </div>
      <!--  /section 3 -->

    </template>


    <product-details v-else/>


    <Subscribe/>


    <FooterCol/>

    <!-- Toast -->
    <Toast position="top-center" class="w-15rem">
      <template #container="{ message }">

        <div class="h-4rem border-none text-xs flex align-items-center justify-content-center">
          {{ message.summary }}
        </div>

      </template>
    </Toast>
  </div>
</template>


<script setup lang="js">
useState('products', () => [

  {
    color      : "Light Blue",
    description: "Lightweight and breathable summer wear for men.",
    dimensions : "38x28x4 inches",
    documentId : "3",
    image      : "men-summer-1-211.webp",
    images     : [
      {url: "men-white-hoodie-1-b-454.webp"},
      {url: "men-white-hoodie-1-a-454.webp"},
      {url: "men-white-hoodie-1-c-454.webp"}
    ],
    name       : "white hoodie 1",
    price      : 3000,
    rating     : 5,
    reviews    : [
      {review: "Very comfortable and stylish.", user: "user_707", rating: 5},
      {review: "Great for hot weather.", user: "user_808", rating: 4},
      {review: "Fabric feels a bit thin.", user: "user_909", rating: 3}
    ],
    sku        : "SUMMER33445",
    weight     : "0.8 kg"
  },

  {
    color      : "blue",
    description: "A stylish and comfortable hoodie perfect for casual wear.",
    dimensions : "30x20x5 inches",
    documentId : "5",
    image      : "men-hoodie-1-211.webp",
    images     : [
      {url: "men-hoodie-2-a-454.webp"},
      {url: "men-hoodie-2-b-454.webp"},
      {url: "men-hoodie-2-c-454.webp"},
    ],
    name       : "hoodie 1",
    price      : 1200,
    rating     : 5,
    reviews    : [
      // {review: "Great hoodie, very comfortable!", user: "user_123", rating: 4},
      // {review: "Fits perfectly and looks stylish.", user: "user_456", rating: 5},
      // {review: "Good quality but a bit pricey.", user: "user_789", rating: 3}
    ],
    sku        : "HOODIE12345",
    weight     : "0.5 kg"
  },

  {
    color      : "Navy Blue",
    description: "A sleek and warm coat designed for the modern man.",
    dimensions : "40x30x8 inches",
    documentId : "1",
    image      : "men-coat-1.webp",
    images     : [
      {url: "men-coat-1-b-454.webp"},
      {url: "men-coat-1-c-454.webp"},
      {url: "men-coat-1-a-454.webp"}
    ],
    name       : "men coat 1",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Excellent coat, very warm!", user: "user_101", rating: 5},
      {review: "Looks great but sleeves are a bit long.", user: "user_202", rating: 3},
      {review: "Perfect for winter, highly recommend.", user: "user_303", rating: 4}
    ],
    sku        : "COAT67890",
    weight     : "1.2 kg"
  },

  {
    color      : "Charcoal Gray",
    description: "A premium suit for formal occasions, tailored to perfection.",
    dimensions : "42x32x6 inches",
    documentId : "2",
    image      : "men-suits-1-211.webp",
    images     : [
      {url: "men-suits-1-454.webp"},
      {url: "men-suits-2-454.webp"},
      {url: "men-suits-3-454.webp"}
    ],
    name       : "suit 1",
    price      : 1200,
    rating     : 5,
    reviews    : [
      {review: "Amazing fit and quality!", user: "user_404", rating: 5},
      {review: "A bit tight around the shoulders.", user: "user_505", rating: 3},
      {review: "Perfect for weddings and formal events.", user: "user_606", rating: 4}
    ],
    sku        : "SUIT11223",
    weight     : "1.5 kg"
  },

  {
    color      : "Beige",
    description: "A trendy casual jacket for women, combining style and comfort.",
    dimensions : "36x26x6 inches",
    documentId : "3",
    image      : "woman-casual-jacket-1.webp",
    images     : [
      {url: "women-biker-jacket-1-a-454.webp"},
      {url: "women-biker-jacket-1-b-454.webp"},
      {url: "women-biker-jacket-1-c-454.webp"}
    ],
    name       : "bikers jacket",
    price      : 3000,
    rating     : 5,
    reviews    : [
      {review: "Love this jacket, fits perfectly!", user: "user_1001", rating: 5},
      {review: "Great for casual outings.", user: "user_1002", rating: 4},
      {review: "A bit overpriced for the quality.", user: "user_1003", rating: 3}
    ],
    sku        : "JACKET55667",
    weight     : "1.0 kg"
  },

  {
    color      : "Black",
    description: "Elegant suits for women, perfect for professional settings.",
    dimensions : "40x30x6 inches",
    documentId : "4",
    image      : "men-casual.webp",
    images     : [
      {url: "men-casual.webp"},
      {url: "men-casual.webp"},
      {url: "men-casual.webp"}
    ],
    name       : "women suits",
    price      : 1200,
    rating     : 2,
    reviews    : [
      {review: "Looks professional but not very comfortable.", user: "user_1004", rating: 2},
      {review: "Fits well but fabric could be better.", user: "user_1005", rating: 3},
      {review: "Good for office wear.", user: "user_1006", rating: 4}
    ],
    sku        : "WSUIT77889",
    weight     : "1.3 kg"
  },

  {
    color      : "Dark Green",
    description: "Warm and cozy winter wear to keep you comfortable in the cold.",
    dimensions : "42x34x8 inches",
    documentId : "6",
    image      : "men-casual.webp",
    images     : [
      {url: "men-casual.webp"},
      {url: "men-casual.webp"},
      {url: "men-casual.webp"}
    ],
    name       : "winter wear",
    price      : 1200,
    rating     : 5,
    reviews    : [
      {review: "Very warm and comfortable.", user: "user_1007", rating: 5},
      {review: "Perfect for snowy weather.", user: "user_1008", rating: 4},
      {review: "A bit bulky but does the job.", user: "user_1009", rating: 3}
    ],
    sku        : "WINTER99001",
    weight     : "1.6 kg"
  },

  {
    color      : "Gray",
    description: "Relaxed and stylish casual wear for everyday use.",
    dimensions : "38x28x5 inches",
    documentId : "7",
    image      : "men-casual.webp",
    images     : [
      {url: "men-casual.webp"},
      {url: "men-casual.webp"},
      {url: "men-casual.webp"},
    ],
    name       : "casual wear",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Comfortable and stylish.", user: "user_1010", rating: 4},
      {review: "Great for daily wear.", user: "user_1011", rating: 5},
      {review: "Fabric could be more durable.", user: "user_1012", rating: 3}
    ],
    sku        : "CASUAL22334",
    weight     : "0.9 kg"
  },

  {
    color      : "Navy Blue",
    description: "Sophisticated official wear for a polished look.",
    dimensions : "40x30x6 inches",
    documentId : "8",
    image      : "men-casual.webp",
    images     : [
      {url: "men-casual.webp"},
      {url: "men-casual.webp"},
      {url: "men-casual.webp"}
    ],
    name       : "official wear",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Looks very professional.", user: "user_1013", rating: 5},
      {review: "Fits well but a bit pricey.", user: "user_1014", rating: 3},
      {review: "Great for formal events.", user: "user_1015", rating: 4}
    ],
    sku        : "OFFICIAL44556",
    weight     : "1.4 kg"
  }

]);

useState('product', () => null);
</script>


<script lang="js">
export default defineComponent({

  name: "index",

  data() {
    return {
      services: [
        {name: 'free shipping', icon: "pi pi-truck", image: "/delivery-324.webp"},
        {name: 'secure payment', icon: "pi pi-lock", image: "/payment-324.webp"},
        {name: 'support 24/7', icon: "pi pi-comment", image: "/support-324.webp"},
        {name: 'money back', icon: "pi pi-dollar", image: "/money-324.webp"},
      ]
    }
  },

  computed: {
    products() {
      return useState('products').value;
    },

    popularProducts() {
      return useState('products').value.filter(pd => pd.rating >= 4);
    }
  },

  methods: {
    formatDecimal(value) {
      if (value) return value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      return value;
    },
  },

  mounted() {
    //rating.
    useState('products').value.forEach(pd => {
      if (pd.reviews.length) {
        let rating_total = 0;
        pd.reviews.forEach(review => rating_total += review.rating);
        pd.rating = Math.floor(rating_total / pd.reviews.length);
      }

      //no reviews
      else pd.rating = 3;
    })
  }

})
</script>