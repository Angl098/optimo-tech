import { GET_SUPLEMENTS, GET_SUPLEMENT, CLEAN_PRODUCT_BY_ID, POST_SUPLEMENTS, GET_SUPLEMENTS_BY_NAME, NOT_GET_SUPLEMENT_BY_NAME } from "./actions"


const initialState = { 
  allSuplements: [], //estado original con todos los suplementos
  getSuplementById: {}, //estado para traer un solo suplemento
  postSuplements: '', //estado para registrar un nuevo suplemento
  error: '' //estado para cuando no se encuentra suplemento por nombre
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

    default:
      return state;
  }
};

export default rootReducer;