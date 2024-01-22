import React from "react"
import classes from './Card.module.scss';

type props ={
   item: {
    title: string,
    price: string,
    id: any,
    image: any
   }
}

const CategoryCardComponent: React.FC<props> = ({item}) =>{
    return(
        <div className={classes.category_card} key={item.id} >
        <div className={classes.category_card_block}>
            <img src={item.image} alt="" />
        </div>
        <h4 className={classes.category_card_title}>{item.title}</h4>
        <p className={classes.category_card_price}>{item.price}</p>
</div>
    )
}

export default CategoryCardComponent;
