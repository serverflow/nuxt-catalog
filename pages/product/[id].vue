<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="`${product.image}`" />
    <p>{{ product.description }}</p>
    <p><strong>Цена:</strong> {{ formatPrice(product.price) }} руб.</p>
    <p><strong>Категория:</strong> {{ product.category }}</p>
    <NuxtLink to="/">Назад в каталог</NuxtLink>
  </div>
  <div v-else>
    <p>Product not found</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

// Массив товаров (для примера, в реальности их можно получить через API)
const products = [
  {
    name: "HP DL360G9 4LFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 1U)",
    id: 1018,
    image:
      "https://serverflow.ru/upload/iblock/a0f/23pw0styjco5xud7q4hi7431n15j4d9n/rewgergtewrgewg.png",
    description: "HP DL360G9 4LFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 1U)",
    price: 36700,
  },
  {
    name: "Серверная платформа HP DL360G9 1U 8SFF (2x 500W, 2x LGA2011-3)",
    id: 1019,
    image:
      "https://serverflow.ru/upload/iblock/358/1kzygtawcspdfcdcgbth50oteo7b5j9a/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description: "HP DL360G9 8SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 1U)",
    price: 34700,
  },
  {
    name: "Серверная платформа HP DL380G9 2U 8SFF (2x 500W, 2x LGA2011-3)",
    id: 1020,
    image:
      "https://serverflow.ru/upload/iblock/ed7/xwglhj1qp3t1auw42wzu5sfrg8p9ke9d/6bdzfx0evdvu0zionc3aozmk2tpxl5ly.jpg",
    description: "HP DL380G9 8SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 2U)",
    price: 49700,
  },
  {
    name: "HP DL380G9 2U 24SFF (SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU)",
    id: 1021,
    image:
      "https://serverflow.ru/upload/iblock/91b/gajk2rroj6cw589du0ovdlbsu7d4145e/gnucmyi9m291uoihxesw81dq9bw31qbo.jpg",
    description: "HP DL380G9 24SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 2U)",
    price: 59000,
  },
  {
    name: "Серверная платформа HP DL380G9 2U 12LFF (2x 500W, 2x LGA2011-3)",
    id: 1022,
    image:
      "https://serverflow.ru/upload/iblock/529/jelqjt76b3pn3pyxycnkyyefu7z0egcg/roezt93ufnrswhy9qxnb461y226wnvdc.jpg",
    description: "HP DL380G9 12LFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 2U)",
    price: 50700,
  },
  {
    name: "Серверная платформа Dell R630 1U 8SFF (2x 750W, 2x LGA2011-3)",
    id: 1023,
    image:
      "https://serverflow.ru/upload/iblock/85a/fidgxmftsukwruirw9u4s9ux43i1nub5/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description: "Dell R630 8SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x750w, 1U)",
    price: 38700,
  },
  {
    name: "Серверная платформа Dell R730XD 2U 24SFF (2x 750W, 2x LGA2011-3)",
    id: 1024,
    image:
      "https://serverflow.ru/upload/iblock/125/c1cf2cbl05nr2v0g10ghsizpxdnwhpnz/gg2muzq3f3sqld6prc0bfhzjztft3lvw.jpg",
    description:
      "Dell R730XD 2U 24SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x750w, 2U)",
    price: 82700,
  },
  {
    name: "Серверная платформа Dell R730XD 2U 12LFF (2x 750W, 2x LGA2011-3)",
    id: 1025,
    image:
      "https://serverflow.ru/upload/iblock/8f1/wswxb9d04jzmd81gzhk04hm1kkgng2v5/5yvn016o5l4uhuquiz8n59gc56ld34y1.jpg",
    description:
      "Dell R730XD 2U 12LFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x750w, 2U)",
    price: 46700,
  },
  {
    name: "Серверная платформа HPE DL380G10 2U 8SFF (2x 800W, 2x LGA3647)",
    id: 1026,
    image:
      "https://serverflow.ru/upload/iblock/138/xb5eibh2oc77syyucalkrzk9440zjai7/hp-dl380g10-8sff.jpg",
    description: "HP DL380G10 8SFF(2x LGA2011-3, 24DIMM, SAS/SATA, 2x500w, 2U)",
    price: 135500,
  },
  {
    name: "Серверная платформа SuperServer 6028U-TR4+ 2U 12LFF (2x 750W, 2x LGA2011-3)",
    id: 1027,
    image:
      "https://serverflow.ru/upload/iblock/e51/cbosgthtbe1z58mranl9o9oj1mxudga3/rl5uq82wbtq7tqxz9l71c7w3l68ey32z.jpg",
    description:
      "Бекплеин - BPN-SAS3-826EL1 Райзер - AOC-2UR6-i4XT(4x 10Gbe RJ45 Intel X540)",
    price: 68900,
  },
  {
    name: "Серверная платформа Supermicro AS-2023US-TR4 12LFF (4x U.2, 2x 1600W, 2x SP3)",
    id: 1028,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x SP3 AMD EPYC, 32DIMM, SAS/SATA, 2x500w, 2U)",
    price: 148700,
  },
  {
    name: "Dell R7525 12LFF(2x SP3 AMD EPYC, 32DIMM, SAS/SATA, 2x500w, 2U)",
    id: 1029,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x SP3 AMD EPYC, 32DIMM, SAS/SATA, 2x500w, 2U)",
    price: 169800,
  },
  {
    name: "Серверная платформа Dell PowerEdge R220 1U 2LFF (250W, LGA1150)",
    id: 1030,
    image:
      "https://serverflow.ru/upload/iblock/41f/uw30bd1q4wfbua95bsxuza5jjel209if/0y74xhuerw79yetqwwg68lkux44rb3ki.jpg",
    description:
      "Dell PowerEdge R220 2LFF ( SAS/SATA 12GBe, 2x 750W, 4DIMM, 1CPU, PERC H730)",
    price: 20800,
  },
  {
    name: "Серверная платформа Dell PowerEdge R240 1U 2LFF (250W, LGA1151v2)",
    id: 1031,
    image:
      "https://serverflow.ru/upload/iblock/29a/5oduz3q1ttxktdclrwtmuqcyj7g2a1sj/5cqszdz4o3smdurwkqy3nvbieq2x5hmw.jpg",
    description:
      "Dell PowerEdge R240 2LFF ( SAS/SATA 12GBe, 2x 750W, 4DIMM, 1CPU, PERC H730)",
    price: 68600,
  },
  {
    name: "Серверная платформа SuperServer 6018U-TR4+ 1U 4LFF (2x 750W, 2x LGA2011-3)",
    id: 1032,
    image:
      "https://serverflow.ru/upload/iblock/4b7/l5ouedkl5axpewrlga2izjsa5w3jy3qj/vx4h0837jofsp0z5iyefjkq26ghpkyaw.jpg",
    description:
      "Бекплеин - BPN-SAS3-815TQ райзер - AOC-UR-i4XT(4x 10Gbe RJ45 Intel X540)",
    price: 35900,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1033,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF(2x 2643v3, 64GB, H240AR, 2x Intel S3700 400GB, 2x500w)",
    price: 78900,
  },
  {
    name: "Сервер HP DL380G9 8SFF",
    id: 1034,
    image:
      "https://serverflow.ru/upload/iblock/6af/eabinxw67p6uhjbdha8aoit5owfyqv0o/6bdzfx0evdvu0zionc3aozmk2tpxl5ly.jpg",
    description:
      "HP DL380G9 8SFF(2x 2667v3, 128GB, P840AR 2GB + BBU, 8x Intel S4510 1TB , 2x800w)",
    price: 263700,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1035,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6144 384GB, P840 PCI-E + 4GB кэш + BBU, 8x Intel S4510 1TB, 2x800w)",
    price: 543500,
  },
  {
    name: "Сервер Dell R730XD 2U 24SFF",
    id: 1036,
    image:
      "https://serverflow.ru/upload/iblock/bfc/gg2muzq3f3sqld6prc0bfhzjztft3lvw.jpg",
    description:
      "Dell R730XD 2U 24SFF(2x 2637v4 , 64GB, H730, 8x Intel S4510 1TB, 2x 750w)",
    price: 250100,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1037,
    image:
      "https://serverflow.ru/upload/iblock/2be/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description:
      "Dell R630 8SFF(2x 2667v4, 256GB, H730, 8x Intel S4510 1TB, 2x 750W)",
    price: 265400,
  },
  {
    name: "Сервер Supermicro SuperServer 6018U-TR4+ 1U 4LFF",
    id: 1038,
    image:
      "https://serverflow.ru/upload/iblock/4b7/l5ouedkl5axpewrlga2izjsa5w3jy3qj/vx4h0837jofsp0z5iyefjkq26ghpkyaw.jpg",
    description: "Сервер подходящий под большое количество задач",
    price: 192000,
  },
  {
    name: "Сервер Supermicro SuperServer 6028U-TR4+ 2U 12LFF",
    id: 1039,
    image:
      "https://serverflow.ru/upload/iblock/ccc/rl5uq82wbtq7tqxz9l71c7w3l68ey32z.jpg",
    description:
      "Supermicro SuperServer 6028U-TR4+ 2U 12LFF (2x 2687Wv4, 256GB, LSI9361-8i 1GB, 12x Intel S4510 1TB, 2x 750w)",
    price: 436400,
  },
  {
    name: "Сервер Dell PowerEdge R240 2LFF",
    id: 1040,
    image:
      "https://serverflow.ru/upload/iblock/cbb/9yprz85q96wymxzlrow09h3qa5bkohlx/5cqszdz4o3smdurwkqy3nvbieq2x5hmw.jpg",
    description:
      "Dell PowerEdge R240 2LFF(1x E2286G, 128gb, 2x Intel S4510 2TB, 1x 250W)",
    price: 243900,
  },
  {
    name: "Сервер Dell PowerEdge R220 2LFF",
    id: 1041,
    image:
      "https://serverflow.ru/upload/iblock/159/c57ft4a0gyojcxp28zggmv9ot3r8ttdf/0y74xhuerw79yetqwwg68lkux44rb3ki.jpg",
    description:
      "Dell PowerEdge R220 2LFF(1x 1230v3, 16Gb, 1x Intel S4510 1TB, 1x 250W)",
    price: 43500,
  },
  {
    name: "Сервер Dell PowerEdge R220 2LFF",
    id: 1042,
    image:
      "https://serverflow.ru/upload/iblock/9c3/0y74xhuerw79yetqwwg68lkux44rb3ki.jpg",
    description:
      "Dell PowerEdge R220 2LFF(1x 1270v3, 16Gb, 2x Intel S4510 1TB, 1x 250W)",
    price: 63000,
  },
  {
    name: "Сервер Dell PowerEdge R240 2LFF",
    id: 1043,
    image:
      "https://serverflow.ru/upload/iblock/11b/5cqszdz4o3smdurwkqy3nvbieq2x5hmw.jpg",
    description:
      "Dell PowerEdge R240 2LFF(1x E2134, 32gb, 2x Intel S4510 1TB, 1x 250W)",
    price: 132200,
  },
  {
    name: "Сервер Dell PowerEdge R240 2LFF",
    id: 1044,
    image:
      "https://serverflow.ru/upload/iblock/29a/5oduz3q1ttxktdclrwtmuqcyj7g2a1sj/5cqszdz4o3smdurwkqy3nvbieq2x5hmw.jpg",
    description:
      "Dell PowerEdge R240 2LFF(1x E2286G, 64gb, 2x Intel S4510 1TB, 1x 250W)",
    price: 173900,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1045,
    image:
      "https://serverflow.ru/upload/iblock/2be/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description:
      "Dell R630 8SFF(2x 2667v4, 128GB, H730, 2x Intel S4510 1TB, 2x 750W)",
    price: 123200,
  },
  {
    name: "Сервер HP DL380G9 12LFF",
    id: 1046,
    image:
      "https://serverflow.ru/upload/iblock/529/jelqjt76b3pn3pyxycnkyyefu7z0egcg/roezt93ufnrswhy9qxnb461y226wnvdc.jpg",
    description:
      "HP DL380G9 12LFF (2x 2650v4, 64GB, P440AR 2GB, 8x 10TB HDD, 2x 800W)",
    price: 199500,
  },
  {
    name: "Сервер HP DL380G9 12LFF",
    id: 1047,
    image:
      "https://serverflow.ru/upload/iblock/d8e/i4xbt2w032214k8sa6ipdri00szby65w/roezt93ufnrswhy9qxnb461y226wnvdc.jpg",
    description:
      "HP DL380G9 12LFF (2x 2680v4, 128GB, P840 PCI 4GB, 12x 16TB HDD, 2x 800W)",
    price: 390000,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1048,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF (2x 2680v4, 128GB, P440AR 2GB, 8x 2TB Micron 5100 max, 2x 800W)",
    price: 268500,
  },
  {
    name: "Сервер Dell R730XD 12LFF 2U",
    id: 1049,
    image:
      "https://serverflow.ru/upload/iblock/944/5yvn016o5l4uhuquiz8n59gc56ld34y1.jpg",
    description:
      "Dell R730XD 12LFF 2U (2x 2667v4 , 64GB, H730, 8x 8TB HDD, 2x 750w, 2x 750W)",
    price: 161600,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1050,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF(2x 2667v4, 64GB, P440AR 2GB, 8x Intel S3700 400GB, 2x500w)",
    price: 158100,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1051,
    image:
      "https://serverflow.ru/upload/iblock/2be/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description:
      "Dell R630 8SFF(2x 2687Wv4, 128GB, H730, 2x Intel P4600 2TB, 2x750w)",
    price: 186200,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1052,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF (2x 2697v4, 128GB, P440AR 2GB, 8x Intel S3700 800GB, 2x 800w)",
    price: 290700,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 12LFF",
    id: 1053,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x 7F52, 256GB, LSI 9460-16i, 4x Intel P4600 2TB, 2x 1600W)",
    price: 543700,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1054,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6134, 128GB, P840 4GB PCI, 8x Intel S3700 400GB, 2x 800W)",
    price: 334000,
  },
  {
    name: "Сервер Dell R7525 12LFF1",
    id: 1055,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x AMD EPYC 7402, 64GB, PERC H345, 4x PM1733 2TB, 2x 1400W)",
    price: 362000,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 12LFF",
    id: 1056,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x 7702, 512GB, LSI 9361-8i 1GB, 4x Intel P4600 2TB, 2x 1600W)",
    price: 694000,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1057,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6152, 384GB, P840 4GB PCI, 8x Intel S4510 2TB, 2x 800W)",
    price: 684000,
  },
  {
    name: "Сервер HP DL380G9 8SFF",
    id: 1058,
    image:
      "https://serverflow.ru/upload/iblock/6af/eabinxw67p6uhjbdha8aoit5owfyqv0o/6bdzfx0evdvu0zionc3aozmk2tpxl5ly.jpg",
    description:
      "HP DL380G9 8SFF(2x 2699v4, 256GB, P440AR 2GB, 8x Intel S4510 2TB, 2x 1400W)",
    price: 500900,
  },
  {
    name: "Сервер Dell R7525 12LFF",
    id: 1059,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x AMD EPYC 7713, 1024GB, PERC H345, 4x Intel P5510 3.84TB, 2x 1400W)",
    price: 1129600,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 12LFF",
    id: 1060,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x 7601, 256GB, LSI 9361-8i 1GB, 4x Intel S4510 2TB, 2x 1600W)",
    price: 434000,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1061,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF(2x 2690v4, 128GB, P440AR 2GB + BBU, 8x Intel S4510 1TB , 2x800w)",
    price: 259200,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1062,
    image:
      "https://serverflow.ru/upload/iblock/2be/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description:
      "Dell R630 8SFF(2x 2698v4, 256GB, H730, 8x Intel S4510 1TB, 2x 750W)",
    price: 299400,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1063,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6154, 256GB, P840 4GB PCI, 8x Intel S4510 2TB, 2x 800W)",
    price: 630000,
  },
  {
    name: "Сервер HP DL380G9 24SFF",
    id: 1064,
    image:
      "https://serverflow.ru/upload/iblock/281/jqt31khr2lgtjf0dvc6jihik4hs2k87z/gnucmyi9m291uoihxesw81dq9bw31qbo.jpg",
    description:
      "HP DL380G9 24SFF(2x 2697v4, 384GB, P840 PCI 4GB, 24x Intel S4510 2TB, 2x 1400w)",
    price: 1095600,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1065,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF(2x 2699v4, 512GB, P440AR 2GB + BBU, 8x Intel S4510 1TB , 2x800w)",
    price: 403800,
  },
  {
    name: "Сервер Dell R730XD 12LFF",
    id: 1066,
    image:
      "https://serverflow.ru/upload/iblock/944/5yvn016o5l4uhuquiz8n59gc56ld34y1.jpg",
    description:
      "Dell R730XD 12LFF(2x 2698v4 , 64GB, H730, 12x Intel S4510 1TB, 2x 750w)",
    price: 329600,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1067,
    image:
      "https://serverflow.ru/upload/iblock/8eb/h8zr0ipqzelxfjk9m7vdgimmmcypbo2m/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description: "Сервер под разные задачи",
    price: 265400,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 12LFF",
    id: 1068,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x 7502, 768GB, LSI 9460-16i, 12x Intel S4510 2TB, 2x 1600W)",
    price: 1040700,
  },
  {
    name: "Сервер Supermicro SuperServer 6028U-TR4+ 2U 12LFF",
    id: 1069,
    image:
      "https://serverflow.ru/upload/iblock/ccc/rl5uq82wbtq7tqxz9l71c7w3l68ey32z.jpg",
    description:
      "Supermicro SuperServer 6028U-TR4+ 2U 12LFF (2x 2699v4, 512GB, LSI9361-8i 1GB, 12x Intel S4510 2TB, 2x 750w)",
    price: 730800,
  },
  {
    name: "Сервер Supermicro SuperServer 6018U-TR4+ 1U 4LFF",
    id: 1070,
    image:
      "https://serverflow.ru/upload/iblock/552/hc298u04l92v4zz06jebamkiq0w3fjie/vx4h0837jofsp0z5iyefjkq26ghpkyaw.jpg",
    description:
      "Supermicro SuperServer 6018U-TR4+ 1U 4LFF(2x 2690v4, 384GB, LSI9361-8i 1GB, 4x Intel S4510 2TB, 2x 750w)",
    price: 341600,
  },
  {
    name: "Сервер Dell R7525 12LFF",
    id: 1071,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x AMD EPYC 7713, 1024GB, PERC H345, 2x Intel P5510 3.84TB, 2x 1400w)",
    price: 1030800,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1072,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6152, 512GB, P840 4GB PCI, 8x Intel S4510 2TB, 2x 800W)",
    price: 720000,
  },
  {
    name: "Сервер Dell R7525 12LFF",
    id: 1073,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x AMD EPYC 7702, 128GB, PERC H345, 4x Intel P5510 3.84TB, 2x 1400W)",
    price: 671600,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 12LFF",
    id: 1074,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      "Supermicro AS-2023US-TR4 12LFF(2x 7532, 128GB, LSI 9361-8i 1GB, 4x Intel S4510 2TB, 2x 1600W)",
    price: 460000,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1075,
    image:
      "https://serverflow.ru/upload/iblock/757/is1r2bf5c7apvs1glxb9dxomtagnb6ni/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6154, 128GB, P840 4GB PCI, 8x Intel S4510 2TB, 2x 800W)",
    price: 594000,
  },
  {
    name: "Сервер HP DL380G9 24SFF",
    id: 1076,
    image:
      "https://serverflow.ru/upload/iblock/281/jqt31khr2lgtjf0dvc6jihik4hs2k87z/gnucmyi9m291uoihxesw81dq9bw31qbo.jpg",
    description:
      "HP DL380G9 24SFF(2x 2698v4, 128GB, P440AR 2GB, 12x Intel S4510 2TB, 2x 800W)",
    price: 596700,
  },
  {
    name: "Сервер Dell R730XD 12 LFF 2U",
    id: 1077,
    image:
      "https://serverflow.ru/upload/iblock/944/5yvn016o5l4uhuquiz8n59gc56ld34y1.jpg",
    description:
      "Dell R730XD 12 LFF 2U (2x 2699v4 , 128GB, H730, 8x 8TB HDD, 2x 750w)",
    price: 237200,
  },
  {
    name: "Сервер Supermicro SuperServer 6028U-TR4+ 2U 12LFF",
    id: 1078,
    image:
      "https://serverflow.ru/upload/iblock/ccc/rl5uq82wbtq7tqxz9l71c7w3l68ey32z.jpg",
    description:
      "Supermicro SuperServer 6028U-TR4+ 2U 12LFF (2x 2697v4, 128GB, LSI9361-8i 1GB, 12x Intel S4510 1TB, 2x 750w)",
    price: 371200,
  },
  {
    name: "HP DL560G9 2U 8SFF (SAS/SATA 12GBe, 2x 500W, 48DIMM, 4CPU)",
    id: 1079,
    image:
      "https://serverflow.ru/upload/iblock/e27/r1sj5419d1irp0fz4oeueusmnu8vhz0h/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description: "HP DL560G9 2U 8SFF( SAS/SATA 12GBe, 2x 500W, 48DIMM, 4CPU)",
    price: 69500,
  },
  {
    name: "HP ML350G9 5U 8SFF ( SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU)",
    id: 1080,
    image:
      "https://serverflow.ru/upload/iblock/019/tlo9k3qvx1nj074lh1zsg38k0rt3yj12/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description: "HP ML350G9 5U 8SFF ( SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU)",
    price: 77000,
  },
  {
    name: "Supermicro SuperServer 1028GQ-TR 1U 2SFF(SAS/SATA 6GBe, 4x GPU PCI-E 3.0 x16, 2x 2000W, 16DIMM, 2CPU)",
    id: 1081,
    image:
      "https://serverflow.ru/upload/iblock/efd/5gh2ewhu0tazbc0i4gdvn9q2vyv293kl/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(SAS/SATA 6GBe, 4x GPU PCI-E 3.0 x16, 2x 2000W, 16DIMM, 2CPU)",
    price: 89700,
  },
  {
    name: "Блейд платформа Supermicro SuperServer 2028TP-HTR-SIOM 2U 24SFF (2x 2000W, 8x LGA2011-3)",
    id: 1082,
    image:
      "https://serverflow.ru/upload/iblock/2b7/hy48dp1aqn7qpt0sojfbbjs5u4awnke9/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (SAS/SATA 12GBe, 2x 2000W, 4x16DIMM, 4x2CPU)",
    price: 99700,
  },
  {
    name: "Серверная платформа Supermicro SuperServer 4028GR-TR 4U 24SFF (4x 2000W, 2x LGA2011-3)",
    id: 1083,
    image:
      "https://serverflow.ru/upload/iblock/117/hj05sy7a0bmc2p07lqd0uv7h52f147q9/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF (Up to 8 GPU, SAS/SATA 12GBe, 4x 2000W, 24DIMM, 2CPU, 8х PCI-E 3.0 x16)",
    price: 178700,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1084,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2687Wv4, 128GB, P440 PCI 4GB, 4x Intel S4510 1TB, 2x 800W)",
    price: 271200,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1085,
    image:
      "https://serverflow.ru/upload/iblock/292/3vyz0lcep1v1jf9z4t6wod585fkueyxe/nrk23y8ydgyl7u3qsd54rwqjujg9u3w8.webp",
    description: "Сервер подходящий под большое количество задач",
    price: 161600,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1086,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2643v4, 128GB, P440 PCI 4GB, 8x Intel S4510 1TB, 2x 1400W)",
    price: 293300,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1087,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2667v4, 256GB, P840 PCI 4GB, 8x Intel S4510 2TB, 2x 1400W)",
    price: 483500,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1088,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2667v4, 512GB(4x 128GB), 24x Intel S4510 1TB, 2x 2000W)",
    price: 760800,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1089,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2687Wv4, 1024GB(4x 256GB), 24x Intel S4510 2TB, 2x 2000W)",
    price: 1529600,
  },
  {
    name: "Сервер Dell R7525 12LFF",
    id: 1090,
    image:
      "https://serverflow.ru/upload/iblock/0c9/3crwkpulvwi1bod5a90ev3uo0jr6n146/gyaj6nxpscwwod0jck60f3u0t2rf4a8m.jpg",
    description:
      "Dell R7525 12LFF(2x AMD EPYC 7F52, 256GB, PERC H345, 8x Intel S4510 1TB, 2x 1400W)",
    price: 520400,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1091,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6154, 512GB, P840 PCI-E + 4GB кэш + BBU, 8x Intel S4510 1TB, 2x800w)",
    price: 551300,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1092,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2680v4, 128GB, P440 PCI 4GB, 2x Intel S4510 1TB, 2x 800W)",
    price: 178000,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1093,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2650v4, 64GB, P440 PCI 4GB, 2x Intel S4510 1TB, 2x 800W)",
    price: 154600,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1094,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2698v4, 256GB, P440 PCI 4GB, 2x Intel S4510 1TB, 2x 800W)",
    price: 249400,
  },
  {
    name: "Сервер HP DL360G9 8SFF",
    id: 1095,
    image:
      "https://serverflow.ru/upload/iblock/e69/hl6qu1qfokx5yrg7s53l20dw0fagcfjq/libixuyx3nd2wapsgpjul5lyz59oqetu.jpg",
    description:
      "HP DL360G9 8SFF(2x 2650v4, 64GB, H240AR, 2x Intel S3700 400GB, 2x500w)",
    price: 76100,
  },
  {
    name: "Сервер Dell R730XD 2U 24SFF",
    id: 1096,
    image:
      "https://serverflow.ru/upload/iblock/bfc/gg2muzq3f3sqld6prc0bfhzjztft3lvw.jpg",
    description:
      "Dell R730XD 2U 24SFF(2x 2680v4 , 64GB, H730, 2x Intel S4510 1TB, 2x 750w)",
    price: 145400,
  },
  {
    name: "Сервер HP DL380G9 8SFF",
    id: 1097,
    image:
      "https://serverflow.ru/upload/iblock/6af/eabinxw67p6uhjbdha8aoit5owfyqv0o/6bdzfx0evdvu0zionc3aozmk2tpxl5ly.jpg",
    description:
      "HP DL380G9 8SFF(2x 2690v4, 64GB, P840AR 2GB + BBU, 2x Intel S4510 1TB , 2x800w)",
    price: 155100,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1098,
    image:
      "https://serverflow.ru/upload/iblock/757/is1r2bf5c7apvs1glxb9dxomtagnb6ni/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6134, 64GB, P840 PCI-E + 4GB кэш + BBU, 4x Intel S4510 1TB, 2x800w)",
    price: 316100,
  },
  {
    name: "Сервер HP DL380G10 8SFF",
    id: 1099,
    image:
      "https://serverflow.ru/upload/iblock/3b5/2m178hg6n4mhpyo2d5jszoou6r6a8u7f/vkleo8gr1l4imhqplzrvx2gapjqah06h.jpg",
    description:
      "HP DL380G10 8SFF(2x GOLD 6152, 128GB, P840 PCI-E + 4GB кэш + BBU, 4x Intel S4510 1TB, 2x800w)",
    price: 401700,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1100,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2680v4, 128GB, P440 PCI 4GB, 8x 4TB 2,5 HDD, 2x 800W)",
    price: 237000,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1101,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2690v4, 256GB, LSI9361-8i 1GB, 8x Micron 5100 Max 2TB, 2x 2000w)",
    price: 412400,
  },
  {
    name: "Сервер Dell R730XD 2U 24SFF",
    id: 1102,
    image:
      "https://serverflow.ru/upload/iblock/bfc/gg2muzq3f3sqld6prc0bfhzjztft3lvw.jpg",
    description:
      "Dell R730XD 2U 24SFF(2x 2680v4 , 64GB, H730, 24x 600GB 15K HDD, 2x 750w)",
    price: 201900,
  },
  {
    name: "Сервер Dell R630 8SFF",
    id: 1103,
    image:
      "https://serverflow.ru/upload/iblock/2be/wgqq7jw99ex1re7nqy5aj4igrjrqu5oo.jpg",
    description:
      "Dell R630 8SFF(2x 2667v4, 256GB, H730, 8x 900GB 10K HDD, 2x 750W)",
    price: 156600,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1104,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2680v4, 128GB, P440 PCI 4GB, 8x 1.2TB 10K 2,5 HDD, 2x 800W)",
    price: 197000,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1105,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2690v4, 128GB, P440 PCI 4GB, 8x Intel S4510 1TB, 2x 1400W)",
    price: 307300,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1106,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2699v4, 256GB, P440 PCI 4GB, 8x Intel S4510 2TB, 2x 1400W)",
    price: 537500,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1107,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2687Wv4, 64GB, P440 PCI 4GB, 4x Intel S4510 1TB, 2x 800W)",
    price: 255600,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1108,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2680v4, 128GB, P440 PCI 4GB, 8x Intel S4510 2TB, 2x 800W)",
    price: 437000,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1109,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2690v4, 512GB(4x 128GB), 24x Intel S4510 1TB, 2x 2000W)",
    price: 796800,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1110,
    image:
      "https://serverflow.ru/upload/iblock/2b7/hy48dp1aqn7qpt0sojfbbjs5u4awnke9/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2697v4, 1024GB(4x 256GB), 24x Intel S4510 2TB, 2x 2000W)",
    price: 1393600,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1111,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2698v4, 512GB, LSI9361-8i 1GB, 16x Intel S4510 1TB, 2x 2000w)",
    price: 619800,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1112,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2699v4, 1024GB, LSI9361-8i 1GB, 24x Intel S4510 1TB, 2x 2000w)",
    price: 918600,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1113,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2697v4, 256GB, LSI9361-8i 1GB, 8x Intel S4510 1TB, 2x 2000w)",
    price: 391400,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1114,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2699v4, 512GB, LSI9361-8i 1GB, 2x Intel S4510 2TB, 2x 2000w)",
    price: 401400,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1115,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2698v4, 256GB, LSI9361-8i 1GB, 2x Intel S4510 1TB, 2x 2000w)",
    price: 276000,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1116,
    image:
      "https://serverflow.ru/upload/iblock/efd/5gh2ewhu0tazbc0i4gdvn9q2vyv293kl/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2690v4, 128GB, LSI9361-8i 1GB, 2x Intel S4510 1TB, 2x 2000w)",
    price: 219800,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1117,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2680v4, 64GB, LSI9361-8i 1GB, 1x Intel S4510 1TB, 2x 2000w)",
    price: 170500,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1118,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2699v4, 512GB, P840 PCI 4GB, 8x Intel S4510 2TB, 2x 1400W)",
    price: 605800,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1119,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2698v4, 256GB, P840 PCI 4GB, 6x Intel S4510 2TB, 2x 1400W)",
    price: 443400,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1120,
    image:
      "https://serverflow.ru/upload/iblock/019/tlo9k3qvx1nj074lh1zsg38k0rt3yj12/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2697v4, 128GB, P840 PCI 4GB, 4x Intel S4510 2TB, 2x 1400W)",
    price: 320200,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1121,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2699v4, 4TB(4x 1024Gb), 24x Intel S4510 1TB, 2x 2000W)",
    price: 1874400,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1122,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2698v4, 2TB(4x 512Gb), 24x Intel S4510 1TB, 2x 2000W)",
    price: 1271200,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1123,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2690v4, 1TB(4x 256Gb), 24x Intel S4510 1TB, 2x 2000W)",
    price: 921600,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1124,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2698v4, 512GB, P440 PCI 4GB, 8x Intel S4510 1TB, 2x 1400W)",
    price: 425900,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1125,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2697v4, 256GB, P440 PCI 4GB, 6x Intel S4510 1TB, 2x 1400W)",
    price: 308500,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1126,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2697v4, 512GB, P840 PCI 4GB, 8x Intel S4510 1TB, 2x 800W)",
    price: 410800,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1127,
    image:
      "https://serverflow.ru/upload/iblock/019/tlo9k3qvx1nj074lh1zsg38k0rt3yj12/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2690v4, 256GB, P840 PCI 4GB, 6x Intel S4510 1TB, 2x 800W)",
    price: 304400,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1128,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2680v4, 128GB, P840 PCI 4GB, 4x Intel S4510 1TB, 2x 800W)",
    price: 221000,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1129,
    image:
      "https://serverflow.ru/upload/iblock/e27/r1sj5419d1irp0fz4oeueusmnu8vhz0h/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2699v4, 1024GB, P840 PCI 4GB, 8x Intel S4510 2TB, 2x 1400W)",
    price: 730700,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1130,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2698v4, 512GB, P440 PCI 4GB, 6x Intel S4510 1TB, 2x 1400W)",
    price: 388900,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1131,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2690v4, 256GB, P440 PCI 4GB, 4x Intel S4510 1TB, 2x 1400W)",
    price: 264500,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1132,
    image:
      "https://serverflow.ru/upload/iblock/2b7/hy48dp1aqn7qpt0sojfbbjs5u4awnke9/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2699v4, 4TB(4x 1024Gb), 24x Intel S4510 2TB, 2x 2000W)",
    price: 2318400,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1133,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2698v4, 2TB(4x 512Gb), 24x Intel S4510 2TB, 2x 2000W)",
    price: 1715200,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1134,
    image:
      "https://serverflow.ru/upload/iblock/2b7/hy48dp1aqn7qpt0sojfbbjs5u4awnke9/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2697v4, 1TB(4x 256Gb), 24x Intel S4510 2TB, 2x 2000W)",
    price: 1393600,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1135,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2698v4, 512GB, LSI9361-8i 1GB, 8x Intel S4510 1TB, 2x 2000w)",
    price: 471800,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1136,
    image:
      "https://serverflow.ru/upload/iblock/117/hj05sy7a0bmc2p07lqd0uv7h52f147q9/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2699v4, 1024GB, LSI9361-8i 1GB, 12x Intel S4510 1TB, 2x 2000w)",
    price: 696600,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1137,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2697v4, 256GB, LSI9361-8i 1GB, 6x Intel S4510 1TB, 2x 2000w)",
    price: 354400,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1138,
    image:
      "https://serverflow.ru/upload/iblock/efd/5gh2ewhu0tazbc0i4gdvn9q2vyv293kl/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2690v4, 512GB, LSI9361-8i 1GB, 2x Intel S4510 1TB, 2x 2000w)",
    price: 313400,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1139,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2680v4, 256GB, LSI9361-8i 1GB, 1x Intel S4510 1TB, 2x 2000w)",
    price: 217300,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1140,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2650v4, 128GB, LSI9361-8i 1GB, 1x Intel S4510 1TB, 2x 2000w)",
    price: 178300,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1141,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2690v4, 128GB, P840 PCI 4GB, 8x Intel S4510 2TB, 2x 800W)",
    price: 458200,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1142,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2697v4, 256GB, P840 PCI 4GB, 6x Intel S4510 2TB, 2x 800W)",
    price: 422400,
  },
  {
    name: "Сервер HP ML350G9 5U 8SFF",
    id: 1143,
    image:
      "https://serverflow.ru/upload/iblock/558/l0w3k9lzptarcs0qx6anl4euuke6nc8h/7yvwvv6zpwqw08b9n7bg8cn3hab4ik6u.jpg",
    description:
      "HP ML350G9 5U 8SFF (2x 2698v4, 384GB, P840 PCI 4GB, 4x Intel S4510 2TB, 2x 800W)",
    price: 397600,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1144,
    image:
      "https://serverflow.ru/upload/iblock/e72/lkytpzdy94u0solv2s8sp0dicdgfhicr/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2698v4, 128GB, P440 PCI 4GB, 6x Intel S4510 2TB, 2x 1400W)",
    price: 406300,
  },
  {
    name: "Сервер HP DL560G9 2U 8SFF",
    id: 1145,
    image:
      "https://serverflow.ru/upload/iblock/e27/r1sj5419d1irp0fz4oeueusmnu8vhz0h/ggsf1lflvg491s9pp3iqugzy3h6dpxji.jpg",
    description:
      "HP DL560G9 2U 8SFF( 2x 2697v4, 64GB, P440 PCI 4GB, 4x Intel S4510 2TB, 2x 1400W)",
    price: 298700,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1146,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2690v4, 512GB(4x 128Gb), 24x Intel S4510 2TB, 2x 2000W)",
    price: 1153800,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1147,
    image:
      "https://serverflow.ru/upload/iblock/fa2/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2680v4, 256GB(4x 64Gb), 12x Intel S4510 2TB, 2x 2000W)",
    price: 673600,
  },
  {
    name: "Сервер Блейд Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF",
    id: 1148,
    image:
      "https://serverflow.ru/upload/iblock/2b7/hy48dp1aqn7qpt0sojfbbjs5u4awnke9/rum9rxwwysbitiy036vpxln2wigpjbyu.jpg",
    description:
      "Блеид Supermicro SuperServer 2028TP-HTR-SIOM 2U 4x 6SFF (8x 2650v4, 256GB(4x 64Gb), 12x Intel S4510 1TB, 2x 2000W)",
    price: 402400,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1149,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2697v4, 256GB, LSI9361-8i 1GB, 2x Intel S4510 1TB, 2x 2000w)",
    price: 258000,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1150,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2690v4, 256GB, LSI9361-8i 1GB, 2x Intel S4510 1TB, 2x 2000w)",
    price: 251000,
  },
  {
    name: "Сервер Supermicro SuperServer 1028GQ-TR 1U 2SFF",
    id: 1151,
    image:
      "https://serverflow.ru/upload/iblock/ce4/2sx7t6w9rr230b427pley03dm9jzqcc6/klszmahvuvyxyno6fm2vn7vlejrrjx4u.jpg",
    description:
      "Supermicro SuperServer 1028GQ-TR 1U 2SFF(2x 2680v4, 128GB, LSI9361-8i 1GB, 1x Intel S4510 1TB, 2x 2000w)",
    price: 186100,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1152,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2699v4, 256GB, LSI9361-8i 1GB, 16x Intel S4510 1TB, 2x 2000w)",
    price: 583400,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1153,
    image:
      "https://serverflow.ru/upload/iblock/6e4/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2698v4, 128GB, LSI9361-8i 1GB, 12x Intel S4510 1TB, 2x 2000w)",
    price: 452200,
  },
  {
    name: "Сервер Supermicro SuperServer 4028GR-TR 4U 24SFF",
    id: 1154,
    image:
      "https://serverflow.ru/upload/iblock/117/hj05sy7a0bmc2p07lqd0uv7h52f147q9/djgp0ob689433rcv9wp2rgot113faauc.jpg",
    description:
      "Supermicro SuperServer 4028GR-TR 4U 24SFF(2x 2697v4, 64GB, LSI9361-8i 1GB, 8x Intel S4510 1TB, 2x 2000w)",
    price: 344600,
  },
  {
    name: "Серверная платформа Huawei FusionServer 2288H V5 2U 12LFF (2x 900W, 2x LGA3647)",
    id: 1196,
    image:
      "https://serverflow.ru/upload/iblock/ca2/mh6rsola06veq3gxtizaw2bb4lfg4ddb/er923yh3cv8znpw1jz5gu7tuwgl648ow.jpg",
    description:
      "Huawei FusionServer 2288H V5 2U 12LFF(SAS/SATA 12GBe, 2x 1500W, 24DIMM. 2CPU, 2NVMe)",
    price: 90800,
  },
  {
    name: "Серверная платформа Dell T130 Mini-Tower 2LFF (290W, LGA1151)",
    id: 1197,
    image:
      "https://serverflow.ru/upload/iblock/c95/a8ms1n6q2njquy6q2n4x5w0djsshty76/glutto8nd8a8ceb6pq97ana7w0sl754t.png",
    description: "Dell T130 Mini-Tower (SAS/SATA 12GBe, 290W, 4DIMM, 1CPU)",
    price: 38900,
  },
  {
    name: "Серверная платформа HPE DL360G10 1U 8SFF (2x 800W, 2x LGA3647)",
    id: 1365,
    image:
      "https://serverflow.ru/upload/iblock/de4/ilbbx48332cq91w8kcs42w80anhalnfg/DL360G10.jpg",
    description:
      "HP DL360G10 8SFF(2x LGA3647, 24DIMM, SAS/SATA, 12GBe, 2x800w, 1U)",
    price: 125700,
  },
  {
    name: "Huawei FusionServer 1288H V5 1U 8SFF(SAS/SATA 12GBe, 2x 1500W, 24DIMM, 2CPU)",
    id: 1366,
    image:
      "https://serverflow.ru/upload/iblock/6a7/efxy5oig3016hvorhzqqnjbxpsovvoiq/Huawei FusionServer 1288H V5.jpg",
    description:
      "Huawei FusionServer 1288H V5 1U 8SFF(SAS/SATA 12GBe, 2x 1500W, 24DIMM. 2CPU, 2NVMe)",
    price: 76100,
  },
  {
    name: "Серверная платформа Supermicro SuperServer 6019U-TN4R4T 1U 4LFF (4x U.2, 2x 750W, 2x LGA3647)",
    id: 1367,
    image:
      "https://serverflow.ru/upload/iblock/35c/77ec6vmrrrz8o0yoiz6pee3y4jt2roe0/4LFF.jpg",
    description:
      "Бекплеин - BPN-SAS3-815TQ-N4 Райзер - AOC-UR-i4XTF-ST031(4x 10Gbe RJ45 Intel XL710 and X557)",
    price: 126700,
  },
  {
    name: "Серверная платформа Supermicro AS-2024US-TRT 2U 12LFF (4x U.2, 2x 1600W, 2x SP3)",
    id: 1368,
    image:
      "https://serverflow.ru/upload/iblock/d67/8i85ueq0fyzc3nvosj6gusxnkj0blar8/supermicro 4.0.jpg",
    description:
      "Бекплеин - BPN-SAS3-LA26A-N12 Райзер - AOC-2UR68G4-i2XT(2x 10Gbe RJ45 Intel X710)",
    price: 296800,
  },
  {
    name: "Серверная платформа HPE DL380G10 2U 16SFF (8x U.2, 2x 800W, 2x LGA3647)",
    id: 1852,
    image:
      "https://serverflow.ru/upload/iblock/5fc/c3k646a09bzwbb8xy0pgfyb8plm37nff/HP DL380G10 2U 16SFF.png",
    description:
      "HP DL380G10 16SFF(2x LGA3647, 24DIMM, NVMe/SAS/SATA, 2x800w, 2U)",
    price: 149800,
  },
  {
    name: "Supermicro SuperServer 6029U-TR4 12LFF (8x SAS/SATA 12GBe + 4 NVMe/SAS/SATA 12GBe, 2x 1000W, 24DIMM, 2CPU)",
    id: 1853,
    image:
      "https://serverflow.ru/upload/iblock/8c1/9q4frsd4jrk7dobe3rvfvo5xjqs8io8v/SuperServer 6029U-TR4.webp",
    description:
      "Supermicro SuperServer 6029U-TRT 2U 12LFF(NVMe, SAS/SATA 12GBe, 2x 1000W, 24DIMM, 2CPU)",
    price: 159000,
  },
  {
    name: "Сервер Supermicro SuperServer 6018U-TR4+ 1U 4LFF",
    id: 2292,
    image:
      "https://serverflow.ru/upload/iblock/4b7/l5ouedkl5axpewrlga2izjsa5w3jy3qj/vx4h0837jofsp0z5iyefjkq26ghpkyaw.jpg",
    description:
      "Supermicro SuperServer 6018U-TR4+ 1U 4LFF(1x 2637v4, 8GB, C612, 2x Intel S4510 480GB, 2x750w)",
    price: 73800,
  },
  {
    name: "Сервер HP DL360G9 1U 8SFF",
    id: 2293,
    image:
      "https://serverflow.ru/upload/iblock/4cd/fflt514sjm4bml4yi5359gb3fskqcuot/360г10.webp",
    description: "HP DL360G9 1U 8SFF( SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU)",
    price: 62900,
  },
  {
    name: "Сервер Dell R630 1U 8SFF",
    id: 2294,
    image:
      "https://serverflow.ru/upload/iblock/d2e/n16sxjw2234wgphscghsmayy4he70anq/630 8.webp",
    description:
      "Dell R630 1U 8SFF( SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU, H330/ H730 RAID)",
    price: 66700,
  },
  {
    name: "Сервер Dell PowerEdge R240 2LFF",
    id: 2296,
    image:
      "https://serverflow.ru/upload/iblock/d2e/n16sxjw2234wgphscghsmayy4he70anq/630 8.webp",
    description:
      "Dell PowerEdge R240 2LFF ( SAS/SATA 12GBe, 1x 250W, 4DIMM, 1CPU)",
    price: 129800,
  },
  {
    name: "Сервер Dell R630 1U 8SFF (SAS/SATA 12GBe)",
    id: 2302,
    image:
      "https://serverflow.ru/upload/iblock/d2e/n16sxjw2234wgphscghsmayy4he70anq/630 8.webp",
    description:
      "Dell R630 1U 8SFF( SAS/SATA 12GBe, 2x 500W, 24DIMM, 2CPU, H330/ H730 RAID)",
    price: 75200,
  },
  {
    name: "Supermicro SuperServer 6018U-TR4+ 1U 4LFF(X10DRU-i+)",
    id: 2303,
    image:
      "https://serverflow.ru/upload/iblock/ad7/mue4w7j6t2f934832mf7ocwws3fp9e4c/cegthvbthj seuperserver.webp",
    description:
      "Supermicro SuperServer 6018U-TR4+ 1U 4LFF (X10DRU-i+, SAS/SATA 12GBe, 2x 750W, 24DIMM, 2CPU) Бекплеин - BPN-SAS3-815TQ райзер - AOC-UR-i4XT(4x 10Gbe RJ45 Intel X540)",
    price: 78300,
  },
  {
    name: "Сервер HP DL380G10 16SFF(8x SAS/SATA + 8x NVMe)",
    id: 2304,
    image:
      "https://serverflow.ru/upload/iblock/7f9/z5b4zswxdbfkkmrqkb6bzv1p6xazs6ws/Без названия (2).png",
    description:
      'HP DL380G10 8SFF(2x GOLD 6154, 1TB, P816i-a 4GB кэш + BBU, 8x SSD Kioxia CM6-V 1.6TB, 8x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K, 2x800w)',
    price: 912900,
  },
  {
    name: "Huawei FusionServer 2288H V5 2U 12LFF",
    id: 2306,
    image:
      "https://serverflow.ru/upload/iblock/a13/3uk1817uclftiz6qp635jerngu2mym2r/2288H.webp",
    description:
      'Huawei FusionServer 2288H V5 2U 12LFF(2x GOLD 6146, 256GB DDR4 ECC REG,Huawei sr430c-m(1GB), 2x M2 SSD Samsung PM983960GB, 4x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K, 2x1500w)',
    price: 293700,
  },
  {
    name: "Сервер HP DL360G10 8SFF",
    id: 2307,
    image:
      "https://serverflow.ru/upload/iblock/ffa/abcvpzzyvbdmfeh1r3hzl5fj4hlgg01y/DL360G10.png",
    description:
      'HP DL360G10 8SFF(2x GOLD 6146, 384GB, P408i-a 2GB кэш + BBU, 2x M2 SSD Samsung PM983 PCIe 3.0 960GB 1.3DWPD, 6x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K Rpm, 2x800w)',
    price: 417300,
  },
  {
    name: "Сервер HP DL360G10 8SFF",
    id: 2308,
    image:
      "https://serverflow.ru/upload/iblock/ffa/abcvpzzyvbdmfeh1r3hzl5fj4hlgg01y/DL360G10.png",
    description:
      'HP DL360G10 8SFF(2x GOLD 6154, 384GB, P816i-a 4GB кэш + BBU, 4x M2 SSD Samsung PM983 PCIe 3.0 960GB 1.3DWPD, 6x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K Rpm, 2x800w)',
    price: 535000,
  },
  {
    name: "Сервер HP DL360G10 8SFF",
    id: 2309,
    image:
      "https://serverflow.ru/upload/iblock/ffa/abcvpzzyvbdmfeh1r3hzl5fj4hlgg01y/DL360G10.png",
    description:
      'HP DL360G10 8SFF(2x GOLD 6144, 64GB, P408i-a 2GB кэш + BBU, 2x M2 SSD Samsung PM983 PCIe 3.0 960GB 1.3DWPD, 4x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K Rpm, 2x800w)',
    price: 351300,
  },
  {
    name: "Сервер Supermicro SuperServer 6018U-TR4+",
    id: 2310,
    image:
      "https://serverflow.ru/upload/iblock/ad7/mue4w7j6t2f934832mf7ocwws3fp9e4c/cegthvbthj seuperserver.webp",
    description:
      "Supermicro SuperServer 6018U-TR4+ 1U 4LFF (X10DRU-i+, SAS/SATA 12GBe, 2x 750W, 24DIMM, 2CPU)",
    price: 123100,
  },
  {
    name: "Huawei FusionServer 1288H V5 1U 8SFF",
    id: 2311,
    image:
      "https://serverflow.ru/upload/iblock/528/mrfy5n4ham7mquwvjbw0in6vp85heucc/1288.webp",
    description:
      'Huawei FusionServer 1288H V5 1U 8SFF(2x GOLD 6134, 64GB DDR4 ECC REG,Huawei sr430c-m(1GB), 2x M2 SSD Samsung PM983960GB, 2x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K, 2x1500w)',
    price: 210600,
  },
  {
    name: "Сервер HP DL360G10 8SFF",
    id: 2312,
    image:
      "https://serverflow.ru/upload/iblock/ffa/abcvpzzyvbdmfeh1r3hzl5fj4hlgg01y/DL360G10.png",
    description: "Сервер HP для 1С",
    price: 249600,
  },
  {
    name: "Сервер HP DL360G10 8SFF",
    id: 2313,
    image:
      "https://serverflow.ru/upload/iblock/ffa/abcvpzzyvbdmfeh1r3hzl5fj4hlgg01y/DL360G10.png",
    description:
      'HP DL360G10 8SFF(1x GOLD 6146, 48GB, P408i-a 2GB кэш + BBU, 1x M2 SSD Samsung PM983 PCIe 3.0 960GB 1.3DWPD, 2x 1.2TB HDD 2.5" SAS 12GB/s HPE 10K Rpm, 2x800w)',
    price: 261500,
  },
  {
    name: "Supermicro AS-2023US-TR4 2U",
    id: 2314,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      'Supermicro AS-2023US-TR4 12LFF(2x 7F52, 128GB, LSI 9361-8i 1GB, 2x M2 SSD Samsung PM983 960GB,8x1.2TB HDD 2.5" SAS 12GB/s HPE 10K Rpm  2x 1600W)',
    price: 408500,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 2U",
    id: 2315,
    image:
      "https://serverflow.ru/upload/iblock/c83/3a2vsoxji9zg9oj9irrh5l7xr1r9h5io/Supermicro AS-2023US-TR4.jpg",
    description:
      "Supermicro AS-2023US-TR4 2U(2x AMD EPYC 1-2 Gen + 4x U2 HotSwap, 2x 1600W PSU)",
    price: 258400,
  },
  {
    name: "Supermicro AS-2023US-TR4 2U 12LFF",
    id: 2316,
    image:
      "https://serverflow.ru/upload/iblock/822/w0myv79jl5apjl1kezle5pylqa9mi5l5/tofo9nbvcy9lq610idziqrj3f3wzf9hf.jpg",
    description:
      'Supermicro AS-2023US-TR4 12LFF(2x 7F52, 512GB, LSI 9361-8i 1GB, 2x SSD Intel S4510 960GB 2.5" 6GB/s 3 DWPD, 8x 1.8TB HDD 2.5" SAS 12GB/s HGST(IBM) 10K Rpm, 2x 1600W)',
    price: 543600,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 2U(2x AMD EPYC 1-2 Gen)",
    id: 2317,
    image:
      "https://serverflow.ru/upload/iblock/c83/3a2vsoxji9zg9oj9irrh5l7xr1r9h5io/Supermicro AS-2023US-TR4.jpg",
    description:
      "Supermicro AS-2023US-TR4 2U(2x AMD EPYC 1-2 Gen + 4x U2 HotSwap, 2x 1600W PSU)",
    price: 738800,
  },
  {
    name: "Сервер Supermicro AS-2023US-TR4 2U 12LFF",
    id: 2472,
    image:
      "https://serverflow.ru/upload/iblock/8c2/asup1c27lkszk0dkzp0gt25ywche3lp6/Без названия.png",
    description: "Сервер видеонаблюдения на 4-16 камер",
    price: 158800,
  },
  {
    name: "Сервер HP DL380G9 2U 12LFF",
    id: 2473,
    image:
      "https://serverflow.ru/upload/iblock/4ef/0ktsy2hts57bd6xsa3k599fpnbrtihte/Без названия (1).png",
    description: "Сервер видеонаблюдения на 4-16 камер",
    price: 138700,
  },
  {
    name: "Сервер HP DL380G9 2U 12LFF",
    id: 2474,
    image:
      "https://serverflow.ru/upload/iblock/4ef/0ktsy2hts57bd6xsa3k599fpnbrtihte/Без названия (1).png",
    description: "Сервер видеонаблюдения на 4-16 камер",
    price: 138700,
  },
  {
    name: "Сервер HP DL380G9 2U 12LFF",
    id: 2475,
    image:
      "https://serverflow.ru/upload/iblock/4ef/0ktsy2hts57bd6xsa3k599fpnbrtihte/Без названия (1).png",
    description: "Сервер видеонаблюдения на 4-16 камер",
    price: 112500,
  },
  {
    name: "Сервер HP DL380G9 2U 12LFF",
    id: 2476,
    image:
      "https://serverflow.ru/upload/iblock/4ef/0ktsy2hts57bd6xsa3k599fpnbrtihte/Без названия (1).png",
    description: "Сервер видеонаблюдения на 4-16 камер",
    price: 150000,
  },
  {
    name: "Сервер Huawei FusionServer 2288H V5 2U 12LFF",
    id: 2477,
    image:
      "https://serverflow.ru/upload/iblock/26d/zw0w1rz1c0t1iny8obnyakj7wvuji5c6/Без названия (2).png",
    description: "Сервер видеонаблюдения на 16-32 камеры",
    price: 219500,
  },
  {
    name: "Сервер Huawei FusionServer 2288H V5 2U 12LFF",
    id: 2478,
    image:
      "https://serverflow.ru/upload/iblock/26d/zw0w1rz1c0t1iny8obnyakj7wvuji5c6/Без названия (2).png",
    description: "Сервер видеонаблюдения на 16-32 камеры",
    price: 294500,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2484,
    image:
      "https://serverflow.ru/upload/iblock/06e/bkqdx7kwus76g4r4knh5mkhts69x1ehm/Без названия (3).png",
    description: "Сервер видеонаблюдения на 16-32 камеры",
    price: 448200,
  },
  {
    name: "Сервер Supermicro SuperServer 6019U-TN4R4T 1U 4LFF",
    id: 2486,
    image:
      "https://serverflow.ru/upload/iblock/d01/uj1b96kvt37mdfdlbb5h5o5zmrcizqzd/Без названия (4).png",
    description: "Сервер видеонаблюдения на 16-32 камеры",
    price: 274600,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2487,
    image:
      "https://serverflow.ru/upload/iblock/06e/bkqdx7kwus76g4r4knh5mkhts69x1ehm/Без названия (3).png",
    description: "Сервер видеонаблюдения на 32-64 камеры",
    price: 483600,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2488,
    image:
      "https://serverflow.ru/upload/iblock/06e/bkqdx7kwus76g4r4knh5mkhts69x1ehm/Без названия (3).png",
    description: "Сервер видеонаблюдения на 32-64 камеры",
    price: 501800,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2489,
    image:
      "https://serverflow.ru/upload/iblock/b49/4meuwv587q0t51tym3s5b526roxd9bnr/Без названия (5).png",
    description: "Сервер видеонаблюдения на 32-64 камеры",
    price: 525600,
  },
  {
    name: "Сервер Supermicro AS-2024US-TRT 2U 12LFF",
    id: 2490,
    image:
      "https://serverflow.ru/upload/iblock/c3b/egom3bc03597qm17kh4f8t6q2xm8kkbk/2024.png",
    description: "Сервер видеонаблюдения на 32-64 камеры",
    price: 650600,
  },
  {
    name: "Сервер Supermicro AS-2024US-TRT 2U 12LFF",
    id: 2491,
    image:
      "https://serverflow.ru/upload/iblock/c3b/egom3bc03597qm17kh4f8t6q2xm8kkbk/2024.png",
    description: "Сервер видеонаблюдения на 64-128 камер",
    price: 740400,
  },
  {
    name: "Сервер Supermicro AS-2024US-TRT 2U 12LFF",
    id: 2492,
    image:
      "https://serverflow.ru/upload/iblock/c3b/egom3bc03597qm17kh4f8t6q2xm8kkbk/2024.png",
    description: "Сервер видеонаблюдения на 64-128 камер",
    price: 1012400,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2493,
    image:
      "https://serverflow.ru/upload/iblock/f0c/7mf1v87h29whvds6nk4lp1294fx35xbw/6029.png",
    description: "Сервер видеонаблюдения на 64-128 камер",
    price: 822700,
  },
  {
    name: "Сервер Supermicro SuperServer 6029U-E1CR4T 2U 12LFF",
    id: 2494,
    image:
      "https://serverflow.ru/upload/iblock/f0c/7mf1v87h29whvds6nk4lp1294fx35xbw/6029.png",
    description: "Сервер видеонаблюдения на 64-128 камер",
    price: 702700,
  },
  {
    name: "NVIDIA DGX A100",
    id: 7875,
    image:
      "https://serverflow.ru/upload/iblock/0e2/qrhalpl6yp3fqbxi4zm8enn27qxty729/nvidia-dgx-a100.jpg",
    description: "Сервер от NVIDIA с 8 видеокартами A100",
    price: 34584500,
  },
];

const route = useRoute();
const product = ref(null);

onMounted(() => {
  const productId = parseInt(route.params.id);
  // Ищем товар по id в массиве
  product.value = products.find((p) => p.id === productId);

  // Если товар не найден, можно дополнительно логировать ошибку
  if (!product.value) {
    console.error(`Product with id ${productId} not found.`);
  }
});

function formatPrice(price) {
  return price.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
}
</script>
