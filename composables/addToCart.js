export const useAddToCart = () => {

    const addToCart = (product, value = 1) => {
        product.cart ? product.cart += Number(value) : product.cart = Number(value);
    };

    return {addToCart};
};