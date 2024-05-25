import { Link, Route, Routes } from "react-router-dom"
import CreateSuplement from "../CreateSuplements"
import UpdateSuplement from "../UpdateSuplement"
import style from './Dashboard.module.css'
const Dashboard = (props) => {

    return (
        <div className={style.dashboard}>
            <div>

                <Link to={"createsuplements"} >
                    <p>
                        Crear Suplementos
                    </p>
                </Link>

                <Link to={"updatesuplement"} >
                    <p>
                        Actualizar Suplementos
                    </p>
                </Link>

            </div>

            <div>

                <Routes>
                    <Route path='createsuplements' element={<CreateSuplement />} />
                    
                    <Route path='updatesuplement/:id' element={<UpdateSuplement />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard