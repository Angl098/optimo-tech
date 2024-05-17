import axios from 'axios';

export const POST_SUPLEMENTS ="POST_SUPLEMENTS";
export const GET_SUPLEMENT ="GET_SUPLEMENT";
export const GET_SUPLEMENTS ="GET_SUPLEMENTS";
export const CLEAN_PRODUCT_BY_ID ="CLEAN_PRODUCT_BY_ID";
export const PAYMENT_ID ="PAYMENT_ID";


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
            return dispatch({
                type: GET_SUPLEMENT,
                payload: data,
            });
        } catch (error) {
            console.log(err)
        }
    };
};

export const cleanProductById = () => {
    return {
        type: CLEAN_PRODUCT_BY_ID,
        payload: {}
    }
}

