import {
  GET_SUPLEMENT,
  GET_SUPLEMENTS,
  GET_SUPLEMENTS_BY_NAME,
  NOT_GET_SUPLEMENT_BY_NAME,
  CLEAN_PRODUCT_BY_ID,
  POST_SUPLEMENTS,
  PAYMENT_ID,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  INJECT_CART_DATA,
  SHOW_SHOPPING_CART,
  POST_REGISTER_USER
} from "./actions"


const initialState = {
  getSuplementById: {},
  postSuplements: '',
  products: [],
  cart: [],
  paymentID: null,
  user: null,
  showShoppingCart: false,
  allSuplements: [], //estado original con todos los suplementos
  getSuplementById: {}, //estado para traer un solo suplemento
  postSuplements: '', //estado para registrar un nuevo suplemento
  error: '' 
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
        getSuplementById: {...payload},
      };
    
    case GET_SUPLEMENTS_BY_NAME:
      return{
        ...state,
        allSuplements: action.payload
      };
    case NOT_GET_SUPLEMENT_BY_NAME:
      return{
        ...state,
        error: action.payload
      };
    case CLEAN_PRODUCT_BY_ID:
      return {
        ...state,
        getSuplementById: payload,
      };

    case PAYMENT_ID:
      return {
        ...state,
        paymentID: payload
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
      }else {
        const productToAdd = {
          ...payload,
          quantity: 1,
          total: payload.price,
        };
        return {
          ...state,
          cart: [...state.cart, productToAdd],
        };
      }
      
      
      // console.log('ADD_TO_CART action dispatched with payload:', payload);
      // const productFound = state.cart.find(
      //   (product) => product.id == payload)
      // if (productFound) {
      //   const updatedCart = state.cart.map((product) =>
      //     product.id == payload
      //       ? {
      //         ...product,
      //         quantity: product.quantity + 1,
      //         total: product.price * (product.quantity + 1),
      //       }
      //       : product
      //   )
      //   console.log('Product already in cart. Updated cart:', updatedCart);
      //   return {
      //     ...state,
      //     cart: updatedCart,
      //   };
      // }
      // const productToAdd = state.cart.find(
      //   (cart) => cart.id == payload
      // );
      // if (productToAdd) {
      //   const updatedProduct = {
      //     ...productToAdd,
      //     quantity: 1,
      //     total: productToAdd.price,
      //   }
      //   console.log('Product not in cart. Adding to cart:', updatedProduct);
      //   return {
      //     ...state,
      //     cart: [...state.cart, updatedProduct],
      //   };
      // }

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

    case INJECT_CART_DATA:
      return {
        ...state,
        cart: payload
      }

    case SHOW_SHOPPING_CART:
      return {
        ...state,
        showShoppingCart: payload
      }
      case POST_REGISTER_USER:
        return {...state, postRegisterUser: payload}
  

    default:
      return state;
  }
};

export default rootReducer;