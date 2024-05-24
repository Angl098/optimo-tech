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
        //console.log(e.target.value)
        setSearch(e.target.value);
    }
    
    return (

        <div className={style.container}>
            <NavBar handleSearch={handleSearch}  />
            <div>
                {loading ?(
                    <img src={loadingImg} alt="loading" />
                ):(
                <>
                    <ProductList allSuplements={allSuplements} search={search}/>
                </>
                )}
            </div>
        </div>
    )
}

export default Home

// codigo angeles
// import { useState } from 'react';
// import style from './Home.module.css'
// import { Link, useNavigate } from 'react-router-dom'
// import { Header } from '../../components/Header/Header'
// import ProductList from '../../components/ProductList/ProductList';


// const Home = () => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [countProducts, setCountProducts] = useState(0);
//     const navigate = useNavigate();

//     const handleClick = () => {navigate('/')}

//     return (

//         <div className={style.container}>
//             <button className={style.backButton} onClick={handleClick}> ← Volver</button>
//             <Header 
//                 allProducts={allProducts}
//                 setAllProducts={setAllProducts}
//                 total={total}
//                 setTotal={setTotal}
//                 countProducts={countProducts}
//                 setCountProducts={setCountProducts} />
//             <ProductList/>
//         </div>
//     )
// }

// export default Home