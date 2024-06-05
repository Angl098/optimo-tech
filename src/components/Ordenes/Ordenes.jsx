import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Ordenes.module.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const viewOrderDetails = (id) => {
        navigate(`/orders/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Ordenes de compra</h2>
            <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <React.Fragment key={order.id}>
                        <tr>
                            <td>{order.id}</td>
                            <td>{(order.total / 100).toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod} Mercado pago</td>
                            <td>{order.userId} </td>
                            <td>
                            <button onClick={() => viewOrderDetails(order.id)}>Ver Detalles</button>
                            </td>
                        </tr>
                        
                    </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;