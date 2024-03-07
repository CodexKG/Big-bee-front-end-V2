import { CaretLeftFilled, CaretRightFilled, } from "@ant-design/icons";
import { Carousel, Image, Rate } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "store/hook";
import ShortDescr from '../ShortDescr/ShortDescr';
import singleClass from '../SinglePage.module.scss';
import TopConfig from "../TopConfigs/TopConfig";
import classes from './SingleTop.module.scss';

const SinglePageTop: FC = () => {
    const { selectedProduct } = useAppSelector((state) => state.produckt)
    const imagesList = selectedProduct?.product_images
    const images: any = []
    const [count, setCount] = useState<number | undefined>(1)
    selectedProduct?.product_images.forEach((item) => {
        images.push(item.image)
    })
    const [selectedImage, setSeletedImage] = useState<any>();
    useEffect(() => {
        setSeletedImage(selectedProduct?.product_images[0])
    }, [selectedProduct])
    useEffect(() => {
        if (imagesList !== undefined && imagesList?.length < 3) {
            setCount(imagesList?.length - 1)
        } else if (imagesList !== undefined) {
            setCount(3)
        }
    }, [imagesList])

    return (
        <div className={classes.top_descr_block}>
            <div className={classes.top_descr_block_col}>
                <div className={classes.top_descr_block_image}>
                    <span className={classes.top_descr_block_image_new}>Новинка</span>
                    <Image.PreviewGroup
                        items={images}
                    >
                        <Image
                            src={selectedImage?.image}

                        />
                    </Image.PreviewGroup>
                    {/* <Image src={selectedImage?.image} alt="" /> */}
                </div>

                <div className={classes.top_descr_block_images_carousel}>
                    <Carousel
                        slidesToShow={count}
                        dots={false}
                        prevArrow={<ArrowLeft />}
                        nextArrow={<ArrowRight />}
                        slidesToScroll={1}
                        infinite={false}
                        arrows={true}
                    >
                        {
                            imagesList?.map(item => {
                                return <div
                                    className={
                                        selectedImage?.id === item.id
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
                    <Rate disabled defaultValue={selectedProduct?.average_rating} />

                    <div>
                        <span className={classes.singlePage_top_descr_block_raiting_count}>{selectedProduct?.average_rating}</span>
                        <span className={classes.singlePage_top_descr_block_raiting_full}>/{selectedProduct?.review_count}</span>
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
