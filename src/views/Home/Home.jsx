//Importo las librerias o dependencias
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Importo las actions
import {getSuplements, getSuplementsByName} from '../../Redux/actions'

//Importo los componentes

import NavBar from '../../components/NavBar/NavBar';
import ProductList from '../../components/ProductList/ProductList';

//Importo los estilos
import style from './Home.module.css'
import loadingImg from '../../assets/loading.gif';

const Home = () => {

    const dispatch = useDispatch();

    const allSuplements = useSelector((state) => state.allSuplements);
    
    // estado para controlar el loading
    const [loading, setLoading] = useState(true);

    //Filtrar por nombre con el back-end
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);// Establecer el estado de carga como verdadero al iniciar la solicitud de datos
        dispatch(getSuplements())
            .then(() => setLoading(false)) // Marcar el estado de carga como falso cuando se reciban los datos
            .catch(() => setLoading(false)); // También en caso de error
    }, [dispatch]);


    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getSuplementsByName(search));
    }
    
    return (

        <div className={style.container}>
            {/* <Header 
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts} /> */}
            {/* <ProductList/> */}
            <NavBar handleSearch={handleSearch} handleSubmit={handleSubmit} />
            <div>
                {loading ?(
                    <img src={loadingImg} alt="loading" />
                ):(
                <>
                    <ProductList allSuplements={allSuplements}/>
                </>
                )}
            </div>
        </div>
    )
}

export default Home