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
            <ProductList 
            
            />
            <div className={style.section}>
                <Link to={'/detail/2'} className={style.productOne} onClick={scroll}>
                    <img className={style.productsFirst} src='../../../img/omega-3.jpeg' alt="" />
                    <div className={`${style.info} ${style.firstInfo}`}>
                        <p className={style.p}>Omega 3</p>
                        <button className={style.button}>$9219 ARS</button>
                    </div>
                </Link>
                <div className={style.leftContent}>
                    <Link to={'/detail/2'} className={style.productTwo} onClick={scroll}>
                        <img className={style.products} src='../../../img/glucerna.png' alt="" />
                        <div className={style.info}>
                            <p className={style.p}>Glucerna</p>
                            <button className={style.button}>$42000 ARS</button>
                        </div>
                    </Link>
                    <Link to={'/detail/31'} className={style.productThree} onClick={scroll}>
                        <img className={style.products} src='../../../img/maca-organica.png' alt="" />
                        <div className={style.info}>
                            <p className={style.p}>Maca Organica</p>
                            <button className={style.button}>$72900 ARS</button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={style.carouselContent}>
                <Carousel />
            </div>

        </div>
    )
}

export default Home
