import { FC, useEffect, useRef, useState } from "react";
import classes from './TopConfig.module.scss'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchProductById } from "store/reducers/producRedusers";
import axios from "axios";
import Item from "antd/es/list/Item";
import './TopConfig.scss'
import { Radio, RadioChangeEvent } from "antd";
import { createQueryString } from "helpers/params";
interface ConfigItem {
    id: number;
    [key: string]: any;
}
const TopConfig: FC = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams()
    const navigate = useNavigate()
    const { selectedProduct } = useAppSelector((state) => state.produckt)

    const location = useLocation();
    const queryRef = useRef(location.search);

    queryRef.current = location.search;

    function handleFilterChange(newFilters: string) {
        navigate({
            search: newFilters
        });
    }

    const [selectedConfigs, setSelectedConfigs] = useState<{ [key: string]: string }>({});

    const onChange = (e: RadioChangeEvent, key: string) => {

        setSelectedConfigs((prevConfigs) => ({
            ...prevConfigs,
            [key]: e.target.value,
        }));
    };

    useEffect(() => {
        const array = []
        for (const key in selectedConfigs) {
            if (Object.prototype.hasOwnProperty.call(selectedConfigs, key)) {
                const element = selectedConfigs[key];
                array.push({ key: key, value: element })
            }
        }
        return handleFilterChange(createQueryString({ product_configurator: array }))
    }, [selectedConfigs])

    useEffect(() => {
        const queryString = queryRef.current;
        const source = axios.CancelToken.source();
        dispatch(fetchProductById({ config: queryString, id: Number(id), cancelToken: source.token }))
    }, [id, location.search]);

    return (
        <div>
            {
                selectedProduct?.product_configurator.length && selectedProduct.product_configurator ?
                    selectedProduct?.product_configurator.map((el) => {
                        return (
                            <>
                                <div key={el.id - 4} className={classes.config_block}>

                                    <p className={classes.config_title}>
                                        {el.key}
                                        <span className={classes.config_value}></span>
                                    </p>
                                    <div className={classes.config_row}>
                                        {el.id === 4 ? el.values.map((vl) =>
                                            <div
                                                style={{ background: `${vl.title}` }}
                                                className={classes.config_color}></div>
                                        ) : <div className={classes.config_row}>
                                            <Radio.Group onChange={(e) => onChange(e, `${el.id}`)} className="redioGroup" defaultValue={el.values[0].title} size="large">
                                                {el.values.map((vl) =>
                                                    <Radio.Button value={vl.title}>{vl.title}</Radio.Button>
                                                )}
                                            </Radio.Group>
                                        </div>
                                        }
                                    </div>
                                </div >
                            </>
                        )
                    }) : ''
            }

        </div >
    )
}


export default TopConfig;

{/* <button onClick={() => {
                                                    addToConfig({
                                                        id: el.id,
                                                        key: el?.configurator_key,
                                                        value: vl?.title
                                                    })
                                                }} className={classes.config_btn}>{vl.title}</button> */}