import { POST_REGISTER_USER, POST_SUPLEMENTS} from "./actions"; 
const initialState={postSuplements:''}
const rootReducer=(state=initialState,action)=>{
const {type,payload}=action;

switch (type) {
    case POST_SUPLEMENTS:
      return { ...state, postSuplements: payload};

    case POST_REGISTER_USER:
      return {...state, postRegisterUser: payload}

    default: return {...state};
}
}
export default rootReducer;