import axios from 'axios';

export const POST_SUPLEMENTS ="POST_SUPLEMENTS";
export const GET_SUPLEMENT ="GET_SUPLEMENT";
export const GET_SUPLEMENTS ="GET_SUPLEMENTS";
export const CLEAN_PRODUCT_BY_ID ="CLEAN_PRODUCT_BY_ID";
export const GET_SUPLEMENTS_BY_NAME = "GET_SUPLEMENTS_BY_NAME";
export const NOT_GET_SUPLEMENT_BY_NAME = "NOT_GET_SUPLEMENT_BY_NAME";


//Función que hace la peticion con axios al back-end
//para traer todos los suplementos
export const getSuplements = () => {
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/suplements')
        return dispatch({
            type: GET_SUPLEMENTS,
            payload: response.data
        })
    }
}

export const postSuplements = (newSuplements) => {
    const endpoint = 'http://localhost:3001/suplements';
    return async function (dispatch) {
        try {
            const response = await axios.post(endpoint, newSuplements);
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
            const { data } = await axios.get(`http://localhost:3001/suplements/${id}`);
            console.log(data)
            return dispatch({
                type: GET_SUPLEMENT,
                payload: data,
            });
        } catch (error) {
            console.log(error)
        }
    };
};

export const cleanProductById = () => {
    return {
        type: CLEAN_PRODUCT_BY_ID,
        payload: {}
    }
}

//Función que hace la peticion con axios al back-end
//para traer suplementos por nombre
export const getSuplementsByName = (queryParams) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/suplements?name=${queryParams}`)
        //console.log(response.data)
        if (Array.isArray(response.data)) {
            return dispatch({
                type: GET_SUPLEMENTS_BY_NAME,
                payload: response.data
            })  
        } else{
            return dispatch({
                type: NOT_GET_SUPLEMENT_BY_NAME,
                payload: response.data
            })
        }
    }
}