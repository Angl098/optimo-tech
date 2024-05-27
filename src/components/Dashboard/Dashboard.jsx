import { Link, Route, Routes } from "react-router-dom"
import CreateSuplement from "../CreateSuplements"
import UpdateSuplement from "../UpdateSuplement"
import style from './Dashboard.module.css'
import NavBar from "../NavBar/NavBar"
import { useEffect, useState } from "react"
import axios from "axios"
import buildQueryParams from "../../Utils/QueryFilterPath"
const Dashboard = (props) => {

    const [filter, setFilter] = useState({
        category: "",
        name: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 6
    });
    const [suplements,setSuplements]=useState([])
    useEffect(() => {
        const query = buildQueryParams(filter)
        axios.get("/suplements/filter" + query).then(({ data }) => {
            setSuplements(data.items)
        })
    }, [])
    return (
        <div>
            <NavBar></NavBar>

            <div className={style.dashboard}>
                <div className={style.options}>

                    <Link to={"createsuplements"} >
                        <p>
                            Crear Suplementos
                        </p>
                    </Link>

                    <Link  >
                        <p>
                            Actualizar Suplementos
                        </p>
                    </Link>
                    <div className={style.list}>

                    {suplements.map((s)=>{
                        return(<>
                            <Link  to={`updatesuplement/${s.id}`}>
                                <span>{s.name}</span>
                            </Link>
                        </>
                        )
                    })}
                    </div>

                </div>

                <div className={style.form}>

                    <Routes>
                        <Route path='createsuplements' element={<CreateSuplement />} />

                        <Route path='updatesuplement/:id' element={<UpdateSuplement />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Dashboard