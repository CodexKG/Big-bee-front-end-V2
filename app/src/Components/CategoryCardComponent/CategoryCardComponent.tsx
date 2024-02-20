import React from "react"
import classes from './Card.module.scss';
import { PopularCategory } from "store/models/CategoriesType";
import { useNavigate } from "react-router-dom";

type props = {
    item: PopularCategory
}

const CategoryCardComponent: React.FC<props> = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/catalog/${item.id}`)} className={classes.category_card} key={item.id} >
            <div className={classes.category_card_block}>
                <img src={item.banner} alt="" />
            </div>
            <h4 className={classes.category_card_title}>{item.title}</h4>
            <p className={classes.category_card_price}>{item.min_price}</p>
        </div>
    )
}

export default CategoryCardComponent;
