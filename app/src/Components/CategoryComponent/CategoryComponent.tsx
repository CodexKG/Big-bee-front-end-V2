import React from "react";
import classes from './Category.module.scss';
import moreIcon from './img/icon.svg';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import img4 from './img/img4.png';
import CategoryCardComponent from '../CategoryCardComponent/CategoryCardComponent'

const CategoryComponent: React.FC = () =>{
    const categories = [
        {
            id: 1,
            title: 'Наушники',
            price: 'от 14 990 с',
            image: img1
        },
        {
            id: 2,
            title: 'Телефоны',
            price: 'от 94 990 с',
            image: img2
        },
        {
            id: 3,
            title: 'Ноутбуки',
            price: 'от 74 990 с',
            image: img3
        },
        {
            id: 4,
            title: 'Фото и видео',
            price: 'от 74 990 с',
            image: img4
        },
    ]

    return (
        <div className={classes.category}>
            <div className={classes.category_block}>
                <h1 className={classes.category_title}>Популярные категории</h1>
                <a href="#">Все товары <img src={moreIcon} alt="" /></a>
            </div>

            <div className={classes.category_row}>
                {
                    categories.map(item =>{
                        return <CategoryCardComponent key={item.id} item={item} />
                    })
                }
            </div>
        </div>
    )
}

export default CategoryComponent;
