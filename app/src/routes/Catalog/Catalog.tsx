import classes from "./Catalog.module.scss";
import { FC } from "react";
import CatalogProductCard from "Components/CatalogProductCard/CatalogProductCard";

type StringKeyObject = {
  [key: string]: any;
};

const Catalog: FC = () => {
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
  return (
    <div className={classes.catalog}>
    <aside>
    </aside>
      <div className={classes.catalog_block}>
        <CatalogProductCard
          product_imgs={product_imgs}
          title="Apple iPhone 15 + SIM + SIM 256Gb (new)"
          colors={product_colors}
          characteristics={characteristics}
          rating={4.9}
          price={94990}
          old_price={124990}
          salesman="Продавец"
          salesman_img="https://soloha.info/wp-content/uploads/2017/01/53811363350152.jpeg"
          offer={109}
        />
      </div>
    </div>
  );
};

export default Catalog;
