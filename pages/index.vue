<template>

  <!-- Nav | Categories | Hero -->
  <section class="grid m-0 text-gray-700 select-none bg-gray-700 overflow-hidden">
    <Navbar/>

    <Categories/>

    <Hero/>
  </section>
  <!-- /Nav | Categories | Hero -->


  <!-- New Arrivals -->
  <section class="grid m-0 pb-7 md:px-7 select-none overflow-hidden">

    <!-- title -->
    <div class="col-12 pb-0 pl-2">
      <h2 class="font-light">New Arrivals</h2>
    </div>
    <!-- /title -->


    <!-- arrivals product list -->
    <div class="col-12 lg:col-8 p-0">
      <div class="grid m-0">
        <Product v-for="pd in newProducts" :product="pd"/>
      </div>
    </div>
    <!-- /arrivals product list -->


    <!-- offers display -->
    <div class="col-12 lg:col-4 lg:pt-1 md:flex lg:flex-column align-items-start gap-3">
      <ProductDisplay category="men"
                      class="h-16rem"
                      discount="10% Off"
                      image="/men-accessories-1-438.webp"
                      name="Mens' Accessories"
                      type="accessories"/>

      <ProductDisplay category="women"
                      class="pt-4 md:pt-0 xl:pt-2 h-16rem"
                      discount="10% Off"
                      image="/women-1-664.webp"
                      name="Women Casual"
                      type="casual"/>
    </div>
    <!-- /offers display -->

  </section>
  <!-- /New Arrivals -->


  <!--  section 2 -->
  <section class="grid m-0 md:p-4 lg:px-7 py-4 select-none overflow-hidden bg-purple-900">
    <div class="col-12 px-0 ">
      <div class="grid m-0">

        <div class="col-12 md:col-6 h-16rem lg:h-26rem">
          <ProductDisplay category="women"
                          discount="15% Off"
                          image="/women-1-664.webp"
                          name="Women's Style"
                          type="casual"/>
        </div>

        <div class="col-12 md:col-6">

          <div class="lg:h-12rem w-full flex gap-3">

            <div class="w-6 h-8rem lg:h-12rem">
              <ProductDisplay category="women"
                              discount="10% Off"
                              image="/women-suits-1-324.webp"
                              name="women's suits"
                              type="official"/>
            </div>

            <div class="w-6 h-8rem lg:h-12rem">
              <ProductDisplay category="women"
                              discount="10% Off"
                              image="/women-hats-1-324.webp"
                              name="women's hats"
                              type="hats"/>
            </div>

          </div>

          <div class="h-8rem lg:h-12rem w-full mt-3">
            <ProductDisplay category="women"
                            discount="5% Off"
                            image="/women-blouses-1-664.webp"
                            name="women's blouses"
                            type="casual"/>
          </div>

        </div>

      </div>
    </div>
  </section>
  <!--  /section 2 -->


  <!--  kids section -->
  <section class="grid m-0 lg:px-7 lg:py-5 py-2 select-none">

    <div class="col-12 md:col-6 px-0">
      <div class="w-full px-2 flex gap-3">
        <div class="w-6 h-8rem lg:h-12rem">
          <ProductDisplay category="kids"
                          discount="10% Off"
                          image="/kids-casual-1-324.webp"
                          name="kids | casual" type="casual"/>
        </div>
        <div class="w-6 h-8rem lg:h-12rem">
          <ProductDisplay category="kids"
                          discount="20% Off"
                          image="/kids-casual-3-324.webp"
                          name="girls" type="casual"/>
        </div>
      </div>

      <div class="w-full px-2 flex gap-3 mt-3">
        <ProductDisplay class="w-6 h-8rem lg:h-12rem"
                        discount="10% Off"
                        category="kids"
                        type="casual"
                        image="/babies-1-324.webp"
                        name="babies"/>


        <ProductDisplay class="w-6 h-8rem lg:h-12rem"
                        image="/kids-pyjamas-1-324.webp"
                        category="kids"
                        type="casual"
                        discount="10% Off" name="pyjamas"/>
      </div>
    </div>

    <div class="col-12 md:col-6 px-2 h-15rem lg:h-26rem">
      <ProductDisplay category="kids"
                      discount="15% Off"
                      image="/kids-casual-4-664.webp"
                      name="kids fashion"
                      type="casual"/>
    </div>

  </section>
  <!--  /kids section -->


  <!--  footer -->
  <VFooter class="select-none"/>


</template>


<script setup lang="js">
//categories init.
useState('categories', () => ['men', 'women', 'kids']);

//cart struct.
useState('cart', () => ({}));

//wishlist struct.
useState('wishlist', () => ({}));


