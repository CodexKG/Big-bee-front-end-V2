import classes from "./Catalog.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import CatalogProductCard from "Components/CatalogProductCard/CatalogProductCard";
import { List, InputNumber, Select, Breadcrumb, Skeleton, Button } from "antd";
import { useAppDispatch, useAppSelector } from "store/hook";
import axios from "axios";
import { fetchFilterProducts } from "store/reducers/producRedusers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createQueryString, parseQueryString } from "helpers/params";
import { clearFilters, setFilters, setOffset, setParams } from "store/slices/WindowSlice";
import { fetchCategoriesById } from "store/reducers/categoryReduser";
import { ExpandableCheckboxGroup, ExpandableRadioGroup } from "Components";
type SortOption = {
  value: string;
  order: 'asc' | 'desc';
  label: string;
};
const sortOptions: SortOption[] = [
  {
    value: 'created',
    order: 'asc',
    label: 'создано - по возрастанию'
  },
  {
    value: '-created',
    order: 'desc',
    label: 'создано - по убыванию'
  },
  {
    value: 'price',
    order: 'asc',
    label: 'цена - по возрастанию'
  },
  {
    value: '-price',
    order: 'desc',
    label: 'цена - по убыванию'
  },
  {
    value: 'reviews_stars',
    order: 'asc',
    label: 'рейтинг отзывов - по возрастанию'
  },
  {
    value: '-reviews_stars',
    order: 'desc',
    label: 'рейтинг отзывов - по убыванию'
  }
];


const Catalog: FC = () => {
  const { data, laoding } = useAppSelector((state) => state.produckt)
  const atributes = useAppSelector((state) => state.category.children)
  console.log(atributes);

  const { filters } = useAppSelector((state) => state.window)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  let navigate = useNavigate();
  let location = useLocation();
  const queryRef = useRef(location.search);
  queryRef.current = location.search;
  function handleFilterChange(newFilters: string) {
    navigate({
      search: newFilters
    });
  }


  useEffect(() => {
    const queryString = queryRef.current;
    const parsedParams = parseQueryString(queryString);
    if (queryString.includes('limit') && queryString.includes('category') && queryString.includes('offset')) {
      dispatch(setParams(parsedParams));
    }
    dispatch(setFilters({ category: id }))
  }, [])
  useEffect(() => {
    const source = axios.CancelToken.source();
    const queryString = queryRef.current;
    const timeoutId = setTimeout(() => {
      dispatch(fetchFilterProducts({ filters: `${queryString}`, cancelToken: source.token }));
    }, 300);
    return () => {
      clearTimeout(timeoutId)
      source.cancel('Запрос отменен, компонент размонтирован');
    };
  }, [id, filters, location.search]);
  useEffect(() => {
    handleFilterChange(createQueryString(filters))
  }, [filters, location.search])
  useEffect(() => {
    dispatch(setFilters({ category: id }))
    const source = axios.CancelToken.source();
    dispatch(fetchCategoriesById({ cancelToken: source.token, id: Number(id) }))
    return () => {
      source.cancel('Запрос отменен, компонент размонтирован');
    };
  }, [id]);


  const product_colors = ["red", "green", "blue"];
  const sort = atributes[Number(id)]?.category_attributes
  const sortRender = Object.entries(!sort ? { a: '', b: '' } : sort)?.map(([key, values]) => {
    if (!sort) {
      return <div key={key}>
        <h3 className={classes.title}><Skeleton.Input active size={'default'} /></h3>
        <Skeleton active />

      </div>
    }
    return <div key={key}>
      <h3 className={classes.title}>{key}</h3>
      <ExpandableCheckboxGroup options={values} title={key} />
    </div>
  })

  const currentPage = filters.offset / filters.limit + 1;
  const total = data.count;
  const handleChange = (value: string) => {
    dispatch(setFilters({ ordering: value }))

  };
  return (
    <div>
      <div className={classes.catalogHead}>

        <div >
          <h1>{atributes[Number(id)]?.title}</h1>
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
        <Select onChange={handleChange} removeIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0156 7.86241C11.1079 7.94127 11.1819 8.03917 11.2327 8.14937C11.2834 8.25958 11.3097 8.37947 11.3097 8.50081C11.3097 8.62214 11.2834 8.74204 11.2327 8.85225C11.1819 8.96245 11.1079 9.06035 11.0156 9.13921L7.26672 12.3522C7.14471 12.4568 6.99524 12.5243 6.83606 12.5465C6.67687 12.5687 6.51464 12.5448 6.36864 12.4776C6.22263 12.4104 6.09897 12.3027 6.01234 12.1673C5.92571 12.0319 5.87973 11.8745 5.87988 11.7138L5.87988 5.28781C5.87987 5.12723 5.92589 4.97001 6.01248 4.83478C6.09907 4.69955 6.22261 4.59198 6.36846 4.5248C6.51431 4.45762 6.67636 4.43365 6.83541 4.45574C6.99446 4.47782 7.14385 4.54503 7.26588 4.64941L11.0156 7.86325V7.86241Z" fill="black" />
        </svg>} className={classes.select} options={sortOptions} />
      </div>
      <div className={classes.catalog}>
        <aside>
          <div>
            <Button onClick={() => dispatch(clearFilters())}>
              сбросить фильтры
            </Button>
          </div>

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
            {/* <ExpandableRadioGroup options={options} /> */}
          </div>
          {sortRender}

        </aside>
        <div className={classes.catalog_block}>
          <List
            loading={laoding}
            itemLayout="vertical"
            size="large"
            pagination={{
              current: currentPage,
              total: total,
              pageSize: filters.limit,
              onChange: (page) => {
                const newOffset = (page - 1) * filters.limit;
                dispatch(setOffset(newOffset));
              },
            }}
            dataSource={data.results}


            renderItem={(item) => (
              <CatalogProductCard
                product_imgs={item.product_images}
                title={item.title}
                colors={product_colors}
                characteristics={item.product_attributes}
                rating={item.average_rating}
                price={item.price}
                old_price={item.old_price}
                salesman={item.shop_name}
                salesman_img={`https://bee.webtm.ru${item.shop_logo}`}
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
