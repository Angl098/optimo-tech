import { GET_SUPLEMENT, CLEAN_PRODUCT_BY_ID, POST_SUPLEMENTS } from "./actions"


const initialState = { getSuplementById: {}, postSuplements: '' };

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_SUPLEMENTS:
      return {
        ...state,
        postSuplements: payload
      };

    case GET_SUPLEMENT:
      console.log(payload);
      return {
        ...state,
        getSuplementById: {...payload},
      };

    case CLEAN_PRODUCT_BY_ID:
      return {
        ...state,
        getSuplementById: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;