import axios from 'axios';
export const POST_SUPLEMENTS='POST_SUPLEMENTS';
export const POST_REGISTER_USER="POST_REGISTER_USER";
export const POST_LOGIN="POST_LOGIN";

export const postSuplements = (newSuplements) => {
    const endpointSuplements = 'http://localhost:3001/suplements';
    return async function (dispatch) {
        try{
                const response =await axios.post(endpointSuplements, newSuplements);
          return dispatch({
             type: POST_SUPLEMENTS,
             payload: response.data
          });  
        }
catch(error){
console.log('error al registrar suplemento', error);
}
    };
 };

 export const postRegisterUser = (user) => {
    const endpointRegisterUser = 'http://localhost:3001/users';
    return async function (dispatch) {
        try{
                const response =await axios.post(endpointRegisterUser, user);
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

 export const postLogin = (login) => {
   const endpointRegisterUser = 'http://localhost:3001/login';
   return async function (dispatch) {
       try{
               const response =await axios.post(endpointRegisterUser, login);
         return dispatch({
            type: POST_LOGIN,
            payload: response.data
         });  
       }
catch(error){
console.log('error al log in', error);
alert("error" + error);
}
   };
};

