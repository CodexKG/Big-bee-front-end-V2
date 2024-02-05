import { FC } from "react";
import classes from './Description.module.scss';
import moreIcon from './SVG.svg';


const Description: FC = () => {
    return (
        <div className={classes.description}>
            <h2 className={classes.description_title}>Описание</h2>
            <p className={classes.description_text}>Встречайте iPhone 15 - ваш идеальный спутник в мире безграничных возможностей!
                Новый iPhone 15 открывает двери в мир передовых технологий и непревзойденного дизайна.</p>
            <p className={classes.description_text}>iPhone 15 является воплощением инноваций, стиля и функциональности.
                С его появлением вы сможете наслаждаться яркими и насыщенными цветами на 6,1-дюймовом OLED-дисплее Super Retina XDR, который обеспечивает невероятное качество изображения даже при ярком солнечном свете.</p>
            <p className={classes.description_text}>Новейший процессор A16 Bionic с усовершенствованным Neural Engine обеспечивает молниеносную скорость работы и плавность анимации, позволяя вам работать, играть и открывать новые горизонты без задержек и тормозов.</p>
            <p className={classes.description_text}>Камера iPhone 15 с разрешением 48 МП и оптической стабилизацией изображения позволяет создавать профессиональные снимки даже при слабом освещении, а режим “Киноэффект” превращает ваши видео в настоящие произведения искусства. Фронтальная камера TrueDepth с функцией Face ID гарантирует безопасность и удобство разблокировки устройства.</p>
            <a href="#" className={classes.description_more_link}>Читать дальше <img src={moreIcon} alt="" /></a>
        </div>
    )
}

export default Description
