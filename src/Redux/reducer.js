import { POST_SUPLEMENTS} from "./actions"; 
const initialState={postSuplements:''}
const rootReducer=(state=initialState,action)=>{
const {type,payload}=action;

switch (type) {
    case POST_SUPLEMENTS:
      return { ...state, postSuplements: payload};

    default: return {...state};
}
}
export default rootReducer;