//products init.
useState('products', () => [
  //men.
  {
    categories : {men: 1, casual: 1},
    description: "A soft, breathable white hoodie made from premium cotton. Perfect for casual outings.",
    dimensions : "31x25x3.5 inches",
    documentId : "w-hoodie-001",
    images     : [
      {url: "men-white-hoodie-1-a-454.webp"},
      {url: "men-white-hoodie-1-b-454.webp"},
      {url: "men-white-hoodie-1-c-454.webp"}
    ],
    name       : "White Hoodie",
    price      : 3499,
    rating     : 4,
    reviews    : [
      {review: "Super comfortable fabric, worth every penny.", user: "user_707", rating: 5},
      {review: "Fits true to size but slightly expensive.", user: "user_808", rating: 4},
      {review: "Great for spring, but not thick enough for winter.", user: "user_909", rating: 3},
      {review: "Love the minimalistic design!", user: "user_112", rating: 5}
    ],
    sku        : "w-hoodie-001",
    weight     : "0.65 kg"
  },

  {
    categories : {men: 1, casual: 1},
    description: "A heavyweight dark blue hoodie with a relaxed fit. Ideal for cooler weather.",
    dimensions : "33x27x4.5 inches",
    documentId : "blue-hoodie-001",
    images     : [
      {url: "men-hoodie-2-a-454.webp"},
      {url: "men-hoodie-2-b-454.webp"},
      {url: "men-hoodie-2-c-454.webp"}
    ],
    name       : "Dark Blue Hoodie",
    price      : 2799,
    rating     : 4,
    reviews    : [
      {review: "Extremely warm and stylish, perfect for winter.", user: "user_123", rating: 5},
      {review: "Pockets are deep and practical, but a bit heavy.", user: "user_456", rating: 4},
      {review: "Color fades slightly after a few washes.", user: "user_789", rating: 3},
      {review: "Best hoodie I've owned!", user: "user_221", rating: 5}
    ],
    sku        : "blue-hoodie-001",
    weight     : "0.85 kg"
  },

  {
    categories : {men: 1, casual: 1},
    description: "Classic black cotton t-shirt with a slim fit. Versatile for layering or solo wear.",
    dimensions : "29x21x2.5 inches",
    documentId : "w-t-shirt-001",
    images     : [
      {url: "men-tshirt-1-a-454.webp"},
      {url: "men-tshirt-1-b-454.webp"},
      {url: "men-tshirt-1-c-454.webp"}
    ],
    name       : "White T-Shirt",
    price      : 1299,
    rating     : 4,
    reviews    : [
      {review: "Soft and durable, great for daily wear.", user: "user_101", rating: 5},
      {review: "True to size, but wrinkles easily.", user: "user_102", rating: 4},
      {review: "Neckline stretches over time after multiple washes.", user: "user_103", rating: 3},
      {review: "Simple and elegant, goes with everything.", user: "user_115", rating: 5}
    ],
    sku        : "w-t-shirt-001",
    weight     : "0.35 kg"
  },

  {
    categories : {men: 1, casual: 1},
    description: "A stylish puffer jacket with insulation for cold weather. Lightweight yet warm.",
    dimensions : "34x28x6 inches",
    documentId : "m-jacket-01",
    images     : [
      {url: "men-casual-1-a-454.webp"},
      {url: "men-casual-1-b-454.webp"},
      {url: "men-casual-1-c-454.webp"}
    ],
    name       : "Puffer Jacket",
    price      : 5499,
    rating     : 4,
    reviews    : [
      {review: "Extremely warm and stylish, perfect for winter trips.", user: "user_201", rating: 5},
      {review: "A bit pricey but worth the investment.", user: "user_202", rating: 4},
      {review: "Zipper could be more durable.", user: "user_203", rating: 3},
      {review: "Lightweight yet keeps me warm in freezing temps.", user: "user_204", rating: 5}
    ],
    sku        : "m-jacket-01",
    weight     : "1.2 kg"
  },

  {
    categories : {men: 1, official: 1},
    color      : "Brown",
    description: "A sleek and warm coat designed for the modern man. Features a tailored fit and premium wool blend.",
    dimensions : "42x31x7 inches",
    documentId : "men-coat-001",
    image      : "men-coat-1.webp",
    images     : [
      {url: "men-coat-1-a-454.webp"},
      {url: "men-coat-1-b-454.webp"},
      {url: "men-coat-1-c-454.webp"}
    ],
    name       : "Brown Coat",
    price      : 8999,
    rating     : 4,
    reviews    : [
      {review: "Excellent coat, very warm and stylish!", user: "user_101", rating: 5},
      {review: "Looks great but sleeves are a bit long.", user: "user_202", rating: 3},
      {review: "Perfect for winter, highly recommend.", user: "user_303", rating: 4},
      {review: "Premium feel, worth the price.", user: "user_404", rating: 5}
    ],
    sku        : "men-coat-001",
    weight     : "1.4 kg"
  },

  {
    categories : {men: 1, official: 1},
    description: "A premium suit for formal occasions, tailored to perfection with reinforced stitching.",
    dimensions : "44x33x5 inches",
    documentId : "m-suit-01",
    images     : [
      {url: "men-suits-1-454.webp"},
      {url: "men-suits-2-454.webp"},
      {url: "men-suits-3-454.webp"}
    ],
    name       : "Blue Suit",
    price      : 12499,
    rating     : 5,
    reviews    : [
      {review: "Amazing fit and quality!", user: "user_404", rating: 5},
      {review: "A bit tight around the shoulders.", user: "user_505", rating: 3},
      {review: "Perfect for weddings and formal events.", user: "user_606", rating: 5},
      {review: "Tailoring is impeccable.", user: "user_707", rating: 5}
    ],
    sku        : "m-suit-01",
    weight     : "1.6 kg"
  },

  {
    categories : {men: 1, accessories: 1},
    color      : "Silver",
    description: "A sleek stainless steel watch with a minimalist dial. Water-resistant up to 50m.",
    dimensions : "9x7x2 inches",
    documentId : "m-watch-001",
    images     : [
      {url: "men-watch-1-a-454.webp"},
      {url: "men-watch-1-b-454.webp"},
      {url: "men-watch-1-c-454.webp"}
    ],
    name       : "Silver Watch",
    price      : 5499,
    rating     : 4,
    reviews    : [
      {review: "Looks premium and stylish.", user: "user_4001", rating: 5},
      {review: "Accurate timekeeping.", user: "user_4002", rating: 4},
      {review: "Band could be more adjustable.", user: "user_4003", rating: 4},
      {review: "Great value for money.", user: "user_4004", rating: 4}
    ],
    sku        : "m-watch-001",
    weight     : "0.35 kg"
  },

  {
    categories : {men: 1, casual: 1, shoes: 1},
    description: "Durable black boots with cushioned insoles for all-day comfort.",
    dimensions : "42x31x12 inches",
    documentId : "m-shoes-2-001",
    images     : [
      {url: "men-shoes-2-a-454.webp"},
      {url: "men-shoes-2-b-454.webp"},
      {url: "men-shoes-2-c-454.webp"}
    ],
    name       : "Black Boots",
    price      : 6499,
    rating     : 4,
    reviews    : [
      {review: "Perfect for office wear.", user: "user_5001", rating: 5},
      {review: "Slightly tight around the toes.", user: "user_5002", rating: 3},
      {review: "High-quality leather.", user: "user_5003", rating: 4},
      {review: "Great grip on slippery surfaces.", user: "user_5004", rating: 5}
    ],
    sku        : "m-shoes-2-001",
    weight     : "1.8 kg"
  },

  {
    categories : {men: 1, casual: 1, hats: 1, "new": 1},
    description: "Classic ivy cap made from breathable cotton. Ideal for sunny days.",
    dimensions : "12x10x4 inches",
    documentId : "m-hats-1-001",
    images     : [
      {url: "men-hats-1-a-454.webp"},
      {url: "men-hats-1-b-454.webp"},
      {url: "men-hats-1-c-454.webp"}
    ],
    name       : "Ivy Hat",
    price      : 1499,
    rating     : 4,
    reviews    : [
      {review: "Lightweight and stylish.", user: "user_6001", rating: 5},
      {review: "Fits slightly small.", user: "user_6002", rating: 3},
      {review: "Perfect for summer.", user: "user_6003", rating: 4}
    ],
    sku        : "m-hats-1-001",
    weight     : "0.25 kg"
  },

  {
    categories : {men: 1, shoes: 1},
    description: "Classic brown leather shoes with a polished finish. Comfortable for all-day wear.",
    dimensions : "15x11x6 inches",
    documentId : "m-shoes-1-001",
    images     : [
      {url: "men-shoes-1-a-454.webp"},
      {url: "men-shoes-1-b-454.webp"},
      {url: "men-shoes-1-c-454.webp"}
    ],
    name       : "Black Leather Shoes",
    price      : 7499,
    rating     : 4,
    reviews    : [
      {review: "Comfortable and polished.", user: "user_7001", rating: 5},
      {review: "Great for formal events.", user: "user_7002", rating: 4},
      {review: "Sole could be more cushioned.", user: "user_7003", rating: 3}
    ],
    sku        : "m-shoes-1-001",
    weight     : "1.3 kg"
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
    price      : 1999,
    rating     : 4,
    reviews    : [
      {review: "Comfortable and polished.", user: "user_7001", rating: 5},
      {review: "Great for formal events.", user: "user_7002", rating: 4}
    ],
    sku        : "m-belt-001",
    weight     : "0.25 kg"
  },

  {
    categories : {men: 1, accessories: 1, "new": 1},
    description: "Classic aviator sunglasses with UV400 protection and lightweight metal frame.",
    dimensions : "15x6x3 inches",
    documentId : "m-glasses-1",
    images     : [
      {url: "men-accessories-1-a-454.webp"},
      {url: "men-accessories-1-b-454.webp"},
      {url: "men-accessories-1-c-454.webp"}
    ],
    name       : "Sun Glasses",
    price      : 2499,
    rating     : 4,
    reviews    : [
      {review: "Stylish and durable—worth the price!", user: "user_7001", rating: 5},
      {review: "Great for driving, but lenses scratch easily.", user: "user_7002", rating: 4},
      {review: "Fits large heads perfectly.", user: "user_7003", rating: 5}
    ],
    sku        : "m-glasses-1",
    weight     : "0.25 kg",
    "new"      : true
  },


  //women.
  {
    categories : {women: 1, official: 1, shoes: 1},
    description: "Elegant black heels with a cushioned insole for all-day comfort. Ideal for office wear.",
    dimensions : "11x7x3.5 inches",
    documentId : "w-heels-001",
    images     : [
      {url: "women-shoes-1-a-454.webp"},
      {url: "women-shoes-1-b-454.webp"},
      {url: "women-shoes-1-c-454.webp"}
    ],
    name       : "Black Formal Heels",
    price      : 4599,
    rating     : 4,
    reviews    : [
      {review: "Surprisingly comfortable for heels!", user: "user_3001", rating: 5},
      {review: "Heel height is perfect for formal events.", user: "user_3002", rating: 4},
      {review: "Slightly narrow toe box.", user: "user_3003", rating: 3},
      {review: "Classic design, pairs with everything.", user: "user_3004", rating: 5}
    ],
    sku        : "w-heels-001",
    weight     : "0.7 kg"
  },

  {
    categories : {women: 1, official: 1},
    description: "A professional trouser suit with a fitted blazer and straight-leg pants.",
    dimensions : "42x32x5 inches",
    documentId : "w-trouser-suit-001",
    images     : [
      {url: "women-suit-2-a-454.webp"},
      {url: "women-suit-2-b-454.webp"},
      {url: "women-suit-2-c-454.webp"}
    ],
    name       : "Trouser Suit",
    price      : 8999,
    rating     : 5,
    reviews    : [
      {review: "Perfect for office wear—tailored fit!", user: "user_5001", rating: 5},
      {review: "Slightly tight around hips.", user: "user_5002", rating: 3},
      {review: "High-quality fabric, wrinkles less.", user: "user_5003", rating: 5},
      {review: "Worth every penny.", user: "user_5004", rating: 4}
    ],
    sku        : "w-trouser-suit-001",
    weight     : "1.1 kg",
    "new"      : true,
  },

  {
    categories : {women: 1, casual: 1, shoes: 1},
    description: "Trendy open-toe wedges with ankle straps for a secure fit. Great for summer outings.",
    dimensions : "10x8x4 inches",
    documentId : "w-shoes-2-001",
    images     : [
      {url: "women-shoes-2-a-454.webp"},
      {url: "women-shoes-2-b-454.webp"},
      {url: "women-shoes-2-c-454.webp"}
    ],
    name       : "Open Wedges",
    price      : 3499,
    rating     : 4,
    reviews    : [
      {review: "Comfortable even for long walks.", user: "user_4001", rating: 5},
      {review: "Straps dig into ankles after hours.", user: "user_4002", rating: 3},
      {review: "Breathable and stylish.", user: "user_4003", rating: 4}
    ],
    sku        : "w-shoes-2-001",
    weight     : "0.9 kg"
  },

  {
    categories : {women: 1, casual: 1, shoes: 1},
    description: "Trendy open-toe blue wedges with ankle straps for a secure fit. Great for summer outings.",
    dimensions : "10x8x4 inches",
    documentId : "w-shoes-2-001",

    images     : [
      {url: "women-blue-wedges-1.webp"},
      {url: "women-blue-wedges-2.webp"},
      {url: "women-blue-wedges-3.webp"},
    ],

    name       : "Blue Open Wedges",
    price      : 3499,
    rating     : 4,

    reviews    : [
      {review: "Comfortable even for long walks.", user: "user_4001", rating: 5},
      {review: "Straps dig into ankles after hours.", user: "user_4002", rating: 3},
      {review: "Breathable and stylish.", user: "user_4003", rating: 4}
    ],

    sku        : "b-wedges-001",
    weight     : "0.9 kg"
  },

  {
    categories : {women: 1, casual: 1, shoes: 1},
    description: "Chunky black boots with a lace-up design. Water-resistant and durable for all seasons.",
    dimensions : "14x10x6 inches",
    documentId : "w-shoes-4-001",
    images     : [
      {url: "women-black-boots-1.webp"},
      {url: "women-black-boots-2.webp"},
      {url: "women-black-boots-3.webp"}
    ],
    name       : "Black Boots",
    price      : 5999,
    rating     : 4,
    reviews    : [
      {review: "Perfect for winter—keeps feet dry!", user: "user_5001", rating: 5},
      {review: "Heavier than expected.", user: "user_5002", rating: 3},
      {review: "Great traction on icy surfaces.", user: "user_5003", rating: 4}
    ],
    sku        : "w-shoes-4-001",
    weight     : "1.5 kg"
  },

  {
    categories : {women: 1, casual: 1},
    description: "A fluffy winter coat with a soft inner lining for extra warmth. Oversized fit for comfort.",
    dimensions : "44x36x9 inches",
    documentId : "fluffy-coat-01",
    images     : [
      {url: "women-fluffy-coat-1-a-454.webp"},
      {url: "women-fluffy-coat-1-b-454.webp"},
      {url: "women-fluffy-coat-1-c-454.webp"}
    ],
    name       : "Pink Fluffy Coat",
    price      : 7499,
    rating     : 5,
    reviews    : [
      {review: "Extremely warm and stylish—love it!", user: "user_6001", rating: 5},
      {review: "Lightweight but cozy.", user: "user_6002", rating: 4},
      {review: "Pockets are deep and practical.", user: "user_6003", rating: 5}
    ],
    sku        : "fluffy-coat-01",
    weight     : "1.3 kg"
  },

  {
    categories : {women: 1, casual: 1},
    description: "A trendy biker jacket with faux-leather finish. Edgy yet comfortable for everyday wear.",
    dimensions : "38x28x5 inches",
    documentId : "w-biker-jacket-001",
    image      : "women-biker-jacket-1.webp",
    images     : [
      {url: "women-biker-jacket-1-a-454.webp"},
      {url: "women-biker-jacket-1-b-454.webp"},
      {url: "women-biker-jacket-1-c-454.webp"}
    ],
    name       : "Beige Biker Jacket",
    price      : 6499,
    rating     : 5,
    reviews    : [
      {review: "Love this jacket—fits like a glove!", user: "user_1001", rating: 5},
      {review: "Great for casual outings, but zipper sticks sometimes.", user: "user_1002", rating: 4},
      {review: "Worth every penny. Gets compliments!", user: "user_1003", rating: 5}
    ],
    sku        : "w-biker-jacket-001",
    weight     : "1.1 kg"
  },

  {
    categories : {women: 1, official: 1},
    description: "Elegant skirt suit with a tailored blazer and A-line skirt. Ideal for professional settings.",
    dimensions : "42x32x5 inches",
    documentId : "w-skirt-suit-001",
    images     : [
      {url: "women-suit-1-a-454.webp"},
      {url: "women-suit-1-b-454.webp"},
      {url: "women-suit-1-c-454.webp"}
    ],
    name       : "Skirt Suit",
    price      : 8999,
    rating     : 4,
    reviews    : [
      {review: "Looks sharp but fabric wrinkles easily.", user: "user_1004", rating: 3},
      {review: "Perfect for interviews—very polished.", user: "user_1005", rating: 5},
      {review: "Blazer pockets are too small.", user: "user_1006", rating: 4}
    ],
    sku        : "w-skirt-suit-001",
    weight     : "1.2 kg"
  },

  {
    categories : {women: 1, casual: 1, hats: 1},
    description: "A chic beige sun hat with a wide brim for UV protection. Lightweight and foldable.",
    dimensions : "16x16x4 inches",
    documentId : "w-h-001",
    images     : [
      {url: "women-hat-1-a-454.webp"},
      {url: "women-hat-1-b-454.webp"},
      {url: "women-hat-1-c-454.webp"}
    ],
    name       : "Sun Hat",
    price      : 1799,
    rating     : 4,
    reviews    : [
      {review: "Saved me from sunburn at the beach!", user: "user_2001", rating: 5},
      {review: "Brim could be stiffer in wind.", user: "user_2002", rating: 3},
      {review: "Packs easily for travel.", user: "user_2003", rating: 5}
    ],
    sku        : "WH001",
    weight     : "0.15 kg"
  },

  {
    categories : {women: 1, casual: 1, hats: 1},
    description: "A cozy woolen cap for winter, lined with fleece for extra warmth.",
    dimensions : "12x12x6 inches",
    documentId : "w-h-002",
    images     : [
      {url: "women-hat-2-a-454.webp"},
      {url: "women-hat-2-b-454.webp"},
      {url: "women-hat-2-c-454.webp"}
    ],
    name       : "Gray Woolen Cap",
    price      : 1499,
    rating     : 5,
    reviews    : [
      {review: "So warm! Perfect for snowy days.", user: "user_2004", rating: 5},
      {review: "Fits snugly but not too tight.", user: "user_2005", rating: 4},
      {review: "Wish it came in more colors.", user: "user_2006", rating: 4}
    ],
    sku        : "w-h-002",
    weight     : "0.2 kg"
  },

  {
    categories : {women: 1, accessories: 1},
    color      : "Cream",
    description: "A lightweight wool scarf with a subtle herringbone pattern. Perfect for layering.",
    dimensions : "72x32x1 inches",
    documentId : "w-scarf-001",
    images     : [
      {url: "women-scarf-1-a-454.webp"},
      {url: "women-scarf-1-b-454.webp"},
      {url: "women-scarf-1-c-454.webp"}
    ],
    name       : "Cream Wool Scarf",
    price      : 2199,
    rating     : 4,
    reviews    : [
      {review: "Soft and doesn’t itch—love it!", user: "user_2007", rating: 5},
      {review: "Length is perfect for wrapping twice.", user: "user_2008", rating: 4},
      {review: "Could be thicker for winter.", user: "user_2009", rating: 3}
    ],
    sku        : "w-scarf-001",
    weight     : "0.3 kg"
  },


  //kids.
  {
    categories : {kids: 1, casual: 1, shoes: 1},
    description: "Colorful sneakers with velcro straps for easy wear. Flexible soles support active play.",
    dimensions : "8x5x3 inches",
    documentId : "k-shoes-1-001",
    images     : [
      {url: "kids-shoes-1-a-454.webp"},
      {url: "kids-shoes-1-b-454.webp"},
      {url: "kids-shoes-1-c-454.webp"}
    ],
    name       : "booties",
    price      : 1799,
    rating     : 4,
    reviews    : [
      {review: "My toddler can put these on by himself!", user: "user_6001", rating: 5},
      {review: "Great grip but stains easily.", user: "user_6002", rating: 3},
      {review: "Held up through months of playground use.", user: "user_6003", rating: 4}
    ],
    sku        : "k-shoes-1-001",
    weight     : "0.4 kg"
  },

  {
    categories : {kids: 1, casual: 1, shoes: 1},
    description: "Waterproof rain boots with fun animal prints. Perfect for puddle jumping.",
    dimensions : "9x6x4 inches",
    documentId : "k-shoes-2-001",
    images     : [
      {url: "kids-shoes-2-a-454.webp"},
      {url: "kids-shoes-2-b-454.webp"},
      {url: "kids-shoes-2-c-454.webp"}
    ],
    name       : "sneakers",
    price      : 2199,
    rating     : 5,
    reviews    : [
      {review: "100% waterproof - survived monsoon season!", user: "user_7001", rating: 5},
      {review: "My child loves the dinosaur prints.", user: "user_7002", rating: 5},
      {review: "A bit stiff at first but breaks in nicely.", user: "user_7003", rating: 4}
    ],
    sku        : "k-shoes-2-001",
    weight     : "0.6 kg",
    "new"      : true,
  },

  {
    categories : {kids: 1, casual: 1, shoes: 1},
    description: "Breathable canvas shoes with reinforced toes for durability. Machine washable.",
    dimensions : "7x5x3 inches",
    documentId : "k-shoes-3-001",
    images     : [
      {url: "kids-canvas-shoes-1.webp"},
      {url: "kids-canvas-shoes-2.webp"},
      {url: "kids-canvas-shoes-2.webp"},
    ],
    name       : "Canvas Shoes",
    price      : 1499,
    rating     : 4,
    reviews    : [
      {review: "Perfect for school uniform.", user: "user_8001", rating: 5},
      {review: "Sole separated after 3 months.", user: "user_8002", rating: 2},
      {review: "Great value for the price.", user: "user_8003", rating: 4}
    ],
    sku        : "k-shoes-3-001",
    weight     : "0.3 kg"
  },

  {
    categories : {kids: 1, casual: 1},
    description: "Soft cotton pajama set with elastic waistband. Hypoallergenic and tagless for comfort.",
    dimensions : "12x10x1 inches",
    documentId : "k-casual-4-001",
    images     : [
      {url: "kids-pyjamas-1.webp"},
      {url: "kids-pyjamas-2.webp"},
      {url: "kids-pyjamas-3.webp"},
    ],
    name       : "Cotton Pyjamas",
    price      : 999,
    rating     : 5,
    reviews    : [
      {review: "Washed well without shrinking.", user: "user_9001", rating: 5},
      {review: "My sensitive-skinned child has no irritation.", user: "user_9002", rating: 5},
      {review: "Cute prints fade after washes.", user: "user_9003", rating: 3}
    ],
    sku        : "k-casual-4-001",
    weight     : "0.25 kg"
  },

  {
    categories : {kids: 1, casual: 1},
    description: "Stretch denim jeans with adjustable waist. Reinforced knees for active kids.",
    dimensions : "14x12x2 inches",
    documentId : "k-casual-5-001",
    images     : [
      {url: "kids-casual-5-a-454.webp"},
      {url: "kids-casual-5-b-454.webp"},
      {url: "kids-casual-5-c-454.webp"}
    ],
    name       : "Denim Jeans",
    price      : 1599,
    rating     : 4,
    reviews    : [
      {review: "Adjustable waist is genius for growing kids.", user: "user_10001", rating: 5},
      {review: "Knee patches started fraying quickly.", user: "user_10002", rating: 3},
      {review: "True to size chart measurements.", user: "user_10003", rating: 4}
    ],
    sku        : "k-casual-5-001",
    weight     : "0.35 kg",
    "new"      : true,
  },

  {
    categories : {kids: 1, casual: 1, hats: 1},
    description: "Wide-brim sun hat with UPF 50+ protection. Chin strap keeps it secure in wind.",
    dimensions : "10x10x4 inches",
    documentId : "k-hats-3-001",
    images     : [
      {url: "kids-hats-3-a-454.webp"},
      {url: "kids-hats-3-b-454.webp"},
      {url: "kids-hats-3-c-454.webp"}
    ],
    name       : "Sun Hat",
    price      : 1299,
    rating     : 4,
    reviews    : [
      {review: "Essential for beach vacations!", user: "user_11001", rating: 5},
      {review: "Chin strap is uncomfortable.", user: "user_11002", rating: 3},
      {review: "Folds flat for diaper bag storage.", user: "user_11003", rating: 4}
    ],
    sku        : "k-hats-3-001",
    weight     : "0.15 kg"
  },

  {
    categories : {kids: 1, official: 1, boys: 1},
    description: "Crisp white dress shirt with adjustable collar and easy-care fabric. Perfect for school events and formal occasions.",
    dimensions : "12x10x1 inches",
    documentId : "k-official-1-001",
    images     : [
      {url: "kids-official-1-a-454.webp"},
      {url: "kids-official-1-b-454.webp"},
      {url: "kids-official-1-c-454.webp"}
    ],
    name       : "Formal White Shirt",
    price      : 899,
    rating     : 4,
    reviews    : [
      {review: "Perfect for my son's piano recital.", user: "user_12001", rating: 5},
      {review: "Collar stays could be better quality.", user: "user_12002", rating: 3},
      {review: "Washes well without ironing needed.", user: "user_12003", rating: 4}
    ],
    sku        : "k-official-1-001",
    weight     : "0.3 kg"
  },

  {
    categories : {kids: 1, official: 1, girls: 1},
    description: "Charming A-line dress with satin ribbon detail. Wrinkle-resistant fabric for special occasions.",
    dimensions : "14x12x2 inches",
    documentId : "k-official-2-001",
    images     : [
      {url: "kids-official-2-a-454.webp"},
      {url: "kids-official-2-b-454.webp"},
      {url: "kids-official-2-c-454.webp"}
    ],
    name       : "Party Dress",
    price      : 1499,
    rating     : 5,
    reviews    : [
      {review: "My daughter loved it for her birthday!", user: "user_13001", rating: 5},
      {review: "Ribbon came loose after first wash.", user: "user_13002", rating: 3},
      {review: "True to size with room to grow.", user: "user_13003", rating: 5}
    ],
    sku        : "k-official-2-001",
    weight     : "0.4 kg"
  },

  {
    categories : {kids: 1, official: 1, boys: 1},
    description: "Two-piece suit with adjustable waist trousers. Stain-resistant fabric for active kids.",
    dimensions : "15x13x3 inches",
    documentId : "k-official-3-001",
    images     : [
      {url: "kids-official-3-a-454.webp"},
      {url: "kids-official-3-b-454.webp"},
      {url: "kids-official-3-c-454.webp"}
    ],
    name       : "Brown Suit",
    price      : 2499,
    rating     : 4,
    reviews    : [
      {review: "Looked sharp for wedding photos.", user: "user_14001", rating: 5},
      {review: "Jacket sleeves needed tailoring.", user: "user_14002", rating: 3},
      {review: "Pants have adjustable waist - brilliant!", user: "user_14003", rating: 4}
    ],
    sku        : "k-official-3-001",
    weight     : "0.7 kg",
    "new"      : true,
  },

  {
    categories : {kids: 1, casual: 1, boys: 1},
    description: "Soft cotton-blend sweater with reinforced elbows. Machine washable for easy care.",
    dimensions : "13x11x2 inches",
    documentId : "k-casual-1-001",
    images     : [
      {url: "kids-casual-1-a-454.webp"},
      {url: "kids-casual-1-b-454.webp"},
      {url: "kids-casual-1-c-454.webp"}
    ],
    name       : "Blue Sweater",
    price      : 1299,
    rating     : 4,
    reviews    : [
      {review: "Warm but not itchy - perfect for school.", user: "user_15001", rating: 5},
      {review: "Color faded after a few washes.", user: "user_15002", rating: 3},
      {review: "Holds up well to rough play.", user: "user_15003", rating: 4}
    ],
    sku        : "k-casual-1-001",
    weight     : "0.35 kg"
  },

  {
    categories : {kids: 1, casual: 1, boys: 1},
    description: "Padded winter jacket with water-resistant shell. Reflective strips for visibility.",
    dimensions : "16x14x4 inches",
    documentId : "k-casual-2-001",

    images: [
      {url: "kids-winter-jacket-1.webp"},
      {url: "kids-winter-jacket-2.webp"},
      {url: "kids-winter-jacket-3.webp"},
    ],

    name   : "Kids Winter Jacket",
    price  : 2999,
    rating : 5,
    reviews: [
      {review: "Kept my son warm in -10°C weather!", user: "user_16001", rating: 5},
      {review: "Zipper gets stuck sometimes.", user: "user_16002", rating: 3},
      {review: "Hood stays up in wind - great design.", user: "user_16003", rating: 5}
    ],
    sku    : "k-casual-2-001",
    weight : "0.8 kg"
  },

  {
    categories : {kids: 1, casual: 1, hats: 1},
    description: "UPF 50+ sun hat with neck flap. Lightweight and packable for travel.",
    dimensions : "10x10x3 inches",
    documentId : "k-hats-1-001",
    images     : [
      {url: "kids-hats-1-a-454.webp"},
      {url: "kids-hats-1-b-454.webp"},
      {url: "kids-hats-1-c-454.webp"}
    ],
    name       : "Sun Hat",
    price      : 799,
    rating     : 4,
    reviews    : [
      {review: "Essential for our beach vacation!", user: "user_17001", rating: 5},
      {review: "Neck flap is a bit short.", user: "user_17002", rating: 3},
      {review: "Washed well and kept its shape.", user: "user_17003", rating: 4}
    ],
    sku        : "k-hats-1-001",
    weight     : "0.15 kg"
  },

  {
    categories : {kids: 1, casual: 1, hats: 1},
    description: "Knit wool hat with fleece lining. Ear flaps provide extra warmth in winter.",
    dimensions : "9x9x4 inches",
    documentId : "k-hats-2-001",
    images     : [
      {url: "kids-hats-2-a-454.webp"},
      {url: "kids-hats-2-b-454.webp"},
      {url: "kids-hats-2-c-454.webp"}
    ],
    name       : "Woolen Winter Hat",
    price      : 899,
    new        : 1,
    rating     : 5,
    reviews    : [
      {review: "Soft and doesn't itch - miracle for wool!", user: "user_18001", rating: 5},
      {review: "Ear flaps could be longer.", user: "user_18002", rating: 4},
      {review: "Survived multiple snowball fights.", user: "user_18003", rating: 5}
    ],
    sku        : "k-hats-2-001",
    weight     : "0.2 kg"
  }

]);

useState('product', () => null);

</script>


<script lang="js">
export default defineComponent({

  name: "index",

  data() {
    return {

    }
  },

  computed: {
    products() {
      return useState('products').value;
    },
    newProducts() {
      return this.products.filter(pd => pd.new);
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

    //price filters init.
    useState('prices').value = {min: 0, max: 2000000};

    //shop reset.
    useState('shop').value = null;
  }

})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3, .title {
  font-family: 'Playfair Display', serif;
}
</style>