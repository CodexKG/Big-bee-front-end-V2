import { FC, useEffect } from "react";
import classes from './TopConfig.module.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchProductById } from "store/reducers/producRedusers";
import axios from "axios";

const TopConfig: FC = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams()
    const { selectedProduct } = useAppSelector((state) => state.produckt)

    console.log(selectedProduct?.product_configurator);

    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(fetchProductById({ id: Number(id), cancelToken: source.token }))
    }, [id]);

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
                                        {el.id === 4 ? el.value.map((vl) =>
                                            <div
                                                style={{ background: `${vl}` }}
                                                className={classes.config_color}></div>
                                        ) : <div className={classes.config_row}>
                                            {el.value.map((vl) =>
                                                <button className={classes.config_btn}>{vl}</button>
                                            )}

                                        </div>
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }) : ''
            }

        </div>
    )
}


export default TopConfig;
