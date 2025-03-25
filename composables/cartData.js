import product from "~/components/Product.vue";

export const useCartData = () => {

    const productsInCart = useState('products').value.filter(product => product.cart);

    let cartData = {
        quantity: productsInCart.length,
        total   : 0
    };

    //get cart total.
    productsInCart.forEach(product => cartData.total += (product.price * product.cart));


    //return.
    return {cartData};
};