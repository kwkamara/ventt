export const useAddToCart = () => {

    const addToCart = (product) => {
        //cart quantity init:
        product.cart = product.cart || 1;
        useState('cart').value[product.documentId] = product;
    };

    return {addToCart};
};