import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./userPerfil.module.css";
import axios from "axios";

function userPerfil({ user }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("User")).id;
    console.log(id);
    axios.get(`/orders/${id}`).then(({ data }) => {
      console.log(data);
      setOrders(data);
    });
  }, []);

  const edit = (event) => {
    event.preventDefault();
    navigate('/registeruser');
  };

  return (
    <div className={style.container}>
      <div className={style.imgPerfil}>
        <h3 className={style.title}>Perfil de Usuario</h3>
        <img className={style.iconPerfil} src='https://cdn.icon-icons.com/icons2/3298/PNG/96/ui_user_profile_avatar_person_icon_208734.png' alt="Profile" />
      </div>
      {user && (
        <>
          <label className={style.id}>ID: {user.id}</label>
          <label>Email</label><p>{user.email}</p>
          <label>Nombre</label><p>{user.name}</p>
          <label>Sexo</label>{user.sex ? <p>{user.sex}</p> : <p>No especificado</p>}
          <label>Direccion</label><p>{user.address}</p>
          <label>Celular</label><p>{user.cellphone}</p>
          <button onClick={edit} className={style.btn}>Editar</button>
        </>
      )}
      <div className={style.ordersContainer}>
        <h3 className={style.title}>Compras Realizadas</h3>
        {orders.length === 0 ? (
          <p>No hay compras realizadas.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={style.orderCard}>
              <h4>Orden #{order.id}</h4>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total / 100}</p>
              <div className={style.suplementsList}>
                {order.Suplements.map((suplement) => (
                  <div key={suplement.id} className={style.suplementItem}>
                    <img src={suplement.image} alt={suplement.name} className={style.suplementImage} />
                    <div className={style.suplementDetails}>
                      <p><strong>{suplement.name}</strong></p>
                      <p>Cantidad: {suplement.orden_suplement.cantidad}</p>
                      <p>Precio: ${suplement.price / 100}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default userPerfil;
