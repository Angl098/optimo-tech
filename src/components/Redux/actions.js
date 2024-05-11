import axios from 'axios';
export const POST_SUPLEMENTS='POST_SUPLEMENTS';

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
