export const useAddToWishList = () => {

    const addToWishList = (product, value = 1) => {
        product.wishlist ? delete product.wishlist : product.wishlist = new Date().getTime();
    };

    return {addToWishList};
};