import { Link, Route, Routes } from "react-router-dom"
import CreateSuplement from "../CreateSuplements"
import UpdateSuplement from "../UpdateSuplement"
import style from './Dashboard.module.css'
import { useEffect, useState } from "react"
import axios from "axios"
import buildQueryParams from "../../Utils/QueryFilterPath"
import FormCategories from "./Categorias/FormCategories"
import Provedores from "./Providers/Providers"
import Tags from "./Tags/Tags"
import Users from "./Users/Users"
import CartList from "../CartList/CartList"
import Orders from "../Ordenes/Ordenes"
import OrdenSuplemento from "../Ordenes/OrdenSuplemento"
const Dashboard = () => {

    const [filter, setFilter] = useState({
        category: "",
        name: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 6
    });

    return (
        <div>

            <div className={style.dashboard}>
                <div className={style.options}>

                    <Link to={"users"}>
                        <p>
                            Usuarios
                        </p>
                    </Link>
                    <Link to={"categorias"}>
                        <p>
                            Categorias
                        </p>
                    </Link>
                    <Link to={"provedores"}>
                        <p>
                            Provedores
                        </p>
                    </Link>
                    <Link to={"tags"}>
                        <p>
                            Etiquetas
                        </p>
                    </Link>
                    <Link to={"createsuplements"} >
                        <p>
                            Crear Suplementos
                        </p>
                    </Link>
                    <Link to={`updatesuplement`}>
                        <p>
                            Actualizar Suplementos
                        </p>
                    </Link>
                    <Link to="orders">
                        <p>
                            Orders
                        </p>
                    </Link>
                    <Link to="cart-list" >
                        <p>
                            Carritos
                        </p>
                    </Link>
                    <div className={style.list}>

                    </div>

                </div>

                <div className={style.form}>

                    <Routes>
                        <Route path='createsuplements' element={<CreateSuplement />} />

                        <Route path='categorias' element={<FormCategories />} />
                        <Route path='provedores' element={<Provedores />} />
                        <Route path='tags' element={<Tags />} />
                        <Route path='users' element={<Users />} />
                        <Route path="orders" element={<Orders />} />

                        <Route path='updatesuplement' element={<UpdateSuplement />} />
                        <Route path="/order-supplements" element={<OrdenSuplemento />} />
                        <Route path="/cart-list" element={<CartList />} />

                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Dashboard