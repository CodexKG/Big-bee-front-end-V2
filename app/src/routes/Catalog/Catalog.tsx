import classes from "./Catalog.module.scss";
import React, { FC, useEffect, useState } from "react";
import CatalogProductCard from "Components/CatalogProductCard/CatalogProductCard";
import { Avatar, Button, Input, List, Form, InputNumber, Radio, Space, RadioChangeEvent, Checkbox, Select, Breadcrumb } from "antd";
import { LockOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "store/hook";
import axios from "axios";
import { fetchFilterProducts } from "store/reducers/producRedusers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FilterParams } from "store/models/WindowTypes";
import { createQueryString, useQuery } from "helpers/params";
import { setFilters, setOffset } from "store/slices/WindowSlice";
import { fetchCategoriesById } from "store/reducers/categoryReduser";
import { ExpandableCheckboxGroup, ExpandableRadioGroup } from "Components";

type StringKeyObject = {
  [key: string]: any;
};

const test = [
  {
    "id": 283,
    "shop": 3,
    "category": [
      34
    ],
    "title": "Apple iPhone 14 Pro Max 6/256GB Space Black",
    "description": "Всегда включённый дисплей Super Retina XDR 6,1 дюйма с технологией ProMotion\r\nDynamic Island — новый волшебный способ взаимодействовать с iPhone\r\nОсновная камера 48 Мп обеспечивает разрешение до 4 раз выше\r\nРежим «Киноэффект» теперь поддерживает съёмку видео в стандарте Dolby Vision до 4K с частотой 30 кадров в секунду\r\nРежим«Экшн» для съёмки невероятно плавных видео с рук\r\nВажные технологии безопасности: функция «Распознавание аварии» вызывает помощь, когда вы не можете\r\nЦелый день работы без подзарядки и до 23 часов воспроизведения видео\r\nA16 Bionic, самый мощный чип iPhone. Поддержка 5G\r\nПередовые технологии для прочности устройства: Ceramic Shield и защита от воды\r\nВ iOS 16 ещё больше возможностей для персонализации, общения и обмена контентом",
    "image": "https://bee.webtm.ru/media/product_images/aaple_14_1.webp",
    "product_attributes": [
      {
        "key": "Основная камера",
        "value": "48 Mpx + 12 Mpx + 12 Mpx"
      },
      {
        "key": "Фронтальная камера",
        "value": "12 Mpx"
      },
      {
        "key": "Объем оперативной памяти",
        "value": "6 GB"
      },
      {
        "key": "Объем встроенной памяти",
        "value": "256 GB"
      },
      {
        "key": "Процессор",
        "value": "A 16 Bionic"
      }
    ],
    "product_images": [
      {
        "id": 13,
        "product": 283,
        "image": "https://bee.webtm.ru/media/product_images/aaple_14_2.webp"
      },
      {
        "id": 14,
        "product": 283,
        "image": "https://bee.webtm.ru/media/product_images/aaple_14_3.webp"
      },
      {
        "id": 15,
        "product": 283,
        "image": "https://bee.webtm.ru/media/product_images/aaple_14_4.webp"
      },
      {
        "id": 16,
        "product": 283,
        "image": "https://bee.webtm.ru/media/product_images/aaple_14_5.webp"
      }
    ],
    "price": 150990,
    "old_price": 158539,
    "currency": "KGS",
    "shop_name": "Mnogosushi",
    "shop_logo": "/media/shop_images/Screenshot_from_2023-12-15_18-08-18.png",
    "review_count": 0,
    "average_rating": null,
    "created": "2024-01-24T16:22:57.477326+06:00"
  },
  {
    "id": 284,
    "shop": 2,
    "category": [
      34
    ],
    "title": "Apple iPhone 15 6/128GB Blue",
    "description": "iPhone 15 с Dynamic Island, основной камерой 48 Мп и USB-C — в алюминиевом корпусе и с прочной задней панелью из насыщенного цветом стекла.\r\n\r\n\r\nОсновные характеристики\r\nDYNAMIC ISLAND НА iPhone 15.\r\nБлагодаря Dynamic Island оповещения и Эфир активности удобно отображаются в верхней части экрана, поэтому вы ничего не пропустите, пока будете заниматься другими делами. Вы можете смотреть, кто звонит, проверять информацию о рейсе и делать многое другое.\r\nОСНОВНАЯ КАМЕРА 48 МП И ЗУМ 2X.\r\nОсновная камера 48 Мп позволяет делать снимки с невероятно высоким разрешением. Создавать качественные фотографии с потрясающей детализацией ещё никогда не было так просто. Оптический зум 2X — это отличный инструмент для съёмки крупным планом.\r\nМОЩНЫЙ ЧИП A16 BIONIC.\r\nСупербыстрый чип обеспечивает работу передовых функций iPhone: обработка фотографий, плавное отображение Dynamic Island и режим «Изоляция голоса» во время звонков. А ещё A16 Bionic очень энергоэффективен, поэтому вашим устройством можно пользоваться целый день без подзарядки.3\r\nВАЖНЕЙШИЕ ФУНКЦИИ БЕЗОПАСНОСТИ.\r\nФункция «Распознавание аварии» позволяет iPhone определить серьёзную автомобильную аварию и вызвать помощь, когда вы не можете.4\r\nИННОВАЦИОННЫЙ ДИЗАЙН.\r\niPhone 15 Plus изготовлен из алюминия и оснащён прочной задней панелью из насыщенного цветом стекла. Он устойчив к воздействию брызг, воды и пыли.1 А дисплей Super Retina XDR 6,7 дюйма2 обеспечивает вдвое большую яркость по сравнению с iPhone 14 и надёжно защищён Ceramic Shield.\r\nПОРТРЕТЫ НА НОВОМ УРОВНЕ.\r\nСоздавайте более детализированные и насыщенные фото. Просто коснитесь объекта, чтобы перевести на него фокус, — даже когда кадр уже отснят.\r\nПОДКЛЮЧЕНИЕ ЧЕРЕЗ USB-C.\r\nБлагодаря порту USB-C вы можете заряжать Mac или iPad с помощью того же кабеля, что и iPhone 15. Более того, от iPhone 15 можно подзаряжать Apple Watch или AirPods.\r\nСОЗДАН ДЛЯ ПЕРЕМЕН К ЛУЧШЕМУ.\r\nВ iPhone предусмотрены средства защиты конфиденциальности, поэтому вашими данными управляете только вы. Он изготовлен из большего количества переработанных материалов, что минимизирует влияние на окружающую среду. А встроенные функции делают iPhone ещё более удобным для каждого.",
    "image": "https://bee.webtm.ru/media/product_images/apple_15_1.webp",
    "product_attributes": [
      {
        "key": "Основная камера",
        "value": "48 Mpx + 12 Mpx"
      },
      {
        "key": "Фронтальная камера",
        "value": "12 Mpx"
      },
      {
        "key": "Объем оперативной памяти",
        "value": "6 GB"
      },
      {
        "key": "Объем встроенной памяти",
        "value": "128 GB"
      },
      {
        "key": "Процессор",
        "value": "A16 Bionic"
      }
    ],
    "product_images": [
      {
        "id": 17,
        "product": 284,
        "image": "https://bee.webtm.ru/media/product_images/apple_15_2.webp"
      },
      {
        "id": 18,
        "product": 284,
        "image": "https://bee.webtm.ru/media/product_images/apple_15_3.webp"
      },
      {
        "id": 19,
        "product": 284,
        "image": "https://bee.webtm.ru/media/product_images/apple_15_4.webp"
      }
    ],
    "price": 92190,
    "old_price": 96799,
    "currency": "KGS",
    "shop_name": "Kuma",
    "shop_logo": "/media/shop_images/photo_2023-12-24_18-05-40_2.jpg",
    "review_count": 0,
    "average_rating": null,
    "created": "2024-01-24T16:25:43.661698+06:00"
  },
  {
    "id": 282,
    "shop": 2,
    "category": [
      34
    ],
    "title": "ZTE Nubia NEO 5G 8\\256GB Black",
    "description": "Полное погружение в виртуальную реальность\r\nСмартфон ZTE Nubia NEO 5G предлагает беспрецедентные возможности для иммерсивной игры. Мощная мобильная платформа на базе 6 нм процессора Unisoc T820 с частотой до 2.7 ГГц обеспечивает суперплавную и быструю работу всех приложений. Поддержка 5G гарантирует стабильную связь и супербыстрый обмен данными. 6.6-дюймовый дисплей с частотой обновления 120 Гц просто создан для динамичной игры. Батарея 4500 мАч и зарядка мощностью 22.5 Вт позволят забыть о дефиците заряда на целый день.",
    "image": "https://bee.webtm.ru/media/product_images/zte_1.webp",
    "product_attributes": [
      {
        "key": "Основная камера",
        "value": "50 Mpx + 2 Mpx"
      },
      {
        "key": "Фронтальная камера",
        "value": "8 Mpx"
      },
      {
        "key": "Объем оперативной памяти",
        "value": "8 GB"
      },
      {
        "key": "Объем встроенной памяти",
        "value": "256 GB"
      },
      {
        "key": "Процессор",
        "value": "Unisoc T820"
      }
    ],
    "product_images": [
      {
        "id": 9,
        "product": 282,
        "image": "https://bee.webtm.ru/media/product_images/zte_2.webp"
      },
      {
        "id": 10,
        "product": 282,
        "image": "https://bee.webtm.ru/media/product_images/zte_3.webp"
      },
      {
        "id": 11,
        "product": 282,
        "image": "https://bee.webtm.ru/media/product_images/zte_4.webp"
      },
      {
        "id": 12,
        "product": 282,
        "image": "https://bee.webtm.ru/media/product_images/zte_5.webp"
      }
    ],
    "price": 21590,
    "old_price": 22669,
    "currency": "KGS",
    "shop_name": "Kuma",
    "shop_logo": "/media/shop_images/photo_2023-12-24_18-05-40_2.jpg",
    "review_count": 0,
    "average_rating": null,
    "created": "2024-01-24T16:17:56.245097+06:00"
  },
  {
    "id": 281,
    "shop": 4,
    "category": [
      34
    ],
    "title": "Xiaomi Redmi 12 8/256GB Midnight Black",
    "description": "Захватывающий экран для впечатляющего визуального опыта.\r\nСмартфон оснащен 6.79-дюймовым IPS LCD-экраном с разрешением 1080 x 2400 пикселей и соотношением сторон 20:9. С этим экраном пользователи могут наслаждаться яркими и четкими цветами, а также широким углом обзора. Благодаря частоте обновления 90 Гц, экран обеспечивает плавную прокрутку и реактивность при использовании смартфона.",
    "image": "https://bee.webtm.ru/media/product_images/redmi_12_1.webp",
    "product_attributes": [
      {
        "key": "Основная камера",
        "value": "50 Mpx + 8 Mpx + 2 Mpx"
      },
      {
        "key": "Фронтальная камера",
        "value": "8 Mpx"
      },
      {
        "key": "Объем оперативной памяти",
        "value": "8 GB"
      },
      {
        "key": "Процессор",
        "value": "MediaTek Helio G88"
      }
    ],
    "product_images": [
      {
        "id": 5,
        "product": 281,
        "image": "https://bee.webtm.ru/media/product_images/redmi_12_2.webp"
      },
      {
        "id": 6,
        "product": 281,
        "image": "https://bee.webtm.ru/media/product_images/redmi_12_3.webp"
      },
      {
        "id": 7,
        "product": 281,
        "image": "https://bee.webtm.ru/media/product_images/redmi_12_4.webp"
      },
      {
        "id": 8,
        "product": 281,
        "image": "https://bee.webtm.ru/media/product_images/redmi_12_5.webp"
      }
    ],
    "price": 17690,
    "old_price": 18574,
    "currency": "KGS",
    "shop_name": "ArzanAll",
    "shop_logo": "/media/shop_images/photo_2023-12-24_18-05-38.jpg",
    "review_count": 0,
    "average_rating": null,
    "created": "2024-01-24T16:14:32.103028+06:00"
  },
  {
    "id": 280,
    "shop": 2,
    "category": [
      34
    ],
    "title": "Apple iPhone 13 4/128GB Midnight",
    "description": "Дисплей Super Retina XDR 6,1 дюйма\r\nРежим «Киноэффект» автоматически переводит фокус между объектами при съёмке видео и создаёт красивый эффект размытия\r\nПередовая система двух камер 12 Мп (широкоугольная и сверхширокоугольная); Фотографические стили, Smart HDR 4, Ночной режим, съёмка HDR-видео 4K в стандарте Dolby Vision\r\nФронтальная камера TrueDepth 12 Мп: Ночной режим, съёмка HDR‑видео 4K в стандарте Dolby Vision\r\nA15 Bionic — чип, с которым всё супербыстро\r\nДо 19 часов воспроизведения видео\r\nПанель Ceramic Shield для повышенной прочности\r\nНадёжная защита от воды (IP68)\r\niOS 15 с новыми функциями, расширяющими возможности iPhone\r\nПоддержка аксессуаров MagSafe, которые легко крепятся и обеспечивают более быструю беспроводную зарядку",
    "image": "https://bee.webtm.ru/media/product_images/apple_13_1.webp",
    "product_attributes": [
      {
        "key": "Основная камера",
        "value": "12 Mpx + 12 Mpx"
      },
      {
        "key": "Фронтальная камера",
        "value": "12 Mpx"
      },
      {
        "key": "Объем оперативной памяти",
        "value": "4 GB"
      },
      {
        "key": "Объем встроенной памяти",
        "value": "128 GB"
      },
      {
        "key": "Процессор",
        "value": "A15 Bionic"
      }
    ],
    "product_images": [
      {
        "id": 1,
        "product": 280,
        "image": "https://bee.webtm.ru/media/product_images/apple_13_2.webp"
      },
      {
        "id": 2,
        "product": 280,
        "image": "https://bee.webtm.ru/media/product_images/apple_13_3.webp"
      },
      {
        "id": 3,
        "product": 280,
        "image": "https://bee.webtm.ru/media/product_images/apple_13_4.webp"
      },
      {
        "id": 4,
        "product": 280,
        "image": "https://bee.webtm.ru/media/product_images/apple_13_5.webp"
      }
    ],
    "price": 68690,
    "old_price": 72124,
    "currency": "KGS",
    "shop_name": "Kuma",
    "shop_logo": "/media/shop_images/photo_2023-12-24_18-05-40_2.jpg",
    "review_count": 0,
    "average_rating": null,
    "created": "2024-01-24T16:11:35.711645+06:00"
  }
]


const Catalog: FC = () => {
  let query = useQuery();
  const { data, laoding } = useAppSelector((state) => state.produckt)
  const atributes = useAppSelector((state) => state.category.children)
  const { filters } = useAppSelector((state) => state.window)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  let navigate = useNavigate();
  let location = useLocation();

  function handleFilterChange(newFilters: string) {
    navigate({
      pathname: location.pathname,
      search: newFilters
    });
  }

  useEffect(() => {
    handleFilterChange(createQueryString(filters))
  }, [filters])

  useEffect(() => {
    dispatch(setFilters({ category: id }))
  }, [id])


  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchCategoriesById({ cancelToken: source.token, id: Number(id) }))
    dispatch(fetchFilterProducts({ filters: `?${query.toString()}`, cancelToken: source.token }))
    return () => {
      source.cancel('Запрос отменен, компонент размонтирован');
    };
  }, [dispatch, id, filters]);

  const product_imgs = [
    "https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-15-pro-max/gallery/white-titanium-1.jpg",
    "https://mtscdn.ru/upload/iblock/1e6/Pro-Blue-Titanium.png",
    "https://yablophone.ru/images/virtuemart/product/iphone-15-pro-blue-titanium-13.png",
    "https://nissei.com/media/catalog/product/cache/24e3af3791642c18c52611620aeb2e21/6/9/69736_2_2.jpg",
  ];
  const product_colors = ["red", "green", "blue"];
  const characteristics: StringKeyObject = {
    display: '6.1" (2556×1179) OLED',
    SIM: "Dual: nano SIM + eSIM",
    Экран: '6.1" (2556×1179) OLED',
    Фото: "двойная камера, основная 48 МП",
    Процессор: "Apple A16 Bionic",
  };
  const options = [
    { title: '', label: 'Apple', value: 'Apple' },
    { title: '', label: 'Pear', value: 'Pear' },
    { title: '', label: 'Orange', value: 'Orange' },
    { title: '', label: 'Apple', value: 'Apple' },
    { title: '', label: 'Pear', value: 'Pear' },
    { title: '', label: 'Orange', value: 'Orange' },
    { title: '', label: 'Apple', value: 'Apple' },
    { title: '', label: 'Pear', value: 'Pear' },
    { title: '', label: 'Orange', value: 'Orange', }
  ];

  console.log(atributes[Number(id)]?.product_attributes, 'atributes');


  return (
    <div>
      <div className={classes.catalogHead}>
        <div >
          <h1>Смартфоны</h1>
          <Breadcrumb
            style={{ display: 'flex', alignItems: 'center' }}
            separator={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0156 7.86241C11.1079 7.94127 11.1819 8.03917 11.2327 8.14937C11.2834 8.25958 11.3097 8.37947 11.3097 8.50081C11.3097 8.62214 11.2834 8.74204 11.2327 8.85225C11.1819 8.96245 11.1079 9.06035 11.0156 9.13921L7.26672 12.3522C7.14471 12.4568 6.99524 12.5243 6.83606 12.5465C6.67687 12.5687 6.51464 12.5448 6.36864 12.4776C6.22263 12.4104 6.09897 12.3027 6.01234 12.1673C5.92571 12.0319 5.87973 11.8745 5.87988 11.7138L5.87988 5.28781C5.87987 5.12723 5.92589 4.97001 6.01248 4.83478C6.09907 4.69955 6.22261 4.59198 6.36846 4.5248C6.51431 4.45762 6.67636 4.43365 6.83541 4.45574C6.99446 4.47782 7.14385 4.54503 7.26588 4.64941L11.0156 7.86325V7.86241Z" fill="black" />
            </svg>}
            items={[
              {
                title: 'Home',
              },
              {
                title: 'Application Center',
                href: '',
              },
              {
                title: 'Application List',
                href: '',
              },
              {
                title: 'An Application',
              },
            ]}
          />
        </div>
        <Select removeIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0156 7.86241C11.1079 7.94127 11.1819 8.03917 11.2327 8.14937C11.2834 8.25958 11.3097 8.37947 11.3097 8.50081C11.3097 8.62214 11.2834 8.74204 11.2327 8.85225C11.1819 8.96245 11.1079 9.06035 11.0156 9.13921L7.26672 12.3522C7.14471 12.4568 6.99524 12.5243 6.83606 12.5465C6.67687 12.5687 6.51464 12.5448 6.36864 12.4776C6.22263 12.4104 6.09897 12.3027 6.01234 12.1673C5.92571 12.0319 5.87973 11.8745 5.87988 11.7138L5.87988 5.28781C5.87987 5.12723 5.92589 4.97001 6.01248 4.83478C6.09907 4.69955 6.22261 4.59198 6.36846 4.5248C6.51431 4.45762 6.67636 4.43365 6.83541 4.45574C6.99446 4.47782 7.14385 4.54503 7.26588 4.64941L11.0156 7.86325V7.86241Z" fill="black" />
        </svg>} className={classes.select} options={options} defaultValue={'Apple'} />
      </div>
      <div className={classes.catalog}>
        <aside>
          <div>
            <h1 className={classes.title}>Цена, ₽</h1>
            <div className={classes.flex}>
              <InputNumber
                style={{ width: '117px', padding: '6px 12px' }}
                min={972}
                max={296000}
                placeholder="от 972"
                onChange={(value) => dispatch(setFilters({ price_min: value }))}
              />
              <InputNumber
                style={{ width: '137px', padding: '6px 12px' }}
                min={972}
                max={296000}
                placeholder="до 296 000"
                onChange={(value) => dispatch(setFilters({ price_max: value }))}
              />
            </div>
          </div>
          <div>
            <h1 className={classes.title}>Срок доставки</h1>
            <ExpandableRadioGroup options={options} />
          </div>
          <div>
            <h1 className={classes.title}>Производитель</h1>
            <ExpandableCheckboxGroup options={options} />
          </div>
        </aside>
        <div className={classes.catalog_block}>
          <List
            loading={laoding}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            // dataSource={data.results}
            dataSource={test}

            renderItem={(item) => (
              <CatalogProductCard
                product_imgs={product_imgs}
                title={item.title}
                colors={product_colors}
                characteristics={characteristics}
                rating={4.9}
                price={item.price}
                old_price={124990}
                salesman="Продавец"
                salesman_img={"https://soloha.info/wp-content/uploads/2017/01/53811363350152.jpeg"}
                offer={109}
              />
            )}
          />

        </div>
      </div>
    </div>

  );
};

export default Catalog;
