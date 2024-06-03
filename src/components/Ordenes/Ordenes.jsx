import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Ordenes.module.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});

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

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`/orders/${orderId}/details`);
            setOrderDetails(prevDetails => ({
                ...prevDetails,
                [orderId]: response.data
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    const viewOrderDetails = (orderId) => {
        if (!orderDetails[orderId]) {
            fetchOrderDetails(orderId);
        }
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
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => viewOrderDetails(order.id)}>View Details</button>
                            </td>
                        </tr>
                        {orderDetails[order.id] && (
                            <tr>
                                <td colSpan="5">
                                    <OrderDetails details={orderDetails[order.id]} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const OrderDetails = ({ details }) => (
    <div className={styles.orderDetails}>
        <h3>Order Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {details.OrdenSuplementos.map(supplement => (
                    <tr key={supplement.Suplement.id}>
                        <td>{supplement.Suplement.id}</td>
                        <td>{supplement.Suplement.name}</td>
                        <td>{supplement.quantity}</td>
                        <td>{(supplement.price / 100).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Orders;