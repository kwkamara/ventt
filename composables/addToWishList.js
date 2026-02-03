export const useAddToWishList = () => {

    const addToWishList = (product, value = 1) => {
        useState('wishlist').value[product.documentId] = product;
    };

    return {addToWishList};
};