import React,{ useEffect } from "react";
import { useSelector } from "react-redux";


function userPerfil(user){
//const user = useSelector(state=>state.user)

console.log('perfil', user)
return(<>
<h3>user perfil {user.email}</h3>
</>)
}

export default userPerfil;