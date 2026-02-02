export const useAddToCart = () => {

    const addToCart = (product, value = 1) => {
        useState('cart').value[product.id] = product;
    };

    return {addToCart};
};