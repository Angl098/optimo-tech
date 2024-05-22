import { useState } from 'react';
import style from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList';


const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {navigate('/')}

    return (

        <div className={style.container}>
            <button className={style.backButton} onClick={handleClick}> ← Volver</button>
            <Header 
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts} />
            <ProductList/>
        </div>
    )
}

export default Home
