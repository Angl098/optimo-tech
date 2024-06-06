import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./userPerfil.module.css";

function userPerfil({user}){
const navigate = useNavigate();
console.log('perfil', user)

const edit = (event)=>{
  event.preventDefault();
  console.log("edit");
  navigate('/registeruser')
  
}

return(<>
<div className={style.container}>
  <div className={style.imgPerfil}>
<h3 className={style.title}>Perfil de Usuario</h3>
<img className={style.iconPerfil} src='https://cdn.icon-icons.com/icons2/3298/PNG/96/ui_user_profile_avatar_person_icon_208734.png' />
</div>
{user !== null &&<>
<label className={style.id}>ID: {user.id}</label>
<label>Email</label><p>{user.email}</p>
<label>Nombre</label><p>{user.name}</p>
<label>Sexo</label>{user.sex?<p>{user.sex}</p>:<p>No especificado</p>}
<label>Direccion</label><p>{user.address}</p>
<label>Celular</label><p>{user.cellphone}</p>

<button onClick={edit} className={style.btn}>Editar</button>
</>}
</div>
</>)

};
export default userPerfil;