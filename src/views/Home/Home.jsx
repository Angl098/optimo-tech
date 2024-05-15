import { useState } from 'react';
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList';
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    return (

        <div className={style.container}>
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
