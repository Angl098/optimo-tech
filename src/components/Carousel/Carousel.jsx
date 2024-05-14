import style from './Carousel.module.css'
import { Link } from 'react-router-dom'

const Carousel = () => {

    const scroll = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className={style.slider}>
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/JUSTAWHEY_BANNER.jpg' alt="" />
                <div className={style.info}>
                    <p className={style.p}>Proteína Whey</p>
                    <button className={style.button}>$140000 ARS</button>
                </div>
            </Link>
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/thebuilder_home.png' alt="" />
                <div className={style.info}>
                    <p className={style.p}>BUILDER</p>
                    <button className={style.button}>$85000 ARS</button>
                </div>
            </Link>
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/JUSTAWHEY_HOME.png' alt="" />
                <div className={style.info}>
                    <p className={style.p}>Proteína Whey</p>
                    <button className={style.button}>$110000 ARS</button>
                </div>
            </Link>
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/factor_home.png' alt="" />
                <div className={style.info}>
                    <p className={style.p}>Amino Blend</p>
                    <button className={style.button}>$110000 ARS</button>
                </div>
            </Link>
            
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/phantom_HOME.png' alt="" />
                <div className={style.info}>
                    <p className={style.p}>Phanton</p>
                    <button className={style.button}>$125000 ARS</button>
                </div>
            </Link>
            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src='https://hypersupps.com/wp-content/uploads/2023/11/CRNEHCl_home.png' alt="" />
                <div className={style.info}>
                    <p className={style.p}>Creatina</p>
                    <button className={style.button}>$90000 ARS</button>
                </div>
            </Link>
        </div>
    )
}

export default Carousel;