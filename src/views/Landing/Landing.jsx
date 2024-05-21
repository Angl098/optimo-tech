import { Link } from 'react-router-dom'
import style from './Landing.module.css'
import NavBarLanding from '../../components/NavBarLanding/NavBarLanding';
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
    return(
        <div className={style.container}>
            <div className={style.section}>
                <Link to={'/detail'} className={style.productOne} onClick={scroll}>
                    <img className={style.productsFirst} src='../../../img/omega-3.jpeg' alt="" />
                    <div className={`${style.info} ${style.firstInfo}`}>
                        <p className={style.p}>Omega 3</p>
                        <button className={style.button}>$9219 ARS</button>
                    </div>
                </Link>
                <div className={style.leftContent}>
                    <Link to={'/detail'} className={style.productTwo} onClick={scroll}>
                        <img className={style.products} src='../../../img/glucerna.png' alt="" />
                        <div className={style.info}>
                            <p className={style.p}>Glucerna</p>
                            <button className={style.button}>$42000 ARS</button>
                        </div>
                    </Link>
                    <Link to={'/detail'} className={style.productThree} onClick={scroll}>
                        <img className={style.products} src='../../../img/maca-organica.png' alt="" />
                        <div className={style.info}>
                            <p className={style.p}>Maca Organica</p>
                            <button className={style.button}>$72900 ARS</button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={style.carouselContent}>
                <h1 className={style.hyper}>Get some power from HYPER!</h1>
                <Carousel />
            </div>

        </div>
    )
}

export default Home