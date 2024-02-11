import {FC} from 'react'
import classes from './FavoritesProduct.module.scss'
import { Promotion } from 'Components'
import { api } from 'api'
const FavoritesProduct:FC = () => {
  return (
    <div className={classes.favoritesProduct}>
        <Promotion title="Избранное" getCarts={api.getProductBestSellers} />
    </div>
  )
}

export default FavoritesProduct