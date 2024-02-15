export interface IFavoriteCart{
    id:number;
    product:{
        average_rating:number;
        category:Array<number>;
        created:string;
        currency:string;
        description:string;
        id:number;
        image:string;
        old_price:number;
        price:number;
        title:string;
        review_count:number;
        product_images:Array<{
            id: number,
            product: number,
            image: string
        }>;
        product_code:string;
    };
    user:{
        date_joined:string;
        email:string;
        first_name:string;
        id:number;
        last_name:string;
        profile_image:null | string;
        username:string;
    }
}

