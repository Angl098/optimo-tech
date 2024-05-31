import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Ordenes.module.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{(order.total / 100).toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod} Mercado pago</td>
                            <td>
                                <button onClick={() => viewOrderDetails(order.id)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const viewOrderDetails = (orderId) => {
    // Implementa la lógica para ver los detalles de la orden
    console.log(`Ver detalles de la orden: ${orderId}`);
};

export default Orders;