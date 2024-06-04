import { Link } from 'react-router-dom';
import style from './Landing.module.css';
import NavBarLanding from '../../components/NavBarLanding/NavBarLanding';
import Carousel from '../../components/Carousel/Carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [randomSuplement, setRandomSuplement] = useState([]);

    useEffect(() => {
        axios("/suplements/")
            .then(({ data }) => {
                setRandomSuplement(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <>
            {/* <NavBarLanding /> */}
            <div className={style.container}>
                <div className={style.section}>
                    <Link to={'/detail'} className={style.productOne}>
                        <img className={style.productsFirst} src={randomSuplement[0]?.image} alt={randomSuplement[0]?.name} />
                        <div className={`${style.info} ${style.firstInfo}`}>
                            <p className={style.p}>{randomSuplement[0]?.name}</p>
                            <button className={style.button}>$9219 ARS</button>
                        </div>
                    </Link>
                    <div className={style.leftContent}>
                        <Link to={'/detail'} className={style.productTwo}>
                            <img className={style.products} src={randomSuplement[1]?.image} alt={randomSuplement[1]?.name} />
                            <div className={style.info}>
                                <p className={style.p}>{randomSuplement[1]?.name}</p>
                                <button className={style.button}>$42000 ARS</button>
                            </div>
                        </Link>
                        <Link to={'/detail'} className={style.productThree}>
                            <img className={style.products} src={randomSuplement[2]?.image} alt={randomSuplement[2]?.name} />
                            <div className={style.info}>
                                <p className={style.p}>{randomSuplement[2]?.name}</p>
                                <button className={style.button}>$72900 ARS</button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={style.carouselContent}>
                    <h1 className={style.hyper}>More products!</h1>
                    <Carousel />
                </div>
            </div>
        </>
    );
};

export default Home;


// import style from './Landing.module.css'
// import NavBarLanding from '../../components/NavBarLanding/NavBarLanding';
// import Carousel from '../../components/Carousel/Carousel';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//     const [randomSuplement,setRandomSuplement]=useState([])
//     useEffect(()=>{
//        // axios("/suplements/randomSuplementes").then(({data})=>{
//             axios("/suplements/").then(({data})=>{
//             setRandomSuplement(data)
//         })
//     },[])
//     return(
//         <div className={style.container}>
//             <div className={style.section}>
//                 <Link to={'/detail'} className={style.productOne} onClick={scroll}>
//                     <img className={style.productsFirst} src={randomSuplement[0]?.image} alt="" />
//                     <div className={`${style.info} ${style.firstInfo}`}>
//                         <p className={style.p}>{randomSuplement[0]?.name}</p>
//                         <button className={style.button}>$9219 ARS</button>
//                     </div>
//                 </Link>
//                 <div className={style.leftContent}>
//                     <Link to={'/detail'} className={style.productTwo} onClick={scroll}>
//                         <img className={style.products} src={randomSuplement[1]?.image} alt="" />
//                         <div className={style.info}>
//                             <p className={style.p}>{randomSuplement[1]?.name}</p>
//                             <button className={style.button}>$42000 ARS</button>
//                         </div>
//                     </Link>
//                     <Link to={'/detail'} className={style.productThree} onClick={scroll}>
//                         <img className={style.products} src={randomSuplement[2]?.image} alt="" />
//                         <div className={style.info}>
//                             <p className={style.p}>{randomSuplement[2]?.name}</p>
//                             <button className={style.button}>$72900 ARS</button>
//                         </div>
//                     </Link>
//                 </div>
//             </div>
//             <div className={style.carouselContent}>
//                 <h1 className={style.hyper}>Get some power from HYPER!</h1>
//                 <Carousel />
//             </div>

//         </div>
//     )
// }

// export default Home