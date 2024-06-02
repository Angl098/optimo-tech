import {
  GET_SUPLEMENTS, GET_SUPLEMENT, CLEAN_PRODUCT_BY_ID, POST_SUPLEMENTS, GET_SUPLEMENTS_BY_NAME, NOT_GET_SUPLEMENT_BY_NAME, PAYMENT_ID,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  INJECT_CART_DATA,
  SHOW_SHOPPING_CART,
  //POST_REGISTER_USER 
  POST_LOGIN, POST_REGISTER_USER,
  USER,
  INJECT_USER,
  CREATE_CART,
  ADD_SUPLEMENTS_TO_CART,
  GET_CART_CONTENTS
} from "./actions"


const initialState = {
  allSuplements: [], //estado original con todos los suplementos
  getSuplementById: {}, //estado para traer un solo suplemento
  postSuplements: '', //estado para registrar un nuevo suplemento
  error: '', //estado para cuando no se encuentra suplemento por nombre
  products: [],
  cart: [],
  paymentID: null,
  user: null,
  showShoppingCart: false,
  suplemento: {},
  user: null,
};



const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUPLEMENTS:
      return {
        ...state,
        allSuplements: payload,
      };
    case POST_SUPLEMENTS:
      return {
        ...state,
        postSuplements: payload
      };

    case GET_SUPLEMENT:
      //console.log(payload);
      return {
        ...state,
        getSuplementById: { ...payload },
      };

    case GET_SUPLEMENTS_BY_NAME:
      return {
        ...state,
        allSuplements: action.payload
      };
    case NOT_GET_SUPLEMENT_BY_NAME:
      return {
        ...state,
        error: action.payload
      };
    case CLEAN_PRODUCT_BY_ID:
      return {
        ...state,
        getSuplementById: payload,
      };
    case SHOW_SHOPPING_CART:
      return {
        ...state,
        showShoppingCart: payload
      }
    case ADD_TO_CART:
      const productExists = state.cart.find(product => product.id === payload.id);
      if (productExists) {
        const updatedCart = state.cart.map(product =>
          product.id === payload.id
            ? {
              ...product,
              quantity: product.quantity + 1,
              total: product.price * (product.quantity + 1),
            }
            : product
        );
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const productToAdd = {
          ...payload,
          quantity: 1,
          total: payload.price,
        };
        const newProduct = [...state.cart]
        newProduct.push(productToAdd)
        return {
          ...state,
          cart: newProduct,
        };
      }
    case PAYMENT_ID:
      return {
        ...state,
        paymentID: payload
      }


    case REMOVE_ALL_FROM_CART:
      const updatedCart = state.cart.filter(
        (product) => product.id !== payload
      )
      return {
        ...state,
        cart: updatedCart,
      };

    case REMOVE_ONE_FROM_CART:
      const productToRemove = state.cart.find(
        (product) => product.id === payload
      )
      if (productToRemove && productToRemove.quantity > 1) {
        const updatedCart = state.cart.map((product) =>
          product.id === payload
            ? {
              ...product,
              quantity: product.quantity - 1,
              total: product.price * (product.quantity - 1),
            }
            : product
        )
        return {
          ...state,
          cart: updatedCart,
        };
      } else if (productToRemove.quantity === 1) {
        const updatedCart = state.cart.filter(
          (product) => product.id !== productToRemove.id
        )
        return {
          ...state,
          cart: updatedCart,
        };
      }
    case "FETCH_SUPLEMENT_BY_ID_SUCCESS":
      return {
        ...state,
        suplemento: payload
      }
    case "UPDATE_SUPLEMENT_SUCCESS":
      return {
        ...state,
        suplemento: payload
      }

    case POST_REGISTER_USER:
      return { ...state, postRegisterUser: payload }

    case POST_LOGIN:
      return { ...state, postLogin: payload }

    case USER:
      return { ...state, user: payload }

    case INJECT_CART_DATA:
      return {
        ...state,
        cart: payload
      }

    case INJECT_USER:
      return {
        ...state,
        user: payload
      }

    case CREATE_CART:
      return { 
        ...state, 
        cart: payload 
      };

    case ADD_SUPLEMENTS_TO_CART:
      return { 
        ...state, 
        cart: payload
      };

    case GET_CART_CONTENTS:
      return { 
        ...state, 
        cart: payload 
      };
      
    default:
      return state;
  }
};


//     
//       case POST_REGISTER_USER:
//         return {...state, postRegisterUser: payload}


//     default:
//       return state;
//   }
// };






export default rootReducer;