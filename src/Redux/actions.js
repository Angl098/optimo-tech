import axios from 'axios';
import swal from 'sweetalert2';

export const POST_SUPLEMENTS = "POST_SUPLEMENTS";
export const GET_SUPLEMENT = "GET_SUPLEMENT";
export const GET_SUPLEMENTS = "GET_SUPLEMENTS";
export const CLEAN_PRODUCT_BY_ID = "CLEAN_PRODUCT_BY_ID";

export const PAYMENT_ID = "PAYMENT_ID";
export const ADD_TO_CART = 'ADD_TO_CART';
export const INJECT_CART_DATA = 'INJECT_CART_DATA'
export const SHOW_SHOPPING_CART = 'SHOW_SHOPPING_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';
export const POST_REGISTER_USER = "POST_REGISTER_USER";

export const GET_SUPLEMENTS_BY_NAME = "GET_SUPLEMENTS_BY_NAME";
export const NOT_GET_SUPLEMENT_BY_NAME = "NOT_GET_SUPLEMENT_BY_NAME";

//Función que hace la peticion con axios al back-end
//para traer todos los suplementos
export const getSuplements = () => {
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/suplements');
        return dispatch({
            type: GET_SUPLEMENTS,
            payload: response.data
        });
    };
};

export const postSuplements = (newSuplements) => {
    return async function(dispatch) {
        try {
            const response = await axios.post("/suplements", newSuplements);
            swal.fire({
                icon: "success",
                title: "¡Registro Exitoso!",
                text: "Los datos del alojamiento han sido registrados correctamente.",
            });
            return dispatch({
                type: POST_SUPLEMENTS,
                payload: response.data
            });
        } catch (error) {
            console.log('error al registrar los datos', error);
        }
    };
};

export const getSuplement = (id) => {
    return async function(dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/suplements/${id}`);
            console.log(data);
            return dispatch({
                type: GET_SUPLEMENT,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const cleanProductById = () => {
    return {
        type: CLEAN_PRODUCT_BY_ID,
        payload: {}
    };
};

export function paymentGateway(cart, email) {
    console.log(`user email: ${email}`);
    return async function(dispatch) {
        try {
            const items = cart.map((prod) => ({
                title: prod.model,
                price: parseFloat(prod.price),
                quantity: parseInt(prod.quantity),
                productId: prod.id,
            }));

            const total = cart.map((prod) => prod.total);
            let totalPrice = 0;

            for (let i = 0; i < total.length; i++) {
                totalPrice += total[i];
            }

            const valueLocal = JSON.parse(localStorage.getItem("user"));

            const cartDB = {
                idUserLocal: valueLocal.id,
                cartItems: cart.map((prod) => ({
                    name: prod.model,
                    productId: prod.id,
                    price: parseFloat(prod.price),
                    quantity: parseInt(prod.quantity),
                })),
                total: totalPrice,
                paymentMethod: "mercadopago"
            };

            const postCart = await axios.post("/cart", cartDB);

            const response = await axios.post("/create-order", {
                items: items,
                total: totalPrice,
                email: email
            });

            const { id } = response.data;
            dispatch({ type: PAYMENT_ID, payload: id });
            window.localStorage.removeItem('cart');
        } catch (error) {
            console.log(error);
        }
    };
}

export const showShoppingCart = (data) => {
    return {
        type: SHOW_SHOPPING_CART,
        payload: data
    };
};

export const addToCart = (id) => {
    console.log('add to cart', id);
    return {
        type: ADD_TO_CART,
        payload: id
    };
};

export const removeOneFromCart = (id) => {
    console.log('remove one from cart', id);
    return {
        type: REMOVE_ONE_FROM_CART,
        payload: id
    };
};

export const removeFromCart = (id) => {
    console.log(id);
    return {
        type: REMOVE_ALL_FROM_CART,
        payload: id
    };
};

export const injectCartData = (data) => {
    return {
        type: INJECT_CART_DATA,
        payload: data
    };
};

export const postRegisterUser = (user) => {
    const endpoint = '/users';
    return async function(dispatch) {
        try {
            const response = await axios.post(endpoint, user);
            return dispatch({
                type: POST_REGISTER_USER,
                payload: response.data
            });
        } catch (error) {
            console.log('error al registrar los datos de usuario', error);
        }
    };
};

export const getSuplementsByName = (queryParams) => {
    return async function(dispatch) {
        const response = await axios.get(`/suplements?name=${queryParams}`);
        if (Array.isArray(response.data)) {
            return dispatch({
                type: GET_SUPLEMENTS_BY_NAME,
                payload: response.data
            });
        } else {
            return dispatch({
                type: NOT_GET_SUPLEMENT_BY_NAME,
                payload: response.data
            });
        }
    };
};
export const getSuplementsFilter = (queryParams) => {
    return async function(dispatch) {
        const response = await axios.get("/suplements/filter/" + queryParams);
        if (Array.isArray(response.data)) {
            return dispatch({
                type: GET_SUPLEMENTS_BY_NAME,
                payload: response.data
            });
        } else {
            return dispatch({
                type: NOT_GET_SUPLEMENT_BY_NAME,
                payload: response.data
            });
        }
    };
};
