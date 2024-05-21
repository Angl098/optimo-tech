import axios from 'axios';

export const POST_SUPLEMENTS = "POST_SUPLEMENTS";
export const GET_SUPLEMENT = "GET_SUPLEMENT";
export const GET_SUPLEMENTS = "GET_SUPLEMENTS";
export const CLEAN_PRODUCT_BY_ID = "CLEAN_PRODUCT_BY_ID";

export const PAYMENT_ID = "PAYMENT_ID";
export const ADD_TO_CART = 'ADD_TO_CART';
export const INJECT_CART_DATA = 'INJECT_CART_DATA'
export const SHOW_SHOPPING_CART = 'SHOW_SHOPPING_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART,';
// export const GET_ALL_USERS = 'GET_ALL_USERS'
// export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
// export const GET_USER_BY_NAME = 'GET_USER_BY_NAME';
export const POST_REGISTER_USER="POST_REGISTER_USER";

export const postSuplements = (newSuplements) => {

    return async function (dispatch) {
        try {
            const response = await axios.post("/suplements", newSuplements);
            return dispatch({
                type: POST_SUPLEMENTS,
                payload: response.data
            });
        }
        catch (error) {
            console.log('error al registrar los datos', error);
        }
    };
};

export const getSuplement = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/suplements/${id}`);
            console.log(data)
            return dispatch({
                type: GET_SUPLEMENT,
                payload: data,
            });
        } catch (error) {
            console.log(err)
        }
    };
};

export const cleanProductById = () => {
    return {
        type: CLEAN_PRODUCT_BY_ID,
        payload: {}
    }
}

export function paymentGateway(cart, email) {
    console.log(`user email: ${email}`);
    return async function (dispatch) {
        try {

            const items = cart.map((prod) => ({
                title: prod.model,
                price: parseFloat(prod.price),
                quantity: parseInt(prod.quantity),
                productId: prod.id,
            }));

            const total = cart.map((prod) => prod.total)
            let totalPrice = 0;

            for (let i = 0; i < total.length; i++) {
                totalPrice += total[i];
            }

            const valueLocal = JSON.parse(localStorage.getItem("user"))

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
            }


            // const postCart = axios.post("/cart", cartDB)
            const postCart = axios.post("/cart", cartDB)

            // const response = await axios.post("/create_preference", {
            const response = await axios.post("/create-order", {
                items: items,
                total: totalPrice,
                email: email
            })

            const { id } = response.data;
            dispatch({ type: PAYMENT_ID, payload: id })
            window.localStorage.removeItem('cart')
        } catch (error) {
            console.log(error);
        }
    }
}

export const showShoppingCart = (data) => {
    return {
        type: SHOW_SHOPPING_CART,
        payload: data
    }
}

export const addToCart = (id) => {
    console.log('add to cart', id)
    return {
        type: ADD_TO_CART,
        payload: id
    }
}

export const removeOneFromCart = (id) => {
    console.log('remove one to cart', id)
    return {
        type: REMOVE_ONE_FROM_CART,
        payload: id
    }
}

export const removeFromCart = (id) => {
    console.log(id)
    return {
        type: REMOVE_ALL_FROM_CART,
        payload: id
    }
}

export const injectCartData = (data) => {
    return {
        type: INJECT_CART_DATA,
        payload: data
    }
}

// export const getAllUsers = () => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.get("/users")
//             dispatch({ type: GET_ALL_USERS, payload: response.data })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// export const getAllSuplement = () => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.get('/suplement?actives=true')
//             dispatch({ type: GET_ALL_PRODUCTS, payload: response.data.data })
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

// export const getUserByName = (name) => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.get(`/get/user/${name}`)
//             console.log(response.data);
//             dispatch({ type: GET_USER_BY_NAME, payload: response.data })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
export const postRegisterUser = (user) => {
    const endpoint = 'http://localhost:3001/users';
    return async function (dispatch) {
        try{
                const response =await axios.post(endpoint, user);
          return dispatch({
             type: POST_REGISTER_USER,
             payload: response.data
          });  
        }
catch(error){
console.log('error al registrar los datos de usuario', error);
}
    };
 };