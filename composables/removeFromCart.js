export const useRemoveFromCart = () => {

    const removeFromCart = (product) => {
        //missing cart
        if (!useState('cart').value) return;

        //delete product from cart.
        product.cart = 1;
        delete useState('cart').value[product.documentId];
    };

    return {removeFromCart};
};