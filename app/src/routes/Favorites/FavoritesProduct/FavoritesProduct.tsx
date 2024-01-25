import {FC} from 'react'
import classes from './FavoritesProduct.module.scss'
import { Promotion } from 'Components'
const FavoritesProduct:FC = () => {
  return (
    <div className={classes.favoritesProduct}>
        <Promotion title="Избранное" />
    </div>
  )
}

export default FavoritesProduct