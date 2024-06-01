import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import style from './OrdenSuplemento.module.css'

const OrdenSuplemento = () => {
    const [orderSupplements, setOrderSupplements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/orden/order-suplement'); 
                setOrderSupplements(response.data);
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={style.container}>
            <h1>Order Supplements</h1>
            {orderSupplements.length > 0 ? (
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Supplement Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderSupplements.map((item) => (
                            <tr key={item.id}>
                                <td>{item.Orden.id}</td>
                                <td>{item.Suplement.name}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No order supplements found</p>
            )}
        </div>
    );
};

export default OrdenSuplemento;