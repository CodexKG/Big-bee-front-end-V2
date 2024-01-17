import React from 'react'
import classes from './Promotion.module.scss'
import Title from 'antd/es/typography/Title'
import Layout from 'antd/es/layout/layout'
import { Typography } from 'antd'
import arrowRightIcon from '../../assets/icon/promotion/arrow-right.svg'
import { PromotionCard } from '../index'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import nextBtnIcon from '../../assets/icon/promotion/nextBtn.svg'
import './Promotion.scss'
import 'swiper/css';
const { Text } = Typography
const Promotion: React.FC = () => {
    const [isPrev, setIsPrev] = React.useState(true)
    const [isNext, setIsNext] = React.useState(true)

    return (
        <section className={classes.promotion + ' promotion'}>
            <Layout>
                <div className={classes.promotion_header}>
                    <Title level={1} className={classes.promotion_title}>
                        Акции и скидки
                    </Title>
                    <Text>Все товары <img src={arrowRightIcon} alt="" /></Text>
                </div>
                <div className={classes.promotion_body}>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.' + classes.nextBtn,
                            prevEl: '.' + classes.prevBtn
                        }

                        }
                        onSlideChange={(swiper: any) => {
                            if (swiper.activeIndex === 0) {
                                setIsPrev(false)
                                setIsNext(true)
                            } else if (swiper.activeIndex === 1) {
                                setIsNext(false)
                                setIsPrev(true)
                            }
                            else {
                                setIsNext(true)
                                setIsPrev(true)
                            }

                        }}
                    >
                        <SwiperSlide>
                            <PromotionCard
                                product_img='https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg'
                                salesman_img='https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg'
                                title='Apple iPhone 15 + SIM + SIM 256Gb (new)'
                                subtitle='Our most powerful chip in Apple Watch ever. A magical new way.'
                                price={94990}
                                old_price={124990}
                                rating={4.9}
                                review={203}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <PromotionCard
                                product_img='https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg'
                                salesman_img='https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg'
                                title='Apple iPhone 15 + SIM + SIM 256Gb (new)'
                                subtitle='Our most powerful chip in Apple Watch ever. A magical new way.'
                                price={94990}
                                old_price={124990}
                                rating={4.9}
                                review={203}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <PromotionCard
                                product_img='https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg'
                                salesman_img='https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg'
                                title='Apple iPhone 15 + SIM + SIM 256Gb (new)'
                                subtitle='Our most powerful chip in Apple Watch ever. A magical new way.'
                                price={94990}
                                old_price={124990}
                                rating={4.9}
                                review={203}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <PromotionCard
                                product_img='https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg'
                                salesman_img='https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg'
                                title='Apple iPhone 15 + SIM + SIM 256Gb (new)'
                                subtitle='Our most powerful chip in Apple Watch ever. A magical new way.'
                                price={94990}
                                old_price={124990}
                                rating={4.9}
                                review={203}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <PromotionCard
                                product_img='https://3dplanet.am/wp-content/uploads/2023/09/30069469bb.jpg'
                                salesman_img='https://sartoreale.ru/upload/iblock/dc1/dc17cad50138ce5b963516754faba6f0.jpg'
                                title='Apple iPhone 15 + SIM + SIM 256Gb (new)'
                                subtitle='Our most powerful chip in Apple Watch ever. A magical new way.'
                                price={94990}
                                old_price={124990}
                                rating={4.9}
                                review={203}
                            />
                        </SwiperSlide>

                        <div className={classes.nextBtn} style={{ display: isNext ? 'flex' : 'none' }}>
                            <img src={nextBtnIcon} alt="" />
                        </div>

                        <div className={classes.prevBtn} style={{ display: isPrev ? 'flex' : 'none' }}>
                            <img src={nextBtnIcon} alt="" />
                        </div>
                    </Swiper>
                </div>

            </Layout>


        </section>
    )
}

export default Promotion