import classes from "./Catalog.module.scss";
import React, { FC, useEffect, useState } from "react";
import CatalogProductCard from "Components/CatalogProductCard/CatalogProductCard";
import { Avatar, Button, Input, List, Form, InputNumber, Radio, Space, RadioChangeEvent } from "antd";
import { LockOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "store/hook";
import axios from "axios";
import { fetchFilterProducts } from "store/reducers/producRedusers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FilterParams } from "store/models/WindowTypes";
import { createQueryString, useQuery } from "helpers/params";
import { setFilters, setOffset } from "store/slices/WindowSlice";
import { fetchCategoriesById } from "store/reducers/categoryReduser";

type StringKeyObject = {
  [key: string]: any;
};




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
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', title: 'Orange' },
  ];
  const [value1, setValue1] = useState('Apple');
  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };

  console.log(atributes[Number(id)]?.product_attributes, 'atributes');
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
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
          <Radio.Group size="large" onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>

            </Space>
          </Radio.Group>
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
          dataSource={data.results}

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
  );
};

export default Catalog;
