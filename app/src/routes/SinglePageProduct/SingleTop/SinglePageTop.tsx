import { FC, useState } from "react";
import classes from './SingleTop.module.scss';
import singleClass from '../SinglePage.module.scss';
import { Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled, } from "@ant-design/icons";
import goldStartIcon from '../icons/gold-star-icon.svg';
import TopConfig from "../TopConfigs/TopConfig";
import ShortDescr from '../ShortDescr/ShortDescr';

const SinglePageTop: FC = () => {
    const imagesList = [
        {
            id: 1,
            image: 'https://api.technodom.kz/f3/api/v1/images/smartfon_apple_iphone_15_128gb_black_mtp03_274372_1.jpg'
        },
        {
            id: 2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGmvv1M4b189rExFhFfft6Pp2-yWL933XrDQ&usqp=CAU'
        },
        {
            id: 3,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShfy1q4M20pnfsZVsDi1PfupIgMidvlWDjuA&usqp=CAU'
        },
        {
            id: 4,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-black-witb-202309_FMT_WHH?wid=560&hei=744&fmt=jpeg&qlt=90&.v=1692745044163'
        },
    ]

    const [selectedImage, setSeletedImage] = useState(imagesList[0]);

    return (
                    <div className={classes.top_descr_block}>
                        <div className={classes.top_descr_block_col}>
                            <div className={classes.top_descr_block_image}>
                                <span className={classes.top_descr_block_image_new}>Новинка</span>
                                <img src={selectedImage.image} alt="" />
                            </div>

                            <div className={classes.top_descr_block_images_carousel}>
                                <Carousel
                                    slidesToShow={3}
                                    dots={false}
                                    prevArrow={<ArrowLeft />}
                                    nextArrow={<ArrowRight />}
                                    slidesToScroll={1}
                                    infinite={false}
                                    arrows={true}
                                >
                                    {
                                        imagesList.map(item => {
                                            return <div
                                                className={
                                                    selectedImage.id === item.id
                                                        ? `${classes.top_descr_block_images_carousel_item} ${classes.top_descr_block_images_carousel_item_active}`
                                                        : classes.top_descr_block_images_carousel_item
                                                }
                                                key={item.id}
                                                onClick={() => {
                                                    setSeletedImage(item)
                                                }}
                                            >
                                                <img src={item.image} alt="" />
                                            </div>
                                        })
                                    }
                                </Carousel>
                            </div>

                        </div>

                        <div className={classes.top_descr_block_col}>
                            <div className={classes.top_descr_block_raiting}>
                                <div>
                                    <img src={goldStartIcon} alt="" />
                                    <img src={goldStartIcon} alt="" />
                                    <img src={goldStartIcon} alt="" />
                                    <img src={goldStartIcon} alt="" />
                                    <img src={goldStartIcon} alt="" />
                                </div>
                                <div>
                                    <span className={classes.singlePage_top_descr_block_raiting_count}>4.9</span>
                                    <span className={classes.singlePage_top_descr_block_raiting_full}>/39</span>
                                </div>
                            </div>
                            <TopConfig />
                            <ShortDescr />
                        </div>
                    </div>
    )
        ;
}

export default SinglePageTop;




const ArrowLeft: React.FC<any> = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={`slick-prev slick-arrow ${singleClass.prevBtn}`}
        style={{ display: currentSlide === 0 ? "none" : "block" }}
    >
        <CaretLeftFilled style={{ color: "black", fontSize: 15 }} />
    </button>
);
const ArrowRight: React.FC<any> = ({ currentSlide, slideCount, ...props }) => {
    return (
        <button
            {...props}
            className={`slick-next slick-arrow ${singleClass.nextBtn}`}
            style={{ display: currentSlide === 2 ? "none" : "block" }}
            type="button"
        >
            <CaretRightFilled style={{ color: "black", fontSize: 15 }} />
        </button>
    );
};
