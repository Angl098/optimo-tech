import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CartList.module.css';

const CartList = () => {
    const [carts, setCarts] = useState([]);
    const [cartDetails, setCartDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await axios.get('/cart');
                setCarts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.cartListContainer}>
            <h2>Lista de carritos</h2>
            {carts.map(cart => (
                <div key={cart.id} className={styles.cart}>
                    <h3>Cart {cart.id}</h3>
                    <p>Total: {cart.total}</p>
                    <p>Payment Status: {cart.paymentStatus}</p>
                    <p>User: {cart.userId}</p>
                </div>
            ))}
        </div>
    );
};


export default CartList;
