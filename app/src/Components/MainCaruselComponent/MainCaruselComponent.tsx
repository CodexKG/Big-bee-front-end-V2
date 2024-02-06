import React, {useState, useEffect} from 'react';
import classes from './MainCaruselComponent.module.scss'
import './slider.css'
import axios from 'axios';
import { Carousel, Flex } from 'antd';
import { caruselItems } from 'data/carusel/carusel';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchBanners } from 'store/reducers/BannerReducesr';

type Props = {

}
const MainCaruselComponent : React.FC<Props> = ()=>{
    const dispatch = useAppDispatch();
    const { data, status } = useAppSelector((state) => state.baner)
    useEffect(()=>{
        const source = axios.CancelToken.source();
        dispatch(fetchBanners({ cancelToken: source.token, }))
    
        
        return () => {
            source.cancel('Запрос отменен, Слайдер приостоновлен');
        };
    },[])
    return (
        <div className={classes.carusel}>
            <div className={classes.container}>
                <Carousel dotPosition={'top'} autoplay>
                    {
                        data.map(e=>{
                            return (
                                <Flex  className={classes.carusel__item}  key={e.id}>
                                    <div style={{background: `url(${e.image})`}} className={classes.carusel__wrapper}>
                                    <Flex className={classes.carusel__inner}  vertical={true} gap={'auto'} justify="space-between">
                                        <Flex gap={10} vertical>
                                            <h2>{e.title}</h2>
                                            <p>{e.description}</p>
                                        </Flex>
                                        <Link to={e.url}>
                                            Узнать подробнее
                                            <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.01564 3.76231C6.10786 3.84117 6.18189 3.93907 6.23266 4.04928C6.28342 4.15948 6.30971 4.27938 6.30971 4.40071C6.30971 4.52205 6.28342 4.64194 6.23266 4.75215C6.18189 4.86235 6.10786 4.96025 6.01564 5.03911L2.26672 8.25211C2.14471 8.35675 1.99524 8.42418 1.83606 8.44641C1.67687 8.46864 1.51464 8.44473 1.36864 8.37752C1.22263 8.31031 1.09897 8.20262 1.01234 8.06723C0.925705 7.93185 0.879735 7.77444 0.879883 7.61371V1.18771C0.879873 1.02713 0.925889 0.869917 1.01248 0.734687C1.09907 0.599457 1.22261 0.49188 1.36846 0.424701C1.51431 0.357521 1.67636 0.333554 1.83541 0.355639C1.99446 0.377725 2.14385 0.444936 2.26588 0.549312L6.01564 3.76315V3.76231Z" fill="white"/>
                                            </svg>
                                        </Link>
                                    </Flex>
                                    </div>
                                </Flex>
                            )
                        })
                    }
                    
                </Carousel>
            </div>
        </div>
    )
}

export default MainCaruselComponent