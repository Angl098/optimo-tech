import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CartList.module.css';
import buildQueryParams from '../../Utils/QueryFilterPath';

const CartList = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        fecha: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 15
    });

    useEffect(() => {
        const fetchCarts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/cart' + buildQueryParams(filter));
                setCarts(response.data.items);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarts();
    }, [filter]);

    const handleDateChange = (e) => {
        setFilter({ ...filter, fecha: e.target.value });
    };

    const handleFilter = () => {
        setFilter({ ...filter, page: 1 });
    };

    const handleResetFilters = () => {
        setFilter({
            fecha: "",
            orderBy: "",
            orderDirection: "",
            page: 1,
            pageSize: 15
        });
    };

    const handlePageChange = (newPage) => {
        setFilter({ ...filter, page: newPage });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.cartListContainer}>
            <h2>Lista de carritos</h2>
            <div className={styles.filterContainer}>
                <label htmlFor="fecha">Fecha: </label>
                <input
                    type="date"
                    id="fecha"
                    value={filter.fecha}
                    onChange={handleDateChange}
                    className={styles.input}
                />
                <button onClick={handleFilter} className={styles.button}>Filtrar</button>
                <button onClick={handleResetFilters} className={styles.button}>Mostrar Todos</button>
            </div>
            {carts.map(cart => (
                <div key={cart.id} className={styles.cart}>
                    <h3>Carrito {cart.id}</h3>
                    <p>Total: {cart.total}</p>
                    <p>Método de pago: {cart.paymentMethod}</p>
                    <p>Estado del pago: {cart.paymentStatus}</p>
                    <p>ID de usuario: {cart.userId}</p>
                    <p>Fecha de creación: {new Date(cart.createdAt).toLocaleString()}</p>
                </div>
            ))}
            <div className={styles.pagination}>
                {filter.page > 1 && <button onClick={() => handlePageChange(filter.page - 1)}>Anterior</button>}
                <span>Página {filter.page}</span>
                {carts.length === filter.pageSize && <button onClick={() => handlePageChange(filter.page + 1)}>Siguiente</button>}
            </div>
        </div>
    );
};

export default CartList;
