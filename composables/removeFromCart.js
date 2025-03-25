export const useRemoveFromCart = () => {

    const removeFromCart = (product, value = 1) => {
        product.cart -= value;
        if (product.cart <= 0) delete product.cart;
    };

    return {removeFromCart};
};