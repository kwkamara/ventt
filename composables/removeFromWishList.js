export const useRemoveFromWishList = () => {

    const removeFromWishList = (product, value = 1) => {
        //missing wishlist
        if (!useState('wishlist').value) return;

        //delete product from wishlist.
        delete useState('wishlist').value[product.documentId];
    };

    return {removeFromWishList};
};