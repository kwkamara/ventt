<template>
  <div class="grid m-0 text-gray-700 select-none bg-gray-700">


    <TopBar/>


    <Categories/>


    <shop v-if="useState('ui').value"/>


    <template v-else-if="!useState('product').value">

      <Hero/>

      <!-- services -->
      <div class="col-12 lg:py-6 px-1 md:px-3 md:px-4 lg:px-8 flex gap-3">

        <div class="grid m-0 w-full">

          <div v-for="service in services" class="col-6 lg:col-3 h-6rem lg:h-8rem p-2 text-white">

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


      <!-- New Arrivals -->
      <div class="col-12 md:px-4 lg:px-8 pt-0 px-1 lg:pb-6">

        <div class="grid m-0 align-items-end">

          <div class="col-12 md:col-6 lg:col-9 px-0 lg:pr-0 bg-gray-700">
            <div class="grid m-0">
              <div class="col-12 h-3rem pt-0 flex align-items-center text-white text-xl font-bold uppercase">
                New Arrivals
              </div>

              <div v-for="product in popularProducts.slice(0, 4)" class="col-6 lg:col-3 lg:pb-0">
                <Product :product="product"/>
              </div>

            </div>
          </div>

          <!-- men accessories display -->
          <div class="col-12 md:col-6 lg:col-3 h-15rem lg:h-16rem pt-0 pb-3">
            <ProductDisplay :filters="{men: true, accessories: true}" discount="10% Off"
                            image="/men-accessories-1-438.webp" name="Mens' Accessories"/>
          </div>
        </div>

      </div>
      <!-- /New Arrivals -->



      <!--  section 2 -->
      <div class="col-12 px-1 md:px-4 lg:px-8 pb-6 pt-0">
        <div class="grid m-0">

          <div class="col-12 md:col-6 h-16rem lg:h-26rem">
            <ProductDisplay :filters="{women: true}"
                            discount="15% Off" image="/women-1-664.webp" name="Women's Style"/>
          </div>

          <div class="col-12 md:col-6">

            <div class="lg:h-12rem w-full flex gap-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay :filters="{women: true, official: true}"
                                discount="10% Off" image="/women-suits-1-324.webp" name="women's suits"/>
              </div>

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay :filters="{women: true, hats: true}"
                                image="/women-hats-1-324.webp" discount="10% Off" name="women's hats"/>
              </div>

            </div>

            <div class="h-8rem lg:h-12rem w-full mt-3">
              <ProductDisplay :filters="{women: true, blouses: true}"
                              image="/women-blouses-1-664.webp" discount="5% Off" name="women's blouses"/>
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
                <ProductDisplay :filters="{kids: true, casual: true, boys: true}"
                                image="/kids-casual-1-324.webp" discount="10% Off" name="boys"/>
              </div>

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay :filters="{kids: true, casual: true, girls: true}"
                                image="/kids-casual-3-324.webp" discount="20% Off" name="girls"/>
              </div>

            </div>

            <div class="w-full flex gap-3 mt-3">

              <div class="w-6 h-8rem lg:h-12rem">
                <ProductDisplay :filters="{kids: true}"
                                discount="10% Off" image="/babies-1-324.webp" name="babies"/>
              </div>

              <div class="w-6  h-8rem lg:h-12rem">
                <ProductDisplay :filters="{kids:true, pyjamas: true}"
                                image="/kids-pyjamas-1-324.webp" discount="10% Off" name="pyjamas"/>
              </div>

            </div>

          </div>

          <div class="col-12 md:col-6 h-15rem lg:h-26rem">
            <ProductDisplay :filters="{kids:true, casual: true}"
                            image="/kids-casual-4-664.webp" discount="15% Off" name="kids fashion"/>
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
    categories : {men: 1, casual: 1},
    color      : "White",
    description: "A soft, breathable white hoodie made from premium cotton. Perfect for casual outings.",
    dimensions : "30x24x3 inches",
    documentId : "3",
    image      : "men-white-hoodie-1-211.webp",
    images     : [
      {url: "men-white-hoodie-1-a-454.webp"},
      {url: "men-white-hoodie-1-b-454.webp"},
      {url: "men-white-hoodie-1-c-454.webp"}
    ],
    name       : "White Hoodie",
    price      : 3000,
    rating     : 4,
    reviews    : [
      {review: "Super comfortable fabric.", user: "user_707", rating: 5},
      {review: "Fits true to size.", user: "user_808", rating: 4},
      {review: "Slightly thin for winter.", user: "user_909", rating: 3}
    ],
    sku        : "HOODIE33445",
    weight     : "0.6 kg"
  },
  {
    categories : {men: 1, casual: 1},
    color      : "Dark Blue",
    description: "A heavyweight dark blue hoodie with a relaxed fit. Ideal for cooler weather.",
    dimensions : "32x26x4 inches",
    documentId : "5",
    image      : "men-hoodie-1-211.webp",
    images     : [
      {url: "men-hoodie-2-a-454.webp"},
      {url: "men-hoodie-2-b-454.webp"},
      {url: "men-hoodie-2-c-454.webp"}
    ],
    name       : "Dark Blue Hoodie",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Warm and stylish.", user: "user_123", rating: 5},
      {review: "Pockets are deep and practical.", user: "user_456", rating: 4},
      {review: "Color fades slightly after washes.", user: "user_789", rating: 3}
    ],
    sku        : "HOODIE12345",
    weight     : "0.7 kg"
  },
  {
    categories : {men: 1, casual: 1},
    color      : "Black",
    description: "Classic black cotton t-shirt with a slim fit. Versatile for layering or solo wear.",
    dimensions : "28x20x2 inches",
    documentId : "t-shirt-001",
    images     : [
      {url: "men-tshirt-1-a-454.webp"},
      {url: "men-tshirt-1-b-454.webp"},
      {url: "men-tshirt-1-c-454.webp"}
    ],
    name       : "Black T-Shirt",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Soft and durable.", user: "user_101", rating: 5},
      {review: "True to size.", user: "user_102", rating: 4},
      {review: "Neckline stretches over time.", user: "user_103", rating: 3}
    ],
    sku        : "TSHIRT001",
    weight     : "0.3 kg"
  },
  {
    categories : {men: 1, official: 1},
    color      : "Navy Blue",
    description: "A sleek and warm coat designed for the modern man. Features a tailored fit and premium wool blend.",
    dimensions : "40x30x8 inches",
    documentId : "1",
    image      : "men-coat-1.webp",
    images     : [
      {url: "men-coat-1-a-454.webp"},
      {url: "men-coat-1-b-454.webp"},
      {url: "men-coat-1-c-454.webp"}
    ],
    name       : "Navy Blue Official Coat",
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
    categories : {men: 1, official: 1},
    color      : "Charcoal Gray",
    description: "A premium suit for formal occasions, tailored to perfection with reinforced stitching.",
    dimensions : "42x32x6 inches",
    documentId : "2",
    image      : "men-suits-1-211.webp",
    images     : [
      {url: "men-suits-1-454.webp"},
      {url: "men-suits-2-454.webp"},
      {url: "men-suits-3-454.webp"}
    ],
    name       : "Charcoal Gray Suit",
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
    categories : {women: 1, casual: 1},
    color      : "Beige",
    description: "A trendy biker jacket with faux-leather finish. Edgy yet comfortable for everyday wear.",
    dimensions : "36x26x6 inches",
    documentId : "3",
    image      : "women-biker-jacket-1.webp",
    images     : [
      {url: "women-biker-jacket-1-a-454.webp"},
      {url: "women-biker-jacket-1-b-454.webp"},
      {url: "women-biker-jacket-1-c-454.webp"}
    ],
    name       : "Beige Biker Jacket",
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
    categories : {women: 1, official: 1},
    color      : "Black",
    description: "Elegant skirt suit with a tailored blazer and A-line skirt. Ideal for professional settings.",
    dimensions : "40x30x6 inches",
    documentId : "w-skirt-suit-001",
    images     : [
      {url: "women-suit-1-a-454.webp"},
      {url: "women-suit-1-b-454.webp"},
      {url: "women-suit-1-c-454.webp"}
    ],
    name       : "Skirt Suit",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Looks professional but not very comfortable.", user: "user_1004", rating: 2},
      {review: "Fits well but fabric could be better.", user: "user_1005", rating: 3},
      {review: "Good for office wear.", user: "user_1006", rating: 4}
    ],
    sku        : "w-skirt-suit-001",
    weight     : "1.0 kg"
  },
  {
    categories : {women: 1, casual: 1, hats: 1},
    description: "A chic beige sun hat with a wide brim for UV protection. Lightweight and foldable.",
    dimensions : "14x14x6 inches",
    documentId : "w-h-001",
    images     : [
      {url: "women-hat-1-a-454.webp"},
      {url: "women-hat-1-b-454.webp"},
      {url: "women-hat-1-c-454.webp"}
    ],
    name       : "Sun Hat",
    price      : 600,
    rating     : 4,
    reviews    : [
      {review: "Great for beach trips.", user: "user_2001", rating: 5},
      {review: "Brim could be stiffer.", user: "user_2002", rating: 3},
      {review: "Comfortable fit.", user: "user_2003", rating: 4}
    ],
    sku        : "WH001",
    weight     : "0.2 kg"
  },
  {
    categories : {women: 1, casual: 1, hats: 1},
    color      : "Gray",
    description: "A cozy woolen cap for winter, lined with fleece for extra warmth.",
    dimensions : "10x10x5 inches",
    documentId : "w-h-002",
    images     : [
      {url: "women-hat-2-a-454.webp"},
      {url: "women-hat-2-b-454.webp"},
      {url: "women-hat-2-c-454.webp"}
    ],
    name       : "Gray Woolen Cap",
    price      : 600,
    rating     : 4,
    reviews    : [
      {review: "Very warm and soft.", user: "user_2004", rating: 5},
      {review: "Fits snugly.", user: "user_2005", rating: 4},
      {review: "Could be thicker.", user: "user_2006", rating: 3}
    ],
    sku        : "WH002",
    weight     : "0.3 kg"
  },
  {
    categories : {women: 1, accessories: 1},
    color      : "Cream",
    description: "A lightweight wool scarf with a subtle herringbone pattern. Perfect for layering.",
    dimensions : "70x30x2 inches",
    documentId : "w-s-001",
    images     : [
      {url: "women-scarf-1-a-454.webp"},
      {url: "women-scarf-1-b-454.webp"},
      {url: "women-scarf-1-c-454.webp"}
    ],
    name       : "Cream Wool Scarf",
    price      : 600,
    rating     : 4,
    reviews    : [
      {review: "Soft and non-itchy.", user: "user_2007", rating: 5},
      {review: "Length is perfect.", user: "user_2008", rating: 4},
      {review: "Could be wider.", user: "user_2009", rating: 3}
    ],
    sku        : "WSCARF001",
    weight     : "0.4 kg"
  },

  {
    categories : {women: 1, official: 1, shoes: 1},
    description: "Elegant black heels with a cushioned insole for all-day comfort. Ideal for office wear.",
    dimensions : "12x8x4 inches",
    documentId : "w-heels-001",
    images     : [
      {url: "women-shoes-1-a-454.webp"},
      {url: "women-shoes-1-b-454.webp"},
      {url: "women-shoes-1-c-454.webp"}
    ],
    name       : "Black Formal Heels",
    price      : 600,
    rating     : 4,
    reviews    : [
      {review: "Surprisingly comfortable.", user: "user_3001", rating: 5},
      {review: "Heel height is perfect.", user: "user_3002", rating: 4},
      {review: "Slightly narrow toe box.", user: "user_3003", rating: 3}
    ],
    sku        : "w-heels-001",
    weight     : "0.8 kg"
  },

  {
    categories : {men: 1, accessories: 1},
    color      : "Silver",
    description: "A sleek stainless steel watch with a minimalist dial. Water-resistant up to 50m.",
    dimensions : "8x6x2 inches",
    documentId : "m-watch-001",
    images     : [
      {url: "men-watch-1-a-454.webp"},
      {url: "men-watch-1-b-454.webp"},
      {url: "men-watch-1-c-454.webp"}
    ],
    name       : "Silver Men's Watch",
    price      : 600,
    rating     : 5,
    reviews    : [
      {review: "Looks premium and stylish.", user: "user_4001", rating: 5},
      {review: "Accurate timekeeping.", user: "user_4002", rating: 4},
      {review: "Band could be more adjustable.", user: "user_4003", rating: 4}
    ],
    sku        : "MWATCH001",
    weight     : "0.3 kg"
  },
  {
    categories : {women: 1, official: 1},
    description: "A professional trouser suit with a fitted blazer and straight-leg pants.",
    dimensions : "40x30x6 inches",
    documentId : "w-trouser-suit-001",
    images     : [
      {url: "women-suit-2-a-454.webp"},
      {url: "women-suit-2-b-454.webp"},
      {url: "women-suit-2-c-454.webp"}
    ],
    name       : "Trouser Suit",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Perfect for office wear.", user: "user_5001", rating: 5},
      {review: "Slightly tight around hips.", user: "user_5002", rating: 3},
      {review: "High-quality fabric.", user: "user_5003", rating: 4}
    ],
    sku        : "w-trouser-suit-001",
    weight     : "1.0 kg"
  },
  {
    categories : {women: 1, casual: 1},
    color      : "Pink",
    description: "A fluffy winter coat with a soft inner lining for extra warmth. Oversized fit for comfort.",
    dimensions : "42x34x8 inches",
    documentId : "fluffy-coat",
    images     : [
      {url: "women-fluffy-coat-1-a-454.webp"},
      {url: "women-fluffy-coat-1-b-454.webp"},
      {url: "women-fluffy-coat-1-c-454.webp"}
    ],
    name       : "Pink Fluffy Coat",
    price      : 1200,
    rating     : 5,
    reviews    : [
      {review: "Extremely warm and stylish.", user: "user_6001", rating: 5},
      {review: "Lightweight but cozy.", user: "user_6002", rating: 4},
      {review: "Perfect for winter.", user: "user_6003", rating: 5}
    ],
    sku        : "FCOAT001",
    weight     : "1.2 kg"
  },
  {
    categories : {men: 1, shoes: 1},
    color      : "Brown",
    description: "Classic brown leather shoes with a polished finish. Comfortable for all-day wear.",
    dimensions : "14x10x6 inches",
    documentId : "8",
    images     : [
      {url: "men-shoes-1-a-454.webp"},
      {url: "men-shoes-1-b-454.webp"},
      {url: "men-shoes-1-c-454.webp"}
    ],
    name       : "Brown Leather Shoes",
    price      : 1200,
    rating     : 4,
    reviews    : [
      {review: "Comfortable and polished.", user: "user_7001", rating: 5},
      {review: "Great for formal events.", user: "user_7002", rating: 4},
      {review: "Sole could be more cushioned.", user: "user_7003", rating: 3}
    ],
    sku        : "MSHOES001",
    weight     : "1.2 kg"
  },
  {
    categories : {men: 1, accessories: 1},
    color      : "Brown",
    description: "Classic brown leather shoes with a polished finish. Comfortable for all-day wear.",
    dimensions : "14x10x6 inches",
    documentId : "m-belt-001",
    images     : [
      {url: "men-belt-1-a-454.webp"},
      {url: "men-belt-1-b-454.webp"},
      {url: "men-belt-1-c-454.webp"}
    ],
    name       : "Black Belt",
    price      : 1000,
    rating     : 4,
    reviews    : [
      {review: "Comfortable and polished.", user: "user_7001", rating: 5},
      {review: "Great for formal events.", user: "user_7002", rating: 4},
    ],
    sku        : "m-belt-001",
    weight     : "0.2 kg"
  },

]);

useState('product', () => null);

useState('filters', () => null);

useState('prices', () => null);
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
    });

    //shop filters init.
    useState('filters').value = {men: true, women: true, kids: true, casual: true, official: true, accessories: true};

    //price filters init.
    useState('prices').value = {min: 0, max: 2000000};
  }

})
</script>