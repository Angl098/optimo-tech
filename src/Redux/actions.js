import axios from 'axios';
export const POST_SUPLEMENTS='POST_SUPLEMENTS';
export const POST_REGISTER_USER="POST_REGISTER_USER";

export const postSuplements = (newSuplements) => {
    const endpoint = 'http://localhost:3001/suplements';
    return async function (dispatch) {
        try{
                const response =await axios.post(endpoint, newSuplements);
          return dispatch({
             type: POST_SUPLEMENTS,
             payload: response.data
          });  
        }
catch(error){
console.log('error al registrar los datos', error);
}
    };
 };

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

