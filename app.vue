<template>

  <NuxtPage/>

  <!-- Toast -->
  <Toast position="top-right" unstyled>
    <template #container="{ message }">
      <div class="w-full h-full p-3 border-none flex align-items-center gap-2 bg-purple-700 text-white sans-serif border-round-2xl">
        <span class="material-icons-outlined">check_circle</span>
        <span class="capitalize">{{ message.summary }}</span>
      </div>
    </template>
  </Toast>

</template>


<script setup lang="js">
useState('products', () => [
  //men.
  {
    categories : {
      men   : 1,
      casual: 1
    },
    description: {
      "en": "A soft, breathable white hoodie made from premium cotton. Perfect for casual outings.",
      "nl": "Een zachte, ademende witte hoodie van hoogwaardig katoen. Perfect voor casual uitstapjes.",
      "fr": "Un sweat à capuche blanc doux et respirant, fabriqué en coton de qualité supérieure. Parfait pour les sorties décontractées."
    },

    dimensions: "31x25x3.5 ",
    documentId: "w-hoodie-001",
    images    : [
      {url: "men-white-hoodie-1-a-454.webp"},
      {url: "men-white-hoodie-1-b-454.webp"},
      {url: "men-white-hoodie-1-c-454.webp"}
    ],
    name      : {
      en: "White Hoodie",
      nl: "Witte hoodie",
      fr: "Hoodie blanc"
    },

    price  : 3499,
    rating : 4,
    reviews: [
      {
        en    : "Super comfortable fabric, worth every penny.",
        nl    : "Supercomfortabele stof, elke cent waard.",
        fr    : "Tissu super confortable, ça vaut chaque centime.",
        user  : "user_707",
        rating: 5
      },
      {
        en    : "Fits true to size but slightly expensive.",
        nl    : "Valt normaal qua maat, maar iets aan de dure kant.",
        fr    : "Taille conforme, mais un peu cher.",
        user  : "user_808",
        rating: 4
      },
      {
        en    : "Great for spring, but not thick enough for winter.",
        nl    : "Perfect voor de lente, maar niet dik genoeg voor de winter.",
        fr    : "Idéal pour le printemps, mais pas assez épais pour l’hiver.",
        user  : "user_909",
        rating: 3
      },
      {
        en    : "Love the minimalistic design!",
        nl    : "Geweldig minimalistisch ontwerp!",
        fr    : "J’adore le design minimaliste !",
        user  : "user_112",
        rating: 5
      }
    ],

    sku   : "w-hoodie-001",
    weight: "0.65"
  },

  {
    categories : {men: 1, casual: 1},
    description: {
      en: "A heavyweight dark blue hoodie with a relaxed fit. Ideal for cooler weather.",
      nl: "Een zware donkerblauwe hoodie met een relaxte pasvorm. Ideaal voor koelere dagen.",
      fr: "Un hoodie bleu foncé épais avec une coupe décontractée. Idéal pour les temps plus frais."
    },
    dimensions : "33x27x4.5 ",
    documentId : "blue-hoodie-001",
    images     : [
      {url: "men-hoodie-2-a-454.webp"},
      {url: "men-hoodie-2-b-454.webp"},
      {url: "men-hoodie-2-c-454.webp"}
    ],
    name       : {
      en: "Dark Blue Hoodie",
      nl: "Donkerblauwe hoodie",
      fr: "Hoodie bleu foncé"
    },
    price      : 2799,
    rating     : 4,
    reviews    : [
      {
        en    : "Extremely warm and stylish, perfect for winter.",
        nl    : "Extreem warm en stijlvol, perfect voor de winter.",
        fr    : "Extrêmement chaud et élégant, parfait pour l’hiver.",
        user  : "user_123",
        rating: 5
      },
      {
        en    : "Pockets are deep and practical, but a bit heavy.",
        nl    : "De zakken zijn diep en praktisch, maar wel wat zwaar.",
        fr    : "Les poches sont profondes et pratiques, mais un peu lourd.",
        user  : "user_456",
        rating: 4
      },
      {
        en    : "Color fades slightly after a few washes.",
        nl    : "De kleur vervaagt licht na een paar wasbeurten.",
        fr    : "La couleur s’estompe légèrement après quelques lavages.",
        user  : "user_789",
        rating: 3
      },
      {
        en    : "Best hoodie I've owned!",
        nl    : "Beste hoodie die ik ooit heb gehad!",
        fr    : "Le meilleur hoodie que j’aie jamais eu !",
        user  : "user_221",
        rating: 5
      }
    ],
    sku        : "blue-hoodie-001",
    weight     : "0.85"
  },


  {
    categories : {men: 1, casual: 1},
    description: {
      en: "Classic black cotton t-shirt with a slim fit. Versatile for layering or solo wear.",
      nl: "Klassiek zwart katoenen T-shirt met een slanke pasvorm. Veelzijdig om te combineren of los te dragen.",
      fr: "T-shirt classique noir en coton avec une coupe ajustée. Polyvalent, à porter seul ou en superposition."
    },
    dimensions : "29x21x2.5 ",
    documentId : "w-t-shirt-001",
    images     : [
      {url: "men-tshirt-1-a-454.webp"},
      {url: "men-tshirt-1-b-454.webp"},
      {url: "men-tshirt-1-c-454.webp"}
    ],
    name       : {
      en: "White T-Shirt",
      nl: "Wit T-shirt",
      fr: "T-shirt blanc"
    },
    price      : 1299,
    rating     : 4,
    reviews    : [
      {
        en    : "Soft and durable, great for daily wear.",
        nl    : "Zacht en duurzaam, ideaal voor dagelijks gebruik.",
        fr    : "Doux et résistant, parfait pour un usage quotidien.",
        user  : "user_101",
        rating: 5
      },
      {
        en    : "True to size, but wrinkles easily.",
        nl    : "Valt normaal qua maat, maar kreukt snel.",
        fr    : "Taille conforme, mais se froisse facilement.",
        user  : "user_102",
        rating: 4
      },
      {
        en    : "Neckline stretches over time after multiple washes.",
        nl    : "De hals rekt na verloop van tijd uit na meerdere wasbeurten.",
        fr    : "L’encolure se détend avec le temps après plusieurs lavages.",
        user  : "user_103",
        rating: 3
      },
      {
        en    : "Simple and elegant, goes with everything.",
        nl    : "Eenvoudig en elegant, past bij alles.",
        fr    : "Simple et élégant, va avec tout.",
        user  : "user_115",
        rating: 5
      }
    ],
    sku        : "w-t-shirt-001",
    weight     : "0.35"
  },


  {
    categories : {men: 1, casual: 1},
    description: {
      en: "A stylish puffer jacket with insulation for cold weather. Lightweight yet warm.",
      nl: "Een stijlvolle gewatteerde jas met isolatie voor koud weer. Lichtgewicht maar warm.",
      fr: "Une doudoune élégante avec isolation pour le temps froid. Légère mais chaude."
    },
    dimensions : "34x28x6 ",
    documentId : "m-jacket-01",
    images     : [
      {url: "men-casual-1-a-454.webp"},
      {url: "men-casual-1-b-454.webp"},
      {url: "men-casual-1-c-454.webp"}
    ],
    name       : {
      en: "Puffer Jacket",
      nl: "Gewatteerde jas",
      fr: "Doudoune"
    },
    price      : 5499,
    rating     : 4,
    reviews    : [
      {
        en    : "Extremely warm and stylish, perfect for winter trips.",
        nl    : "Extreem warm en stijlvol, perfect voor winterreizen.",
        fr    : "Extrêmement chaude et élégante, parfaite pour les voyages d’hiver.",
        user  : "user_201",
        rating: 5
      },
      {
        en    : "A bit pricey but worth the investment.",
        nl    : "Iets prijzig, maar de investering waard.",
        fr    : "Un peu chère, mais vaut l’investissement.",
        user  : "user_202",
        rating: 4
      },
      {
        en    : "Zipper could be more durable.",
        nl    : "De rits zou duurzamer kunnen zijn.",
        fr    : "La fermeture éclair pourrait être plus durable.",
        user  : "user_203",
        rating: 3
      },
      {
        en    : "Lightweight yet keeps me warm in freezing temps.",
        nl    : "Lichtgewicht, maar houdt me warm bij vrieskou.",
        fr    : "Légère tout en me gardant au chaud par des températures glaciales.",
        user  : "user_204",
        rating: 5
      }
    ],
    sku        : "m-jacket-01",
    weight     : "1.2"
  },


  {
    categories : {men: 1, official: 1},
    color      : "Brown",
    description: {
      en: "A sleek and warm coat designed for the modern man. Features a tailored fit and premium wool blend.",
      nl: "Een stijlvolle en warme jas ontworpen voor de moderne man. Met een getailleerde pasvorm en een hoogwaardige wolmix.",
      fr: "Un manteau élégant et chaud conçu pour l’homme moderne. Coupe ajustée et mélange de laine haut de gamme."
    },
    dimensions : "42x31x7 ",
    documentId : "men-coat-001",
    image      : "men-coat-1.webp",
    images     : [
      {url: "men-coat-1-a-454.webp"},
      {url: "men-coat-1-b-454.webp"},
      {url: "men-coat-1-c-454.webp"}
    ],
    name       : {
      en: "Brown Coat",
      nl: "Bruine jas",
      fr: "Manteau marron"
    },
    price      : 8999,
    rating     : 4,
    reviews    : [
      {
        en    : "Excellent coat, very warm and stylish!",
        nl    : "Uitstekende jas, zeer warm en stijlvol!",
        fr    : "Excellent manteau, très chaud et élégant !",
        user  : "user_101",
        rating: 5
      },
      {
        en    : "Looks great but sleeves are a bit long.",
        nl    : "Ziet er geweldig uit, maar de mouwen zijn wat lang.",
        fr    : "Très beau, mais les manches sont un peu longues.",
        user  : "user_202",
        rating: 3
      },
      {
        en    : "Perfect for winter, highly recommend.",
        nl    : "Perfect voor de winter, zeker een aanrader.",
        fr    : "Parfait pour l’hiver, je recommande vivement.",
        user  : "user_303",
        rating: 4
      },
      {
        en    : "Premium feel, worth the price.",
        nl    : "Premium uitstraling, de prijs waard.",
        fr    : "Sensation haut de gamme, vaut son prix.",
        user  : "user_404",
        rating: 5
      }
    ],
    sku        : "men-coat-001",
    weight     : "1.4"
  },


  {
    categories : {men: 1, official: 1},
    description: {
      en: "A premium suit for formal occasions, tailored to perfection with reinforced stitching.",
      nl: "Een premium pak voor formele gelegenheden, tot in perfectie op maat gemaakt met verstevigde stiksels.",
      fr: "Un costume haut de gamme pour les occasions formelles, taillé à la perfection avec des coutures renforcées."
    },
    dimensions : "44x33x5 ",
    documentId : "m-suit-01",
    images     : [
      {url: "men-suits-1-454.webp"},
      {url: "men-suits-2-454.webp"},
      {url: "men-suits-3-454.webp"}
    ],
    name       : {
      en: "Blue Suit",
      nl: "Blauw pak",
      fr: "Costume bleu"
    },
    price      : 12499,
    rating     : 5,
    reviews    : [
      {
        en    : "Amazing fit and quality!",
        nl    : "Geweldige pasvorm en kwaliteit!",
        fr    : "Coupe et qualité incroyables !",
        user  : "user_404",
        rating: 5
      },
      {
        en    : "A bit tight around the shoulders.",
        nl    : "Iets strak rond de schouders.",
        fr    : "Un peu serré au niveau des épaules.",
        user  : "user_505",
        rating: 3
      },
      {
        en    : "Perfect for weddings and formal events.",
        nl    : "Perfect voor bruiloften en formele evenementen.",
        fr    : "Parfait pour les mariages et les événements formels.",
        user  : "user_606",
        rating: 5
      },
      {
        en    : "Tailoring is impeccable.",
        nl    : "Het maatwerk is onberispelijk.",
        fr    : "La confection est impeccable.",
        user  : "user_707",
        rating: 5
      }
    ],
    sku        : "m-suit-01",
    weight     : "1.6"
  },


  {
    categories : {men: 1, accessories: 1},
    color      : "Silver",
    description: {
      en: "A sleek stainless steel watch with a minimalist dial. Water-resistant up to 50m.",
      nl: "Een strak roestvrijstalen horloge met een minimalistische wijzerplaat. Waterbestendig tot 50 meter.",
      fr: "Une montre élégante en acier inoxydable avec un cadran minimaliste. Résistante à l’eau jusqu’à 50 m."
    },
    dimensions : "9x7x2 ",
    documentId : "m-watch-001",
    images     : [
      {url: "men-watch-1-a-454.webp"},
      {url: "men-watch-1-b-454.webp"},
      {url: "men-watch-1-c-454.webp"}
    ],
    name       : {
      en: "Silver Watch",
      nl: "Zilveren horloge",
      fr: "Montre argentée"
    },
    price      : 5499,
    rating     : 4,
    reviews    : [
      {
        en    : "Looks premium and stylish.",
        nl    : "Ziet er premium en stijlvol uit.",
        fr    : "A un look haut de gamme et élégant.",
        user  : "user_4001",
        rating: 5
      },
      {
        en    : "Accurate timekeeping.",
        nl    : "Houdt de tijd nauwkeurig bij.",
        fr    : "Très précis dans le temps.",
        user  : "user_4002",
        rating: 4
      },
      {
        en    : "Band could be more adjustable.",
        nl    : "De band zou beter verstelbaar kunnen zijn.",
        fr    : "Le bracelet pourrait être plus ajustable.",
        user  : "user_4003",
        rating: 4
      },
      {
        en    : "Great value for money.",
        nl    : "Goede prijs-kwaliteitverhouding.",
        fr    : "Excellent rapport qualité-prix.",
        user  : "user_4004",
        rating: 4
      }
    ],
    sku        : "m-watch-001",
    weight     : "0.35"
  },


  {
    categories : {men: 1, casual: 1, shoes: 1},
    description: {
      en: "Durable black boots with cushioned insoles for all-day comfort.",
      nl: "Duurzame zwarte laarzen met gevoerde binnenzolen voor comfort de hele dag door.",
      fr: "Bottes noires durables avec semelles intérieures rembourrées pour un confort toute la journée."
    },
    dimensions : "42x31x12 ",
    documentId : "m-shoes-2-001",
    images     : [
      {url: "men-shoes-2-a-454.webp"},
      {url: "men-shoes-2-b-454.webp"},
      {url: "men-shoes-2-c-454.webp"}
    ],
    name       : {
      en: "Black Boots",
      nl: "Zwarte laarzen",
      fr: "Bottes noires"
    },
    price      : 6499,
    rating     : 4,
    reviews    : [
      {
        en    : "Perfect for office wear.",
        nl    : "Perfect voor op kantoor.",
        fr    : "Parfaites pour le bureau.",
        user  : "user_5001",
        rating: 5
      },
      {
        en    : "Slightly tight around the toes.",
        nl    : "Iets strak bij de tenen.",
        fr    : "Un peu serrées au niveau des orteils.",
        user  : "user_5002",
        rating: 3
      },
      {
        en    : "High-quality leather.",
        nl    : "Hoogwaardig leer.",
        fr    : "Cuir de haute qualité.",
        user  : "user_5003",
        rating: 4
      },
      {
        en    : "Great grip on slippery surfaces.",
        nl    : "Goede grip op gladde oppervlakken.",
        fr    : "Excellente adhérence sur les surfaces glissantes.",
        user  : "user_5004",
        rating: 5
      }
    ],
    sku        : "m-shoes-2-001",
    weight     : "1.8"
  },


  {
    categories : {men: 1, casual: 1, hats: 1, "new arrivals": 1},
    description: {
      en: "Classic ivy cap made from breathable cotton. Ideal for sunny days.",
      nl: "Klassieke ivy-pet van ademend katoen. Ideaal voor zonnige dagen.",
      fr: "Casquette ivy classique en coton respirant. Idéale pour les journées ensoleillées."
    },
    dimensions : "12x10x4 ",
    documentId : "m-hats-1-001",
    images     : [
      {url: "men-hats-1-a-454.webp"},
      {url: "men-hats-1-b-454.webp"},
      {url: "men-hats-1-c-454.webp"}
    ],
    name       : {
      en: "Ivy Hat",
      nl: "Ivy-pet",
      fr: "Casquette ivy"
    },
    price      : 1499,
    rating     : 4,
    reviews    : [
      {
        en    : "Lightweight and stylish.",
        nl    : "Licht en stijlvol.",
        fr    : "Légère et élégante.",
        user  : "user_6001",
        rating: 5
      },
      {
        en    : "Fits slightly small.",
        nl    : "Valt iets klein.",
        fr    : "Taille légèrement petit.",
        user  : "user_6002",
        rating: 3
      },
      {
        en    : "Perfect for summer.",
        nl    : "Perfect voor de zomer.",
        fr    : "Parfaite pour l’été.",
        user  : "user_6003",
        rating: 4
      }
    ],
    sku        : "m-hats-1-001",
    weight     : "0.25"
  },


  {
    categories : {men: 1, shoes: 1},
    description: {
      en: "Classic brown leather shoes with a polished finish. Comfortable for all-day wear.",
      nl: "Klassieke bruine leren schoenen met een gepolijste afwerking. Comfortabel om de hele dag te dragen.",
      fr: "Chaussures classiques en cuir marron avec une finition polie. Confortables à porter toute la journée."
    },
    dimensions : "15x11x6 ",
    documentId : "m-shoes-1-001",
    images     : [
      {url: "men-shoes-1-a-454.webp"},
      {url: "men-shoes-1-b-454.webp"},
      {url: "men-shoes-1-c-454.webp"}
    ],
    name       : {
      en: "Black Leather Shoes",
      nl: "Zwarte leren schoenen",
      fr: "Chaussures en cuir noires"
    },
    price      : 7499,
    rating     : 4,
    reviews    : [
      {
        en    : "Comfortable and polished.",
        nl    : "Comfortabel en netjes afgewerkt.",
        fr    : "Confortables et bien finies.",
        user  : "user_7001",
        rating: 5
      },
      {
        en    : "Great for formal events.",
        nl    : "Geweldig voor formele gelegenheden.",
        fr    : "Idéales pour les événements formels.",
        user  : "user_7002",
        rating: 4
      },
      {
        en    : "Sole could be more cushioned.",
        nl    : "De zool mocht zachter gevoerd zijn.",
        fr    : "La semelle pourrait être plus rembourrée.",
        user  : "user_7003",
        rating: 3
      }
    ],
    sku        : "m-shoes-1-001",
    weight     : "1.3"
  },

  {
    categories : {men: 1, accessories: 1},
    color      : "Brown",
    description: {
      en: "Classic brown leather shoes with a polished finish. Comfortable for all-day wear.",
      nl: "Klassieke bruine leren schoenen met een gepolijste afwerking. Comfortabel om de hele dag te dragen.",
      fr: "Chaussures classiques en cuir marron avec une finition polie. Confortables à porter toute la journée."
    },
    dimensions : "14x10x6 ",
    documentId : "m-belt-001",
    images     : [
      {url: "men-belt-1-a-454.webp"},
      {url: "men-belt-1-b-454.webp"},
      {url: "men-belt-1-c-454.webp"}
    ],
    name       : {
      en: "Black Belt",
      nl: "Zwarte riem",
      fr: "Ceinture noire"
    },
    price      : 1999,
    rating     : 4,
    reviews    : [
      {
        en    : "Comfortable and polished.",
        nl    : "Comfortabel en netjes afgewerkt.",
        fr    : "Confortable et bien finie.",
        user  : "user_7001",
        rating: 5
      },
      {
        en    : "Great for formal events.",
        nl    : "Geweldig voor formele gelegenheden.",
        fr    : "Parfaite pour les événements formels.",
        user  : "user_7002",
        rating: 4
      }
    ],
    sku        : "m-belt-001",
    weight     : "0.25"
  },

  {
    categories : {men: 1, accessories: 1, "new arrivals": 1},
    description: {
      en: "Classic aviator sunglasses with UV400 protection and lightweight metal frame.",
      nl: "Klassieke aviator-zonnebril met UV400-bescherming en een lichtgewicht metalen montuur.",
      fr: "Lunettes de soleil aviateur classiques avec protection UV400 et monture métallique légère."
    },
    dimensions : "15x6x3 ",
    documentId : "m-glasses-1",
    images     : [
      {url: "men-accessories-1-a-454.webp"},
      {url: "men-accessories-1-b-454.webp"},
      {url: "men-accessories-1-c-454.webp"}
    ],
    name       : {
      en: "Sun Glasses",
      nl: "Zonnebril",
      fr: "Lunettes de soleil"
    },
    price      : 2499,
    rating     : 4,
    reviews    : [
      {
        en    : "Stylish and durable—worth the price!",
        nl    : "Stijlvol en duurzaam — de prijs waard!",
        fr    : "Stylées et durables — valent le prix !",
        user  : "user_7001",
        rating: 5
      },
      {
        en    : "Great for driving, but lenses scratch easily.",
        nl    : "Geweldig om mee te rijden, maar de glazen krassen snel.",
        fr    : "Excellentes pour conduire, mais les verres se rayent facilement.",
        user  : "user_7002",
        rating: 4
      },
      {
        en    : "Fits large heads perfectly.",
        nl    : "Past perfect bij grotere hoofden.",
        fr    : "Conviennent parfaitement aux grandes têtes.",
        user  : "user_7003",
        rating: 5
      }
    ],
    sku        : "m-glasses-1",
    weight     : "0.25"
  },


  //women.
  {
    categories : {women: 1, official: 1, shoes: 1},
    description: {
      en: "Elegant black heels with a cushioned insole for all-day comfort. Ideal for office wear.",
      nl: "Elegante zwarte hakken met een gevoerde binnenzool voor comfort de hele dag. Ideaal voor op kantoor.",
      fr: "Escarpins noirs élégants avec semelle intérieure rembourrée pour un confort toute la journée. Idéals pour le bureau."
    },
    dimensions : "11x7x3.5 ",
    documentId : "w-heels-001",
    images     : [
      {url: "women-shoes-1-a-454.webp"},
      {url: "women-shoes-1-b-454.webp"},
      {url: "women-shoes-1-c-454.webp"}
    ],
    name       : {
      en: "Black Formal Heels",
      nl: "Zwarte formele hakken",
      fr: "Escarpins noirs formels"
    },
    price      : 4599,
    rating     : 4,
    reviews    : [
      {
        en    : "Surprisingly comfortable for heels!",
        nl    : "Verrassend comfortabel voor hakken!",
        fr    : "Étonnamment confortables pour des talons !",
        user  : "user_3001",
        rating: 5
      },
      {
        en    : "Heel height is perfect for formal events.",
        nl    : "De hakhoogte is perfect voor formele gelegenheden.",
        fr    : "La hauteur du talon est parfaite pour les événements formels.",
        user  : "user_3002",
        rating: 4
      },
      {
        en    : "Slightly narrow toe box.",
        nl    : "Iets smalle neus.",
        fr    : "Bout légèrement étroit.",
        user  : "user_3003",
        rating: 3
      },
      {
        en    : "Classic design, pairs with everything.",
        nl    : "Klassiek ontwerp, past bij alles.",
        fr    : "Design classique, va avec tout.",
        user  : "user_3004",
        rating: 5
      }
    ],
    sku        : "w-heels-001",
    weight     : "0.7"
  },


  {
    categories : {women: 1, official: 1},
    description: {
      en: "A professional trouser suit with a fitted blazer and straight-leg pants.",
      nl: "Een professioneel broekpak met een getailleerde blazer en een rechte broek.",
      fr: "Un tailleur-pantalon professionnel avec un blazer ajusté et un pantalon droit."
    },
    dimensions : "42x32x5 ",
    documentId : "w-trouser-suit-001",
    images     : [
      {url: "women-suit-2-a-454.webp"},
      {url: "women-suit-2-b-454.webp"},
      {url: "women-suit-2-c-454.webp"}
    ],
    name       : {
      en: "Trouser Suit",
      nl: "Broekpak",
      fr: "Tailleur-pantalon"
    },
    price      : 8999,
    rating     : 5,
    reviews    : [
      {
        en    : "Perfect for office wear—tailored fit!",
        nl    : "Perfect voor op kantoor — getailleerde pasvorm!",
        fr    : "Parfait pour le bureau — coupe ajustée !",
        user  : "user_5001",
        rating: 5
      },
      {
        en    : "Slightly tight around hips.",
        nl    : "Iets strak rond de heupen.",
        fr    : "Légèrement serré aux hanches.",
        user  : "user_5002",
        rating: 3
      },
      {
        en    : "High-quality fabric, wrinkles less.",
        nl    : "Hoogwaardige stof, kreukt minder.",
        fr    : "Tissu de haute qualité, se froisse moins.",
        user  : "user_5003",
        rating: 5
      },
      {
        en    : "Worth every penny.",
        nl    : "Elke cent waard.",
        fr    : "Vaut chaque centime.",
        user  : "user_5004",
        rating: 4
      }
    ],
    sku        : "w-trouser-suit-001",
    weight     : "1.1"
  },


  {
    categories : {women: 1, casual: 1, shoes: 1},
    description: {
      en: "Trendy open-toe wedges with ankle straps for a secure fit. Great for summer outings.",
      nl: "Trendy open wedges met enkelbandjes voor een stevige pasvorm. Ideaal voor zomerse uitstapjes.",
      fr: "Sandales compensées ouvertes tendance avec brides de cheville pour un bon maintien. Parfaites pour les sorties d’été."
    },
    dimensions : "10x8x4 ",
    documentId : "w-shoes-2-001",
    images     : [
      {url: "women-shoes-2-a-454.webp"},
      {url: "women-shoes-2-b-454.webp"},
      {url: "women-shoes-2-c-454.webp"}
    ],
    name       : {
      en: "Open Wedges",
      nl: "Open wedges",
      fr: "Sandales compensées ouvertes"
    },
    price      : 3499,
    rating     : 4,
    reviews    : [
      {
        en    : "Comfortable even for long walks.",
        nl    : "Comfortabel, zelfs bij lange wandelingen.",
        fr    : "Confortables même pour de longues marches.",
        user  : "user_4001",
        rating: 5
      },
      {
        en    : "Straps dig into ankles after hours.",
        nl    : "Bandjes snijden na uren in de enkels.",
        fr    : "Les brides serrent les chevilles après quelques heures.",
        user  : "user_4002",
        rating: 3
      },
      {
        en    : "Breathable and stylish.",
        nl    : "Ademend en stijlvol.",
        fr    : "Respirantes et élégantes.",
        user  : "user_4003",
        rating: 4
      }
    ],
    sku        : "w-shoes-2-001",
    weight     : "0.9"
  },


  {
    categories: {women: 1, casual: 1, shoes: 1},

    description: {
      en: "Trendy open-toe blue wedges with ankle straps for a secure fit. Great for summer outings.",
      nl: "Trendy open wedges met open teen in blauw met enkelbandjes voor een stevige pasvorm. Ideaal voor zomerse uitstapjes.",
      fr: "Sandales compensées bleues à bout ouvert tendance avec brides de cheville pour un bon maintien. Parfaites pour les sorties d’été."
    },

    dimensions: "10x8x4 ",

    documentId: "w-shoes-2-001",

    images: [
      {url: "women-blue-wedges-1.webp"},
      {url: "women-blue-wedges-2.webp"},
      {url: "women-blue-wedges-3.webp"}
    ],

    name: {
      en: "Blue Open Wedges",
      nl: "Blauwe open wedges",
      fr: "Sandales compensées ouvertes bleues"
    },

    price : 3499,
    rating: 4,

    reviews: [
      {
        en    : "Comfortable even for long walks.",
        nl    : "Comfortabel, zelfs bij lange wandelingen.",
        fr    : "Confortables même pour de longues marches.",
        user  : "user_4001",
        rating: 5
      },
      {
        en    : "Straps dig into ankles after hours.",
        nl    : "Bandjes snijden na uren in de enkels.",
        fr    : "Les brides serrent les chevilles après quelques heures.",
        user  : "user_4002",
        rating: 3
      },
      {
        en    : "Breathable and stylish.",
        nl    : "Ademend en stijlvol.",
        fr    : "Respirantes et élégantes.",
        user  : "user_4003",
        rating: 4
      }
    ],

    sku   : "b-wedges-001",
    weight: "0.9"
  },


  {
    categories : {women: 1, casual: 1, shoes: 1},
    description: {
      en: "Chunky black boots with a lace-up design. Water-resistant and durable for all seasons.",
      nl: "Chunky zwarte laarzen met vetersluiting. Waterbestendig en duurzaam voor alle seizoenen.",
      fr: "Bottes noires épaisses à lacets. Résistantes à l’eau et durables pour toutes les saisons."
    },
    dimensions : "14x10x6 ",
    documentId : "w-shoes-4-001",
    images     : [
      {url: "women-black-boots-1.webp"},
      {url: "women-black-boots-2.webp"},
      {url: "women-black-boots-3.webp"}
    ],
    name       : {
      en: "Black Boots",
      nl: "Zwarte laarzen",
      fr: "Bottes noires"
    },
    price      : 5999,
    rating     : 4,
    reviews    : [
      {
        en    : "Perfect for winter—keeps feet dry!",
        nl    : "Perfect voor de winter — houdt de voeten droog!",
        fr    : "Parfait pour l’hiver — garde les pieds au sec !",
        user  : "user_5001",
        rating: 5
      },
      {
        en    : "Heavier than expected.",
        nl    : "Zwaarder dan verwacht.",
        fr    : "Plus lourdes que prévu.",
        user  : "user_5002",
        rating: 3
      },
      {
        en    : "Great traction on icy surfaces.",
        nl    : "Goede grip op ijzige oppervlakken.",
        fr    : "Excellente traction sur les surfaces glacées.",
        user  : "user_5003",
        rating: 4
      }
    ],
    sku        : "w-shoes-4-001",
    weight     : "1.5"
  },


  {
    categories : {women: 1, casual: 1},
    description: {
      en: "A fluffy winter coat with a soft inner lining for extra warmth. Oversized fit for comfort.",
      nl: "Een pluizige winterjas met een zachte voering voor extra warmte. Oversized pasvorm voor comfort.",
      fr: "Un manteau d’hiver moelleux avec doublure intérieure douce pour plus de chaleur. Coupe oversize pour le confort."
    },
    dimensions : "44x36x9 ",
    documentId : "fluffy-coat-01",
    images     : [
      {url: "women-fluffy-coat-1-a-454.webp"},
      {url: "women-fluffy-coat-1-b-454.webp"},
      {url: "women-fluffy-coat-1-c-454.webp"}
    ],
    name       : {
      en: "Pink Fluffy Coat",
      nl: "Roze pluizige jas",
      fr: "Manteau rose moelleux"
    },
    price      : 7499,
    rating     : 5,
    reviews    : [
      {
        en    : "Extremely warm and stylish—love it!",
        nl    : "Extreem warm en stijlvol — ik hou ervan!",
        fr    : "Extrêmement chaud et élégant — je l’adore !",
        user  : "user_6001",
        rating: 5
      },
      {
        en    : "Lightweight but cozy.",
        nl    : "Lichtgewicht maar gezellig.",
        fr    : "Léger mais confortable.",
        user  : "user_6002",
        rating: 4
      },
      {
        en    : "Pockets are deep and practical.",
        nl    : "De zakken zijn diep en praktisch.",
        fr    : "Les poches sont profondes et pratiques.",
        user  : "user_6003",
        rating: 5
      }
    ],
    sku        : "fluffy-coat-01",
    weight     : "1.3"
  },


  {
    categories : {women: 1, casual: 1},
    description: {
      en: "A trendy biker jacket with faux-leather finish. Edgy yet comfortable for everyday wear.",
      nl: "Een trendy bikerjack met nepleren afwerking. Stoer maar comfortabel voor dagelijks gebruik.",
      fr: "Une veste biker tendance avec finition en simili-cuir. Audacieuse mais confortable pour un usage quotidien."
    },
    dimensions : "38x28x5 ",
    documentId : "w-biker-jacket-001",
    image      : "women-biker-jacket-1.webp",
    images     : [
      {url: "women-biker-jacket-1-a-454.webp"},
      {url: "women-biker-jacket-1-b-454.webp"},
      {url: "women-biker-jacket-1-c-454.webp"}
    ],
    name       : {
      en: "Beige Biker Jacket",
      nl: "Beige bikerjack",
      fr: "Veste biker beige"
    },
    price      : 6499,
    rating     : 5,
    reviews    : [
      {
        en    : "Love this jacket—fits like a glove!",
        nl    : "Ik hou van dit jack — zit als gegoten!",
        fr    : "J’adore cette veste — elle tombe parfaitement !",
        user  : "user_1001",
        rating: 5
      },
      {
        en    : "Great for casual outings, but zipper sticks sometimes.",
        nl    : "Geweldig voor casual uitstapjes, maar de rits blijft soms haken.",
        fr    : "Parfait pour les sorties décontractées, mais la fermeture éclair accroche parfois.",
        user  : "user_1002",
        rating: 4
      },
      {
        en    : "Worth every penny. Gets compliments!",
        nl    : "Elke cent waard. Krijgt veel complimenten!",
        fr    : "Vaut chaque centime. Reçoit des compliments !",
        user  : "user_1003",
        rating: 5
      }
    ],
    sku        : "w-biker-jacket-001",
    weight     : "1.1"
  },


  {
    categories : {women: 1, official: 1},
    description: {
      en: "Elegant skirt suit with a tailored blazer and A-line skirt. Ideal for professional settings.",
      nl: "Elegant rokkenpak met een getailleerde blazer en A-lijn rok. Ideaal voor professionele omgevingen.",
      fr: "Tailleur jupe élégant avec blazer ajusté et jupe trapèze. Idéal pour un cadre professionnel."
    },
    dimensions : "42x32x5 ",
    documentId : "w-skirt-suit-001",
    images     : [
      {url: "women-suit-1-a-454.webp"},
      {url: "women-suit-1-b-454.webp"},
      {url: "women-suit-1-c-454.webp"}
    ],
    name       : {
      en: "Skirt Suit",
      nl: "Rokkenpak",
      fr: "Tailleur jupe"
    },
    price      : 8999,
    rating     : 4,
    reviews    : [
      {
        en    : "Looks sharp but fabric wrinkles easily.",
        nl    : "Ziet er scherp uit, maar de stof kreukt gemakkelijk.",
        fr    : "A l’air élégant mais le tissu se froisse facilement.",
        user  : "user_1004",
        rating: 3
      },
      {
        en    : "Perfect for interviews—very polished.",
        nl    : "Perfect voor sollicitaties — zeer verzorgd.",
        fr    : "Parfait pour les entretiens — très soigné.",
        user  : "user_1005",
        rating: 5
      },
      {
        en    : "Blazer pockets are too small.",
        nl    : "De zakken van de blazer zijn te klein.",
        fr    : "Les poches du blazer sont trop petites.",
        user  : "user_1006",
        rating: 4
      }
    ],
    sku        : "w-skirt-suit-001",
    weight     : "1.2"
  },


  {
    categories : {women: 1, casual: 1, hats: 1},
    description: {
      en: "A chic beige sun hat with a wide brim for UV protection. Lightweight and foldable.",
      nl: "Een chique beige zonnehoed met brede rand voor UV-bescherming. Lichtgewicht en opvouwbaar.",
      fr: "Un chapeau de soleil beige chic avec large bord pour la protection UV. Léger et pliable."
    },
    dimensions : "16x16x4 ",
    documentId : "w-h-001",
    images     : [
      {url: "women-hat-1-a-454.webp"},
      {url: "women-hat-1-b-454.webp"},
      {url: "women-hat-1-c-454.webp"}
    ],
    name       : {
      en: "Sun Hat",
      nl: "Zonnehoed",
      fr: "Chapeau de soleil"
    },
    price      : 1799,
    rating     : 4,
    reviews    : [
      {
        en    : "Saved me from sunburn at the beach!",
        nl    : "Redde me van zonnebrand op het strand!",
        fr    : "M'a protégé des coups de soleil à la plage !",
        user  : "user_2001",
        rating: 5
      },
      {
        en    : "Brim could be stiffer in wind.",
        nl    : "De rand had stijver kunnen zijn bij wind.",
        fr    : "Le bord pourrait être plus rigide par vent.",
        user  : "user_2002",
        rating: 3
      },
      {
        en    : "Packs easily for travel.",
        nl    : "Gemakkelijk in te pakken voor reizen.",
        fr    : "Se range facilement pour les voyages.",
        user  : "user_2003",
        rating: 5
      }
    ],
    sku        : "WH001",
    weight     : "0.15"
  },


  {
    categories : {women: 1, casual: 1, hats: 1},
    description: {
      en: "A cozy woolen cap for winter, lined with fleece for extra warmth.",
      nl: "Een gezellige wollen muts voor de winter, gevoerd met fleece voor extra warmte.",
      fr: "Un bonnet en laine confortable pour l’hiver, doublé en polaire pour plus de chaleur."
    },
    dimensions : "12x12x6 ",
    documentId : "w-h-002",
    images     : [
      {url: "women-hat-2-a-454.webp"},
      {url: "women-hat-2-b-454.webp"},
      {url: "women-hat-2-c-454.webp"}
    ],
    name       : {
      en: "Gray Woolen Cap",
      nl: "Grijze wollen muts",
      fr: "Bonnet gris en laine"
    },
    price      : 1499,
    rating     : 5,
    reviews    : [
      {
        en    : "So warm! Perfect for snowy days.",
        nl    : "Zo warm! Perfect voor besneeuwde dagen.",
        fr    : "Tellement chaud ! Parfait pour les jours de neige.",
        user  : "user_2004",
        rating: 5
      },
      {
        en    : "Fits snugly but not too tight.",
        nl    : "Zit goed, maar niet te strak.",
        fr    : "S’ajuste bien sans être trop serré.",
        user  : "user_2005",
        rating: 4
      },
      {
        en    : "Wish it came in more colors.",
        nl    : "Had graag in meer kleuren gezien.",
        fr    : "J’aimerais qu’il existe en plus de couleurs.",
        user  : "user_2006",
        rating: 4
      }
    ],
    sku        : "w-h-002",
    weight     : "0.2"
  },


  {
    categories : {women: 1, accessories: 1},
    color      : "Cream",
    description: {
      en: "A lightweight wool scarf with a subtle herringbone pattern. Perfect for layering.",
      nl: "Een lichtgewicht wollen sjaal met een subtiel visgraatpatroon. Perfect om te laagjes te dragen.",
      fr: "Une écharpe en laine légère avec un motif chevron subtil. Parfaite pour superposer."
    },
    dimensions : "72x32x1 ",
    documentId : "w-scarf-001",
    images     : [
      {url: "women-scarf-1-a-454.webp"},
      {url: "women-scarf-1-b-454.webp"},
      {url: "women-scarf-1-c-454.webp"}
    ],
    name       : {
      en: "Cream Wool Scarf",
      nl: "Crème wollen sjaal",
      fr: "Écharpe en laine crème"
    },
    price      : 2199,
    rating     : 4,
    reviews    : [
      {
        en    : "Soft and doesn’t itch—love it!",
        nl    : "Zacht en jeukt niet — geweldig!",
        fr    : "Douce et ne gratte pas — j’adore !",
        user  : "user_2007",
        rating: 5
      },
      {
        en    : "Length is perfect for wrapping twice.",
        nl    : "De lengte is perfect om twee keer om te slaan.",
        fr    : "La longueur est parfaite pour s’enrouler deux fois.",
        user  : "user_2008",
        rating: 4
      },
      {
        en    : "Could be thicker for winter.",
        nl    : "Had voor de winter iets dikker mogen zijn.",
        fr    : "Pourrait être plus épaisse pour l’hiver.",
        user  : "user_2009",
        rating: 3
      }
    ],
    sku        : "w-scarf-001",
    weight     : "0.3"
  },


  //kids.
  {
    categories : {kids: 1, casual: 1, shoes: 1},
    description: {
      en: "Colorful sneakers with velcro straps for easy wear. Flexible soles support active play.",
      nl: "Kleurrijke sneakers met klittenbandsluitingen voor gemakkelijk aan- en uittrekken. Flexibele zolen ondersteunen actief spel.",
      fr: "Baskets colorées avec bandes velcro pour un enfilage facile. Semelles flexibles pour soutenir le jeu actif."
    },
    dimensions : "8x5x3 ",
    documentId : "k-shoes-1-001",
    images     : [
      {url: "kids-shoes-1-a-454.webp"},
      {url: "kids-shoes-1-b-454.webp"},
      {url: "kids-shoes-1-c-454.webp"}
    ],
    name       : {
      en: "Booties",
      nl: "Schoentjes",
      fr: "Chaussons"
    },
    price      : 1799,
    rating     : 4,
    reviews    : [
      {
        en    : "My toddler can put these on by himself!",
        nl    : "Mijn peuter kan deze zelf aantrekken!",
        fr    : "Mon tout-petit peut les mettre tout seul !",
        user  : "user_6001",
        rating: 5
      },
      {
        en    : "Great grip but stains easily.",
        nl    : "Goede grip, maar vlekken komen snel.",
        fr    : "Bonne adhérence mais se salit facilement.",
        user  : "user_6002",
        rating: 3
      },
      {
        en    : "Held up through months of playground use.",
        nl    : "Heeft maandenlang speelplaatsgebruik goed doorstaan.",
        fr    : "A tenu le coup après des mois d'utilisation sur le terrain de jeu.",
        user  : "user_6003",
        rating: 4
      }
    ],
    sku        : "k-shoes-1-001",
    weight     : "0.4"
  },


  {
    categories : {kids: 1, casual: 1, shoes: 1, "new arrivals": 1},
    description: {
      en: "Waterproof rain boots with fun animal prints. Perfect for puddle jumping.",
      nl: "Waterdichte regenlaarzen met leuke dierenprints. Perfect om in plassen te springen.",
      fr: "Bottes de pluie imperméables avec motifs d’animaux amusants. Parfaites pour sauter dans les flaques."
    },
    dimensions : "9x6x4 ",
    documentId : "k-shoes-2-001",
    images     : [
      {url: "kids-shoes-2-a-454.webp"},
      {url: "kids-shoes-2-b-454.webp"},
      {url: "kids-shoes-2-c-454.webp"}
    ],
    name       : {
      en: "Rain Boots",
      nl: "Regenlaarzen",
      fr: "Bottes de pluie"
    },
    price      : 2199,
    rating     : 5,
    reviews    : [
      {
        en    : "100% waterproof - survived monsoon season!",
        nl    : "100% waterdicht - overleefde het moessonseizoen!",
        fr    : "100% imperméables - ont survécu à la saison des moussons !",
        user  : "user_7001",
        rating: 5
      },
      {
        en    : "My child loves the dinosaur prints.",
        nl    : "Mijn kind is dol op de dinosaurusprints.",
        fr    : "Mon enfant adore les motifs de dinosaures.",
        user  : "user_7002",
        rating: 5
      },
      {
        en    : "A bit stiff at first but breaks in nicely.",
        nl    : "Eerst een beetje stijf, maar vormt zich goed naar de voet.",
        fr    : "Un peu rigides au début mais s’assouplissent bien.",
        user  : "user_7003",
        rating: 4
      }
    ],
    sku        : "k-shoes-2-001",
    weight     : "0.6"
  },


  {
    categories : {kids: 1, casual: 1, shoes: 1},
    description: {
      en: "Breathable canvas shoes with reinforced toes for durability. Machine washable.",
      nl: "Ademend canvas schoenen met verstevigde tenen voor duurzaamheid. Machinewasbaar.",
      fr: "Chaussures en toile respirantes avec bouts renforcés pour la durabilité. Lavables en machine."
    },
    dimensions : "7x5x3 ",
    documentId : "k-shoes-3-001",
    images     : [
      {url: "kids-canvas-shoes-1.webp"},
      {url: "kids-canvas-shoes-2.webp"},
      {url: "kids-canvas-shoes-3.webp"}
    ],
    name       : {
      en: "Canvas Shoes",
      nl: "Canvas schoenen",
      fr: "Chaussures en toile"
    },
    price      : 1499,
    rating     : 4,
    reviews    : [
      {
        en    : "Perfect for school uniform.",
        nl    : "Perfect voor schooluniform.",
        fr    : "Parfait pour l’uniforme scolaire.",
        user  : "user_8001",
        rating: 5
      },
      {
        en    : "Sole separated after 3 months.",
        nl    : "De zool liet los na 3 maanden.",
        fr    : "La semelle s’est détachée après 3 mois.",
        user  : "user_8002",
        rating: 2
      },
      {
        en    : "Great value for the price.",
        nl    : "Geweldige prijs-kwaliteitverhouding.",
        fr    : "Excellent rapport qualité-prix.",
        user  : "user_8003",
        rating: 4
      }
    ],
    sku        : "k-shoes-3-001",
    weight     : "0.3"
  },


  {
    categories : {kids: 1, casual: 1},
    description: {
      en: "Soft cotton pajama set with elastic waistband. Hypoallergenic and tagless for comfort.",
      nl: "Zachte katoenen pyjama met elastische tailleband. Hypoallergeen en zonder labels voor comfort.",
      fr: "Ensemble de pyjama en coton doux avec ceinture élastique. Hypoallergénique et sans étiquette pour le confort."
    },
    dimensions : "12x10x1 ",
    documentId : "k-casual-4-001",
    images     : [
      {url: "kids-pyjamas-1.webp"},
      {url: "kids-pyjamas-2.webp"},
      {url: "kids-pyjamas-3.webp"}
    ],
    name       : {
      en: "Cotton Pyjamas",
      nl: "Katoenen pyjama",
      fr: "Pyjama en coton"
    },
    price      : 999,
    rating     : 5,
    reviews    : [
      {
        en    : "Washed well without shrinking.",
        nl    : "Washed well without shrinking.",
        fr    : "Lavé sans rétrécir.",
        user  : "user_9001",
        rating: 5
      },
      {
        en    : "My sensitive-skinned child has no irritation.",
        nl    : "Mijn kind met gevoelige huid heeft geen irritatie.",
        fr    : "Mon enfant à la peau sensible n’a aucune irritation.",
        user  : "user_9002",
        rating: 5
      },
      {
        en    : "Cute prints fade after washes.",
        nl    : "Leuke prints vervagen na het wassen.",
        fr    : "Les jolis motifs s’estompent après plusieurs lavages.",
        user  : "user_9003",
        rating: 3
      }
    ],
    sku        : "k-casual-4-001",
    weight     : "0.25"
  },


  {
    categories : {kids: 1, casual: 1, "new arrivals": 1},
    description: {
      en: "Stretch denim jeans with adjustable waist. Reinforced knees for active kids.",
      nl: "Rekbare spijkerbroek met verstelbare taille. Verstevigde knieën voor actieve kinderen.",
      fr: "Jean en denim extensible avec taille ajustable. Genoux renforcés pour les enfants actifs."
    },
    dimensions : "14x12x2 ",
    documentId : "k-casual-5-001",
    images     : [
      {url: "kids-casual-5-a-454.webp"},
      {url: "kids-casual-5-b-454.webp"},
      {url: "kids-casual-5-c-454.webp"}
    ],
    name       : {
      en: "Denim Jeans",
      nl: "Spijkerbroek",
      fr: "Jean en denim"
    },
    price      : 1599,
    rating     : 4,
    reviews    : [
      {
        en    : "Adjustable waist is genius for growing kids.",
        nl    : "Verstelbare taille is geniaal voor groeiende kinderen.",
        fr    : "La taille ajustable est géniale pour les enfants qui grandissent.",
        user  : "user_10001",
        rating: 5
      },
      {
        en    : "Knee patches started fraying quickly.",
        nl    : "De kniestukken begonnen snel te rafelen.",
        fr    : "Les renforts aux genoux ont commencé à s’effilocher rapidement.",
        user  : "user_10002",
        rating: 3
      },
      {
        en    : "True to size chart measurements.",
        nl    : "Voldoet aan de maattabel.",
        fr    : "Correspond aux mesures du tableau des tailles.",
        user  : "user_10003",
        rating: 4
      }
    ],
    sku        : "k-casual-5-001",
    weight     : "0.35"
  },


  {
    categories : {kids: 1, casual: 1, hats: 1},
    description: {
      en: "Wide-brim sun hat with UPF 50+ protection. Chin strap keeps it secure in wind.",
      nl: "Zonnehoed met brede rand en UPF 50+ bescherming. Kinbandje houdt hem stevig bij wind.",
      fr: "Chapeau de soleil à large bord avec protection UPF 50+. La sangle sous le menton le maintient en place par vent."
    },
    dimensions : "10x10x4 ",
    documentId : "k-hats-3-001",
    images     : [
      {url: "kids-hats-3-a-454.webp"},
      {url: "kids-hats-3-b-454.webp"},
      {url: "kids-hats-3-c-454.webp"}
    ],
    name       : {
      en: "Sun Hat",
      nl: "Zonnehoed",
      fr: "Chapeau de soleil"
    },
    price      : 1299,
    rating     : 4,
    reviews    : [
      {
        en    : "Essential for beach vacations!",
        nl    : "Onmisbaar voor strandvakanties!",
        fr    : "Indispensable pour les vacances à la plage !",
        user  : "user_11001",
        rating: 5
      },
      {
        en    : "Chin strap is uncomfortable.",
        nl    : "Het kinbandje zit oncomfortabel.",
        fr    : "La sangle sous le menton est inconfortable.",
        user  : "user_11002",
        rating: 3
      },
      {
        en    : "Folds flat for diaper bag storage.",
        nl    : "Vouwt plat voor opslag in de luiertas.",
        fr    : "Se plie à plat pour le rangement dans le sac à couches.",
        user  : "user_11003",
        rating: 4
      }
    ],
    sku        : "k-hats-3-001",
    weight     : "0.15"
  },


  {
    categories : {kids: 1, official: 1, boys: 1},
    description: {
      en: "Crisp white dress shirt with adjustable collar and easy-care fabric. Perfect for school events and formal occasions.",
      nl: "Knap wit overhemd met verstelbare kraag en onderhoudsvriendelijke stof. Perfect voor schoolactiviteiten en formele gelegenheden.",
      fr: "Chemise blanche impeccable avec col ajustable et tissu facile d'entretien. Parfaite pour les événements scolaires et les occasions formelles."
    },
    dimensions : "12x10x1 ",
    documentId : "k-official-1-001",
    images     : [
      {url: "kids-official-1-a-454.webp"},
      {url: "kids-official-1-b-454.webp"},
      {url: "kids-official-1-c-454.webp"}
    ],
    name       : {
      en: "Formal White Shirt",
      nl: "Formeel wit overhemd",
      fr: "Chemise blanche formelle"
    },
    price      : 899,
    rating     : 4,
    reviews    : [
      {
        en    : "Perfect for my son's piano recital.",
        nl    : "Perfect voor het pianorecital van mijn zoon.",
        fr    : "Parfait pour le récital de piano de mon fils.",
        user  : "user_12001",
        rating: 5
      },
      {
        en    : "Collar stays could be better quality.",
        nl    : "De kraagstaafjes kunnen van betere kwaliteit zijn.",
        fr    : "Les baleines du col pourraient être de meilleure qualité.",
        user  : "user_12002",
        rating: 3
      },
      {
        en    : "Washes well without ironing needed.",
        nl    : "Wast goed zonder dat strijken nodig is.",
        fr    : "Se lave bien sans besoin de repassage.",
        user  : "user_12003",
        rating: 4
      }
    ],
    sku        : "k-official-1-001",
    weight     : "0.3"
  },


  {
    categories : {kids: 1, official: 1, girls: 1},
    description: {
      en: "Charming A-line dress with satin ribbon detail. Wrinkle-resistant fabric for special occasions.",
      nl: "Charmante A-lijn jurk met satijnen lintdetail. Kreukbestendige stof voor speciale gelegenheden.",
      fr: "Robe trapèze charmante avec détail en ruban satin. Tissu infroissable pour les occasions spéciales."
    },
    dimensions : "14x12x2 ",
    documentId : "k-official-2-001",
    images     : [
      {url: "kids-official-2-a-454.webp"},
      {url: "kids-official-2-b-454.webp"},
      {url: "kids-official-2-c-454.webp"}
    ],
    name       : {
      en: "Party Dress",
      nl: "Feestjurk",
      fr: "Robe de fête"
    },
    price      : 1499,
    rating     : 5,
    reviews    : [
      {
        en    : "My daughter loved it for her birthday!",
        nl    : "Mijn dochter vond het geweldig voor haar verjaardag!",
        fr    : "Ma fille l’a adorée pour son anniversaire !",
        user  : "user_13001",
        rating: 5
      },
      {
        en    : "Ribbon came loose after first wash.",
        nl    : "Het lint kwam los na de eerste wasbeurt.",
        fr    : "Le ruban s’est détaché après le premier lavage.",
        user  : "user_13002",
        rating: 3
      },
      {
        en    : "True to size with room to grow.",
        nl    : "Voldoet aan de maat met ruimte om te groeien.",
        fr    : "Conforme à la taille avec de la place pour grandir.",
        user  : "user_13003",
        rating: 5
      }
    ],
    sku        : "k-official-2-001",
    weight     : "0.4"
  },


  {
    categories : {kids: 1, official: 1, boys: 1, "new arrivals": 1},
    description: {
      en: "Two-piece suit with adjustable waist trousers. Stain-resistant fabric for active kids.",
      nl: "Tweedelig pak met verstelbare taillebroek. Vlekbestendige stof voor actieve kinderen.",
      fr: "Costume deux pièces avec pantalon à taille ajustable. Tissu résistant aux taches pour les enfants actifs."
    },
    dimensions : "15x13x3 ",
    documentId : "k-official-3-001",
    images     : [
      {url: "kids-official-3-a-454.webp"},
      {url: "kids-official-3-b-454.webp"},
      {url: "kids-official-3-c-454.webp"}
    ],
    name       : {
      en: "Brown Suit",
      nl: "Bruin Pak",
      fr: "Costume Marron"
    },
    price      : 2499,
    rating     : 4,
    reviews    : [
      {
        en    : "Looked sharp for wedding photos.",
        nl    : "Zag er scherp uit voor trouwfoto’s.",
        fr    : "Avait fière allure pour les photos de mariage.",
        user  : "user_14001",
        rating: 5
      },
      {
        en    : "Jacket sleeves needed tailoring.",
        nl    : "Mouwen van het jasje moesten worden aangepast.",
        fr    : "Les manches de la veste nécessitaient des retouches.",
        user  : "user_14002",
        rating: 3
      },
      {
        en    : "Pants have adjustable waist - brilliant!",
        nl    : "Broek met verstelbare taille - briljant!",
        fr    : "Pantalon avec taille ajustable - génial !",
        user  : "user_14003",
        rating: 4
      }
    ],
    sku        : "k-official-3-001",
    weight     : "0.7"
  },


  {
    categories : {kids: 1, casual: 1, boys: 1},
    description: {
      en: "Soft cotton-blend sweater with reinforced elbows. Machine washable for easy care.",
      nl: "Zachte sweater van katoenmix met versterkte ellebogen. Machinewasbaar voor eenvoudig onderhoud.",
      fr: "Pull doux en mélange de coton avec coudières renforcées. Lavable en machine pour un entretien facile."
    },
    dimensions : "13x11x2 ",
    documentId : "k-casual-1-001",
    images     : [
      {url: "kids-casual-1-a-454.webp"},
      {url: "kids-casual-1-b-454.webp"},
      {url: "kids-casual-1-c-454.webp"}
    ],
    name       : {
      en: "Blue Sweater",
      nl: "Blauwe Trui",
      fr: "Pull Bleu"
    },
    price      : 1299,
    rating     : 4,
    reviews    : [
      {
        en    : "Warm but not itchy - perfect for school.",
        nl    : "Warm maar niet kriebelig - perfect voor school.",
        fr    : "Chaud mais pas irritant - parfait pour l'école.",
        user  : "user_15001",
        rating: 5
      },
      {
        en    : "Color faded after a few washes.",
        nl    : "Kleur vervaagde na een paar wasbeurten.",
        fr    : "La couleur a pâli après quelques lavages.",
        user  : "user_15002",
        rating: 3
      },
      {
        en    : "Holds up well to rough play.",
        nl    : "Blijft goed in vorm bij ruig spel.",
        fr    : "Tient bien lors des jeux agités.",
        user  : "user_15003",
        rating: 4
      }
    ],
    sku        : "k-casual-1-001",
    weight     : "0.35"
  },


  {
    categories : {kids: 1, casual: 1, boys: 1},
    description: {
      en: "Padded winter jacket with water-resistant shell. Reflective strips for visibility.",
      nl: "Gewatteerde winterjas met waterafstotende buitenlaag. Reflecterende strepen voor zichtbaarheid.",
      fr: "Veste d'hiver matelassée avec coque résistante à l'eau. Bandes réfléchissantes pour la visibilité."
    },
    dimensions : "16x14x4 ",
    documentId : "k-casual-2-001",
    images     : [
      {url: "kids-winter-jacket-1.webp"},
      {url: "kids-winter-jacket-2.webp"},
      {url: "kids-winter-jacket-3.webp"}
    ],
    name       : {
      en: "Kids Winter Jacket",
      nl: "Kinder Winterjas",
      fr: "Veste d'Hiver Enfant"
    },
    price      : 2999,
    rating     : 5,
    reviews    : [
      {
        en    : "Kept my son warm in -10°C weather!",
        nl    : "Hield mijn zoon warm bij -10°C!",
        fr    : "A gardé mon fils au chaud par -10°C !",
        user  : "user_16001",
        rating: 5
      },
      {
        en    : "Zipper gets stuck sometimes.",
        nl    : "Rits blijft soms haken.",
        fr    : "La fermeture éclair se coince parfois.",
        user  : "user_16002",
        rating: 3
      },
      {
        en    : "Hood stays up in wind - great design.",
        nl    : "Capuchon blijft omhoog in de wind - geweldig ontwerp.",
        fr    : "La capuche reste relevée par vent - excellent design.",
        user  : "user_16003",
        rating: 5
      }
    ],
    sku        : "k-casual-2-001",
    weight     : "0.8"
  },


  {
    categories : {kids: 1, casual: 1, hats: 1},
    description: {
      en: "UPF 50+ sun hat with neck flap. Lightweight and packable for travel.",
      nl: "UPF 50+ zonhoed met nekflap. Lichtgewicht en opvouwbaar voor reizen.",
      fr: "Chapeau de soleil UPF 50+ avec protection pour la nuque. Léger et pliable pour les voyages."
    },
    dimensions : "10x10x3 ",
    documentId : "k-hats-1-001",
    images     : [
      {url: "kids-hats-1-a-454.webp"},
      {url: "kids-hats-1-b-454.webp"},
      {url: "kids-hats-1-c-454.webp"}
    ],
    name       : {
      en: "Sun Hat",
      nl: "Zonhoed",
      fr: "Chapeau de Soleil"
    },
    price      : 799,
    rating     : 4,
    reviews    : [
      {
        en    : "Essential for our beach vacation!",
        nl    : "Onmisbaar voor onze strandvakantie!",
        fr    : "Indispensable pour nos vacances à la plage !",
        user  : "user_17001",
        rating: 5
      },
      {
        en    : "Neck flap is a bit short.",
        nl    : "De nekflap is iets te kort.",
        fr    : "La protection pour la nuque est un peu courte.",
        user  : "user_17002",
        rating: 3
      },
      {
        en    : "Washed well and kept its shape.",
        nl    : "Wast goed en behield zijn vorm.",
        fr    : "A bien résisté au lavage et a gardé sa forme.",
        user  : "user_17003",
        rating: 4
      }
    ],
    sku        : "k-hats-1-001",
    weight     : "0.15"
  },


  {
    categories : {kids: 1, casual: 1, hats: 1, "new arrivals": 1},
    description: {
      en: "Knit wool hat with fleece lining. Ear flaps provide extra warmth in winter.",
      nl: "Gebreide wollen muts met fleece voering. Oorflappen zorgen voor extra warmte in de winter.",
      fr: "Bonnet en laine tricotée avec doublure polaire. Les rabats d'oreilles offrent une chaleur supplémentaire en hiver."
    },
    dimensions : "9x9x4 ",
    documentId : "k-hats-2-001",
    images     : [
      {url: "kids-hats-2-a-454.webp"},
      {url: "kids-hats-2-b-454.webp"},
      {url: "kids-hats-2-c-454.webp"}
    ],
    name       : {
      en: "Woolen Winter Hat",
      nl: "Wollen Wintermuts",
      fr: "Bonnet d'Hiver en Laine"
    },
    price      : 899,
    rating     : 5,
    reviews    : [
      {
        en    : "Soft and doesn't itch - miracle for wool!",
        nl    : "Zacht en jeukt niet - een wonder voor wol!",
        fr    : "Doux et ne gratte pas - un miracle pour la laine !",
        user  : "user_18001",
        rating: 5
      },
      {
        en    : "Ear flaps could be longer.",
        nl    : "De oorflappen mogen langer zijn.",
        fr    : "Les rabats d'oreilles pourraient être plus longs.",
        user  : "user_18002",
        rating: 4
      },
      {
        en    : "Survived multiple snowball fights.",
        nl    : "Overleefde meerdere sneeuwballengevechten.",
        fr    : "A survécu à plusieurs batailles de boules de neige.",
        user  : "user_18003",
        rating: 5
      }
    ],
    sku        : "k-hats-2-001",
    weight     : "0.2"
  }


]);
</script>


<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

h1, h2, h3 {
  font-family: 'Plaifair', serif;
}

.decimal {
  font-family: 'Inter', sans-serif;
}


.p-popover-content {
  padding: 0 !important;
}


.fade-enter-active {
  transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1)
}

.fade-leave-active {
  transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1)
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.text-spaced {
  letter-spacing: 0.1em
}

.sans-serif {
  font-family: 'Roboto Regular', sans-serif;
}

.text-gold {
  color: rgb(204, 162, 36) !important;
}

.bg-gold {
  background-color: rgb(204, 162, 36) !important;
}

/* input text */
input:focus, textarea,
input:not(:placeholder-shown) {
  background-color: transparent;
  outline: none;
}

.p-inputtext {
  background: transparent !important;
}

/* When input has value (Material theme) */
.p-inputtext.p-filled {
  background: transparent !important;
}


@media screen and (min-width: 992px) {
  .lg\:w-36rem {
    width: 36rem !important;
  }
}
</style>